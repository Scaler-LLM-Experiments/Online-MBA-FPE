"""
MBA Readiness Scoring Orchestrator
Pure mapping-based evaluation - no OpenAI calls
"""
from typing import Dict, List, Any
from enum import Enum


class AIMaturityLevel(str, Enum):
    """AI Maturity progression levels"""
    AI_UNAWARE = "ai_unaware"
    AI_CURIOUS = "ai_curious"
    AI_CAPABLE = "ai_capable"
    AI_STRATEGIC = "ai_strategic"
    AI_NATIVE = "ai_native"


class SkillLevel(str, Enum):
    """Skill proficiency levels"""
    BEGINNER = "beginner"
    DEVELOPING = "developing"
    PROFICIENT = "proficient"
    ADVANCED = "advanced"
    EXPERT = "expert"


# Scoring weights for MBA Readiness Score
SCORING_WEIGHTS = {
    'experience': 0.20,  # 20% - Years of experience
    'role_maturity': 0.40,  # 40% - Role-specific depth
    'ai_fluency': 0.30,  # 30% - AI adoption & usage
    'ownership': 0.10  # 10% - Leadership & accountability
}


def calculate_mba_readiness_score(responses: Dict[str, Any]) -> Dict[str, Any]:
    """
    Calculate MBA Readiness Score based on quiz responses

    Returns:
        {
            'overall_score': int (0-100),
            'category_scores': dict,
            'maturity_level': str,
            'percentile': int
        }
    """
    role = responses.get('role')
    experience = responses.get('experience')

    # Calculate component scores
    experience_score = _calculate_experience_score(experience)
    role_maturity_score = _calculate_role_maturity(role, responses)
    ai_fluency_score = _calculate_ai_fluency(role, responses)
    ownership_score = _calculate_ownership(role, responses)

    # Calculate raw weighted score (0-100)
    raw_score = (
        experience_score * SCORING_WEIGHTS['experience'] +
        role_maturity_score * SCORING_WEIGHTS['role_maturity'] +
        ai_fluency_score * SCORING_WEIGHTS['ai_fluency'] +
        ownership_score * SCORING_WEIGHTS['ownership']
    )

    # Cap score at 40-80% range (nobody is "perfect", everyone has room to grow)
    # Map raw 0-100 score to 40-80 range
    overall_score = int(40 + (raw_score * 0.40))
    overall_score = max(40, min(80, overall_score))  # Ensure bounds

    # Determine AI maturity level (use raw score for better differentiation)
    maturity_level = _determine_ai_maturity(ai_fluency_score, raw_score)

    # Calculate percentile (simplified - in production, query database)
    percentile = _calculate_percentile(overall_score)

    return {
        'overall_score': overall_score,
        'category_scores': {
            'experience': experience_score,
            'role_maturity': role_maturity_score,
            'ai_fluency': ai_fluency_score,
            'ownership': ownership_score
        },
        'maturity_level': maturity_level,
        'percentile': percentile,
        'readiness_tags': _generate_readiness_tags(overall_score, maturity_level, role, responses)
    }


def _calculate_experience_score(experience: str) -> int:
    """Map experience to score (0-100)"""
    experience_map = {
        '0-2': 40,
        '2-5': 60,
        '5-8': 80,
        '8-12': 95,
        '12+': 100
    }
    return experience_map.get(experience, 50)


def _calculate_role_maturity(role: str, responses: Dict[str, Any]) -> int:
    """
    Calculate role-specific maturity based on answer patterns
    Higher scores for strategic/systems thinking answers
    """
    if role == 'product-manager':
        return _score_pm_maturity(responses)
    elif role == 'finance':
        return _score_finance_maturity(responses)
    elif role == 'sales':
        return _score_sales_maturity(responses)
    elif role == 'marketing':
        return _score_marketing_maturity(responses)
    elif role == 'operations':
        return _score_operations_maturity(responses)
    elif role == 'founder':
        return _score_founder_maturity(responses)
    else:
        return 50  # Default for student/other


