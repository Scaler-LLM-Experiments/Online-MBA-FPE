"""
MBA AI Tools Recommendations
Role-specific AI tools with explanations of impact
"""
from typing import List, Dict, Any


def get_ai_tools_for_role(role: str, skill_gaps: List[str]) -> List[Dict[str, Any]]:
    """
    Get AI tool recommendations based on role and skill gaps

    Returns:
        [
            {
                'name': 'ChatGPT',
                'category': 'General AI Assistant',
                'use_case': 'How to use it',
                'impact': 'Why it helps',
                'priority': 'must-have' | 'recommended' | 'nice-to-have'
            }
        ]
    """
    # Universal tools (everyone needs these)
    universal_tools = [
        {
            'name': 'ChatGPT / Claude',
            'category': 'General AI Assistant',
            'use_case': 'Writing, analysis, research, coding, problem-solving',
            'impact': 'Your AI co-worker. Handles 80% of knowledge work tasks.',
            'priority': 'must-have',
            'url': 'https://chat.openai.com'
        },
        {
            'name': 'Perplexity AI',
            'category': 'AI Search Engine',
            'use_case': 'Market research, competitor analysis, trend spotting',
            'impact': 'Get sourced answers instead of endless Googling.',
            'priority': 'must-have',
            'url': 'https://perplexity.ai'
        }
    ]

    # Role-specific tools
    role_tools_map = {
        'pm': _pm_ai_tools,
        'finance': _finance_ai_tools,
        'sales': _sales_ai_tools,
        'marketing': _marketing_ai_tools,
        'operations': _operations_ai_tools,
        'founder': _founder_ai_tools
    }

    role_tools = role_tools_map.get(role, lambda: [])()

    # Gap-based tools
    gap_tools = _get_gap_specific_tools(skill_gaps)

    # Combine and deduplicate
    all_tools = universal_tools + role_tools + gap_tools
    seen = set()
    unique_tools = []
    for tool in all_tools:
        if tool['name'] not in seen:
            seen.add(tool['name'])
            unique_tools.append(tool)

    return unique_tools[:10]  # Max 10 tools


def _pm_ai_tools() -> List[Dict[str, Any]]:
    """AI tools for Product Managers"""
    return [
        {
            'name': 'Notion AI',
            'category': 'Documentation & Planning',
            'use_case': 'Write PRDs, user stories, meeting notes with AI assistance',
            'impact': 'Draft product docs 5x faster with better structure.',
            'priority': 'recommended',
            'url': 'https://notion.so/product/ai'
        },
        {
            'name': 'Dovetail',
            'category': 'User Research',
            'use_case': 'Analyze user interviews, find patterns, generate insights',
            'impact': 'Turn 10 hours of interview analysis into 30 minutes.',
            'priority': 'recommended',
            'url': 'https://dovetail.com'
        },
        {
            'name': 'v0.dev',
            'category': 'Rapid Prototyping',
            'use_case': 'Generate working UI prototypes from text descriptions',
            'impact': 'Build clickable prototypes in minutes, not days.',
            'priority': 'nice-to-have',
            'url': 'https://v0.dev'
        },
        {
            'name': 'Hex',
            'category': 'Data Analysis',
            'use_case': 'SQL + Python notebooks with AI assistance for product analytics',
            'impact': 'Analyze product data without waiting for data team.',
            'priority': 'recommended',
            'url': 'https://hex.tech'
        }
    ]


def _finance_ai_tools() -> List[Dict[str, Any]]:
    """AI tools for Finance professionals"""
    return [
        {
            'name': 'Excel Copilot',
            'category': 'Spreadsheet AI',
            'use_case': 'Write formulas, clean data, build models with natural language',
            'impact': 'Do in 1 minute what used to take 30 minutes.',
            'priority': 'must-have',
            'url': 'https://microsoft.com/microsoft-365/excel'
        },
        {
            'name': 'DataRobot',
            'category': 'Predictive Analytics',
            'use_case': 'Build financial forecast models without coding',
            'impact': 'Create accurate forecasts 10x faster than manual methods.',
            'priority': 'recommended',
            'url': 'https://datarobot.com'
        },
        {
            'name': 'Fathom',
            'category': 'Meeting Intelligence',
            'use_case': 'Auto-transcribe finance meetings, extract action items',
            'impact': 'Never miss a number or decision in meetings again.',
            'priority': 'recommended',
            'url': 'https://fathom.video'
        },
        {
            'name': 'Causal',
            'category': 'Financial Modeling',
            'use_case': 'Build interactive financial models with scenario planning',
            'impact': 'Create board-ready financial models in hours, not weeks.',
            'priority': 'nice-to-have',
            'url': 'https://causal.app'
        }
    ]


def _sales_ai_tools() -> List[Dict[str, Any]]:
    """AI tools for Sales professionals"""
    return [
        {
            'name': 'Gong',
            'category': 'Revenue Intelligence',
            'use_case': 'Analyze sales calls, identify winning patterns, coach reps',
            'impact': 'Know exactly what top performers do differently.',
            'priority': 'must-have',
            'url': 'https://gong.io'
        },
        {
            'name': 'Lavender',
            'category': 'Email Assistant',
            'use_case': 'Write better sales emails faster with AI coaching',
            'impact': 'Increase email response rates by 30%+.',
            'priority': 'recommended',
            'url': 'https://lavender.ai'
        },
        {
            'name': 'Clay',
            'category': 'Prospecting & Enrichment',
            'use_case': 'Find leads, enrich data, personalize outreach at scale',
            'impact': 'Build targeted prospect lists 100x faster.',
            'priority': 'recommended',
            'url': 'https://clay.com'
        },
        {
            'name': 'Clari',
            'category': 'Forecasting',
            'use_case': 'AI-powered sales forecasting and deal inspection',
            'impact': 'Increase forecast accuracy and prevent deal slippage.',
            'priority': 'recommended',
            'url': 'https://clari.com'
        }
    ]


