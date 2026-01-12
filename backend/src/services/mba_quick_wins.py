"""
MBA Quick Wins Generator
Generates personalized, actionable next steps based on role and skill gaps
"""
from typing import List, Dict, Any


def generate_quick_wins(role: str, skill_gaps: List[str], responses: Dict[str, Any]) -> List[Dict[str, str]]:
    """
    Generate 3-5 quick wins based on role and identified skill gaps

    Returns:
        [
            {
                'title': 'Quick win title',
                'description': 'What to do',
                'impact': 'Why it matters',
                'timeframe': '1-2 weeks'
            }
        ]
    """
    quick_wins = []

    # Role-specific quick wins
    role_wins = _get_role_specific_wins(role, responses)
    quick_wins.extend(role_wins[:2])  # Top 2 role-specific

    # Skill gap-based wins
    gap_wins = _get_skill_gap_wins(skill_gaps)
    quick_wins.extend(gap_wins[:2])  # Top 2 gap-based

    # Universal AI win (everyone needs this)
    quick_wins.append({
        'title': 'Master AI Prompting',
        'description': 'Spend 30 minutes daily using ChatGPT/Claude for your actual work tasks',
        'impact': '10x productivity boost in analysis, writing, and research',
        'timeframe': 'This week'
    })

    return quick_wins[:5]  # Max 5 quick wins


def _get_role_specific_wins(role: str, responses: Dict[str, Any]) -> List[Dict[str, str]]:
    """Generate role-specific quick wins"""
    role_win_generators = {
        'product-manager': _pm_quick_wins,
        'finance': _finance_quick_wins,
        'sales': _sales_quick_wins,
        'marketing': _marketing_quick_wins,
        'operations': _operations_quick_wins,
        'founder': _founder_quick_wins
    }

    generator = role_win_generators.get(role)
    if generator:
        return generator(responses)
    return []


def _pm_quick_wins(responses: Dict[str, Any]) -> List[Dict[str, str]]:
    """PM-specific quick wins"""
    wins = []

    # If they're not tracking revenue metrics
    if responses.get('pm-success-metric') != 'revenue-impact':
        wins.append({
            'title': 'Connect Features to Revenue',
            'description': 'For your next feature, calculate expected revenue impact upfront',
            'impact': 'Speak the language of business, not just features',
            'timeframe': 'Next sprint'
        })

    # If they're struggling with prioritization
    if responses.get('pm-roadmap-bloat') in ['add-resources', 'extend-timelines']:
        wins.append({
            'title': 'Learn RICE Prioritization',
            'description': 'Score every roadmap item on Reach, Impact, Confidence, Effort',
            'impact': 'Make defensible prioritization decisions',
            'timeframe': '1 week'
        })

    # AI usage gap
    if responses.get('pm-ai-usage') not in ['predictive-insights', 'automated-decisions']:
        wins.append({
            'title': 'Use AI for User Research',
            'description': 'Use ChatGPT to analyze customer interview transcripts and find patterns',
            'impact': 'Save 5+ hours per week on manual analysis',
            'timeframe': 'This week'
        })

    return wins


def _finance_quick_wins(responses: Dict[str, Any]) -> List[Dict[str, str]]:
    """Finance-specific quick wins"""
    wins = []

    if responses.get('finance-metrics-conflict') == 'escalate-meeting':
        wins.append({
            'title': 'Build Metric Validation Framework',
            'description': 'Create a checklist for validating conflicting data before meetings',
            'impact': 'Reduce meeting time, increase credibility',
            'timeframe': '2 days'
        })

    if responses.get('finance-ai-usage') in ['reporting', 'basic-forecasting']:
        wins.append({
            'title': 'Automate Financial Reporting',
            'description': 'Use ChatGPT to write Python scripts for recurring reports',
            'impact': 'Save 10+ hours per month on manual reporting',
            'timeframe': '1 week'
        })

    wins.append({
        'title': 'Learn Scenario Modeling',
        'description': 'Build a 3-scenario model (best/base/worst) for next quarter',
        'impact': 'Better strategic planning and risk management',
        'timeframe': '2 weeks'
    })

    return wins


def _sales_quick_wins(responses: Dict[str, Any]) -> List[Dict[str, str]]:
    """Sales-specific quick wins"""
    wins = []

    if responses.get('sales-forecasting') == 'rep-judgment':
        wins.append({
            'title': 'Build a Data-Driven Forecast Model',
            'description': 'Track historical close rates by stage and use them to forecast',
            'impact': 'Increase forecast accuracy by 30%+',
            'timeframe': '1 week'
        })

    if responses.get('sales-ai-usage') in ['email-drafts', 'call-summaries']:
        wins.append({
            'title': 'Use AI for Deal Risk Detection',
            'description': 'Feed deal history to ChatGPT to identify red flags in current deals',
            'impact': 'Prevent deal slippage, improve close rates',
            'timeframe': 'This week'
        })

    wins.append({
        'title': 'Create Win/Loss Analysis System',
        'description': 'Interview last 10 wins and losses, find patterns',
        'impact': 'Understand what actually drives deals',
        'timeframe': '2 weeks'
    })

    return wins


