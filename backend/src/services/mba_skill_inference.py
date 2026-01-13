"""
MBA Skill Inference Engine
Maps quiz answers to skill levels across core business competencies

NEW APPROACH: Direct answer → score mapping
- Each answer gets a score (1-5) based on quality of thinking
- Skill levels calculated as average of all relevant question scores
- No more "default to 3" nonsense
"""
from typing import Dict, List, Any
from enum import Enum
from src.services.mba_skill_scoring_maps import QUESTION_SKILL_MAP, ANSWER_SCORES


class SkillCategory(str, Enum):
    """Core MBA skill categories"""
    BUSINESS_ACUMEN = "business_acumen"
    DATA_ANALYTICS = "data_analytics"
    AI_LITERACY = "ai_literacy"
    STRATEGIC_THINKING = "strategic_thinking"
    LEADERSHIP = "leadership"
    PROBLEM_SOLVING = "problem_solving"


SKILL_LEVEL_LABELS = {
    1: "Needs Improvement",
    2: "Proficient",
    3: "Strong"
}

# Map internal 1-5 scores to external 1-3 levels
# Nobody is an "Expert" - everyone has room for growth
def _map_score_to_level(score: int) -> int:
    """
    Map internal 1-5 scoring to simplified 1-3 levels:
    - 1-2 → Level 1 (Needs Improvement)
    - 3 → Level 2 (Proficient)
    - 4-5 → Level 3 (Strong)
    """
    if score <= 2:
        return 1
    elif score == 3:
        return 2
    else:  # 4-5
        return 3


# Role-specific skill maps (3 universal + 3 role-specific per role)
ROLE_SKILL_MAPS = {
    'pm': [
        'product_strategy', 'data_driven_pm', 'user_centricity',
        'ai_literacy', 'leadership', 'strategic_thinking'
    ],
    'finance': [
        'financial_modeling', 'business_partnering', 'data_integrity',
        'ai_literacy', 'leadership', 'strategic_thinking'
    ],
    'sales': [
        'revenue_operations', 'deal_execution', 'sales_strategy',
        'ai_literacy', 'leadership', 'strategic_thinking'
    ],
    'marketing': [
        'growth_marketing', 'marketing_analytics', 'campaign_optimization',
        'ai_literacy', 'leadership', 'strategic_thinking'
    ],
    'operations': [
        'operations_excellence', 'supply_chain', 'process_automation',
        'ai_literacy', 'leadership', 'strategic_thinking'
    ],
    'founder': [
        'venture_building', 'business_fundamentals', 'founder_resourcefulness',
        'ai_literacy', 'leadership', 'strategic_thinking'
    ]
}


