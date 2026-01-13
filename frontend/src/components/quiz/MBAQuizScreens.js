// Configuration for Business x AI MBA Quiz
import React from 'react';
import {
  Briefcase,
  ChartBar,
  TrendUp,
  MegaphoneSimple,
  Package,
  Lightbulb,
  Clock,
  Timer,
  Trophy,
  Target,
  CurrencyInr,
  Rocket,
  ChartLineUp,
  Users,
  Database,
  PresentationChart,
  ShoppingCart,
  Storefront,
  Buildings,
  Code,
  CheckCircle,
  XCircle,
  Path,
  Lightning,
  Brain,
  Gear
} from 'phosphor-react';

// Screen 1: Current Role/Background
export const MBA_INTAKE_SCREEN_1 = {
  id: 'current-role',
  initialChatText: "Welcome! Let's understand your professional background to personalize your MBA readiness assessment.",
  questions: [
    {
      id: 'currentRole',
      question: "What's your current role or background?",
      options: [
        { value: 'pm', label: 'Product / Program / Project Manager', icon: <Briefcase size={24} weight="duotone" /> },
        { value: 'finance', label: 'Finance / Business Analyst', icon: <ChartBar size={24} weight="duotone" /> },
        { value: 'sales', label: 'Sales / Growth / Revenue roles', icon: <TrendUp size={24} weight="duotone" /> },
        { value: 'marketing', label: 'Marketing / Brand / Performance Marketing', icon: <MegaphoneSimple size={24} weight="duotone" /> },
        { value: 'operations', label: 'Operations / Supply Chain / Strategy', icon: <Package size={24} weight="duotone" /> },
        { value: 'founder', label: 'Startup Founder / Entrepreneur', icon: <Lightbulb size={24} weight="duotone" /> }
      ]
    }
  ],
  chatResponseMap: {
    currentRole: {
      'pm': 'Excellent! Product managers with AI/data skills are transforming how companies build and scale products.',
      'finance': 'Great choice! Finance and analytics professionals are at the forefront of AI-driven decision making.',
      'sales': 'Perfect! Sales and growth leaders who understand AI are revolutionizing revenue operations.',
      'marketing': 'Awesome! Marketing professionals leveraging AI are seeing unprecedented ROI and scale.',
      'operations': 'Fantastic! Operations and strategy roles are being redefined by AI and automation.',
      'founder': 'Impressive! Founders who master AI have a massive competitive advantage in building and scaling.'
    }
  }
};

// Screen 2: Experience + Career Goal
export const MBA_INTAKE_SCREEN_2 = {
  id: 'experience-and-goals',
  initialChatText: "Now let's understand your experience level and what you're aiming to achieve.",
  questions: [
    {
      id: 'experience',
      question: 'How many years of total work experience do you have?',
      options: [
        { value: '0-1', label: '0–1 year', icon: <Clock size={24} weight="duotone" /> },
        { value: '1-3', label: '1–3 years', icon: <Timer size={24} weight="duotone" /> },
        { value: '3-6', label: '3–6 years', icon: <Briefcase size={24} weight="duotone" /> },
        { value: '6-10', label: '6–10 years', icon: <TrendUp size={24} weight="duotone" /> },
        { value: '10+', label: '10+ years', icon: <Trophy size={24} weight="duotone" /> }
      ]
    },
    {
      id: 'primaryGoal',
      question: "What's your primary career goal?",
      options: [
        { value: 'ai-leadership', label: 'Move into a Business + AI leadership role', icon: <ChartLineUp size={24} weight="duotone" /> },
        { value: 'ai-pm', label: 'Become a Product Manager with strong AI/data skills', icon: <Target size={24} weight="duotone" /> },
        { value: 'analytics-strategy', label: 'Transition into Business Analytics / Strategy', icon: <ChartBar size={24} weight="duotone" /> },
        { value: 'improve-current', label: 'Improve performance & growth in current role', icon: <TrendUp size={24} weight="duotone" /> },
        { value: 'build-startup', label: 'Build / scale my own startup using AI', icon: <Rocket size={24} weight="duotone" /> },
        { value: 'salary-growth', label: 'Higher salary & faster career growth', icon: <CurrencyInr size={24} weight="duotone" /> }
      ]
    }
  ],
  chatResponseMap: {
    experience: {
      '0-1': 'Early in your career - perfect time to build strong business + AI foundations!',
      '1-3': 'Great timing! You have enough context to leverage AI strategically in your role.',
      '3-6': "You're at an inflection point. AI skills can accelerate your path to senior/leadership roles.",
      '6-10': 'Solid experience! AI + business acumen will position you for executive opportunities.',
      '10+': 'Seasoned professional! AI mastery will multiply your decades of business insight.'
    },
    primaryGoal: {
      'ai-leadership': 'Ambitious! AI-fluent business leaders are the most sought-after talent right now.',
      'ai-pm': 'Smart choice! AI-native PMs command premium salaries and drive critical decisions.',
      'analytics-strategy': 'Excellent path! Strategy roles increasingly require AI/data fluency for impact.',
      'improve-current': 'Practical! AI can 10x your effectiveness and make you indispensable in your role.',
      'build-startup': 'Bold! Founders who master AI have unfair advantages in speed, scale, and capital efficiency.',
      'salary-growth': 'Valid goal! Business + AI professionals command 30-50% salary premiums.'
    }
  }
};

