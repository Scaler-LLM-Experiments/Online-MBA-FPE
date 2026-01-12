"""
MBA Skill Inference Engine
Maps quiz answers to skill levels across core business competencies
"""
from typing import Dict, List, Any
from enum import Enum


class SkillCategory(str, Enum):
    """Core MBA skill categories"""
    BUSINESS_ACUMEN = "business_acumen"
    DATA_ANALYTICS = "data_analytics"
    AI_LITERACY = "ai_literacy"
    STRATEGIC_THINKING = "strategic_thinking"
    LEADERSHIP = "leadership"
    PROBLEM_SOLVING = "problem_solving"


SKILL_LEVEL_LABELS = {
    1: "Beginner",
    2: "Developing",
    3: "Proficient",
    4: "Advanced",
    5: "Expert"
}


def infer_skills_from_responses(role: str, responses: Dict[str, Any]) -> Dict[str, Any]:
    """
    Infer skill levels based on quiz responses

    Returns:
        {
            'skills': {
                'business_acumen': {'level': 3, 'label': 'Proficient'},
                'data_analytics': {'level': 4, 'label': 'Advanced'},
                ...
            },
            'strengths': ['skill1', 'skill2'],
            'gaps': ['skill3', 'skill4']
        }
    """
    skills = {}

    # Infer each skill category
    skills[SkillCategory.BUSINESS_ACUMEN] = _infer_business_acumen(role, responses)
    skills[SkillCategory.DATA_ANALYTICS] = _infer_data_analytics(role, responses)
    skills[SkillCategory.AI_LITERACY] = _infer_ai_literacy(role, responses)
    skills[SkillCategory.STRATEGIC_THINKING] = _infer_strategic_thinking(role, responses)
    skills[SkillCategory.LEADERSHIP] = _infer_leadership(role, responses)
    skills[SkillCategory.PROBLEM_SOLVING] = _infer_problem_solving(role, responses)

    # Identify strengths (level >= 4) and gaps (level <= 2)
    strengths = [skill for skill, data in skills.items() if data['level'] >= 4]
    gaps = [skill for skill, data in skills.items() if data['level'] <= 2]

    return {
        'skills': skills,
        'strengths': strengths,
        'gaps': gaps
    }


def _infer_business_acumen(role: str, responses: Dict[str, Any]) -> Dict[str, Any]:
    """
    Business acumen = Understanding of revenue, margins, business models
    Inferred from financial/business questions
    """
    level = 3  # Default to Proficient

    # Revenue/margin thinking indicators
    revenue_signals = {
        'pm-success-metric': ['revenue-impact', 'activation'],
        'finance-metrics-conflict': ['segment-analysis', 'investigate-methodology'],
        'sales-target-miss': ['icp-mismatch', 'sales-motion'],
        'marketing-conflicting-signals': ['ltv-cac-cohort', 'revenue-attribution'],
        'operations-ownership': ['margin', 'cost-per-unit'],
        'founder-scale-pain': ['pricing', 'customer-mix']
    }

    # Check for advanced business thinking
    for question_key, advanced_answers in revenue_signals.items():
        if responses.get(question_key) in advanced_answers:
            level = min(level + 1, 5)
            break

    # Check for basic/tactical thinking
    tactical_answers = {
        'pm-success-metric': 'feature-adoption',
        'sales-forecasting': 'rep-judgment',
        'marketing-leadership-metric': 'leads'
    }

    for question_key, tactical_answer in tactical_answers.items():
        if responses.get(question_key) == tactical_answer:
            level = max(level - 1, 1)
            break

    return {
        'level': level,
        'label': SKILL_LEVEL_LABELS[level]
    }