# Skill metadata for frontend display (21 total skills)
SKILL_METADATA = {
    # Universal Skills (3)
    'ai_literacy': {
        'title': 'AI Literacy',
        'description': 'Your proficiency in understanding and applying AI tools, from tactical automation to strategic decision-making.'
    },
    'leadership': {
        'title': 'Leadership',
        'description': 'Your ability to drive outcomes through teams, influence stakeholders, and take ownership of results.'
    },
    'strategic_thinking': {
        'title': 'Strategic Thinking',
        'description': 'Your capacity to see systems, connect long-term outcomes, and identify root causes beyond surface symptoms.'
    },

    # Product Manager Skills (3)
    'product_strategy': {
        'title': 'Product Strategy',
        'description': 'Your ability to define product vision, prioritize ruthlessly, and connect features to business outcomes.'
    },
    'data_driven_pm': {
        'title': 'Data-Driven PM',
        'description': 'Your skill in using metrics, cohort analysis, and experimentation to validate hypotheses and drive product decisions.'
    },
    'user_centricity': {
        'title': 'User Centricity',
        'description': 'Your commitment to understanding user problems deeply and solving for real pain points, not just feature requests.'
    },

    # Finance Skills (3)
    'financial_modeling': {
        'title': 'Financial Modeling',
        'description': 'Your expertise in building forecasts, scenario models, and financial plans that guide business decisions.'
    },
    'business_partnering': {
        'title': 'Business Partnering',
        'description': 'Your ability to translate financial insights into strategic recommendations that influence leadership decisions.'
    },
    'data_integrity': {
        'title': 'Data Integrity',
        'description': 'Your rigor in ensuring financial data accuracy, investigating anomalies, and building trust in the numbers.'
    },

    # Sales Skills (3)
    'revenue_operations': {
        'title': 'Revenue Operations',
        'description': 'Your skill in optimizing sales processes, forecasting accurately, and connecting sales motions to revenue outcomes.'
    },
    'deal_execution': {
        'title': 'Deal Execution',
        'description': 'Your ability to move deals forward, navigate blockers, and structure agreements that maximize value.'
    },
    'sales_strategy': {
        'title': 'Sales Strategy',
        'description': 'Your understanding of ICP fit, pricing optimization, and aligning sales motions with business strategy.'
    },

    # Marketing Skills (3)
    'growth_marketing': {
        'title': 'Growth Marketing',
        'description': 'Your ability to drive scalable acquisition, optimize conversion funnels, and connect marketing to revenue.'
    },
    'marketing_analytics': {
        'title': 'Marketing Analytics',
        'description': 'Your skill in measuring attribution, understanding cohort economics, and using data to optimize campaigns.'
    },
    'campaign_optimization': {
        'title': 'Campaign Optimization',
        'description': 'Your expertise in testing creatives, channels, and messaging to maximize ROI on marketing spend.'
    },

    # Operations Skills (3)
    'operations_excellence': {
        'title': 'Operations Excellence',
        'description': 'Your ability to build scalable processes, identify bottlenecks, and drive operational efficiency.'
    },
    'supply_chain': {
        'title': 'Supply Chain',
        'description': 'Your understanding of inventory management, logistics optimization, and managing operational constraints.'
    },
    'process_automation': {
        'title': 'Process Automation',
        'description': 'Your skill in identifying automation opportunities and leveraging AI tools to scale operations without headcount.'
    },

    # Founder Skills (3)
    'venture_building': {
        'title': 'Venture Building',
        'description': 'Your ability to identify opportunities, validate product-market fit, and build sustainable business models.'
    },
    'business_fundamentals': {
        'title': 'Business Fundamentals',
        'description': 'Your understanding of unit economics, pricing strategy, and the financial levers that drive profitable growth.'
    },
    'founder_resourcefulness': {
        'title': 'Founder Resourcefulness',
        'description': 'Your ability to move fast with limited resources, prioritize ruthlessly, and find creative solutions to constraints.'
    }
}


def infer_skills_from_responses(role: str, responses: Dict[str, Any]) -> Dict[str, Any]:
    """
    Infer role-specific skill levels based on quiz responses

    NEW APPROACH: Direct answer → score mapping
    - Each question tests one or more skills
    - Each answer gets a score (1-5)
    - Skill level = average of all relevant question scores
    - DEFAULT = 3 ONLY if no relevant questions were answered

    Returns:
        {
            'skills': {
                'product_strategy': {
                    'level': 3,
                    'label': 'Proficient',
                    'title': 'Product Strategy',
                    'description': '...'
                },
                ...
            },
            'strengths': ['skill1', 'skill2'],
            'gaps': ['skill3', 'skill4']
        }
    """
    # Get skill list for this role (fallback to 'pm' if role not found)
    skill_names = ROLE_SKILL_MAPS.get(role, ROLE_SKILL_MAPS['pm'])

    # Build reverse index: skill → [questions that test it]
    skill_to_questions = {skill: [] for skill in skill_names}
    for question_key, tested_skills in QUESTION_SKILL_MAP.items():
        for skill in tested_skills:
            if skill in skill_to_questions:
                skill_to_questions[skill].append(question_key)

    # Calculate skill levels
    skills = {}
    for skill_name in skill_names:
        # Find all questions that test this skill
        relevant_questions = skill_to_questions[skill_name]

        # Collect scores from answered questions
        scores = []
        for question_key in relevant_questions:
            user_answer = responses.get(question_key)
            if user_answer and question_key in ANSWER_SCORES:
                score = ANSWER_SCORES[question_key].get(user_answer)
                if score:
                    scores.append(score)

        # Calculate skill level
        if scores:
            # Average of all relevant question scores
            avg_score = sum(scores) / len(scores)
            internal_score = round(avg_score)  # Round to nearest integer (1-5)
            internal_score = max(1, min(5, internal_score))  # Clamp to 1-5

            # Map to simplified 3-level system
            level = _map_score_to_level(internal_score)
        else:
            # Default to 2 (Proficient) ONLY if no relevant questions answered
            level = 2

        # Attach metadata for frontend
        metadata = SKILL_METADATA.get(skill_name, {})
        skills[skill_name] = {
            'level': level,
            'label': SKILL_LEVEL_LABELS[level],
            'title': metadata.get('title', skill_name.replace('_', ' ').title()),
            'description': metadata.get('description', '')
        }

    # Identify strengths (level >= 3) and gaps (level <= 1)
    strengths = [name for name, data in skills.items() if data['level'] >= 3]
    gaps = [name for name, data in skills.items() if data['level'] <= 1]

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