// Role-specific deep-dive questions
export const MBA_ROLE_SPECIFIC_SCREENS = {
  'pm': [
    // Screen 3: PM Questions 1-2
    {
      id: 'pm-screen-1',
      initialChatText: "Let's dive into your product thinking and decision-making approach.",
      questions: [
        {
          id: 'pm-retention-problem',
          question: 'You launched a new product/feature. Adoption is high, but 30-day retention is below 15%. Engineering says "feature parity gap," sales says "wrong ICP (Ideal Customer Profile)." What do you do first?',
          helperText: 'This tests problem framing and sequencing',
          isScenario: true,
          options: [
            { value: 'resegment-cohorts', label: 'Re-segment cohorts by acquisition source + JTBD (Jobs To Be Done)', icon: <ChartBar size={24} weight="duotone" /> },
            { value: 'qualitative-interviews', label: 'Run qualitative interviews with churned users', icon: <Users size={24} weight="duotone" /> },
            { value: 'add-parity', label: 'Add parity features requested by sales team', icon: <Code size={24} weight="duotone" /> },
            { value: 'pause-for-data', label: 'Pause roadmap changes and wait for more data', icon: <Clock size={24} weight="duotone" /> }
          ]
        },
        {
          id: 'pm-roadmap-tradeoff',
          question: 'Leadership wants a big-bang AI feature for market positioning. However, your data shows incremental improvements give better ROI (Return on Investment). What do you ship?',
          helperText: 'Tests strategic courage and stakeholder management',
          isScenario: true,
          options: [
            { value: 'ai-feature', label: 'Ship AI feature to align with leadership vision', icon: <Brain size={24} weight="duotone" /> },
            { value: 'incremental', label: 'Ship incremental improvements backed by metrics', icon: <TrendUp size={24} weight="duotone" /> },
            { value: 'ai-wrapper', label: 'Build a thin AI layer on existing flows (compromise)', icon: <Lightning size={24} weight="duotone" /> },
            { value: 'parallel-discovery', label: 'Run parallel discovery to validate both approaches', icon: <Path size={24} weight="duotone" /> }
          ]
        }
      ]
    },
    // Screen 4: PM Questions 3-4
    {
      id: 'pm-screen-2',
      initialChatText: "Now let's explore your execution approach and metrics thinking.",
      questions: [
        {
          id: 'pm-mvp-validation',
          question: 'You must validate a new workflow in 2 weeks with no engineers assigned to you. What do you actually build?',
          helperText: 'Tests execution bias and AI leverage',
          isScenario: true,
          options: [
            { value: 'prd-mockups', label: 'PRD (Product Requirements Document) + mockups only', icon: <PresentationChart size={24} weight="duotone" /> },
            { value: 'nocode-prototype', label: 'No-code prototype with realistic data flows', icon: <Code size={24} weight="duotone" /> },
            { value: 'ai-simulated', label: 'AI-simulated workflow using prompts & automation', icon: <Brain size={24} weight="duotone" /> },
            { value: 'interviews-only', label: 'Customer interviews only (no prototype)', icon: <Users size={24} weight="duotone" /> }
          ]
        },
        {
          id: 'pm-metrics-conflict',
          question: 'Your north-star metric (primary success metric) improves significantly, but downstream revenue remains stagnant. What do you trust more?',
          helperText: 'Tests senior metric thinking',
          isScenario: true,
          options: [
            { value: 'north-star', label: 'Trust the north-star metric', icon: <Target size={24} weight="duotone" /> },
            { value: 'revenue', label: 'Trust the revenue metrics', icon: <CurrencyInr size={24} weight="duotone" /> },
            { value: 'leading-indicators', label: 'Look at leading indicators between both', icon: <TrendUp size={24} weight="duotone" /> },
            { value: 'unit-economics', label: 'Analyze segment-specific unit economics', icon: <ChartBar size={24} weight="duotone" /> }
          ]
        }
      ]
    },
    // Screen 5: PM Questions 5-6
    {
      id: 'pm-screen-3',
      initialChatText: "Finally, let's assess your AI leverage and self-awareness as a PM.",
      questions: [
        {
          id: 'pm-ai-leverage',
          question: 'Where do you think AI would add the highest leverage and value in your current PM (Product Manager) role?',
          options: [
            { value: 'writing-prds', label: 'Writing PRDs (Product Requirements Documents) faster', icon: <PresentationChart size={24} weight="duotone" /> },
            { value: 'research-synthesis', label: 'Synthesizing qualitative user research insights', icon: <Users size={24} weight="duotone" /> },
            { value: 'prioritization', label: 'Prioritization frameworks and trade-off modeling', icon: <Target size={24} weight="duotone" /> },
            { value: 'impact-prediction', label: 'Predicting feature and roadmap business impact', icon: <ChartLineUp size={24} weight="duotone" /> }
          ]
        },
        {
          id: 'pm-failure-reflection',
          question: 'When you look back at your career, what do you think caused your most expensive product mistake or failure?',
          helperText: 'Tests self-awareness and seniority',
          options: [
            { value: 'poor-data', label: 'Poor data quality or insufficient metrics', icon: <XCircle size={24} weight="duotone" /> },
            { value: 'wrong-assumptions', label: 'Incorrect assumptions about user needs', icon: <Brain size={24} weight="duotone" /> },
            { value: 'stakeholder-pressure', label: 'Stakeholder pressure overriding product judgment', icon: <Users size={24} weight="duotone" /> },
            { value: 'execution-constraints', label: 'Execution constraints (time, resources, dependencies)', icon: <Gear size={24} weight="duotone" /> }
          ]
        }
      ]
    }
  ],

  'finance': [
    // Screen 3: Finance Questions 1-2
    {
      id: 'finance-screen-1',
      initialChatText: "Let's assess your analytical depth and stakeholder management.",
      questions: [
        {
          id: 'finance-model-contradiction',
          question: 'Your financial model shows approximately 20% downside risk, contradicting leadership\'s intuition. What do you do?',
          helperText: 'Tests executive communication maturity',
          isScenario: true,
          options: [
            { value: 'recheck-quietly', label: 'Re-check all assumptions quietly before presenting', icon: <CheckCircle size={24} weight="duotone" /> },
            { value: 'present-as-is', label: 'Present model as-is with full transparency', icon: <PresentationChart size={24} weight="duotone" /> },
            { value: 'scenarios', label: 'Build multiple upside/downside scenario models', icon: <Path size={24} weight="duotone" /> },
            { value: 'align-narrative', label: 'Align narrative with leadership before presenting', icon: <Users size={24} weight="duotone" /> }
          ]
        },
        {
          id: 'finance-forecast-miss',
          question: 'Your quarterly forecast missed by 18% QoQ (Quarter over Quarter). Root cause is unclear. What changes do you make for next quarter?',
          helperText: 'Tests analytical depth',
          isScenario: true,
          options: [
            { value: 'conservative-buffers', label: 'Add conservative buffers to all projections', icon: <Target size={24} weight="duotone" /> },
            { value: 'granular-drivers', label: 'Break down into more granular business drivers', icon: <ChartBar size={24} weight="duotone" /> },
            { value: 'scenario-modeling', label: 'Build scenario + sensitivity modeling framework', icon: <Path size={24} weight="duotone" /> },
            { value: 'predictive-models', label: 'Use predictive models with leading indicators', icon: <Brain size={24} weight="duotone" /> }
          ]
        }
      ]
    },
    // Screen 4: Finance Questions 3-4
    {
      id: 'finance-screen-2',
      initialChatText: "Let's explore your approach to data quality and AI application.",
      questions: [
        {
          id: 'finance-data-quality',
          question: 'Key datasets are noisy and incomplete, but urgent business decisions cannot wait. What do you do?',
          helperText: 'Tests real-world analytics maturity',
          isScenario: true,
          options: [
            { value: 'delay-decision', label: 'Delay decision until data quality improves', icon: <Clock size={24} weight="duotone" /> },
            { value: 'historical-averages', label: 'Use historical averages as proxy', icon: <ChartBar size={24} weight="duotone" /> },
            { value: 'confidence-intervals', label: 'Build confidence intervals to show uncertainty', icon: <Target size={24} weight="duotone" /> },
            { value: 'ai-anomalies', label: 'Use AI to flag anomalies & reduce bias', icon: <Brain size={24} weight="duotone" /> }
          ]
        },
        {
          id: 'finance-ai-value',
          question: 'Where do you think AI would deliver actual business value today in your finance and analytics work?',
          options: [
            { value: 'faster-reporting', label: 'Faster reporting - automating report generation', icon: <Lightning size={24} weight="duotone" /> },
            { value: 'anomaly-detection', label: 'Anomaly detection - flagging unusual patterns', icon: <Target size={24} weight="duotone" /> },
            { value: 'forecasting', label: 'Forecasting and scenario simulations', icon: <ChartLineUp size={24} weight="duotone" /> },
            { value: 'prescriptive', label: 'Prescriptive recommendations - actionable insights', icon: <Brain size={24} weight="duotone" /> }
          ]
        }
      ]
    },
    // Screen 5: Finance Questions 5-6
    {
      id: 'finance-screen-3',
      initialChatText: "Finally, let's understand your accountability and business impact.",
      questions: [
        {
          id: 'finance-ownership',
          question: 'In your current role, who do you think ultimately owns the outcome and business impact of your financial analysis?',
          helperText: 'Tests trust and seniority',
          options: [
            { value: 'leadership', label: 'Leadership team makes the final decisions', icon: <Users size={24} weight="duotone" /> },
            { value: 'cross-functional', label: 'Cross-functional team owns it collectively', icon: <Buildings size={24} weight="duotone" /> },
            { value: 'shared', label: 'Me and leadership share ownership jointly', icon: <Target size={24} weight="duotone" /> },
            { value: 'me', label: 'I own the outcome and accountability', icon: <Trophy size={24} weight="duotone" /> }
          ]
        },
        {
          id: 'finance-impact',
          question: 'Looking back at your career, which type of financial analysis do you think created the most business impact?',
          helperText: 'Tests business orientation',
          options: [
            { value: 'cost-reduction', label: 'Cost reduction - identifying savings opportunities', icon: <TrendUp size={24} weight="duotone" /> },
            { value: 'revenue-optimization', label: 'Revenue optimization - pricing or growth strategies', icon: <CurrencyInr size={24} weight="duotone" /> },
            { value: 'risk-mitigation', label: 'Risk mitigation - preventing financial losses', icon: <CheckCircle size={24} weight="duotone" /> },
            { value: 'strategic-pivot', label: 'Strategic pivot - changing business direction', icon: <Path size={24} weight="duotone" /> }
          ]
        }
      ]
    }
  ],

  // Sales, Marketing, Operations, and Founder roles fully implemented
  // Student and Other roles remain as placeholders (decision needed on approach)
  'sales': [
    // Screen 3: Sales Questions 1-2
    {
      id: 'sales-screen-1',
      initialChatText: "Let's dive into your sales approach and revenue thinking.",
      questions: [
        {
          id: 'sales-pipeline-reality',
          question: 'Your sales pipeline coverage is 3× the target, but your close rate is dropping. What would be your first move?',
          helperText: 'Tests revenue maturity',
          isScenario: true,
          options: [
            { value: 'push-volume', label: 'Push more volume into the pipeline', icon: <TrendUp size={24} weight="duotone" /> },
            { value: 'tighten-qualification', label: 'Tighten lead qualification criteria', icon: <Target size={24} weight="duotone" /> },
            { value: 'analyze-winloss', label: 'Analyze win/loss patterns deeply', icon: <ChartBar size={24} weight="duotone" /> },
            { value: 'change-pricing', label: 'Change pricing or packaging structure', icon: <CurrencyInr size={24} weight="duotone" /> }
          ]
        },
        {
          id: 'sales-deal-stuck',
          question: 'A large deal is stuck at final approval stage for weeks. What do you do?',
          helperText: 'Tests pattern recognition',
          isScenario: true,
          options: [
            { value: 'increase-followups', label: 'Increase follow-up frequency with the prospect', icon: <Clock size={24} weight="duotone" /> },
            { value: 'escalate-internally', label: 'Escalate to senior leadership internally', icon: <Users size={24} weight="duotone" /> },
            { value: 'analyze-blockers', label: 'Analyze historical blockers from similar deals', icon: <ChartBar size={24} weight="duotone" /> },
            { value: 'change-structure', label: 'Restructure the deal terms', icon: <Path size={24} weight="duotone" /> }
          ]
        }
      ]
    },
    // Screen 4: Sales Questions 3-4
    {
      id: 'sales-screen-2',
      initialChatText: "Now let's explore your AI application and systems thinking.",
      questions: [
        {
          id: 'sales-ai-usage',
          question: 'Where do you think AI actually helps and adds value in your sales work today?',
          helperText: 'Tests senior AI usage',
          options: [
            { value: 'email-drafts', label: 'Email drafts - writing prospect communications', icon: <Lightning size={24} weight="duotone" /> },
            { value: 'call-summaries', label: 'Call summaries - documenting conversations', icon: <PresentationChart size={24} weight="duotone" /> },
            { value: 'deal-risk', label: 'Deal risk prediction - forecasting win probability', icon: <Target size={24} weight="duotone" /> },
            { value: 'pricing-optimization', label: 'Pricing and discount optimization strategies', icon: <CurrencyInr size={24} weight="duotone" /> }
          ]
        },
        {
          id: 'sales-target-miss',
          question: 'You missed your sales quota despite strong activity metrics (calls, meetings, demos). What do you think is the root cause?',
          helperText: 'Tests systems thinking',
          isScenario: true,
          options: [
            { value: 'lead-quality', label: 'Poor lead quality from marketing', icon: <Target size={24} weight="duotone" /> },
            { value: 'icp-mismatch', label: 'ICP (Ideal Customer Profile) mismatch', icon: <Users size={24} weight="duotone" /> },
            { value: 'sales-motion', label: 'Flawed sales motion or process design', icon: <Path size={24} weight="duotone" /> },
            { value: 'market-conditions', label: 'External market conditions', icon: <ChartLineUp size={24} weight="duotone" /> }
          ]
        }
      ]
    },
    // Screen 5: Sales Questions 5-6
    {
      id: 'sales-screen-3',
      initialChatText: "Finally, let's assess your data maturity and ownership level.",
      questions: [
        {
          id: 'sales-forecasting',
          question: 'What do you think your sales forecast is primarily based on today?',
          helperText: 'Tests data maturity',
          options: [
            { value: 'rep-judgment', label: 'Rep judgment - sales team intuition and estimates', icon: <Users size={24} weight="duotone" /> },
            { value: 'weighted-pipeline', label: 'Weighted pipeline - stage-based probability scoring', icon: <Target size={24} weight="duotone" /> },
            { value: 'historical-patterns', label: 'Historical patterns - past performance trends', icon: <ChartBar size={24} weight="duotone" /> },
            { value: 'predictive-models', label: 'Predictive models - AI-driven forecasting', icon: <Brain size={24} weight="duotone" /> }
          ]
        },
        {
          id: 'sales-ownership',
          question: 'In your current sales role, what do you think you own and are accountable for?',
          helperText: 'Tests seniority',
          options: [
            { value: 'activities', label: 'Activities - calls, meetings, and demos', icon: <Clock size={24} weight="duotone" /> },
            { value: 'revenue-number', label: 'Revenue number - personal quota achievement', icon: <CurrencyInr size={24} weight="duotone" /> },
            { value: 'team-number', label: 'Team number - managing team quota', icon: <Users size={24} weight="duotone" /> },
            { value: 'region-business', label: 'Region or business unit performance', icon: <Buildings size={24} weight="duotone" /> }
          ]
        }
      ]
    }
  ],
  'marketing': [
    // Screen 3: Marketing Questions 1-2
    {
      id: 'marketing-screen-1',
      initialChatText: "Let's explore your marketing analytics and strategic thinking.",
      questions: [
        {
          id: 'marketing-conflicting-signals',
          question: 'Your CTR (Click-Through Rate) is up, CAC (Customer Acquisition Cost) is up, but Revenue is down. What metric do you trust most to make decisions?',
          helperText: 'Tests metric hierarchy understanding',
          isScenario: true,
          options: [
            { value: 'ctr', label: 'Trust CTR (Click-Through Rate)', icon: <ChartLineUp size={24} weight="duotone" /> },
            { value: 'cac', label: 'Trust CAC (Customer Acquisition Cost)', icon: <CurrencyInr size={24} weight="duotone" /> },
            { value: 'ltv-cac-cohort', label: 'Analyze LTV/CAC (Lifetime Value to CAC ratio) by cohort', icon: <ChartBar size={24} weight="duotone" /> },
            { value: 'revenue-attribution', label: 'Build a comprehensive revenue attribution model', icon: <Target size={24} weight="duotone" /> }
          ]
        },
        {
          id: 'marketing-budget-shock',
          question: 'Your marketing budget is cut by 30%, but growth targets remain unchanged. What would you cut first?',
          helperText: 'Tests ROI thinking',
          isScenario: true,
          options: [
            { value: 'experiments', label: 'New experiments and testing', icon: <Lightning size={24} weight="duotone" /> },
            { value: 'branding', label: 'Brand awareness campaigns', icon: <MegaphoneSimple size={24} weight="duotone" /> },
            { value: 'low-ltv-segments', label: 'Low LTV (Lifetime Value) customer segments', icon: <Target size={24} weight="duotone" /> },
            { value: 'agency-spend', label: 'External agency spend', icon: <CurrencyInr size={24} weight="duotone" /> }
          ]
        }
      ]
    },
    // Screen 4: Marketing Questions 3-4
    {
      id: 'marketing-screen-2',
      initialChatText: "Now let's assess your AI maturity and pragmatic decision-making.",
      questions: [
        {
          id: 'marketing-ai-application',
          question: 'Where do you think AI creates a defensible competitive advantage in marketing?',
          helperText: 'Tests AI maturity',
          options: [
            { value: 'content-generation', label: 'Content generation - creating marketing copy at scale', icon: <Lightning size={24} weight="duotone" /> },
            { value: 'creative-testing', label: 'Creative testing - rapid A/B experimentation', icon: <Target size={24} weight="duotone" /> },
            { value: 'audience-prediction', label: 'Audience prediction - identifying high-intent segments', icon: <Users size={24} weight="duotone" /> },
            { value: 'automated-optimization', label: 'Automated optimization loops - self-improving campaigns', icon: <Gear size={24} weight="duotone" /> }
          ]
        },
        {
          id: 'marketing-attribution-reality',
          question: 'Your attribution data is unreliable and inconsistent. What do you do?',
          helperText: 'Tests senior pragmatism',
          isScenario: true,
          options: [
            { value: 'accept-imperfect', label: 'Accept imperfect data and move forward', icon: <CheckCircle size={24} weight="duotone" /> },
            { value: 'switch-model', label: 'Switch to a different attribution model', icon: <Path size={24} weight="duotone" /> },
            { value: 'directional-insights', label: 'Build directional insights with caveats', icon: <ChartBar size={24} weight="duotone" /> },
            { value: 'ai-infer-patterns', label: 'Use AI to infer hidden patterns', icon: <Brain size={24} weight="duotone" /> }
          ]
        }
      ]
    },
    // Screen 5: Marketing Questions 5-6
    {
      id: 'marketing-screen-3',
      initialChatText: "Finally, let's understand your systems thinking and accountability.",
      questions: [
        {
          id: 'marketing-scale-failure',
          question: 'Your growth campaign scaled initially but now has completely stalled. What do you think is the most likely reason?',
          helperText: 'Tests systems thinking',
          isScenario: true,
          options: [
            { value: 'saturation', label: 'Market saturation - ran out of addressable audience', icon: <ChartLineUp size={24} weight="duotone" /> },
            { value: 'messaging-mismatch', label: 'Messaging mismatch with new audience segments', icon: <MegaphoneSimple size={24} weight="duotone" /> },
            { value: 'funnel-leakage', label: 'Conversion funnel leakage at scale', icon: <Path size={24} weight="duotone" /> },
            { value: 'ops-constraints', label: 'Operations constraints (fulfillment, support)', icon: <Gear size={24} weight="duotone" /> }
          ]
        },
        {
          id: 'marketing-leadership-metric',
          question: 'Which metric do you defend and own in leadership reviews and stakeholder meetings?',
          helperText: 'Tests senior accountability',
          options: [
            { value: 'leads', label: 'Leads - total lead volume generated', icon: <Users size={24} weight="duotone" /> },
            { value: 'cac', label: 'CAC (Customer Acquisition Cost)', icon: <CurrencyInr size={24} weight="duotone" /> },
            { value: 'revenue-contribution', label: 'Revenue contribution - marketing-attributed revenue', icon: <ChartLineUp size={24} weight="duotone" /> },
            { value: 'ltv', label: 'LTV (Lifetime Value) of acquired customers', icon: <Trophy size={24} weight="duotone" /> }
          ]
        }
      ]
    }
  ],
  'operations': [
    // Screen 3: Operations Questions 1-2
    {
      id: 'operations-screen-1',
      initialChatText: "Let's explore your operations thinking and problem-solving approach.",
      questions: [
        {
          id: 'operations-scale-stress',
          question: 'Your product demand doubles in just 90 days. What do you think will break first in your operations?',
          helperText: 'Tests system-level thinking',
          isScenario: true,
          options: [
            { value: 'hiring-capacity', label: 'Hiring capacity - unable to scale team fast enough', icon: <Users size={24} weight="duotone" /> },
            { value: 'process-design', label: 'Process design - workflows not built for scale', icon: <Gear size={24} weight="duotone" /> },
            { value: 'data-visibility', label: 'Data visibility - losing insights at scale', icon: <Database size={24} weight="duotone" /> },
            { value: 'vendor-reliability', label: 'Vendor reliability - third-party dependencies', icon: <Buildings size={24} weight="duotone" /> }
          ]
        },
        {
          id: 'operations-cost-sla',
          question: 'Your operational costs are rising while SLA (Service Level Agreement) performance is dropping. What would you fix first?',
          helperText: 'Tests ops maturity',
          isScenario: true,
          options: [
            { value: 'headcount', label: 'Headcount - hire more people', icon: <Users size={24} weight="duotone" /> },
            { value: 'process-bottlenecks', label: 'Process bottlenecks - fix inefficient workflows', icon: <Path size={24} weight="duotone" /> },
            { value: 'demand-variability', label: 'Demand variability - better forecasting', icon: <ChartLineUp size={24} weight="duotone" /> },
            { value: 'automation-gaps', label: 'Automation gaps - identify manual work to automate', icon: <Gear size={24} weight="duotone" /> }
          ]
        }
      ]
    },
    // Screen 4: Operations Questions 3-4
    {
      id: 'operations-screen-2',
      initialChatText: "Now let's assess your AI application and accountability.",
      questions: [
        {
          id: 'operations-ai-leverage',
          question: 'Where do you think AI delivers the highest ROI (Return on Investment) in your operations work?',
          helperText: 'Tests AI application depth',
          options: [
            { value: 'reporting', label: 'Reporting - automated dashboards and insights', icon: <PresentationChart size={24} weight="duotone" /> },
            { value: 'forecasting', label: 'Forecasting - demand and capacity prediction', icon: <ChartLineUp size={24} weight="duotone" /> },
            { value: 'automation', label: 'Automation - eliminating manual workflows', icon: <Gear size={24} weight="duotone" /> },
            { value: 'decision-optimization', label: 'Decision optimization - smarter resource allocation', icon: <Brain size={24} weight="duotone" /> }
          ]
        },
        {
          id: 'operations-ownership',
          question: 'Which metric do you think keeps you up at night and worries you the most?',
          helperText: 'Tests accountability',
          options: [
            { value: 'task-completion', label: 'Task completion - getting things done on time', icon: <CheckCircle size={24} weight="duotone" /> },
            { value: 'cost-per-unit', label: 'Cost per unit - operational efficiency', icon: <CurrencyInr size={24} weight="duotone" /> },
            { value: 'sla-adherence', label: 'SLA (Service Level Agreement) adherence - meeting commitments', icon: <Target size={24} weight="duotone" /> },
            { value: 'margin', label: 'Margin - profitability of operations', icon: <ChartBar size={24} weight="duotone" /> }
          ]
        }
      ]
    },
    // Screen 5: Operations Questions 5-6
    {
      id: 'operations-screen-3',
      initialChatText: "Finally, let's understand your pragmatism and strategic framing.",
      questions: [
        {
          id: 'operations-data-constraint',
          question: 'Your operations data is delayed by 2 weeks, but decisions need to be made now. What do you do?',
          helperText: 'Tests senior pragmatism',
          isScenario: true,
          options: [
            { value: 'wait', label: 'Wait for accurate data before making decisions', icon: <Clock size={24} weight="duotone" /> },
            { value: 'use-proxies', label: 'Use proxy metrics as temporary alternatives', icon: <Target size={24} weight="duotone" /> },
            { value: 'early-warning', label: 'Build real-time early-warning indicator system', icon: <Lightning size={24} weight="duotone" /> },
            { value: 'ai-prediction', label: 'Use AI models to predict missing data', icon: <Brain size={24} weight="duotone" /> }
          ]
        },
        {
          id: 'operations-strategic-role',
          question: 'In your view, what do you think operations exists primarily to accomplish?',
          helperText: 'Tests senior framing',
          options: [
            { value: 'execute-plans', label: 'Execute plans - deliver on commitments', icon: <CheckCircle size={24} weight="duotone" /> },
            { value: 'reduce-cost', label: 'Reduce cost - maximize efficiency', icon: <CurrencyInr size={24} weight="duotone" /> },
            { value: 'enable-scale', label: 'Enable scale - support rapid growth', icon: <TrendUp size={24} weight="duotone" /> },
            { value: 'competitive-advantage', label: 'Drive competitive advantage - ops as strategy', icon: <Trophy size={24} weight="duotone" /> }
          ]
        }
      ]
    }
  ],
  'founder': [
    // Screen 3: Founder Questions 1-2
    {
      id: 'founder-screen-1',
      initialChatText: "Let's explore your founder mindset and strategic approach.",
      questions: [
        {
          id: 'founder-mvp-failure',
          question: 'Users are signing up for your product but not returning. What do you do?',
          helperText: 'Tests founder maturity',
          isScenario: true,
          options: [
            { value: 'add-features', label: 'Add more features to increase value', icon: <Code size={24} weight="duotone" /> },
            { value: 'increase-marketing', label: 'Increase marketing to get more users', icon: <MegaphoneSimple size={24} weight="duotone" /> },
            { value: 'reframe-problem', label: 'Reframe the problem you\'re solving', icon: <Brain size={24} weight="duotone" /> },
            { value: 'pivot-icp', label: 'Pivot to a different ICP (Ideal Customer Profile)', icon: <Users size={24} weight="duotone" /> }
          ]
        },
        {
          id: 'founder-ai-dependency',
          question: 'Which team dependency do you think AI would help you remove or reduce first in your startup?',
          helperText: 'Tests AI strategy',
          options: [
            { value: 'engineering', label: 'Engineering - building and shipping product', icon: <Code size={24} weight="duotone" /> },
            { value: 'marketing', label: 'Marketing - customer acquisition and content', icon: <MegaphoneSimple size={24} weight="duotone" /> },
            { value: 'ops', label: 'Operations - workflows and processes', icon: <Gear size={24} weight="duotone" /> },
            { value: 'decision-making', label: 'Decision-making - strategic choices and insights', icon: <Brain size={24} weight="duotone" /> }
          ]
        }
      ]
    },
    // Screen 4: Founder Questions 3-4
    {
      id: 'founder-screen-2',
      initialChatText: "Now let's assess your business maturity and resource prioritization.",
      questions: [
        {
          id: 'founder-scale-pain',
          question: 'Your revenue is growing but profit margins are falling. What do you think is the root cause?',
          helperText: 'Tests business maturity',
          isScenario: true,
          options: [
            { value: 'pricing', label: 'Pricing strategy is too aggressive', icon: <CurrencyInr size={24} weight="duotone" /> },
            { value: 'ops-inefficiency', label: 'Operations inefficiency at scale', icon: <Gear size={24} weight="duotone" /> },
            { value: 'customer-mix', label: 'Customer mix - acquiring wrong segment', icon: <Users size={24} weight="duotone" /> },
            { value: 'data-blindness', label: 'Data blindness - not tracking unit economics', icon: <Database size={24} weight="duotone" /> }
          ]
        },
        {
          id: 'founder-resource-constraint',
          question: 'You have only 3 people and 6 months of runway. What would you optimize for?',
          helperText: 'Tests founder intent',
          isScenario: true,
          options: [
            { value: 'growth', label: 'Growth - maximize user acquisition', icon: <TrendUp size={24} weight="duotone" /> },
            { value: 'profitability', label: 'Profitability - reach break-even', icon: <CurrencyInr size={24} weight="duotone" /> },
            { value: 'learning', label: 'Learning - validate key assumptions', icon: <Lightbulb size={24} weight="duotone" /> },
            { value: 'fundraising', label: 'Fundraising - build deck and meet investors', icon: <Rocket size={24} weight="duotone" /> }
          ]
        }
      ]
    },
    // Screen 5: Founder Questions 5-6
    {
      id: 'founder-screen-3',
      initialChatText: "Finally, let's understand your AI strategy and self-awareness.",
      questions: [
        {
          id: 'founder-ai-advantage',
          question: 'How do you think AI helps your startup the most right now?',
          helperText: 'Tests strategic thinking',
          options: [
            { value: 'speed', label: 'Speed - shipping faster and iterating quickly', icon: <Lightning size={24} weight="duotone" /> },
            { value: 'cost', label: 'Cost - reducing burn rate and expenses', icon: <CurrencyInr size={24} weight="duotone" /> },
            { value: 'insight', label: 'Insight - better data-driven decisions', icon: <Brain size={24} weight="duotone" /> },
            { value: 'differentiation', label: 'Differentiation - unique competitive advantage', icon: <Trophy size={24} weight="duotone" /> }
          ]
        },
        {
          id: 'founder-failure-pattern',
          question: 'When you reflect on your journey, what do you think was your biggest mistake so far?',
          helperText: 'Tests reflection depth',
          options: [
            { value: 'hiring-early', label: 'Hiring too early - scaling team prematurely', icon: <Users size={24} weight="duotone" /> },
            { value: 'scaling-fast', label: 'Scaling too fast - overextending operations', icon: <Rocket size={24} weight="duotone" /> },
            { value: 'weak-data', label: 'Weak data - not tracking metrics early enough', icon: <Database size={24} weight="duotone" /> },
            { value: 'poor-problem', label: 'Poor problem selection - solving wrong problem', icon: <Target size={24} weight="duotone" /> }
          ]
        }
      ]
    }
  ]
};

// Helper to check if all questions in a screen are answered
export const isScreenComplete = (screenId, responses) => {
  // Implementation will be handled in the orchestrator
  return true;
};
