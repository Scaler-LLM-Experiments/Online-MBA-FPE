"""
MBA Industry Stats and Transformation Insights
Pre-loaded data on upskilling ROI and industry transformation
"""
from typing import List, Dict, Any


def get_industry_stats_for_role(role: str) -> List[Dict[str, Any]]:
    """
    Get industry statistics relevant to the role showing why upskilling matters

    Returns:
        [
            {
                'stat': '67%',
                'description': 'Description of stat',
                'source': 'McKinsey 2024',
                'impact': 'What it means for the user'
            }
        ]
    """
    # Universal stats (relevant to all roles)
    universal_stats = [
        {
            'stat': '40% productivity gain',
            'description': 'Professionals who use AI tools daily report 40% productivity increase',
            'source': 'Microsoft Work Trend Index 2024',
            'impact': 'AI literacy is no longer optional - it\'s career-critical'
        },
        {
            'stat': '₹12-18 LPA salary premium',
            'description': 'Professionals with AI + Business skills earn 30-40% more than peers',
            'source': 'Indeed India Salary Report 2024',
            'impact': 'Upskilling directly translates to higher compensation'
        }
    ]

    # Role-specific stats
    role_stats_map = {
        'product-manager': _pm_stats,
        'finance': _finance_stats,
        'sales': _sales_stats,
        'marketing': _marketing_stats,
        'operations': _operations_stats,
        'founder': _founder_stats
    }

    role_stats = role_stats_map.get(role, lambda: [])()

    return universal_stats + role_stats


def _pm_stats() -> List[Dict[str, Any]]:
    """Stats for Product Managers"""
    return [
        {
            'stat': '73% of PMs',
            'description': 'Use AI for product discovery, research analysis, and roadmap planning',
            'source': 'ProductPlan State of Product 2024',
            'impact': 'PMs not using AI are falling behind on strategic work'
        },
        {
            'stat': '5-10x faster',
            'description': 'Product teams using AI ship features 5-10x faster with same quality',
            'source': 'GitHub Innovation Graph 2024',
            'impact': 'Speed to market is the new competitive advantage'
        },
        {
            'stat': '60% of PM roles',
            'description': 'Now require demonstrated AI proficiency in job descriptions',
            'source': 'LinkedIn Jobs Report 2024',
            'impact': 'AI skills are no longer nice-to-have, they\'re required'
        }
    ]


def _finance_stats() -> List[Dict[str, Any]]:
    """Stats for Finance professionals"""
    return [
        {
            'stat': '80% of CFOs',
            'description': 'Plan to increase investment in AI-powered financial planning tools',
            'source': 'Gartner CFO Survey 2024',
            'impact': 'Finance professionals need AI skills to stay relevant'
        },
        {
            'stat': '10-15 hours/week',
            'description': 'Average time saved by finance teams using AI for reporting and analysis',
            'source': 'Deloitte Finance Transformation 2024',
            'impact': 'Free up strategic time by automating manual work'
        },
        {
            'stat': '40% more accurate',
            'description': 'AI-assisted financial forecasts vs traditional methods',
            'source': 'McKinsey Analytics Report 2024',
            'impact': 'Better predictions = better decisions = career growth'
        }
    ]


def _sales_stats() -> List[Dict[str, Any]]:
    """Stats for Sales professionals"""
    return [
        {
            'stat': '28% higher win rates',
            'description': 'Sales teams using AI-powered insights vs those who don\'t',
            'source': 'Salesforce State of Sales 2024',
            'impact': 'AI literacy directly impacts your quota attainment'
        },
        {
            'stat': '50% of sales time',
            'description': 'Currently spent on non-selling activities - AI can automate most of it',
            'source': 'HubSpot Sales Report 2024',
            'impact': 'More time selling = more revenue = higher compensation'
        },
        {
            'stat': '70% of top performers',
            'description': 'Use AI for deal analysis, forecasting, and personalization',
            'source': 'Gong Labs Revenue Intelligence 2024',
            'impact': 'Top performers have already adopted AI - catch up or fall behind'
        }
    ]