# ============================================================================
# ROLE-SPECIFIC SKILL INFERENCE FUNCTIONS (18 total: 3 per role × 6 roles)
# ============================================================================

# -------------------- PRODUCT MANAGER SKILLS (3) --------------------

def _infer_product_strategy(role: str, responses: Dict) -> Dict:
    """Infer product strategy skill from PM quiz questions"""
    level = 3  # Default

    # High signals: strategic thinking about features and roadmap
    if responses.get('pm-success-metric') in ['revenue-impact', 'activation']:
        level = min(level + 1, 5)
    if responses.get('pm-roadmap-bloat') in ['ruthless-prioritization', 'kill-projects']:
        level = min(level + 1, 5)
    if responses.get('pm-feature-failure') in ['systemic-failure', 'misaligned-incentives']:
        level = min(level + 1, 5)

    # Low signals: tactical/execution focus
    if responses.get('pm-success-metric') == 'feature-adoption':
        level = max(level - 1, 1)
    if responses.get('pm-roadmap-bloat') == 'push-all':
        level = max(level - 1, 1)

    return {'level': level, 'label': SKILL_LEVEL_LABELS[level]}


def _infer_data_driven_pm(role: str, responses: Dict) -> Dict:
    """Infer data-driven PM skill from PM quiz questions"""
    level = 3  # Default

    # High signals: cohort analysis, metrics thinking
    if responses.get('pm-data-conflict') in ['revalidate-hypothesis', 'run-cohort-analysis']:
        level = min(level + 1, 5)
    if responses.get('pm-success-metric') in ['revenue-impact', 'activation']:
        level = min(level + 1, 5)

    # Low signals: ignoring data
    if responses.get('pm-data-conflict') == 'ship-faster':
        level = max(level - 1, 1)

    return {'level': level, 'label': SKILL_LEVEL_LABELS[level]}


def _infer_user_centricity(role: str, responses: Dict) -> Dict:
    """Infer user centricity skill from PM quiz questions"""
    level = 3  # Default

    # High signals: customer research, problem understanding
    if responses.get('pm-data-conflict') in ['revalidate-hypothesis', 'customer-interviews']:
        level = min(level + 1, 5)
    if responses.get('pm-feature-failure') in ['misaligned-value-prop', 'poor-onboarding']:
        level = min(level + 1, 5)

    # Low signals: pushing features without validation
    if responses.get('pm-roadmap-bloat') == 'push-all':
        level = max(level - 1, 1)

    return {'level': level, 'label': SKILL_LEVEL_LABELS[level]}


# -------------------- FINANCE SKILLS (3) --------------------

def _infer_financial_modeling(role: str, responses: Dict) -> Dict:
    """Infer financial modeling skill from Finance quiz questions"""
    level = 3  # Default

    # High signals: scenario modeling, sensitivity analysis
    if responses.get('finance-forecast-miss') in ['scenario-modeling', 'predictive-models']:
        level = min(level + 1, 5)
    if responses.get('finance-decision-speed') in ['build-ranges', 'directional-confidence']:
        level = min(level + 1, 5)

    # Low signals: simple/conservative approaches
    if responses.get('finance-forecast-miss') == 'conservative-buffers':
        level = max(level - 1, 1)

    return {'level': level, 'label': SKILL_LEVEL_LABELS[level]}


