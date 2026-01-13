"""
MBA Evaluation Orchestrator
Main entry point that coordinates all MBA evaluation services
"""
import json
import os
import random
from typing import Dict, Any
from src.services.mba_scoring_orchestrator import calculate_mba_readiness_score
from src.services.mba_skill_inference import infer_skills_from_responses
from src.services.mba_ai_tools import get_ai_tools_for_role
from src.services.mba_industry_data import (
    get_industry_stats_for_role,
    get_transformation_insights_for_role
)
from src.services.mba_persona_matcher import match_persona
from src.services.mba_openai_service import generate_mba_openai_content
from src.config.logging_config import get_logger

logger = get_logger(__name__)


def _load_transformation_companies() -> Dict[str, Any]:
    """Load transformation companies from JSON file"""
    companies_file = os.path.join(
        os.path.dirname(__file__),
        '..', 'config', 'transformation_companies.json'
    )
    with open(companies_file, 'r') as f:
        return json.load(f)


def _get_role_display_name(role: str) -> str:
    """Convert role key to display name"""
    role_mapping = {
        'pm': 'Product Manager',
        'finance': 'Finance Professional',
        'sales': 'Sales Professional',
        'marketing': 'Marketing Professional',
        'operations': 'Operations Professional',
        'founder': 'Founder/Entrepreneur'
    }
    return role_mapping.get(role, role)


def evaluate_mba_readiness(quiz_responses: Dict[str, Any]) -> Dict[str, Any]:
    """
    Main orchestrator for MBA readiness evaluation
    Uses OpenAI for personalized content generation

    Args:
        quiz_responses: {
            'role': 'pm',
            'experience': '5-8',
            'career_goal': 'ai-leadership',
            'currentRole': 'Product Manager',
            ... (all role-specific answers)
        }

    Returns:
        Complete evaluation with OpenAI-personalized content
    """
    role = quiz_responses.get('role')
    logger.info(f"Starting MBA evaluation for role={role}")

    # 1. Calculate MBA Readiness Score
    readiness = calculate_mba_readiness_score(quiz_responses)

    # 2. Match persona based on role + AI maturity
    persona_info = match_persona(role, readiness)
    logger.info(f"Matched persona: {persona_info['badge_label']}")

    # 3. Infer skill levels (role-specific skills)
    skills_analysis = infer_skills_from_responses(role, quiz_responses)

    # 4. Get AI tools recommendations (list to personalize via OpenAI)
    ai_tools = get_ai_tools_for_role(
        role=role,
        skill_gaps=skills_analysis['gaps']
    )

    # 5. Get industry stats
    industry_stats = get_industry_stats_for_role(role)
    logger.info(f"Retrieved {len(industry_stats)} industry stats for role: {role}")

    # 6. Get transformation insights
    transformation_insights = get_transformation_insights_for_role(role)

    # 7. Generate peer comparison message
    peer_comparison = _generate_peer_comparison(readiness)

    # 8. Select 3 random companies for transformation stories
    transformation_companies_data = _load_transformation_companies()

    # Map role to company list key
    role_mapping = {
        'pm': 'product-manager',
        'finance': 'finance',
        'sales': 'sales-growth',
        'marketing': 'marketing',
        'operations': 'operations',
        'founder': 'founder'
    }
    companies_key = role_mapping.get(role, 'product-manager')
    role_companies = transformation_companies_data.get(companies_key, [])

    # Select 3 random companies
    selected_companies = random.sample(role_companies, min(3, len(role_companies)))
    logger.info(f"Selected {len(selected_companies)} companies for transformation stories")

    # 9. Generate OpenAI personalized content (ALL at once)
    career_goal = quiz_responses.get('career_goal', 'improve-current')
    current_role_name = quiz_responses.get('currentRole') or _get_role_display_name(role)
    experience = quiz_responses.get('experience', '3-5')

    logger.info(f"Calling OpenAI for personalized content generation...")
    openai_content = generate_mba_openai_content(
        role=role,
        experience=experience,
        career_goal=career_goal,
        skill_gaps=skills_analysis['gaps'],
        skills=skills_analysis,
        readiness_score=readiness['overall_score'],
        companies=selected_companies,
        tools=ai_tools,
        current_role=current_role_name
    )
    logger.info(f"OpenAI content generated successfully")

    # Format quick wins from OpenAI
    quick_wins = openai_content.get('quick_wins', [])

    # Format career transitions from OpenAI career paths
    career_paths = openai_content.get('career_paths', [])
    career_transitions = []
    for idx, path in enumerate(career_paths):
        career_transitions.append({
            'title': path.get('title', ''),
            'description': path.get('description', ''),
            'action_items': path.get('action_items', []),
            'card_type': 'target' if idx == 0 else 'alternate',
            'timeline': None,
            'salary': None,
            'goal': None,
            'key_focus': None
        })

    # Format OpenAI content for frontend
    formatted_openai_content = {
        'transformation_stories': openai_content.get('transformation_stories', []),
        'tool_descriptions': openai_content.get('tool_descriptions', []),
        'quick_wins': quick_wins
    }

    return {
        'readiness': readiness,
        'persona': persona_info,
        'skills': skills_analysis,
        'quick_wins': quick_wins,  # OpenAI-generated
        'ai_tools': ai_tools,  # Base list (OpenAI descriptions in openai_content)
        'industry_stats': industry_stats,
        'transformation_insights': transformation_insights,
        'peer_comparison': peer_comparison,
        'openai_content': formatted_openai_content,  # OpenAI personalized content
        'career_transitions': career_transitions,  # OpenAI-generated career paths
        'cache_status': 'openai',  # Indicates OpenAI content
        'meta': {
            'role': role,
            'experience': experience,
            'career_goal': career_goal
        }
    }