def _marketing_stats() -> List[Dict[str, Any]]:
    """Stats for Marketing professionals"""
    return [
        {
            'stat': '3x more campaigns',
            'description': 'Marketing teams using AI can test 3x more campaigns in same time',
            'source': 'HubSpot Marketing Trends 2024',
            'impact': 'More experiments = better performance = career growth'
        },
        {
            'stat': '63% of marketers',
            'description': 'Say AI is their most important technology investment in 2024',
            'source': 'Adobe Digital Trends 2024',
            'impact': 'CMOs are prioritizing AI - so should you'
        },
        {
            'stat': '45% lower CAC',
            'description': 'Achieved by teams using AI for targeting and personalization',
            'source': 'MarTech Benchmark Report 2024',
            'impact': 'Better efficiency = bigger budgets = more opportunities'
        }
    ]


def _operations_stats() -> List[Dict[str, Any]]:
    """Stats for Operations professionals"""
    return [
        {
            'stat': '30-40% efficiency gain',
            'description': 'Operations teams using AI for process optimization and automation',
            'source': 'McKinsey Operations Report 2024',
            'impact': 'Efficiency gains translate directly to bottom line impact'
        },
        {
            'stat': '90% of ops leaders',
            'description': 'Expect to increase AI adoption in operations in next 12 months',
            'source': 'Gartner Supply Chain Survey 2024',
            'impact': 'Operations is being transformed by AI - adapt or get left behind'
        },
        {
            'stat': '70% cost reduction',
            'description': 'In manual operational tasks through intelligent automation',
            'source': 'Deloitte Operations Excellence 2024',
            'impact': 'Leaders who drive efficiency become strategic partners to CEO'
        }
    ]


def _founder_stats() -> List[Dict[str, Any]]:
    """Stats for Founders"""
    return [
        {
            'stat': '10x productivity',
            'description': 'Solo founders using AI tools match output of 5-person teams',
            'source': 'Y Combinator Startup Trends 2024',
            'impact': 'Build faster, leaner, more capital-efficient companies'
        },
        {
            'stat': '$50K → $5K',
            'description': 'Average MVP cost dropped 90% with AI-powered development',
            'source': 'TechCrunch Startup Analysis 2024',
            'impact': 'Lower costs = longer runway = better odds of success'
        },
        {
            'stat': '3 months → 3 weeks',
            'description': 'Time to MVP for startups using AI for development and design',
            'source': 'Product Hunt Launch Data 2024',
            'impact': 'Speed to market is everything in startups'
        }
    ]


def get_transformation_insights_for_role(role: str) -> List[Dict[str, str]]:
    """
    Get insights on how companies/industries are being transformed by AI

    Returns:
        [
            {
                'title': 'Transformation title',
                'description': 'What\'s changing',
                'example': 'Real company example',
                'takeaway': 'What it means for career'
            }
        ]
    """
    role_transformation_map = {
        'product-manager': _pm_transformation,
        'finance': _finance_transformation,
        'sales': _sales_transformation,
        'marketing': _marketing_transformation,
        'operations': _operations_transformation,
        'founder': _founder_transformation
    }

    transformations = role_transformation_map.get(role, lambda: [])()
    return transformations[:3]  # Top 3 transformations


def _pm_transformation() -> List[Dict[str, str]]:
    """Product transformation insights"""
    return [
        {
            'title': 'AI-First Product Development',
            'description': 'Product teams are embedding AI into every feature, not building separate AI features',
            'example': 'Notion AI, Canva Magic, Figma AI - all baked directly into workflows',
            'takeaway': 'PMs need to understand AI capabilities to design the next generation of products'
        },
        {
            'title': 'From Feature Factory to Outcome Factory',
            'description': 'AI enables focus on outcomes, not features. Teams ship less but achieve more.',
            'example': 'Intercom reduced features by 40% but increased customer value by using AI insights',
            'takeaway': 'Strategic PMs who focus on impact over output will thrive'
        },
        {
            'title': 'Personalization at Scale',
            'description': 'Every user gets a unique product experience powered by AI',
            'example': 'Spotify Discover Weekly, Netflix recommendations - personalization is table stakes now',
            'takeaway': 'Understanding ML/AI is essential for modern product work'
        }
    ]


