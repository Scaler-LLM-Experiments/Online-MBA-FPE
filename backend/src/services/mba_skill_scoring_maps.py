"""
MBA Skill Scoring Maps
Direct answer → score mappings for all quiz questions

Each answer gets a score (1-5):
- 5 = Expert-level thinking
- 4 = Advanced understanding
- 3 = Proficient/competent
- 2 = Developing/basic
- 1 = Beginner/surface-level

Each question maps to one or more skills
"""
from typing import Dict, List

# ============================================================================
# QUESTION → SKILL MAPPINGS
# Defines which skills each question tests
# ============================================================================

QUESTION_SKILL_MAP = {
    # Product Manager Questions
    'pm-retention-problem': ['product_strategy', 'data_driven_pm', 'user_centricity'],
    'pm-roadmap-tradeoff': ['product_strategy', 'strategic_thinking', 'leadership'],
    'pm-mvp-validation': ['user_centricity', 'ai_literacy'],
    'pm-metrics-conflict': ['data_driven_pm', 'strategic_thinking'],
    'pm-ai-leverage': ['ai_literacy'],
    'pm-failure-reflection': ['leadership', 'strategic_thinking'],

    # Finance Questions
    'finance-metrics-conflict': ['business_partnering', 'data_integrity', 'leadership'],
    'finance-forecast-miss': ['financial_modeling', 'data_integrity'],
    'finance-decision-speed': ['data_integrity', 'strategic_thinking'],
    'finance-ai-application': ['ai_literacy'],
    'finance-leadership-weight': ['business_partnering', 'leadership'],
    'finance-impact-type': ['financial_modeling', 'strategic_thinking'],

    # Sales Questions
    'sales-pipeline-reality': ['revenue_operations', 'strategic_thinking'],
    'sales-deal-stuck': ['deal_execution', 'strategic_thinking'],
    'sales-ai-usage': ['ai_literacy'],
    'sales-target-miss': ['sales_strategy', 'strategic_thinking'],
    'sales-forecasting': ['revenue_operations', 'data_driven_pm'],  # Using data_driven as proxy
    'sales-ownership': ['leadership', 'sales_strategy'],

    # Marketing Questions
    'marketing-conflicting-signals': ['growth_marketing', 'marketing_analytics', 'strategic_thinking'],
    'marketing-budget-shock': ['campaign_optimization', 'strategic_thinking'],
    'marketing-ai-application': ['ai_literacy'],
    'marketing-attribution-reality': ['marketing_analytics', 'strategic_thinking'],
    'marketing-scale-failure': ['growth_marketing', 'strategic_thinking'],
    'marketing-defend-metric': ['leadership', 'growth_marketing'],

    # Operations Questions
    'operations-scale-stress': ['operations_excellence', 'supply_chain', 'strategic_thinking'],
    'operations-cost-sla': ['operations_excellence', 'process_automation'],
    'operations-ai-leverage': ['ai_literacy', 'process_automation'],
    'operations-metric-priority': ['leadership', 'operations_excellence'],
    'operations-data-constraint': ['strategic_thinking', 'operations_excellence'],
    'operations-purpose': ['leadership', 'strategic_thinking'],

    # Founder Questions
    'founder-mvp-failure': ['venture_building', 'user_centricity'],  # Using user_centricity as proxy
    'founder-ai-dependency': ['ai_literacy', 'founder_resourcefulness'],
    'founder-scale-pain': ['business_fundamentals', 'strategic_thinking'],
    'founder-resource-constraint': ['founder_resourcefulness', 'business_fundamentals'],
    'founder-ai-advantage': ['ai_literacy', 'strategic_thinking'],
    'founder-failure-pattern': ['leadership', 'venture_building']
}


# ============================================================================
# ANSWER → SCORE MAPPINGS
# Each answer choice mapped to a 1-5 score
# ============================================================================

