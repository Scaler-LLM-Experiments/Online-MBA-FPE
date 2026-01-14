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
        'description': 'Commit to using ChatGPT or Claude for at least 30 minutes every single day for your actual work - not playing around, but real tasks. Use it to draft emails, analyze data, brainstorm solutions, write reports, create presentations, debug problems. The key is daily practice with real work, not tutorials. Most people dabble with AI but never integrate it into their workflow. The professionals who master AI prompting in 2024-2025 will have an insurmountable advantage over those who don\'t.',
        'impact': 'You\'ll see a legitimate 3-5x productivity boost within 2-3 weeks as AI becomes your thought partner for everything. This single habit is more valuable than most MBA courses because it compounds daily.',
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
            'description': 'For your next feature launch, start by calculating the expected revenue impact before you write the PRD. Since you\'re currently measuring success through other metrics, shifting to revenue impact will help you speak the language of executives and justify product investments more effectively. This is the #1 skill that separates senior PMs from mid-level PMs.',
            'impact': 'You\'ll be able to defend your roadmap in business terms, making it easier to secure resources and get buy-in from leadership. This directly addresses your business acumen gap.',
            'timeframe': 'Next sprint'
        })

    # If they're struggling with prioritization
    if responses.get('pm-roadmap-bloat') in ['add-resources', 'extend-timelines']:
        wins.append({
            'title': 'Learn RICE Prioritization',
            'description': 'Your response shows you tend to add resources or extend timelines when faced with too many roadmap items. Instead, implement RICE scoring (Reach × Impact × Confidence ÷ Effort) for every feature. This framework will give you a data-driven way to say "no" and help stakeholders understand why certain items get deprioritized. Start by scoring your current roadmap items this week.',
            'impact': 'You\'ll move from reactive resource planning to proactive prioritization, which is essential for senior PM roles. This also improves your strategic thinking capability.',
            'timeframe': '1 week'
        })

    # AI usage gap
    if responses.get('pm-ai-usage') not in ['predictive-insights', 'automated-decisions']:
        wins.append({
            'title': 'Use AI for User Research',
            'description': 'You\'re not yet leveraging AI for advanced product decisions. Start by using ChatGPT or Claude to analyze your customer interview transcripts - paste in 5-10 interviews and ask it to identify common pain points, feature requests, and behavioral patterns. This is much faster and often catches insights human analysis misses.',
            'impact': 'You\'ll save 5+ hours per week on manual analysis and discover deeper insights. This directly improves your AI literacy while making you more data-driven.',
            'timeframe': 'This week'
        })

    return wins


def _finance_quick_wins(responses: Dict[str, Any]) -> List[Dict[str, str]]:
    """Finance-specific quick wins"""
    wins = []

    if responses.get('finance-metrics-conflict') == 'escalate-meeting':
        wins.append({
            'title': 'Build Metric Validation Framework',
            'description': 'You mentioned escalating to meetings when facing conflicting metrics. This reactive approach wastes everyone\'s time. Instead, create a pre-meeting validation checklist: verify data sources, check calculation methods, identify date range mismatches, and document assumptions. Do this for 2-3 days before any metrics discussion, and you\'ll arrive with answers instead of questions.',
            'impact': 'You\'ll be seen as the person who solves problems before meetings, not during them. This builds executive credibility and positions you as a strategic partner, not just a number-cruncher.',
            'timeframe': '2 days'
        })

    if responses.get('finance-ai-usage') in ['reporting', 'basic-forecasting']:
        wins.append({
            'title': 'Automate Financial Reporting',
            'description': 'Since you\'re using AI for basic tasks, it\'s time to level up. Use ChatGPT to write Python scripts that automatically pull data from your systems, clean it, and generate your monthly reports. Start with your most time-consuming recurring report - describe the process to ChatGPT and ask it to write the automation script. Even if you don\'t know Python, AI can explain and debug the code for you.',
            'impact': 'You\'ll save 10+ hours per month on manual reporting and free up time for high-value analysis. This also strengthens your technical literacy, making you a rare "business + AI" finance professional.',
            'timeframe': '1 week'
        })

    wins.append({
        'title': 'Learn Scenario Modeling',
        'description': 'Build a 3-scenario model (best case, base case, worst case) for next quarter\'s revenue and expenses. Don\'t just show three numbers - show the key assumptions driving each scenario and what triggers would indicate you\'re trending toward each one. This transforms you from reporting what happened to predicting what will happen.',
        'impact': 'Leadership will start seeing you as a strategic advisor, not just a reporter. Scenario modeling is the bridge between finance and strategy - exactly what separates senior finance roles from junior ones.',
        'timeframe': '2 weeks'
    })

    return wins