def _finance_transformation() -> List[Dict[str, str]]:
    """Finance transformation insights"""
    return [
        {
            'title': 'From Historical Reporting to Predictive Planning',
            'description': 'Finance is shifting from "what happened" to "what will happen"',
            'example': 'Tesla uses AI to predict cash flow 12 months out with 95% accuracy',
            'takeaway': 'Finance professionals must become strategists, not just reporters'
        },
        {
            'title': 'Real-Time Financial Intelligence',
            'description': 'Decisions are made with live data, not monthly reports',
            'example': 'Stripe Dashboard gives real-time business metrics to all employees',
            'takeaway': 'Finance teams that enable real-time decisions become strategic partners'
        },
        {
            'title': 'Automated Everything',
            'description': 'Manual financial processes are being eliminated entirely',
            'example': 'Airbnb automated 90% of expense reporting and reconciliation',
            'takeaway': 'Value shifts from doing the work to interpreting and acting on insights'
        }
    ]


def _sales_transformation() -> List[Dict[str, str]]:
    """Sales transformation insights"""
    return [
        {
            'title': 'From Art to Science',
            'description': 'Sales is becoming data-driven with AI analyzing every interaction',
            'example': 'Gong records every call, identifies patterns, coaches reps in real-time',
            'takeaway': 'Top performers use data to understand what works, not just gut feel'
        },
        {
            'title': 'Hyper-Personalization',
            'description': 'Every prospect gets tailored messaging based on AI-powered insights',
            'example': 'Clay + ChatGPT generates personalized outreach for 10,000 prospects/day',
            'takeaway': 'Generic outreach is dead. Personalization at scale is the new standard.'
        },
        {
            'title': 'Predictive Deal Intelligence',
            'description': 'AI predicts which deals will close and why',
            'example': 'Clari analyzes deal signals to forecast within 2% accuracy',
            'takeaway': 'Sales leaders who master forecasting become revenue officers'
        }
    ]


def _marketing_transformation() -> List[Dict[str, str]]:
    """Marketing transformation insights"""
    return [
        {
            'title': 'Content Velocity Revolution',
            'description': 'AI enables testing 100 variations where we used to test 3',
            'example': 'Jasper AI helps marketing teams create a month of content in a day',
            'takeaway': 'Speed of experimentation is the new competitive advantage'
        },
        {
            'title': 'Attribution Finally Solved',
            'description': 'AI can track full customer journey and attribute revenue correctly',
            'example': 'HubSpot AI attribution shows true marketing ROI across all touchpoints',
            'takeaway': 'Marketers can finally prove impact and get bigger budgets'
        },
        {
            'title': 'Predictive Audience Targeting',
            'description': 'AI identifies who will convert before they even visit your site',
            'example': '6sense predicts buyer intent and targets accounts 90 days before purchase',
            'takeaway': 'Marketing becomes proactive, not reactive'
        }
    ]


def _operations_transformation() -> List[Dict[str, str]]:
    """Operations transformation insights"""
    return [
        {
            'title': 'Self-Optimizing Systems',
            'description': 'Operations systems continuously improve themselves using AI',
            'example': 'Amazon warehouse robots optimize their own paths, reducing costs by 20%',
            'takeaway': 'Ops leaders focus on designing systems, not managing tasks'
        },
        {
            'title': 'Predictive Operations',
            'description': 'Problems are solved before they occur using predictive AI',
            'example': 'UPS predicts vehicle failures 2 weeks in advance, preventing downtime',
            'takeaway': 'Shift from reactive firefighting to proactive optimization'
        },
        {
            'title': 'Autonomous Decision-Making',
            'description': 'Routine operational decisions are fully automated',
            'example': 'Shopify automates 80% of fulfillment decisions end-to-end',
            'takeaway': 'Focus shifts from execution to strategy and exception handling'
        }
    ]


def _founder_transformation() -> List[Dict[str, str]]:
    """Founder transformation insights"""
    return [
        {
            'title': 'Solo Founders Building Unicorns',
            'description': 'One person with AI can now build what used to require a team',
            'example': 'Levelsio built Nomad List to $1M+ ARR as a solo founder using AI',
            'takeaway': 'You don\'t need a big team anymore - just AI fluency'
        },
        {
            'title': 'AI-Native Startups',
            'description': 'New category of startups built entirely around AI capabilities',
            'example': 'Perplexity AI went 0 → $1B valuation in 18 months with 40 people',
            'takeaway': 'The biggest opportunities are in AI-first businesses'
        },
        {
            'title': 'Speed as Moat',
            'description': 'AI enables iteration speed that creates defensible advantage',
            'example': 'Cursor raised at $400M valuation by shipping features daily using AI',
            'takeaway': 'Fastest to iterate wins in the AI era'
        }
    ]