def _marketing_ai_tools() -> List[Dict[str, Any]]:
    """AI tools for Marketing professionals"""
    return [
        {
            'name': 'Jasper AI',
            'category': 'Content Creation',
            'use_case': 'Generate marketing copy, blog posts, ads at scale',
            'impact': 'Create weeks of content in a day.',
            'priority': 'recommended',
            'url': 'https://jasper.ai'
        },
        {
            'name': 'Midjourney / DALL-E',
            'category': 'Image Generation',
            'use_case': 'Create custom images, graphics, ad creatives instantly',
            'impact': 'No more waiting for designers for every image.',
            'priority': 'recommended',
            'url': 'https://midjourney.com'
        },
        {
            'name': 'Segment + RudderStack',
            'category': 'Customer Data',
            'use_case': 'Unify customer data, power AI-driven personalization',
            'impact': 'Single source of truth for all customer behavior.',
            'priority': 'nice-to-have',
            'url': 'https://segment.com'
        },
        {
            'name': 'Copy.ai',
            'category': 'Marketing Copywriting',
            'use_case': 'Generate ad copy, landing pages, email campaigns',
            'impact': 'Test 10x more variations in the same time.',
            'priority': 'recommended',
            'url': 'https://copy.ai'
        }
    ]


def _operations_ai_tools() -> List[Dict[str, Any]]:
    """AI tools for Operations professionals"""
    return [
        {
            'name': 'Zapier / Make',
            'category': 'Workflow Automation',
            'use_case': 'Automate repetitive tasks between apps without code',
            'impact': 'Save 10+ hours per week on manual tasks.',
            'priority': 'must-have',
            'url': 'https://zapier.com'
        },
        {
            'name': 'Retool',
            'category': 'Internal Tools',
            'use_case': 'Build custom internal dashboards and tools with AI',
            'impact': 'Create tools in hours that used to take months.',
            'priority': 'recommended',
            'url': 'https://retool.com'
        },
        {
            'name': 'Looker / Tableau',
            'category': 'Business Intelligence',
            'use_case': 'AI-powered analytics and automated insights',
            'impact': 'Spot operational issues before they become problems.',
            'priority': 'recommended',
            'url': 'https://looker.com'
        },
        {
            'name': 'Linear',
            'category': 'Project Management',
            'use_case': 'AI-assisted task management and project planning',
            'impact': 'Keep operations running smoothly with less overhead.',
            'priority': 'nice-to-have',
            'url': 'https://linear.app'
        }
    ]


def _founder_ai_tools() -> List[Dict[str, Any]]:
    """AI tools for Founders"""
    return [
        {
            'name': 'Cursor',
            'category': 'AI Code Editor',
            'use_case': 'Build features 10x faster with AI pair programming',
            'impact': 'Ship products without hiring a full dev team.',
            'priority': 'must-have',
            'url': 'https://cursor.sh'
        },
        {
            'name': 'v0.dev + Vercel',
            'category': 'Full-Stack Development',
            'use_case': 'Build and deploy web apps from text descriptions',
            'impact': 'MVP in days, not months.',
            'priority': 'must-have',
            'url': 'https://v0.dev'
        },
        {
            'name': 'Notion AI',
            'category': 'Operations Hub',
            'use_case': 'Run entire startup: docs, roadmap, wiki, CRM with AI',
            'impact': 'Replace 5 different tools with one.',
            'priority': 'recommended',
            'url': 'https://notion.so'
        },
        {
            'name': 'Loom AI',
            'category': 'Async Communication',
            'use_case': 'Record video updates, AI generates summaries and action items',
            'impact': 'Reduce meetings by 50%, stay aligned asynchronously.',
            'priority': 'recommended',
            'url': 'https://loom.com'
        }
    ]


def _get_gap_specific_tools(skill_gaps: List[str]) -> List[Dict[str, Any]]:
    """Get AI tools to address specific skill gaps"""
    gap_tools = {
        'data_analytics': {
            'name': 'Julius AI',
            'category': 'Data Analysis',
            'use_case': 'Chat with your data, generate insights and visualizations',
            'impact': 'Analyze data without knowing Python or SQL.',
            'priority': 'recommended',
            'url': 'https://julius.ai'
        },
        'business_acumen': {
            'name': 'Causal',
            'category': 'Business Modeling',
            'use_case': 'Build interactive business models with scenario planning',
            'impact': 'Understand business drivers through modeling.',
            'priority': 'nice-to-have',
            'url': 'https://causal.app'
        },
        'strategic_thinking': {
            'name': 'Miro AI',
            'category': 'Strategy Visualization',
            'use_case': 'Generate strategy maps, roadmaps, and frameworks with AI',
            'impact': 'Think visually, plan systematically.',
            'priority': 'nice-to-have',
            'url': 'https://miro.com/ai'
        }
    }

    return [gap_tools[gap] for gap in skill_gaps if gap in gap_tools]