def _sales_quick_wins(responses: Dict[str, Any]) -> List[Dict[str, str]]:
    """Sales-specific quick wins"""
    wins = []

    if responses.get('sales-forecasting') == 'rep-judgment':
        wins.append({
            'title': 'Build a Data-Driven Forecast Model',
            'description': 'You\'re currently relying on rep judgment for forecasting, which is notoriously inaccurate and makes you look less credible to leadership. Pull the last 6 months of deal data and calculate your actual close rates by stage (e.g., Discovery: 15%, Demo: 35%, Proposal: 60%, Negotiation: 80%). Then apply these percentages to your current pipeline. This simple change makes your forecast defensible with data.',
            'impact': 'Your forecast accuracy will jump by 30%+ immediately, and you\'ll be able to defend your numbers in pipeline reviews. This is the difference between quota-carrying reps and sales leaders who get promoted.',
            'timeframe': '1 week'
        })

    if responses.get('sales-ai-usage') in ['email-drafts', 'call-summaries']:
        wins.append({
            'title': 'Use AI for Deal Risk Detection',
            'description': 'You\'re using AI for tactical tasks like email drafts, but the real value is in deal intelligence. Take your last 20 closed-lost deals and paste the key data (buyer role, company size, pain points, objections, timeline) into ChatGPT. Ask it to identify patterns in why deals were lost. Then use it to score your current open deals for similar red flags.',
            'impact': 'You\'ll catch at-risk deals weeks earlier, giving you time to course-correct instead of scrambling at month-end. This proactive approach is what separates strategic sellers from transactional ones.',
            'timeframe': 'This week'
        })

    wins.append({
        'title': 'Create Win/Loss Analysis System',
        'description': 'Interview the decision-makers from your last 10 wins and 10 losses. Ask them: "Why did you choose us/them?", "What almost made you choose differently?", and "What could have accelerated/salvaged the deal?" Document these insights and look for patterns - you\'ll discover the real buying criteria (which is often different from what prospects say).',
        'impact': 'You\'ll understand what actually drives deals in your market, allowing you to focus on high-probability opportunities and avoid time-wasters. This insight is the foundation of becoming a top performer.',
        'timeframe': '2 weeks'
    })

    return wins


def _marketing_quick_wins(responses: Dict[str, Any]) -> List[Dict[str, str]]:
    """Marketing-specific quick wins"""
    wins = []

    if responses.get('marketing-conflicting-signals') in ['ctr', 'cac']:
        wins.append({
            'title': 'Build LTV/CAC Dashboard',
            'description': 'You\'re optimizing for vanity metrics like CTR or CAC in isolation, but what matters is the ratio between Customer Lifetime Value and Customer Acquisition Cost. Pull your customer data and segment it by acquisition cohort (month + channel). Calculate average LTV and CAC for each cohort. A healthy LTV:CAC ratio is 3:1 or higher. This shows you which channels are actually profitable, not just cheap or clicky.',
            'impact': 'You\'ll stop wasting budget on channels with good CTR but terrible LTV, and you\'ll be able to defend budget increases on channels that leadership doesn\'t understand but actually drive profit. This is how growth marketers think.',
            'timeframe': '1 week'
        })

    if responses.get('marketing-ai-application') == 'content-generation':
        wins.append({
            'title': 'Use AI for Audience Segmentation',
            'description': 'You\'re using AI for content creation, but the bigger opportunity is audience intelligence. Export your customer data (demographics, behaviors, purchase history, engagement patterns) and feed it to ChatGPT. Ask it to identify hidden segments based on behavior patterns. For example, it might discover "weekend browsers who buy on mobile" or "enterprise users who engage with thought leadership." These micro-segments let you hyper-personalize campaigns.',
            'impact': 'You\'ll discover high-converting segments you didn\'t know existed, dramatically improving your targeting and conversion rates. This moves you from spray-and-pray marketing to precision targeting.',
            'timeframe': '3 days'
        })

    wins.append({
        'title': 'Implement Multi-Touch Attribution',
        'description': 'Set up tracking to understand the full customer journey across all touchpoints - paid ads, organic search, email, social, webinars, etc. Use tools like Google Analytics 4, Mixpanel, or even a simple spreadsheet. The goal is to see which channels assist conversions versus which get last-click credit. Most marketers over-invest in last-click channels and under-invest in awareness channels because they can\'t measure multi-touch impact.',
        'impact': 'You\'ll finally know what marketing actually works across the entire funnel, not just what gets credit at the end. This prevents you from cutting budget on channels that seem ineffective but are actually critical to the journey.',
        'timeframe': '2 weeks'
    })

    return wins