def _infer_data_analytics(role: str, responses: Dict[str, Any]) -> Dict[str, Any]:
    """
    Data analytics = Using data to drive decisions
    Inferred from metric/analysis questions
    """
    level = 3  # Default

    # Data sophistication indicators
    data_signals = {
        'pm-data-conflict': ['revalidate-hypothesis', 'run-cohort-analysis'],
        'finance-metrics-conflict': ['segment-analysis', 'investigate-methodology'],
        'sales-forecasting': ['predictive-models', 'historical-patterns'],
        'marketing-conflicting-signals': ['ltv-cac-cohort', 'revenue-attribution'],
        'operations-ai-leverage': ['decision-optimization', 'forecasting'],
        'founder-scale-pain': ['data-blindness']  # Recognizing data gaps = awareness
    }

    for question_key, advanced_answers in data_signals.items():
        if responses.get(question_key) in advanced_answers:
            level = min(level + 1, 5)
            break

    # Check for low data maturity
    low_data_answers = {
        'pm-data-conflict': 'ship-faster',
        'sales-forecasting': 'rep-judgment',
        'finance-decision-speed': 'wait-for-perfect-data'
    }

    for question_key, low_answer in low_data_answers.items():
        if responses.get(question_key) == low_answer:
            level = max(level - 1, 1)
            break

    return {
        'level': level,
        'label': SKILL_LEVEL_LABELS[level]
    }


def _infer_ai_literacy(role: str, responses: Dict[str, Any]) -> Dict[str, Any]:
    """
    AI literacy = Understanding and applying AI tools
    Directly mapped from AI usage questions
    """
    level = 2  # Default: Developing (most people are here)

    # Advanced AI usage
    advanced_ai = {
        'pm-ai-usage': ['predictive-insights', 'automated-decisions'],
        'finance-ai-usage': ['scenario-modeling', 'anomaly-detection'],
        'sales-ai-usage': ['deal-risk', 'pricing-optimization'],
        'marketing-ai-application': ['automated-optimization', 'audience-prediction'],
        'operations-ai-leverage': ['decision-optimization', 'automation'],
        'founder-ai-advantage': ['insight', 'differentiation']
    }

    # Tactical AI usage
    tactical_ai = {
        'pm-ai-usage': ['user-research', 'ab-testing'],
        'finance-ai-usage': ['reporting', 'forecasting'],
        'sales-ai-usage': ['call-summaries', 'email-drafts'],
        'marketing-ai-application': ['content-generation', 'creative-testing'],
        'operations-ai-leverage': ['reporting', 'forecasting'],
        'founder-ai-advantage': ['speed', 'cost']
    }

    for question_key, advanced_answers in advanced_ai.items():
        if responses.get(question_key) in advanced_answers:
            level = 5  # Expert
            break

    if level != 5:
        for question_key, tactical_answers in tactical_ai.items():
            if responses.get(question_key) in tactical_answers:
                level = 3  # Proficient
                break

    return {
        'level': level,
        'label': SKILL_LEVEL_LABELS[level]
    }


def _infer_strategic_thinking(role: str, responses: Dict[str, Any]) -> Dict[str, Any]:
    """
    Strategic thinking = Systems view, long-term orientation
    Inferred from "why" questions and systems thinking
    """
    level = 3  # Default

    # Strategic/systems thinking indicators
    strategic_signals = {
        'pm-feature-failure': ['systemic-failure', 'misaligned-incentives'],
        'finance-forecast-miss': ['model-assumptions', 'market-shift'],
        'sales-target-miss': ['sales-motion', 'icp-mismatch'],
        'marketing-scale-failure': ['funnel-leakage', 'ops-constraints'],
        'operations-strategic-role': ['competitive-advantage', 'enable-scale'],
        'founder-mvp-failure': ['reframe-problem', 'pivot-icp']
    }

    for question_key, strategic_answers in strategic_signals.items():
        if responses.get(question_key) in strategic_answers:
            level = min(level + 1, 5)
            break

    # Tactical thinking
    tactical_signals = {
        'pm-feature-failure': 'execution-quality',
        'sales-target-miss': 'lead-quality',
        'marketing-scale-failure': 'saturation',
        'operations-strategic-role': 'execute-plans'
    }

    for question_key, tactical_answer in tactical_signals.items():
        if responses.get(question_key) == tactical_answer:
            level = max(level - 1, 1)
            break

    return {
        'level': level,
        'label': SKILL_LEVEL_LABELS[level]
    }