def _infer_business_partnering(role: str, responses: Dict) -> Dict:
    """Infer business partnering skill from Finance quiz questions"""
    level = 3  # Default

    # High signals: strategic influence, scenario presentation
    if responses.get('finance-metrics-conflict') in ['scenarios', 'align-narrative']:
        level = min(level + 1, 5)
    if responses.get('finance-leadership-weight') in ['strategic-allocation', 'board-reporting']:
        level = min(level + 1, 5)

    # Low signals: passive/compliance orientation
    if responses.get('finance-metrics-conflict') == 'recheck-quietly':
        level = max(level - 1, 1)

    return {'level': level, 'label': SKILL_LEVEL_LABELS[level]}


def _infer_data_integrity(role: str, responses: Dict) -> Dict:
    """Infer data integrity skill from Finance quiz questions"""
    level = 3  # Default

    # High signals: investigating anomalies, AI-based validation
    if responses.get('finance-metrics-conflict') in ['investigate-methodology', 'segment-analysis']:
        level = min(level + 1, 5)
    if responses.get('finance-decision-speed') in ['confidence-intervals', 'ai-anomalies']:
        level = min(level + 1, 5)

    # Low signals: accepting data without validation
    if responses.get('finance-decision-speed') == 'historical-averages':
        level = max(level - 1, 1)

    return {'level': level, 'label': SKILL_LEVEL_LABELS[level]}


# -------------------- SALES SKILLS (3) --------------------

def _infer_revenue_operations(role: str, responses: Dict) -> Dict:
    """Infer revenue operations skill from Sales quiz questions"""
    level = 3  # Default

    # High signals: forecasting, process optimization
    if responses.get('sales-forecasting') in ['predictive-models', 'historical-patterns']:
        level = min(level + 1, 5)
    if responses.get('sales-pipeline-reality') in ['tighten-qualification', 'analyze-winloss']:
        level = min(level + 1, 5)

    # Low signals: judgment-based approaches
    if responses.get('sales-forecasting') == 'rep-judgment':
        level = max(level - 1, 1)

    return {'level': level, 'label': SKILL_LEVEL_LABELS[level]}


def _infer_deal_execution(role: str, responses: Dict) -> Dict:
    """Infer deal execution skill from Sales quiz questions"""
    level = 3  # Default

    # High signals: analyzing blockers, changing structure
    if responses.get('sales-deal-stuck') in ['analyze-blockers', 'change-structure']:
        level = min(level + 1, 5)
    if responses.get('sales-ai-usage') in ['deal-risk', 'pricing-optimization']:
        level = min(level + 1, 5)

    # Low signals: increasing activity without strategy
    if responses.get('sales-deal-stuck') == 'increase-followups':
        level = max(level - 1, 1)

    return {'level': level, 'label': SKILL_LEVEL_LABELS[level]}


def _infer_sales_strategy(role: str, responses: Dict) -> Dict:
    """Infer sales strategy skill from Sales quiz questions"""
    level = 3  # Default

    # High signals: ICP thinking, sales motion design
    if responses.get('sales-target-miss') in ['icp-mismatch', 'sales-motion']:
        level = min(level + 1, 5)
    if responses.get('sales-ownership') in ['region-business', 'team-number']:
        level = min(level + 1, 5)

    # Low signals: blaming lead quality
    if responses.get('sales-target-miss') == 'lead-quality':
        level = max(level - 1, 1)

    return {'level': level, 'label': SKILL_LEVEL_LABELS[level]}


# -------------------- MARKETING SKILLS (3) --------------------

def _infer_growth_marketing(role: str, responses: Dict) -> Dict:
    """Infer growth marketing skill from Marketing quiz questions"""
    level = 3  # Default

    # High signals: LTV/CAC thinking, funnel optimization
    if responses.get('marketing-conflicting-signals') in ['ltv-cac-cohort', 'revenue-attribution']:
        level = min(level + 1, 5)
    if responses.get('marketing-scale-failure') in ['funnel-leakage', 'ops-constraints']:
        level = min(level + 1, 5)

    # Low signals: vanity metrics
    if responses.get('marketing-conflicting-signals') == 'ctr':
        level = max(level - 1, 1)

    return {'level': level, 'label': SKILL_LEVEL_LABELS[level]}