def _operations_quick_wins(responses: Dict[str, Any]) -> List[Dict[str, str]]:
    """Operations-specific quick wins"""
    wins = []

    if responses.get('operations-scale-stress') == 'hiring-capacity':
        wins.append({
            'title': 'Identify Process Bottlenecks First',
            'description': 'You mentioned hiring more people to handle scale, which is expensive and often doesn\'t solve the real problem. Before you hire, map your top 3 operational processes end-to-end. Time each step and identify where work gets stuck (bottlenecks). Often, you\'ll find that 80% of delays come from 20% of steps - maybe approvals, handoffs, or waiting for information. Fix those bottlenecks first through process redesign or automation, then see if you still need to hire.',
            'impact': 'You\'ll avoid the classic mistake of hiring people to do broken work faster. This saves huge amounts of budget and positions you as a strategic operator who solves root causes, not symptoms.',
            'timeframe': '1 week'
        })

    if responses.get('operations-ai-leverage') in ['reporting', 'forecasting']:
        wins.append({
            'title': 'Automate Operational Decisions',
            'description': 'You\'re using AI for reports and forecasts, but the real value is in decision automation. Identify your top 5 recurring operational decisions (customer routing, resource allocation, scheduling, prioritization, escalations). For each one, document the decision rules you currently use. Then use ChatGPT or Claude to create an automated decision system - even a simple spreadsheet with logic can work. Start with the decision you make most frequently.',
            'impact': 'You\'ll free up 20%+ of your time from repetitive decision-making and reinvest it in strategic work like process improvement and planning. This is what separates senior ops leaders from junior ones.',
            'timeframe': '2 weeks'
        })

    wins.append({
        'title': 'Build SLA Dashboards',
        'description': 'Create real-time dashboards tracking your key operational SLAs (Service Level Agreements) - response time, fulfillment time, error rates, customer satisfaction scores, whatever matters most to your ops. Use tools like Metabase, Retool, or even Google Sheets with auto-refresh. The key is making it visible and real-time so you can catch issues as they\'re forming, not after customers complain.',
        'impact': 'You\'ll shift from reactive firefighting to proactive problem prevention. When leadership sees your dashboards, you\'ll be viewed as the person who has operations under control, which is essential for promotion.',
        'timeframe': '1 week'
    })

    return wins


def _founder_quick_wins(responses: Dict[str, Any]) -> List[Dict[str, str]]:
    """Founder-specific quick wins"""
    wins = []

    if responses.get('founder-mvp-failure') in ['add-features', 'increase-marketing']:
        wins.append({
            'title': 'Talk to 20 Users This Week',
            'description': 'Your instinct is to add more features or ramp up marketing, but that\'s throwing money at symptoms. The real issue is product-market fit. This week, personally talk to 20 users (or prospects who didn\'t convert). Ask them: "Why did you initially sign up?", "What were you hoping to achieve?", "Why didn\'t you come back?", and "What would make this a must-have tool?" Record the exact words they use - that\'s your positioning and roadmap right there.',
            'impact': 'You\'ll discover the real problem you need to solve, which is almost never "we need more features" or "we need more traffic." This saves you months of building the wrong things and burning cash on ineffective marketing.',
            'timeframe': 'This week'
        })

    if responses.get('founder-scale-pain') == 'data-blindness':
        wins.append({
            'title': 'Set Up Core Metrics Dashboard',
            'description': 'You mentioned being data-blind, which means you\'re flying by gut instead of metrics. Set up a simple dashboard (even a Google Sheet works) tracking your North Star metrics: MRR/ARR, Customer Acquisition Cost (CAC), Lifetime Value (LTV), Monthly Churn Rate, and NPS. Update it weekly. These 5 metrics tell you if your business is healthy, growing efficiently, and retaining customers. Most founders track revenue but ignore the other four until it\'s too late.',
            'impact': 'You\'ll stop making emotional decisions and start making data-driven ones. You\'ll also catch red flags early - like high churn or bloated CAC - before they kill your business. Investors love founders who know their metrics cold.',
            'timeframe': '3 days'
        })

    wins.append({
        'title': 'Use AI as Your Co-Founder',
        'description': 'As a founder, your biggest constraint is time and resources. Start treating AI (Claude, ChatGPT, Cursor) as your co-founder. Use it for everything: writing code, creating content, analyzing data, building financial models, researching competitors, drafting investor updates, even making strategic decisions by talking through problems. The founders winning right now are the ones who leverage AI to move 10x faster than competitors with bigger teams.',
        'impact': 'You\'ll ship features in days that used to take weeks, create content at scale, and make faster decisions with better analysis. This is the closest thing to a superpower available to founders right now.',
        'timeframe': 'Start today'
    })

    return wins


