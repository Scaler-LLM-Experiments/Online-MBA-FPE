"""
Mock OpenAI Content Generator for MBA Evaluation
Generates placeholder personalized content for Phase 1 implementation
"""
from typing import Dict, List, Any
from src.models.mba_models import (
    OpenAIContent,
    OpenAIQuickWin,
    OpenAITransformationStory,
    OpenAIToolDescription
)
from src.config.logging_config import get_logger

logger = get_logger(__name__)


def generate_mock_openai_content(
    role: str,
    quiz_responses: Dict,
    skill_gaps: List[str],
    readiness_score: int
) -> OpenAIContent:
    """
    Generate simple placeholder OpenAI content for Phase 1

    Phase 2 will replace this with real OpenAI API calls

    Args:
        role: User's role (pm, finance, sales, marketing, operations, founder)
        quiz_responses: Full quiz response dict
        skill_gaps: List of skill gaps (level <= 2)
        readiness_score: Overall readiness score (0-100)

    Returns:
        OpenAIContent with placeholder quick wins, stories, and tool descriptions
    """
    logger.info(f"Generating mock OpenAI content for role={role}, score={readiness_score}")

    # Generate placeholder quick wins
    quick_wins = _generate_mock_quick_wins(role, skill_gaps)

    # Generate placeholder transformation stories
    transformation_stories = _generate_mock_stories(role)

    # Generate placeholder tool descriptions
    tool_descriptions = _generate_mock_tools(role)

    return OpenAIContent(
        quick_wins=quick_wins,
        transformation_stories=transformation_stories,
        tool_descriptions=tool_descriptions,
        generation_metadata={
            'model': 'mock-v1',
            'generation_time_ms': 0,
            'cache_status': 'mock',
            'note': 'This is placeholder content. Phase 2 will use real OpenAI API.'
        }
    )


def _generate_mock_quick_wins(role: str, skill_gaps: List[str]) -> List[OpenAIQuickWin]:
    """Generate 5 placeholder quick wins"""

    # Role-specific quick win templates
    role_templates = {
        'pm': [
            ("Define Your North Star Metric", "Identify and document the single metric that best represents product success"),
            ("Run Weekly Cohort Reviews", "Analyze user retention by cohort to spot patterns early"),
            ("Build an AI Research Assistant", "Use ChatGPT to synthesize user feedback faster"),
            ("Create a Prioritization Framework", "Implement RICE or ICE scoring for all roadmap items"),
            ("Set Up Automated Product Analytics", "Connect your product to analytics that track key flows")
        ],
        'finance': [
            ("Build 3 Scenario Models", "Create best/base/worst case scenarios for next quarter"),
            ("Automate Your Monthly Close", "Use AI to flag anomalies in financial data"),
            ("Create Executive Dashboards", "Build real-time dashboards leadership actually uses"),
            ("Master Sensitivity Analysis", "Learn which variables most impact your forecasts"),
            ("Implement Rolling Forecasts", "Move from annual to continuous planning cycles")
        ],
        'sales': [
            ("Analyze Win/Loss Patterns", "Review last 50 deals to find predictive signals"),
            ("Build Deal Risk Scoring", "Create a simple model to predict deal closure"),
            ("Optimize Your ICP Definition", "Tighten qualification criteria based on close rates"),
            ("Automate Pipeline Reviews", "Use AI to surface at-risk deals proactively"),
            ("Create Pricing Experiments", "Test discount strategies with A/B cohorts")
        ],
        'marketing': [
            ("Build LTV/CAC by Channel", "Understand unit economics at the channel level"),
            ("Create Attribution Models", "Build directional attribution that drives decisions"),
            ("Automate Creative Testing", "Use AI to test 10x more ad variations"),
            ("Optimize Conversion Funnels", "Find and fix the biggest leakage points"),
            ("Implement Cohort Tracking", "Track retention by acquisition channel and time")
        ],
        'operations': [
            ("Map Process Bottlenecks", "Document where operations slow down under load"),
            ("Build Early Warning Indicators", "Create leading metrics for operational issues"),
            ("Automate Reporting Workflows", "Use AI to generate weekly ops reports automatically"),
            ("Create Scenario Planning", "Model how operations scale with 2x, 5x, 10x demand"),
            ("Implement SLA Tracking", "Build real-time dashboards for key SLAs")
        ],
        'founder': [
            ("Validate Problem-Market Fit", "Run 20 customer interviews this month"),
            ("Build Unit Economics Model", "Calculate true customer acquisition and retention costs"),
            ("Create AI Co-Founder Workflows", "Use AI for research, analysis, and decisions"),
            ("Implement Weekly Metrics Review", "Track 5-7 key metrics every Monday"),
            ("Test Pricing Hypotheses", "Run pricing experiments with new customers")
        ]
    }

    templates = role_templates.get(role, role_templates['pm'])

    quick_wins = []
    for i, (title, desc) in enumerate(templates[:5], 1):
        quick_wins.append(OpenAIQuickWin(
            title=f"{title}",
            description=desc,
            impact="This is placeholder content. Phase 2 will provide AI-personalized impact analysis.",
            timeframe="1-2 weeks",
            reasoning=f"This action addresses your gaps in {', '.join(skill_gaps[:2]) if skill_gaps else 'key areas'}. (Placeholder reasoning - Phase 2 will be fully personalized)"
        ))

    return quick_wins


