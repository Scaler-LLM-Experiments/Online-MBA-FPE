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
        },
        {
            'name': 'Otter.ai',
            'category': 'Meeting Transcription',
            'use_case': 'Auto-transcribe meetings, generate summaries and action items',
            'impact': 'Never miss meeting details. Focus on conversation, not notes.',
            'priority': 'recommended',
            'url': 'https://otter.ai'
        },
        {
            'name': 'Gamma',
            'category': 'AI Presentations',
            'use_case': 'Generate beautiful presentations from text in minutes',
            'impact': 'Create pitch decks and presentations 10x faster.',
            'priority': 'recommended',
            'url': 'https://gamma.app'
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

    # Return exactly 9 tools (4 universal + 5 role-specific/gap)
    # OpenAI can add up to 6 more tools if needed via personalization
    return unique_tools[:9]


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
        },
        {
            'name': 'Rows',
            'category': 'AI Spreadsheets',
            'use_case': 'Build dashboards with AI-powered formulas and data enrichment',
            'impact': 'Create product dashboards without engineering resources.',
            'priority': 'recommended',
            'url': 'https://rows.com'
        },
        {
            'name': 'Magical',
            'category': 'Text Expansion',
            'use_case': 'Auto-expand templates, fill forms, transfer data instantly',
            'impact': 'Save hours on repetitive writing and data entry.',
            'priority': 'nice-to-have',
            'url': 'https://getmagical.com'
        },
        {
            'name': 'Maze',
            'category': 'User Testing',
            'use_case': 'Run user tests, AI analyzes results and surfaces insights',
            'impact': 'Validate product decisions with real user feedback fast.',
            'priority': 'recommended',
            'url': 'https://maze.co'
        },
        {
            'name': 'Fibery',
            'category': 'Product Workspace',
            'use_case': 'Connect user feedback, roadmap, specs with AI insights',
            'impact': 'Single source of truth for all product work.',
            'priority': 'nice-to-have',
            'url': 'https://fibery.io'
        },
        {
            'name': 'Sprig',
            'category': 'User Insights',
            'use_case': 'AI-powered surveys and session replays for product insights',
            'impact': 'Understand user behavior patterns automatically.',
            'priority': 'nice-to-have',
            'url': 'https://sprig.com'
        },
        {
            'name': 'Productboard',
            'category': 'Roadmap & Feedback',
            'use_case': 'AI organizes feedback, suggests features, prioritizes roadmap',
            'impact': 'Stop manually organizing feedback from 10 channels.',
            'priority': 'recommended',
            'url': 'https://productboard.com'
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
            'name': 'Rows',
            'category': 'AI Spreadsheets',
            'use_case': 'Build live financial dashboards with AI enrichment',
            'impact': 'Create real-time dashboards without engineering.',
            'priority': 'recommended',
            'url': 'https://rows.com'
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
            'priority': 'recommended',
            'url': 'https://causal.app'
        },
        {
            'name': 'Pigment',
            'category': 'Business Planning',
            'use_case': 'Collaborative FP&A platform with AI scenario modeling',
            'impact': 'Align finance and business teams on one platform.',
            'priority': 'nice-to-have',
            'url': 'https://pigment.com'
        },
        {
            'name': 'Cube',
            'category': 'FP&A Automation',
            'use_case': 'Automate financial consolidation and reporting',
            'impact': 'Eliminate manual data gathering and consolidation.',
            'priority': 'nice-to-have',
            'url': 'https://cube.com'
        },
        {
            'name': 'Vena',
            'category': 'Financial Planning',
            'use_case': 'Excel-native planning platform with AI workflows',
            'impact': 'Keep Excel familiarity while adding enterprise power.',
            'priority': 'nice-to-have',
            'url': 'https://venasolutions.com'
        },
        {
            'name': 'Jirav',
            'category': 'Financial Forecasting',
            'use_case': 'Driver-based forecasting with real-time data sync',
            'impact': 'Build rolling forecasts that update automatically.',
            'priority': 'nice-to-have',
            'url': 'https://jirav.com'
        },
        {
            'name': 'Puzzle',
            'category': 'Accounting Automation',
            'use_case': 'AI-powered bookkeeping and financial close automation',
            'impact': 'Close books 10x faster with automated reconciliation.',
            'priority': 'nice-to-have',
            'url': 'https://puzzle.io'
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
            'name': 'Clay',
            'category': 'Prospecting & Enrichment',
            'use_case': 'Find leads, enrich data, personalize outreach at scale',
            'impact': 'Build targeted prospect lists 100x faster.',
            'priority': 'recommended',
            'url': 'https://clay.com'
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
            'name': 'Clari',
            'category': 'Forecasting',
            'use_case': 'AI-powered sales forecasting and deal inspection',
            'impact': 'Increase forecast accuracy and prevent deal slippage.',
            'priority': 'recommended',
            'url': 'https://clari.com'
        },
        {
            'name': 'Chorus.ai',
            'category': 'Conversation Intelligence',
            'use_case': 'Record, transcribe, analyze sales conversations',
            'impact': 'Extract insights from every customer interaction.',
            'priority': 'recommended',
            'url': 'https://chorus.ai'
        },
        {
            'name': 'Apollo.io',
            'category': 'Sales Engagement',
            'use_case': 'AI-powered prospecting, sequencing, and outreach automation',
            'impact': 'Find and engage ideal prospects automatically.',
            'priority': 'recommended',
            'url': 'https://apollo.io'
        },
        {
            'name': '6sense',
            'category': 'Buyer Intelligence',
            'use_case': 'Predict which accounts are in-market and ready to buy',
            'impact': 'Target accounts with highest purchase intent.',
            'priority': 'nice-to-have',
            'url': 'https://6sense.com'
        },
        {
            'name': 'Attention',
            'category': 'Sales Coaching',
            'use_case': 'Real-time AI coaching during sales calls',
            'impact': 'Get live guidance on handling objections and closing.',
            'priority': 'nice-to-have',
            'url': 'https://attention.tech'
        },
        {
            'name': 'Outreach',
            'category': 'Sales Execution',
            'use_case': 'AI-guided sequences and engagement workflows',
            'impact': 'Automate follow-ups while keeping it personal.',
            'priority': 'nice-to-have',
            'url': 'https://outreach.io'
        },
        {
            'name': 'Drift',
            'category': 'Conversational AI',
            'use_case': 'AI chatbot qualifies leads and books meetings 24/7',
            'impact': 'Never miss a hot lead outside business hours.',
            'priority': 'nice-to-have',
            'url': 'https://drift.com'
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
            'name': 'Copy.ai',
            'category': 'Marketing Copywriting',
            'use_case': 'Generate ad copy, landing pages, email campaigns',
            'impact': 'Test 10x more variations in the same time.',
            'priority': 'recommended',
            'url': 'https://copy.ai'
        },
        {
            'name': 'Mutiny',
            'category': 'Website Personalization',
            'use_case': 'AI personalizes website content for each visitor',
            'impact': 'Increase conversion rates by showing relevant content.',
            'priority': 'recommended',
            'url': 'https://mutinyhq.com'
        },
        {
            'name': 'Madgicx',
            'category': 'Ad Optimization',
            'use_case': 'AI optimizes Facebook and Google ad campaigns',
            'impact': 'Reduce CAC while scaling ad spend profitably.',
            'priority': 'recommended',
            'url': 'https://madgicx.com'
        },
        {
            'name': 'Surfer SEO',
            'category': 'SEO Optimization',
            'use_case': 'AI-powered content optimization for search rankings',
            'impact': 'Rank higher on Google with data-driven content.',
            'priority': 'recommended',
            'url': 'https://surferseo.com'
        },
        {
            'name': 'Synthesia',
            'category': 'AI Video Creation',
            'use_case': 'Generate video content with AI avatars and voices',
            'impact': 'Create professional videos without cameras or actors.',
            'priority': 'nice-to-have',
            'url': 'https://synthesia.io'
        },
        {
            'name': 'Runway ML',
            'category': 'Creative AI',
            'use_case': 'AI video editing, effects, and content generation',
            'impact': 'Professional video editing without technical skills.',
            'priority': 'nice-to-have',
            'url': 'https://runwayml.com'
        },
        {
            'name': 'Instantly.ai',
            'category': 'Email Outreach',
            'use_case': 'AI-powered cold email campaigns with warmup',
            'impact': 'Scale outbound email without landing in spam.',
            'priority': 'nice-to-have',
            'url': 'https://instantly.ai'
        },
        {
            'name': 'Brandwatch',
            'category': 'Social Listening',
            'use_case': 'AI analyzes social media sentiment and trends',
            'impact': 'Understand brand perception and market trends.',
            'priority': 'nice-to-have',
            'url': 'https://brandwatch.com'
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
            'priority': 'recommended',
            'url': 'https://linear.app'
        },
        {
            'name': 'Bardeen',
            'category': 'Task Automation',
            'use_case': 'Automate browser tasks and workflows with AI',
            'impact': 'Eliminate repetitive clicking and data entry.',
            'priority': 'recommended',
            'url': 'https://bardeen.ai'
        },
        {
            'name': 'Airflow',
            'category': 'Data Pipeline',
            'use_case': 'Orchestrate complex data workflows and ETL processes',
            'impact': 'Reliable data pipelines that scale automatically.',
            'priority': 'recommended',
            'url': 'https://airflow.apache.org'
        },
        {
            'name': 'n8n',
            'category': 'Workflow Automation',
            'use_case': 'Open-source automation platform with AI nodes',
            'impact': 'Build complex automations without vendor lock-in.',
            'priority': 'nice-to-have',
            'url': 'https://n8n.io'
        },
        {
            'name': 'Airtable',
            'category': 'Operations Database',
            'use_case': 'Flexible database with AI-powered automations',
            'impact': 'Build custom operational systems without coding.',
            'priority': 'nice-to-have',
            'url': 'https://airtable.com'
        },
        {
            'name': 'Metabase',
            'category': 'Business Analytics',
            'use_case': 'Self-service BI tool with AI-generated queries',
            'impact': 'Answer business questions without SQL knowledge.',
            'priority': 'nice-to-have',
            'url': 'https://metabase.com'
        },
        {
            'name': 'Tray.io',
            'category': 'Enterprise Automation',
            'use_case': 'Visual workflow builder for complex integrations',
            'impact': 'Connect enterprise systems without IT bottlenecks.',
            'priority': 'nice-to-have',
            'url': 'https://tray.io'
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
            'name': 'Replit',
            'category': 'AI Development',
            'use_case': 'Build and deploy apps entirely in browser with AI',
            'impact': 'Code from anywhere without dev environment setup.',
            'priority': 'recommended',
            'url': 'https://replit.com'
        },
        {
            'name': 'Loom AI',
            'category': 'Async Communication',
            'use_case': 'Record video updates, AI generates summaries and action items',
            'impact': 'Reduce meetings by 50%, stay aligned asynchronously.',
            'priority': 'recommended',
            'url': 'https://loom.com'
        },
        {
            'name': 'Bolt.new',
            'category': 'Rapid Prototyping',
            'use_case': 'Generate full-stack apps from prompts instantly',
            'impact': 'Validate ideas in hours with working prototypes.',
            'priority': 'recommended',
            'url': 'https://bolt.new'
        },
        {
            'name': 'Supabase',
            'category': 'Backend as a Service',
            'use_case': 'AI-assisted database, auth, and APIs without backend code',
            'impact': 'Launch products without hiring backend engineers.',
            'priority': 'recommended',
            'url': 'https://supabase.com'
        },
        {
            'name': 'Durable',
            'category': 'Website Builder',
            'use_case': 'AI builds complete business website in 30 seconds',
            'impact': 'Professional online presence without designers.',
            'priority': 'nice-to-have',
            'url': 'https://durable.co'
        },
        {
            'name': 'Browse AI',
            'category': 'Data Extraction',
            'use_case': 'Extract data from any website without coding',
            'impact': 'Monitor competitors and gather market intelligence.',
            'priority': 'nice-to-have',
            'url': 'https://browse.ai'
        },
        {
            'name': 'Mem',
            'category': 'AI Note-Taking',
            'use_case': 'Self-organizing notes that connect ideas automatically',
            'impact': 'Never lose important insights or connections.',
            'priority': 'nice-to-have',
            'url': 'https://mem.ai'
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