def _get_skill_gap_wins(skill_gaps: List[str]) -> List[Dict[str, str]]:
    """Generate quick wins for specific skill gaps"""
    gap_wins_map = {
        'business_acumen': {
            'title': 'Learn Unit Economics',
            'description': 'Your assessment shows a gap in business acumen, which means you might be great at execution but struggle to connect your work to business outcomes. Start by learning unit economics - the math that drives every business. For your company or product, calculate: Customer Acquisition Cost (CAC), Lifetime Value (LTV), Payback Period, and Contribution Margin. Then ask yourself: "Based on these numbers, should we grow faster, slower, or pivot?" This is how executives think.',
            'impact': 'You\'ll finally understand what drives profitability and be able to have strategic conversations with leadership instead of just reporting on activities. This is the foundation of business thinking.',
            'timeframe': '1 week'
        },
        'data_analytics': {
            'title': 'Master Excel/Google Sheets',
            'description': 'Your data analytics skills need strengthening, which is holding you back from making data-driven decisions. Commit to mastering the core Excel/Sheets skills this month: pivot tables (for summarizing large datasets), VLOOKUP/INDEX-MATCH (for combining data), IF statements (for logic), and basic charts. Use YouTube tutorials but practice on your actual work data, not example datasets. The goal is to answer business questions with data, not just make pretty charts.',
            'impact': 'You\'ll be able to analyze data 10x faster and answer questions that currently require help from analysts or engineers. This skill alone can accelerate your career by years.',
            'timeframe': '2 weeks'
        },
        'ai_literacy': {
            'title': 'Daily AI Practice',
            'description': 'Your AI literacy is identified as a gap, which means you\'re at risk of being left behind as AI transforms every role. Starting today, use ChatGPT or Claude for every single task you do - writing emails, analyzing data, brainstorming ideas, creating content, writing code, making decisions. Treat it like a super-smart coworker who\'s always available. Don\'t just use it when you\'re stuck; use it proactively to think through problems. The winners in the AI era will be those who integrate it into their daily workflow.',
            'impact': 'Within 3-4 weeks of daily practice, you\'ll be 5x more productive than your peers and you\'ll be able to do things that used to require hiring specialists. This is the single most important skill to develop right now.',
            'timeframe': 'This week'
        },
        'strategic_thinking': {
            'title': 'Study Business Frameworks',
            'description': 'Your strategic thinking skills need development, which explains why you might feel like you\'re always executing but never influencing direction. Learn the classic business frameworks that executives use: Porter\'s 5 Forces (competitive analysis), SWOT (strengths/weaknesses/opportunities/threats), Business Model Canvas (how value is created and captured), and Value Chain Analysis. Don\'t just memorize them - apply each one to your company this week. These frameworks are the mental models that separate strategists from executors.',
            'impact': 'You\'ll start seeing patterns and opportunities that others miss, and you\'ll be able to articulate strategic ideas in a way that resonates with leadership. This is how individual contributors transition to leadership roles.',
            'timeframe': '2 weeks'
        },
        'leadership': {
            'title': 'Take Ownership of Outcomes',
            'description': 'Leadership is showing up as a gap, which typically means you\'re great at completing tasks but don\'t yet think like an owner. For your next project, commit to owning the business outcome, not just delivering your part. This means: understanding why the project matters financially, proactively solving blockers even if they\'re "not your job," making trade-off decisions when requirements conflict, and measuring success by business impact (revenue, cost savings, customer satisfaction) rather than task completion. Leadership is about accountability for outcomes.',
            'impact': 'You\'ll start being viewed as someone who can be trusted with bigger responsibilities and strategic projects. This shift in mindset is what separates high-performers who get promoted from those who stay stuck at the same level.',
            'timeframe': 'Next project'
        },
        'problem_solving': {
            'title': 'Practice Case Studies',
            'description': 'Your problem-solving skills need sharpening, which means you might solve problems reactively instead of systematically. Practice structured problem-solving by doing 3 business case studies this week. Find them on MBA case study websites or consulting firm practice cases. The goal isn\'t to get the "right answer" - it\'s to learn how to break down ambiguous problems into structured frameworks: define the problem, identify root causes, generate options, evaluate trade-offs, make a recommendation. This is how consultants and executives think.',
            'impact': 'You\'ll develop a systematic approach to solving complex problems instead of relying on intuition or guesswork. This skill is essential for senior roles where problems are ambiguous and high-stakes.',
            'timeframe': '2 weeks'
        }
    }

    return [gap_wins_map[gap] for gap in skill_gaps if gap in gap_wins_map]