def _score_pm_maturity(responses: Dict[str, Any]) -> int:
    """Score PM based on strategic depth"""
    score = 50  # Base score

    # Question: Data conflict priority
    if responses.get('pm-data-conflict') == 'revalidate-hypothesis':
        score += 15  # Strategic thinking
    elif responses.get('pm-data-conflict') == 'customer-research':
        score += 10

    # Question: Roadmap bloat
    if responses.get('pm-roadmap-bloat') == 'ruthless-prioritization':
        score += 15
    elif responses.get('pm-roadmap-bloat') == 'communicate-tradeoffs':
        score += 10

    # Question: AI usage
    if responses.get('pm-ai-usage') in ['predictive-insights', 'automated-decisions']:
        score += 10

    # Question: Feature failure
    if responses.get('pm-feature-failure') in ['systemic-failure', 'misaligned-incentives']:
        score += 10  # Systems thinking

    return min(score, 100)


def _score_finance_maturity(responses: Dict[str, Any]) -> int:
    """Score Finance based on strategic depth"""
    score = 50

    if responses.get('finance-metrics-conflict') in ['investigate-methodology', 'segment-analysis']:
        score += 15

    if responses.get('finance-forecast-miss') in ['model-assumptions', 'leading-indicators']:
        score += 15

    if responses.get('finance-ai-usage') in ['scenario-modeling', 'anomaly-detection']:
        score += 10

    if responses.get('finance-decision-speed') in ['directional-confidence', 'build-ranges']:
        score += 10

    return min(score, 100)


def _score_sales_maturity(responses: Dict[str, Any]) -> int:
    """Score Sales based on strategic depth"""
    score = 50

    if responses.get('sales-pipeline-reality') in ['analyze-winloss', 'tighten-qualification']:
        score += 15

    if responses.get('sales-ai-usage') in ['deal-risk', 'pricing-optimization']:
        score += 10

    if responses.get('sales-forecasting') in ['predictive-models', 'historical-patterns']:
        score += 15

    if responses.get('sales-ownership') in ['region-business', 'team-number']:
        score += 10

    return min(score, 100)


def _score_marketing_maturity(responses: Dict[str, Any]) -> int:
    """Score Marketing based on strategic depth"""
    score = 50

    if responses.get('marketing-conflicting-signals') in ['ltv-cac-cohort', 'revenue-attribution']:
        score += 15

    if responses.get('marketing-ai-application') in ['automated-optimization', 'audience-prediction']:
        score += 10

    if responses.get('marketing-leadership-metric') in ['revenue-contribution', 'ltv']:
        score += 15

    return min(score, 100)


def _score_operations_maturity(responses: Dict[str, Any]) -> int:
    """Score Operations based on strategic depth"""
    score = 50

    if responses.get('operations-scale-stress') in ['data-visibility', 'process-design']:
        score += 15

    if responses.get('operations-ai-leverage') in ['decision-optimization', 'automation']:
        score += 10

    if responses.get('operations-strategic-role') in ['competitive-advantage', 'enable-scale']:
        score += 15

    return min(score, 100)


def _score_founder_maturity(responses: Dict[str, Any]) -> int:
    """Score Founder based on strategic depth"""
    score = 50

    if responses.get('founder-mvp-failure') in ['reframe-problem', 'pivot-icp']:
        score += 15

    if responses.get('founder-scale-pain') in ['data-blindness', 'customer-mix']:
        score += 10

    if responses.get('founder-ai-advantage') in ['insight', 'differentiation']:
        score += 15

    return min(score, 100)