def _generate_peer_comparison(readiness: Dict[str, Any]) -> Dict[str, Any]:
    """
    Generate peer comparison messaging

    Returns:
        {
            'percentile': 85,
            'message': 'You score higher than 85% of professionals...',
            'comparison_text': 'Top 15% in your cohort',
            'badge': 'top_performer' | 'above_average' | 'average' | 'developing'
        }
    """
    percentile = readiness['percentile']
    overall_score = readiness['overall_score']

    # Determine badge
    if percentile >= 90:
        badge = 'top_performer'
        comparison_text = f'Top {100 - percentile}% in your cohort'
    elif percentile >= 70:
        badge = 'above_average'
        comparison_text = f'Top {100 - percentile}% in your cohort'
    elif percentile >= 50:
        badge = 'average'
        comparison_text = 'Above average in your cohort'
    else:
        badge = 'developing'
        comparison_text = 'Building foundation'

    # Generate message
    if percentile >= 80:
        message = f"You score higher than {percentile}% of professionals in similar roles. You're well-positioned for an MBA program and leadership roles."
    elif percentile >= 60:
        message = f"You score higher than {percentile}% of peers. You have a strong foundation with some areas for growth before an MBA."
    elif percentile >= 40:
        message = f"You're at the {percentile}th percentile. Focus on the skill gaps below to accelerate your readiness for executive roles."
    else:
        message = f"You're building your foundation. The quick wins below will help you develop the skills needed for strategic roles."

    return {
        'percentile': percentile,
        'message': message,
        'comparison_text': comparison_text,
        'badge': badge,
        'cohort_size': _estimate_cohort_size(readiness['maturity_level'])
    }


def _estimate_cohort_size(maturity_level: str) -> str:
    """Estimate cohort size for social proof"""
    cohort_map = {
        'ai_native': '2,000+ professionals',
        'ai_strategic': '8,000+ professionals',
        'ai_capable': '25,000+ professionals',
        'ai_curious': '50,000+ professionals',
        'ai_unaware': '100,000+ professionals'
    }
    return cohort_map.get(maturity_level, '50,000+ professionals')