ANSWER_SCORES = {
    # -------------------- PRODUCT MANAGER --------------------

    'pm-retention-problem': {
        'resegment-cohorts': 5,  # Expert: Data-driven cohort analysis
        'qualitative-interviews': 4,  # Advanced: Good but less analytical
        'add-parity': 2,  # Developing: Reactive, not analytical
        'pause-for-data': 3   # Proficient: Cautious, neutral
    },

    'pm-roadmap-tradeoff': {
        'ai-feature': 2,  # Developing: Caving to pressure
        'incremental': 5,  # Expert: Data-driven, courageous
        'ai-wrapper': 1,  # Beginner: Worst of both worlds
        'parallel-discovery': 4   # Advanced: Diplomatic but spreads focus
    },

    'pm-mvp-validation': {
        'prd-mockups': 2,  # Developing: Static, no validation
        'nocode-prototype': 5,  # Expert: Interactive, realistic
        'ai-simulated': 4,  # Advanced: Creative AI leverage
        'interviews-only': 3   # Proficient: Qualitative only
    },

    'pm-metrics-conflict': {
        'north-star': 2,  # Developing: Ignoring revenue reality
        'revenue': 3,  # Proficient: Reactive but practical
        'leading-indicators': 4,  # Advanced: Analytical, forward-looking
        'unit-economics': 5   # Expert: Deepest understanding
    },

    'pm-ai-leverage': {
        'writing-prds': 2,  # Developing: Tactical speed gain
        'research-synthesis': 4,  # Advanced: Good insight generation
        'prioritization': 5,  # Expert: Strategic decision-making
        'impact-prediction': 5   # Expert: Strategic forecasting
    },

    'pm-failure-reflection': {
        'poor-data': 3,  # Proficient: External blame
        'wrong-assumptions': 5,  # Expert: Owns mental models
        'stakeholder-pressure': 2,  # Developing: Blaming others
        'execution-constraints': 3   # Proficient: External factors
    },

    # -------------------- FINANCE --------------------

    'finance-metrics-conflict': {
        'recheck-quietly': 2,  # Developing: Insecure, passive
        'present-as-is': 3,  # Proficient: Honest but blunt
        'scenarios': 5,  # Expert: Strategic communication
        'align-narrative': 4   # Advanced: Influential partnership
    },

    'finance-forecast-miss': {
        'conservative-buffers': 2,  # Developing: Band-aid solution
        'granular-drivers': 4,  # Advanced: More detail
        'scenario-modeling': 5,  # Expert: Strategic modeling
        'predictive-models': 5   # Expert: Advanced analytics
    },

    'finance-decision-speed': {
        'delay-decision': 1,  # Beginner: Risk-averse
        'historical-averages': 2,  # Developing: Simplistic
        'confidence-intervals': 5,  # Expert: Statistical rigor
        'ai-anomalies': 5   # Expert: AI-powered analysis
    },

    'finance-ai-application': {
        'faster-reporting': 2,  # Developing: Tactical efficiency
        'anomaly-detection': 4,  # Advanced: Analytical value
        'forecasting': 5,  # Expert: Strategic value
        'prescriptive': 5   # Expert: Decision automation
    },

    'finance-leadership-weight': {
        'leadership': 2,  # Developing: Passive role
        'cross-functional': 3,  # Proficient: Collaborative
        'shared': 4,  # Advanced: Partnership
        'me': 5   # Expert: Full accountability
    },

    'finance-impact-type': {
        'cost-reduction': 3,  # Proficient: Defensive value
        'revenue-optimization': 5,  # Expert: Revenue impact
        'risk-mitigation': 3,  # Proficient: Defensive value
        'strategic-pivot': 5   # Expert: Transformational
    },

    # -------------------- SALES --------------------

    'sales-pipeline-reality': {
        'push-volume': 1,  # Beginner: Activity trap
        'tighten-qualification': 5,  # Expert: Process thinking
        'analyze-winloss': 5,  # Expert: Data-driven diagnosis
        'change-pricing': 3   # Proficient: Quick fix attempt
    },

    'sales-deal-stuck': {
        'increase-followups': 1,  # Beginner: Activity trap
        'escalate-internally': 3,  # Proficient: Relationship leverage
        'analyze-blockers': 5,  # Expert: Pattern recognition
        'change-structure': 5   # Expert: Creative restructuring
    },

    'sales-ai-usage': {
        'email-drafts': 2,  # Developing: Tactical speed
        'call-summaries': 3,  # Proficient: Documentation help
        'deal-risk': 5,  # Expert: Strategic prediction
        'pricing-optimization': 5   # Expert: Revenue optimization
    },

    'sales-target-miss': {
        'lead-quality': 1,  # Beginner: Blaming marketing
        'icp-mismatch': 5,  # Expert: Strategic diagnosis
        'sales-motion': 5,  # Expert: Process design thinking
        'market-conditions': 2   # Developing: External blame
    },

    'sales-forecasting': {
        'rep-judgment': 2,  # Developing: Subjective
        'weighted-pipeline': 3,  # Proficient: Basic process
        'historical-patterns': 4,  # Advanced: Data-informed
        'predictive-models': 5   # Expert: Advanced analytics
    },

    'sales-ownership': {
        'activities': 2,  # Developing: Junior accountability
        'revenue-number': 4,  # Advanced: Individual contributor
        'team-number': 5,  # Expert: Manager accountability
        'region-business': 5   # Expert: Executive accountability
    },

    # -------------------- MARKETING --------------------

    'marketing-conflicting-signals': {
        'ctr': 1,  # Beginner: Vanity metric
        'cac': 3,  # Proficient: Cost awareness
        'ltv-cac-cohort': 5,  # Expert: Unit economics
        'revenue-attribution': 5   # Expert: Revenue connection
    },

    'marketing-budget-shock': {
        'experiments': 1,  # Beginner: Killing learning
        'branding': 3,  # Proficient: Cutting soft ROI
        'low-ltv-segments': 5,  # Expert: Unit economics thinking
        'agency-spend': 4   # Advanced: Cutting overhead
    },

    'marketing-ai-application': {
        'content-generation': 2,  # Developing: Tactical speed
        'creative-testing': 4,  # Advanced: Optimization
        'audience-prediction': 5,  # Expert: Strategic targeting
        'automated-optimization': 5   # Expert: Systematic advantage
    },

    'marketing-attribution-reality': {
        'accept-imperfect': 2,  # Developing: Passive
        'switch-model': 3,  # Proficient: Model-shopping
        'directional-insights': 5,  # Expert: Pragmatic analytics
        'ai-infer-patterns': 5   # Expert: Advanced inference
    },

    'marketing-scale-failure': {
        'saturation': 3,  # Proficient: Market awareness
        'messaging-mismatch': 4,  # Advanced: Positioning insight
        'funnel-leakage': 5,  # Expert: Conversion thinking
        'ops-constraints': 5   # Expert: Systems thinking
    },

    'marketing-defend-metric': {
        'leads': 2,  # Developing: Vanity metric
        'cac': 3,  # Proficient: Cost awareness
        'revenue-contribution': 5,  # Expert: Revenue accountability
        'ltv': 5   # Expert: Long-term value
    },

    # -------------------- OPERATIONS --------------------

    'operations-scale-stress': {
        'hiring-capacity': 2,  # Developing: Throwing headcount
        'process-design': 5,  # Expert: Systems thinking
        'data-visibility': 5,  # Expert: Instrumentation first
        'vendor-reliability': 4   # Advanced: Supply chain thinking
    },

    'operations-cost-sla': {
        'headcount': 1,  # Beginner: Throwing bodies
        'process-bottlenecks': 5,  # Expert: Root cause analysis
        'demand-variability': 4,  # Advanced: Demand management
        'automation-gaps': 5   # Expert: Tech leverage
    },

    'operations-ai-leverage': {
        'reporting': 2,  # Developing: Tactical speed
        'forecasting': 4,  # Advanced: Planning support
        'automation': 5,  # Expert: Process automation
        'decision-optimization': 5   # Expert: Strategic value
    },

    'operations-metric-priority': {
        'task-completion': 2,  # Developing: Activity metric
        'cost-per-unit': 4,  # Advanced: Efficiency metric
        'sla-adherence': 4,  # Advanced: Customer commitment
        'margin': 5   # Expert: Business outcome
    },

    'operations-data-constraint': {
        'wait': 1,  # Beginner: Paralysis
        'use-proxies': 4,  # Advanced: Pragmatic workaround
        'early-warning': 5,  # Expert: Leading indicators
        'ai-prediction': 5   # Expert: Predictive modeling
    },

    'operations-purpose': {
        'execute-plans': 2,  # Developing: Order-taking
        'reduce-cost': 3,  # Proficient: Tactical focus
        'enable-scale': 5,  # Expert: Strategic partner
        'competitive-advantage': 5   # Expert: Strategic weapon
    },

    # -------------------- FOUNDER --------------------

    'founder-mvp-failure': {
        'add-features': 1,  # Beginner: Feature factory
        'increase-marketing': 2,  # Developing: Distribution only
        'reframe-problem': 5,  # Expert: Problem understanding
        'pivot-icp': 5   # Expert: Customer understanding
    },

    'founder-ai-dependency': {
        'engineering': 4,  # Advanced: Common bottleneck
        'marketing': 3,  # Proficient: Distribution help
        'ops': 3,  # Proficient: Efficiency help
        'decision-making': 5   # Expert: Strategic leverage
    },

    'founder-scale-pain': {
        'pricing': 5,  # Expert: Unit economics
        'ops-inefficiency': 3,  # Proficient: Execution issue
        'customer-mix': 5,  # Expert: Segment understanding
        'data-blindness': 4   # Advanced: Instrumentation gap
    },

    'founder-resource-constraint': {
        'growth': 3,  # Proficient: Topline focus
        'profitability': 4,  # Advanced: Unit economics
        'learning': 5,  # Expert: Hypothesis validation
        'fundraising': 2   # Developing: Chasing capital
    },

    'founder-ai-advantage': {
        'speed': 3,  # Proficient: Tactical advantage
        'cost': 3,  # Proficient: Efficiency play
        'insight': 5,  # Expert: Intelligence advantage
        'differentiation': 5   # Expert: Product moat
    },

    'founder-failure-pattern': {
        'hiring-early': 3,  # Proficient: Execution mistake
        'scaling-fast': 3,  # Proficient: Timing mistake
        'weak-data': 5,  # Expert: Instrumentation gap
        'poor-problem': 5   # Expert: Market understanding
    }
}