def _infer_marketing_analytics(role: str, responses: Dict) -> Dict:
    """Infer marketing analytics skill from Marketing quiz questions"""
    level = 3  # Default

    # High signals: attribution modeling, AI pattern inference
    if responses.get('marketing-attribution-reality') in ['directional-insights', 'ai-infer-patterns']:
        level = min(level + 1, 5)
    if responses.get('marketing-conflicting-signals') in ['ltv-cac-cohort', 'revenue-attribution']:
        level = min(level + 1, 5)

    # Low signals: accepting imperfect data without building insights
    if responses.get('marketing-attribution-reality') == 'accept-imperfect':
        level = max(level - 1, 1)

    return {'level': level, 'label': SKILL_LEVEL_LABELS[level]}


def _infer_campaign_optimization(role: str, responses: Dict) -> Dict:
    """Infer campaign optimization skill from Marketing quiz questions"""
    level = 3  # Default

    # High signals: ROI thinking, budget optimization
    if responses.get('marketing-budget-shock') in ['low-ltv-segments']:
        level = min(level + 1, 5)
    if responses.get('marketing-ai-application') in ['automated-optimization', 'audience-prediction']:
        level = min(level + 1, 5)

    # Low signals: cutting experiments
    if responses.get('marketing-budget-shock') == 'experiments':
        level = max(level - 1, 1)

    return {'level': level, 'label': SKILL_LEVEL_LABELS[level]}


# -------------------- OPERATIONS SKILLS (3) --------------------

def _infer_operations_excellence(role: str, responses: Dict) -> Dict:
    """Infer operations excellence skill from Operations quiz questions"""
    level = 3  # Default

    # High signals: process design, bottleneck identification
    if responses.get('operations-scale-stress') in ['process-design', 'data-visibility']:
        level = min(level + 1, 5)
    if responses.get('operations-cost-sla') in ['process-bottlenecks', 'automation-gaps']:
        level = min(level + 1, 5)

    # Low signals: throwing headcount at problems
    if responses.get('operations-cost-sla') == 'headcount':
        level = max(level - 1, 1)

    return {'level': level, 'label': SKILL_LEVEL_LABELS[level]}


def _infer_supply_chain(role: str, responses: Dict) -> Dict:
    """Infer supply chain skill from Operations quiz questions"""
    level = 3  # Default

    # High signals: demand variability, vendor management
    if responses.get('operations-scale-stress') in ['vendor-reliability']:
        level = min(level + 1, 5)
    if responses.get('operations-cost-sla') == 'demand-variability':
        level = min(level + 1, 5)
    if responses.get('operations-data-constraint') in ['use-proxies', 'early-warning']:
        level = min(level + 1, 5)

    return {'level': level, 'label': SKILL_LEVEL_LABELS[level]}


def _infer_process_automation(role: str, responses: Dict) -> Dict:
    """Infer process automation skill from Operations quiz questions"""
    level = 3  # Default

    # High signals: AI leverage, automation gaps
    if responses.get('operations-ai-leverage') in ['automation', 'decision-optimization']:
        level = min(level + 1, 5)
    if responses.get('operations-cost-sla') == 'automation-gaps':
        level = min(level + 1, 5)

    # Low signals: manual reporting
    if responses.get('operations-ai-leverage') == 'reporting':
        level = max(level - 1, 1)

    return {'level': level, 'label': SKILL_LEVEL_LABELS[level]}


# -------------------- FOUNDER SKILLS (3) --------------------

def _infer_venture_building(role: str, responses: Dict) -> Dict:
    """Infer venture building skill from Founder quiz questions"""
    level = 3  # Default

    # High signals: problem reframing, ICP pivoting
    if responses.get('founder-mvp-failure') in ['reframe-problem', 'pivot-icp']:
        level = min(level + 1, 5)
    if responses.get('founder-failure-pattern') in ['poor-problem', 'weak-data']:
        level = min(level + 1, 5)

    # Low signals: adding features without validation
    if responses.get('founder-mvp-failure') in ['add-features', 'increase-marketing']:
        level = max(level - 1, 1)

    return {'level': level, 'label': SKILL_LEVEL_LABELS[level]}