def _infer_leadership(role: str, responses: Dict[str, Any]) -> Dict[str, Any]:
    """
    Leadership = Ownership, accountability, team influence
    Inferred from ownership questions
    """
    level = 3  # Default

    # High ownership indicators
    leadership_signals = {
        'pm-ownership': ['product-line', 'business-unit'],
        'finance-leadership-weight': ['strategic-allocation', 'board-reporting'],
        'sales-ownership': ['region-business', 'team-number'],
        'marketing-leadership-metric': ['revenue-contribution', 'ltv'],
        'operations-ownership': ['margin', 'sla-adherence'],
        'founder-resource-constraint': ['learning', 'profitability']
    }

    for question_key, high_ownership in leadership_signals.items():
        if responses.get(question_key) in high_ownership:
            level = min(level + 1, 5)
            break

    # Low ownership
    low_ownership = {
        'pm-ownership': 'single-feature',
        'sales-ownership': 'activities',
        'marketing-leadership-metric': 'leads',
        'operations-ownership': 'task-completion'
    }

    for question_key, low_answer in low_ownership.items():
        if responses.get(question_key) == low_answer:
            level = max(level - 1, 1)
            break

    return {
        'level': level,
        'label': SKILL_LEVEL_LABELS[level]
    }


def _infer_problem_solving(role: str, responses: Dict[str, Any]) -> Dict[str, Any]:
    """
    Problem solving = Analytical approach to challenges
    Inferred from scenario questions
    """
    level = 3  # Default

    # Analytical/systematic problem solving
    analytical_signals = {
        'pm-roadmap-bloat': ['ruthless-prioritization', 'kill-projects'],
        'finance-decision-speed': ['build-ranges', 'directional-confidence'],
        'sales-deal-stuck': ['analyze-blockers', 'change-structure'],
        'marketing-attribution-reality': ['build-directional-insights', 'ai-infer-patterns'],
        'operations-cost-sla': ['process-bottlenecks', 'automation-gaps'],
        'founder-mvp-failure': ['reframe-problem', 'pivot-icp']
    }

    for question_key, analytical_answers in analytical_signals.items():
        if responses.get(question_key) in analytical_answers:
            level = min(level + 1, 5)
            break

    return {
        'level': level,
        'label': SKILL_LEVEL_LABELS[level]
    }


def get_skill_recommendations(gaps: List[str]) -> List[Dict[str, str]]:
    """Get learning recommendations for skill gaps"""
    recommendations = {
        SkillCategory.BUSINESS_ACUMEN: {
            'title': 'Business Acumen',
            'description': 'Understanding revenue models, unit economics, and P&L',
            'actions': ['Learn unit economics', 'Study business models', 'Practice P&L analysis']
        },
        SkillCategory.DATA_ANALYTICS: {
            'title': 'Data Analytics',
            'description': 'Using data to drive decisions and measure impact',
            'actions': ['Learn Excel/SQL', 'Study A/B testing', 'Master dashboards']
        },
        SkillCategory.AI_LITERACY: {
            'title': 'AI & Automation',
            'description': 'Leveraging AI tools for productivity and insights',
            'actions': ['Master ChatGPT', 'Learn AI prompting', 'Explore AI tools']
        },
        SkillCategory.STRATEGIC_THINKING: {
            'title': 'Strategic Thinking',
            'description': 'Systems view and long-term planning',
            'actions': ['Study frameworks', 'Practice case studies', 'Learn strategy']
        },
        SkillCategory.LEADERSHIP: {
            'title': 'Leadership & Influence',
            'description': 'Driving results through teams and stakeholders',
            'actions': ['Develop soft skills', 'Practice delegation', 'Learn negotiation']
        },
        SkillCategory.PROBLEM_SOLVING: {
            'title': 'Problem Solving',
            'description': 'Analytical and structured approach to challenges',
            'actions': ['Learn frameworks', 'Practice case interviews', 'Study root cause analysis']
        }
    }

    return [recommendations[gap] for gap in gaps if gap in recommendations]