def _calculate_ai_fluency(role: str, responses: Dict[str, Any]) -> int:
    """Calculate AI fluency score based on AI-related answers"""
    score = 30  # Base score (everyone has some AI exposure)

    # Map AI usage patterns to scores
    ai_question_keys = {
        'product-manager': 'pm-ai-usage',
        'finance': 'finance-ai-usage',
        'sales': 'sales-ai-usage',
        'marketing': 'marketing-ai-application',
        'operations': 'operations-ai-leverage',
        'founder': 'founder-ai-advantage'
    }

    ai_key = ai_question_keys.get(role)
    if not ai_key:
        return score

    ai_answer = responses.get(ai_key)

    # Strategic/Advanced AI usage
    advanced_answers = [
        'predictive-insights', 'automated-decisions',  # PM
        'scenario-modeling', 'anomaly-detection',  # Finance
        'deal-risk', 'pricing-optimization',  # Sales
        'automated-optimization', 'audience-prediction',  # Marketing
        'decision-optimization', 'automation',  # Operations
        'insight', 'differentiation'  # Founder
    ]

    # Tactical AI usage
    tactical_answers = [
        'user-research', 'ab-testing',  # PM
        'forecasting', 'reporting',  # Finance
        'call-summaries', 'email-drafts',  # Sales
        'creative-testing', 'content-generation',  # Marketing
        'forecasting', 'reporting',  # Operations
        'speed', 'cost'  # Founder
    ]

    if ai_answer in advanced_answers:
        score += 50  # AI-Strategic or AI-Native
    elif ai_answer in tactical_answers:
        score += 30  # AI-Capable
    else:
        score += 10  # AI-Curious

    return min(score, 100)


def _calculate_ownership(role: str, responses: Dict[str, Any]) -> int:
    """Calculate ownership/leadership score"""
    score = 50  # Base score

    # Role-specific ownership indicators
    ownership_keys = {
        'product-manager': 'pm-ownership',
        'finance': 'finance-leadership-weight',
        'sales': 'sales-ownership',
        'marketing': 'marketing-leadership-metric',
        'operations': 'operations-ownership',
        'founder': 'founder-resource-constraint'
    }

    ownership_key = ownership_keys.get(role)
    if not ownership_key:
        return score

    ownership_answer = responses.get(ownership_key)

    # High ownership answers
    high_ownership = [
        'product-line', 'business-unit',  # PM
        'strategic-allocation', 'board-reporting',  # Finance
        'region-business', 'team-number',  # Sales
        'revenue-contribution', 'ltv',  # Marketing
        'margin', 'sla-adherence',  # Operations
        'learning', 'profitability'  # Founder
    ]

    if ownership_answer in high_ownership:
        score += 40
    else:
        score += 20

    return min(score, 100)


def _determine_ai_maturity(ai_fluency: int, overall_score: int) -> str:
    """Determine AI maturity level"""
    if ai_fluency >= 80 and overall_score >= 75:
        return AIMaturityLevel.AI_NATIVE
    elif ai_fluency >= 65:
        return AIMaturityLevel.AI_STRATEGIC
    elif ai_fluency >= 45:
        return AIMaturityLevel.AI_CAPABLE
    elif ai_fluency >= 30:
        return AIMaturityLevel.AI_CURIOUS
    else:
        return AIMaturityLevel.AI_UNAWARE


def _calculate_percentile(overall_score: int) -> int:
    """
    Calculate percentile based on score (capped at 40-80% range)
    In production, this would query actual user data
    """
    # Adjusted for 40-80% score range
    if overall_score >= 75:  # Top tier (75-80%)
        return 85
    elif overall_score >= 70:
        return 75
    elif overall_score >= 65:
        return 65
    elif overall_score >= 60:
        return 55
    elif overall_score >= 55:
        return 50
    elif overall_score >= 50:
        return 40
    elif overall_score >= 45:
        return 30
    else:  # 40-44%
        return 20


