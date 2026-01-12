"""
MBA Evaluation Orchestrator
Main entry point that coordinates all MBA evaluation services
"""
from typing import Dict, Any
from src.services.mba_scoring_orchestrator import calculate_mba_readiness_score
from src.services.mba_skill_inference import infer_skills_from_responses
from src.services.mba_quick_wins import generate_quick_wins
from src.services.mba_ai_tools import get_ai_tools_for_role
from src.services.mba_industry_data import (
    get_industry_stats_for_role,
    get_transformation_insights_for_role
)


def evaluate_mba_readiness(quiz_responses: Dict[str, Any]) -> Dict[str, Any]:
    """
    Main orchestrator for MBA readiness evaluation
    Pure mapping-based - no OpenAI calls

    Args:
        quiz_responses: {
            'role': 'product-manager',
            'experience': '5-8',
            'career_goal': 'career-growth',
            'pm-data-conflict': 'revalidate-hypothesis',
            ... (all role-specific answers)
        }

    Returns:
        Complete evaluation with:
        - Readiness score & percentile
        - Skill levels & gaps
        - Quick wins
        - AI tools recommendations
        - Industry stats
        - Transformation insights
    """
    role = quiz_responses.get('role')

    # 1. Calculate MBA Readiness Score
    readiness = calculate_mba_readiness_score(quiz_responses)

    # 2. Infer skill levels
    skills_analysis = infer_skills_from_responses(role, quiz_responses)

    # 3. Generate quick wins based on gaps
    quick_wins = generate_quick_wins(
        role=role,
        skill_gaps=skills_analysis['gaps'],
        responses=quiz_responses
    )

    # 4. Get AI tools recommendations
    ai_tools = get_ai_tools_for_role(
        role=role,
        skill_gaps=skills_analysis['gaps']
    )

    # 5. Get industry stats
    industry_stats = get_industry_stats_for_role(role)

    # 6. Get transformation insights
    transformation_insights = get_transformation_insights_for_role(role)

    # 7. Generate peer comparison message
    peer_comparison = _generate_peer_comparison(readiness)

    return {
        'readiness': readiness,
        'skills': skills_analysis,
        'quick_wins': quick_wins,
        'ai_tools': ai_tools,
        'industry_stats': industry_stats,
        'transformation_insights': transformation_insights,
        'peer_comparison': peer_comparison,
        'meta': {
            'role': role,
            'experience': quiz_responses.get('experience'),
            'career_goal': quiz_responses.get('career_goal')
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