def _infer_business_fundamentals(role: str, responses: Dict) -> Dict:
    """Infer business fundamentals skill from Founder quiz questions"""
    level = 3  # Default

    # High signals: pricing, customer mix, unit economics
    if responses.get('founder-scale-pain') in ['pricing', 'customer-mix']:
        level = min(level + 1, 5)
    if responses.get('founder-resource-constraint') in ['profitability', 'learning']:
        level = min(level + 1, 5)

    # Low signals: not recognizing data blindness
    if responses.get('founder-scale-pain') == 'ops-inefficiency':
        level = max(level - 1, 1)

    return {'level': level, 'label': SKILL_LEVEL_LABELS[level]}


def _infer_founder_resourcefulness(role: str, responses: Dict) -> Dict:
    """Infer founder resourcefulness skill from Founder quiz questions"""
    level = 3  # Default

    # High signals: AI leverage for speed/insight/differentiation
    if responses.get('founder-ai-dependency') in ['decision-making']:
        level = min(level + 1, 5)
    if responses.get('founder-ai-advantage') in ['insight', 'differentiation']:
        level = min(level + 1, 5)
    if responses.get('founder-resource-constraint') == 'learning':
        level = min(level + 1, 5)

    # Low signals: basic AI usage
    if responses.get('founder-ai-advantage') in ['speed', 'cost']:
        level = max(level - 1, 1)

    return {'level': level, 'label': SKILL_LEVEL_LABELS[level]}


# ============================================================================
# UNIVERSAL SKILL INFERENCE DISPATCHER
# ============================================================================

def _infer_skill(skill_name: str, role: str, responses: Dict) -> Dict:
    """Dispatch to appropriate skill inference function"""

    # Universal skills (all roles)
    if skill_name == 'ai_literacy':
        return _infer_ai_literacy(role, responses)
    elif skill_name == 'leadership':
        return _infer_leadership(role, responses)
    elif skill_name == 'strategic_thinking':
        return _infer_strategic_thinking(role, responses)

    # PM skills
    elif skill_name == 'product_strategy':
        return _infer_product_strategy(role, responses)
    elif skill_name == 'data_driven_pm':
        return _infer_data_driven_pm(role, responses)
    elif skill_name == 'user_centricity':
        return _infer_user_centricity(role, responses)

    # Finance skills
    elif skill_name == 'financial_modeling':
        return _infer_financial_modeling(role, responses)
    elif skill_name == 'business_partnering':
        return _infer_business_partnering(role, responses)
    elif skill_name == 'data_integrity':
        return _infer_data_integrity(role, responses)

    # Sales skills
    elif skill_name == 'revenue_operations':
        return _infer_revenue_operations(role, responses)
    elif skill_name == 'deal_execution':
        return _infer_deal_execution(role, responses)
    elif skill_name == 'sales_strategy':
        return _infer_sales_strategy(role, responses)

    # Marketing skills
    elif skill_name == 'growth_marketing':
        return _infer_growth_marketing(role, responses)
    elif skill_name == 'marketing_analytics':
        return _infer_marketing_analytics(role, responses)
    elif skill_name == 'campaign_optimization':
        return _infer_campaign_optimization(role, responses)

    # Operations skills
    elif skill_name == 'operations_excellence':
        return _infer_operations_excellence(role, responses)
    elif skill_name == 'supply_chain':
        return _infer_supply_chain(role, responses)
    elif skill_name == 'process_automation':
        return _infer_process_automation(role, responses)

    # Founder skills
    elif skill_name == 'venture_building':
        return _infer_venture_building(role, responses)
    elif skill_name == 'business_fundamentals':
        return _infer_business_fundamentals(role, responses)
    elif skill_name == 'founder_resourcefulness':
        return _infer_founder_resourcefulness(role, responses)

    # Fallback to proficient
    else:
        return {'level': 3, 'label': 'Proficient'}


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