def _generate_readiness_tags(score: int, maturity: str, role: str, responses: Dict[str, Any]) -> List[str]:
    """
    Generate descriptive tags based on actual quiz responses
    Tags should reflect user's specific strengths, not generic role labels
    """
    tags = []

    # Response-specific tags (max 2-3 based on answer patterns)
    if role == 'product-manager':
        if responses.get('pm-retention-problem') == 'resegment-cohorts':
            tags.append("Data-Driven")
        if responses.get('pm-roadmap-tradeoff') == 'incremental':
            tags.append("Metrics-Focused")
        if responses.get('pm-ai-leverage') in ['prioritization', 'impact-prediction']:
            tags.append("AI-Powered PM")
        if responses.get('pm-failure-reflection') == 'wrong-assumptions':
            tags.append("Self-Aware")
        if responses.get('pm-metrics-conflict') == 'unit-economics':
            tags.append("Business-Minded")

    elif role == 'finance':
        if responses.get('finance-metrics-conflict') == 'scenarios':
            tags.append("Strategic Communicator")
        if responses.get('finance-forecast-miss') in ['scenario-modeling', 'predictive-models']:
            tags.append("Advanced Modeler")
        if responses.get('finance-decision-speed') in ['confidence-intervals', 'ai-anomalies']:
            tags.append("Data Scientist")
        if responses.get('finance-leadership-weight') == 'me':
            tags.append("Accountable Leader")

    elif role == 'sales':
        if responses.get('sales-pipeline-reality') in ['tighten-qualification', 'analyze-winloss']:
            tags.append("Process-Oriented")
        if responses.get('sales-ai-usage') in ['deal-risk', 'pricing-optimization']:
            tags.append("AI-Powered Sales")
        if responses.get('sales-target-miss') in ['icp-mismatch', 'sales-motion']:
            tags.append("Strategic Thinker")
        if responses.get('sales-ownership') in ['region-business', 'team-number']:
            tags.append("Leader")

    elif role == 'marketing':
        if responses.get('marketing-conflicting-signals') in ['ltv-cac-cohort', 'revenue-attribution']:
            tags.append("Unit Economics")
        if responses.get('marketing-ai-application') in ['automated-optimization', 'audience-prediction']:
            tags.append("AI-Native Marketer")
        if responses.get('marketing-defend-metric') in ['revenue-contribution', 'ltv']:
            tags.append("Revenue-Focused")
        if responses.get('marketing-scale-failure') == 'funnel-leakage':
            tags.append("Growth Hacker")

    elif role == 'operations':
        if responses.get('operations-scale-stress') in ['process-design', 'data-visibility']:
            tags.append("Systems Thinker")
        if responses.get('operations-ai-leverage') in ['automation', 'decision-optimization']:
            tags.append("AI-Leveraged Ops")
        if responses.get('operations-purpose') in ['enable-scale', 'competitive-advantage']:
            tags.append("Strategic Partner")

    elif role == 'founder':
        if responses.get('founder-mvp-failure') in ['reframe-problem', 'pivot-icp']:
            tags.append("Product Thinker")
        if responses.get('founder-scale-pain') in ['pricing', 'customer-mix']:
            tags.append("Business Fundamentals")
        if responses.get('founder-ai-advantage') in ['insight', 'differentiation']:
            tags.append("AI-First Founder")

    # Add AI maturity tag if high
    if maturity == AIMaturityLevel.AI_NATIVE:
        tags.append("AI Native")
    elif maturity == AIMaturityLevel.AI_STRATEGIC:
        tags.append("AI Strategic")

    # Add role identifier only if we don't have enough specific tags
    if len(tags) < 2:
        role_identifiers = {
            'product-manager': 'Product Manager',
            'finance': 'Finance Professional',
            'sales': 'Sales Professional',
            'marketing': 'Marketer',
            'operations': 'Operations Professional',
            'founder': 'Founder'
        }
        if role in role_identifiers:
            tags.append(role_identifiers[role])

    return tags[:4]  # Max 4 tags