def _marketing_quick_wins(responses: Dict[str, Any]) -> List[Dict[str, str]]:
    """Marketing-specific quick wins"""
    wins = []

    if responses.get('marketing-conflicting-signals') in ['ctr', 'cac']:
        wins.append({
            'title': 'Build LTV/CAC Dashboard',
            'description': 'Track Customer Lifetime Value and Customer Acquisition Cost by cohort',
            'impact': 'Make better budget allocation decisions',
            'timeframe': '1 week'
        })

    if responses.get('marketing-ai-application') == 'content-generation':
        wins.append({
            'title': 'Use AI for Audience Segmentation',
            'description': 'Use ChatGPT to analyze customer data and find hidden segments',
            'impact': 'Improve targeting and conversion rates',
            'timeframe': '3 days'
        })

    wins.append({
        'title': 'Implement Multi-Touch Attribution',
        'description': 'Set up tracking to understand full customer journey',
        'impact': 'Know what marketing actually works',
        'timeframe': '2 weeks'
    })

    return wins


def _operations_quick_wins(responses: Dict[str, Any]) -> List[Dict[str, str]]:
    """Operations-specific quick wins"""
    wins = []

    if responses.get('operations-scale-stress') == 'hiring-capacity':
        wins.append({
            'title': 'Identify Process Bottlenecks First',
            'description': 'Map your top 3 processes and find bottlenecks before hiring',
            'impact': 'Avoid hiring for broken processes',
            'timeframe': '1 week'
        })

    if responses.get('operations-ai-leverage') in ['reporting', 'forecasting']:
        wins.append({
            'title': 'Automate Operational Decisions',
            'description': 'Use AI to automate recurring operational decisions (routing, scheduling, etc.)',
            'impact': 'Free up 20% of your time for strategic work',
            'timeframe': '2 weeks'
        })

    wins.append({
        'title': 'Build SLA Dashboards',
        'description': 'Create real-time dashboards for key operational metrics',
        'impact': 'Catch issues before they become problems',
        'timeframe': '1 week'
    })

    return wins


def _founder_quick_wins(responses: Dict[str, Any]) -> List[Dict[str, str]]:
    """Founder-specific quick wins"""
    wins = []

    if responses.get('founder-mvp-failure') in ['add-features', 'increase-marketing']:
        wins.append({
            'title': 'Talk to 20 Users This Week',
            'description': 'Ask why they signed up and why they didn\'t return',
            'impact': 'Find the real problem before building more',
            'timeframe': 'This week'
        })

    if responses.get('founder-scale-pain') == 'data-blindness':
        wins.append({
            'title': 'Set Up Core Metrics Dashboard',
            'description': 'Track Revenue, CAC, LTV, Churn, NPS in one place',
            'impact': 'Make data-driven decisions instead of guessing',
            'timeframe': '3 days'
        })

    wins.append({
        'title': 'Use AI as Your Co-Founder',
        'description': 'Use Claude/ChatGPT for strategy, content, code - everything',
        'impact': 'Move 3x faster with 1/3 the team',
        'timeframe': 'Start today'
    })

    return wins


def _get_skill_gap_wins(skill_gaps: List[str]) -> List[Dict[str, str]]:
    """Generate quick wins for specific skill gaps"""
    gap_wins_map = {
        'business_acumen': {
            'title': 'Learn Unit Economics',
            'description': 'Calculate CAC, LTV, and payback period for your business/product',
            'impact': 'Understand what actually drives profitability',
            'timeframe': '1 week'
        },
        'data_analytics': {
            'title': 'Master Excel/Google Sheets',
            'description': 'Learn pivot tables, VLOOKUP, and basic formulas',
            'impact': 'Analyze data 10x faster',
            'timeframe': '2 weeks'
        },
        'ai_literacy': {
            'title': 'Daily AI Practice',
            'description': 'Use ChatGPT/Claude for every task: writing, analysis, coding',
            'impact': 'Become 5x more productive',
            'timeframe': 'This week'
        },
        'strategic_thinking': {
            'title': 'Study Business Frameworks',
            'description': 'Learn Porter\'s 5 Forces, SWOT, Business Model Canvas',
            'impact': 'Think like a strategist, not just a doer',
            'timeframe': '2 weeks'
        },
        'leadership': {
            'title': 'Take Ownership of Outcomes',
            'description': 'For your next project, own the business outcome, not just delivery',
            'impact': 'Build executive presence',
            'timeframe': 'Next project'
        },
        'problem_solving': {
            'title': 'Practice Case Studies',
            'description': 'Do 3 business case studies using structured frameworks',
            'impact': 'Develop systematic problem-solving approach',
            'timeframe': '2 weeks'
        }
    }

    return [gap_wins_map[gap] for gap in skill_gaps if gap in gap_wins_map]