def _generate_mock_stories(role: str) -> List[OpenAITransformationStory]:
    """Generate 3 placeholder transformation stories"""

    # Role-specific story templates
    role_stories = {
        'pm': [
            ("Notion", "SaaS", "AI features", ["strategic_thinking", "product_strategy"]),
            ("Spotify", "Music Tech", "Recommendation AI", ["data_driven_pm", "ai_literacy"]),
            ("Figma", "Design Tools", "AI design assistant", ["product_strategy", "user_centricity"])
        ],
        'finance': [
            ("Stripe", "Fintech", "Automated financial reporting", ["financial_modeling", "data_integrity"]),
            ("Ramp", "Expense Management", "AI-powered spend optimization", ["business_partnering", "ai_literacy"]),
            ("Brex", "Corporate Cards", "Real-time financial insights", ["financial_modeling", "business_partnering"])
        ],
        'sales': [
            ("Gong", "Sales Intelligence", "AI deal risk prediction", ["deal_execution", "ai_literacy"]),
            ("Outreach", "Sales Engagement", "Automated sales workflows", ["revenue_operations", "sales_strategy"]),
            ("Clari", "Revenue Operations", "Forecasting automation", ["revenue_operations", "deal_execution"])
        ],
        'marketing': [
            ("HubSpot", "Marketing Automation", "AI content generation", ["campaign_optimization", "ai_literacy"]),
            ("Jasper", "AI Content", "Scalable content creation", ["campaign_optimization", "growth_marketing"]),
            ("Metadata.io", "Performance Marketing", "Automated campaign optimization", ["marketing_analytics", "campaign_optimization"])
        ],
        'operations': [
            ("Amazon", "E-commerce", "Operations automation at scale", ["operations_excellence", "process_automation"]),
            ("Flexport", "Logistics", "AI supply chain optimization", ["supply_chain", "ai_literacy"]),
            ("Toast", "Restaurant Tech", "Operational intelligence", ["operations_excellence", "supply_chain"])
        ],
        'founder': [
            ("Canva", "Design SaaS", "AI design democratization", ["venture_building", "founder_resourcefulness"]),
            ("Superhuman", "Email", "AI-powered email", ["founder_resourcefulness", "ai_literacy"]),
            ("Linear", "Project Management", "AI issue tracking", ["venture_building", "business_fundamentals"])
        ]
    }

    stories_data = role_stories.get(role, role_stories['pm'])

    stories = []
    for company, industry, narrative_snippet, skills in stories_data:
        stories.append(OpenAITransformationStory(
            company=company,
            industry=industry,
            transformation_narrative=f"{company} transformed {industry} by leveraging {narrative_snippet}. (Placeholder story - Phase 2 will provide detailed, personalized transformation narratives based on your profile.)",
            relevance_to_user=f"This story is relevant because you're working on similar challenges in your role. (Placeholder relevance - Phase 2 will explain precisely why this matters for YOU.)",
            skill_connection=skills[:2]
        ))

    return stories


def _generate_mock_tools(role: str) -> List[OpenAIToolDescription]:
    """Generate 6 placeholder tool descriptions"""

    # Role-specific tool recommendations
    role_tools = {
        'pm': [
            ("ChatGPT/Claude", "AI Assistant", "must-have"),
            ("Mixpanel/Amplitude", "Product Analytics", "must-have"),
            ("Notion AI", "Documentation", "recommended"),
            ("Loom AI", "Communication", "recommended"),
            ("Perplexity", "Research", "optional"),
            ("Jasper", "Content", "optional")
        ],
        'finance': [
            ("ChatGPT for Analysis", "AI Assistant", "must-have"),
            ("Causal", "Financial Modeling", "must-have"),
            ("Puzzle", "Accounting", "recommended"),
            ("Fathom", "Meeting Intelligence", "recommended"),
            ("Digits", "AI Bookkeeping", "optional"),
            ("Pigment", "Planning", "optional")
        ],
        'sales': [
            ("Gong", "Sales Intelligence", "must-have"),
            ("ChatGPT for Emails", "AI Assistant", "must-have"),
            ("Outreach", "Sales Engagement", "recommended"),
            ("Clari", "Forecasting", "recommended"),
            ("Clay", "Lead Enrichment", "optional"),
            ("Lavender", "Email Assistant", "optional")
        ],
        'marketing': [
            ("ChatGPT/Claude", "AI Assistant", "must-have"),
            ("Midjourney/DALL-E", "Creative AI", "must-have"),
            ("Jasper", "Content AI", "recommended"),
            ("Metadata.io", "Campaign Automation", "recommended"),
            ("Perplexity", "Research", "optional"),
            ("Copy.ai", "Copywriting", "optional")
        ],
        'operations': [
            ("ChatGPT for Ops", "AI Assistant", "must-have"),
            ("Zapier AI", "Workflow Automation", "must-have"),
            ("Notion AI", "Documentation", "recommended"),
            ("Airtable AI", "Data Management", "recommended"),
            ("Make (Integromat)", "Advanced Automation", "optional"),
            ("Rows", "Spreadsheet AI", "optional")
        ],
        'founder': [
            ("ChatGPT Plus", "AI Co-Founder", "must-have"),
            ("Perplexity Pro", "Research", "must-have"),
            ("Cursor", "AI Code Editor", "recommended"),
            ("Notion AI", "Docs & Planning", "recommended"),
            ("Jasper", "Content Creation", "optional"),
            ("Tome", "AI Presentations", "optional")
        ]
    }

    tools_data = role_tools.get(role, role_tools['pm'])

    tools = []
    for name, category, priority in tools_data:
        tools.append(OpenAIToolDescription(
            name=name,
            category=category,
            priority=priority,
            personalized_use_case=f"Use {name} to [specific use case for your role]. (Placeholder - Phase 2 will provide AI-generated use cases tailored to your exact challenges.)",
            personalized_impact=f"{name} can help you {category.lower()} more effectively. (Placeholder - Phase 2 will quantify expected impact based on your profile.)",
            learning_path=f"Start with [action], then [action]. (Placeholder - Phase 2 will provide a step-by-step learning path personalized to your skill level.)"
        ))

    return tools
