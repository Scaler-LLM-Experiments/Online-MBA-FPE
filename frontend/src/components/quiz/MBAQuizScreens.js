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
          question: 'You launched a new product/feature. Adoption is high, but 30-day retention is <15%. Engineering says "feature parity gap," sales says "wrong ICP." What do you do first?',
          helperText: 'This tests problem framing and sequencing',
          options: [
            { value: 'resegment-cohorts', label: 'Re-segment cohorts by acquisition source + JTBD', icon: <ChartBar size={24} weight="duotone" /> },
            { value: 'qualitative-interviews', label: 'Run qualitative interviews immediately', icon: <Users size={24} weight="duotone" /> },
            { value: 'add-parity', label: 'Add parity features requested by sales', icon: <Code size={24} weight="duotone" /> },
            { value: 'pause-for-data', label: 'Pause roadmap changes for more data', icon: <Clock size={24} weight="duotone" /> }
          ]
        },
        {
          id: 'pm-roadmap-tradeoff',
          question: 'Leadership wants a big-bang AI feature for positioning. Data shows incremental improvements give better ROI. What do you ship?',
          helperText: 'Tests strategic courage and stakeholder management',
          options: [
            { value: 'ai-feature', label: 'AI feature to align with leadership narrative', icon: <Brain size={24} weight="duotone" /> },
            { value: 'incremental', label: 'Incremental improvements with strong metrics', icon: <TrendUp size={24} weight="duotone" /> },
            { value: 'ai-wrapper', label: 'A thin AI wrapper on top of existing flows', icon: <Lightning size={24} weight="duotone" /> },
            { value: 'parallel-discovery', label: 'Run parallel discovery for both', icon: <Path size={24} weight="duotone" /> }
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
          question: 'You must validate a new workflow in 2 weeks, no engineers assigned. What do you actually build?',
          helperText: 'Tests execution bias and AI leverage',
          options: [
            { value: 'prd-mockups', label: 'PRD + mockups only', icon: <PresentationChart size={24} weight="duotone" /> },
            { value: 'nocode-prototype', label: 'No-code prototype with realistic data flows', icon: <Code size={24} weight="duotone" /> },
            { value: 'ai-simulated', label: 'AI-simulated workflow (prompt + automation)', icon: <Brain size={24} weight="duotone" /> },
            { value: 'interviews-only', label: 'Customer interviews only', icon: <Users size={24} weight="duotone" /> }
          ]
        },
        {
          id: 'pm-metrics-conflict',
          question: 'Your north-star metric improves, but downstream revenue stalls. What do you trust more?',
          helperText: 'Tests senior metric thinking',
          options: [
            { value: 'north-star', label: 'North-star metric', icon: <Target size={24} weight="duotone" /> },
            { value: 'revenue', label: 'Revenue metrics', icon: <CurrencyInr size={24} weight="duotone" /> },
            { value: 'leading-indicators', label: 'Leading indicators', icon: <TrendUp size={24} weight="duotone" /> },
            { value: 'unit-economics', label: 'Segment-specific unit economics', icon: <ChartBar size={24} weight="duotone" /> }
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
          question: 'Where would AI add the highest leverage in your current PM role?',
          options: [
            { value: 'writing-prds', label: 'Writing PRDs faster', icon: <PresentationChart size={24} weight="duotone" /> },
            { value: 'research-synthesis', label: 'Synthesizing qualitative research', icon: <Users size={24} weight="duotone" /> },
            { value: 'prioritization', label: 'Prioritization & trade-off modeling', icon: <Target size={24} weight="duotone" /> },
            { value: 'impact-prediction', label: 'Predicting roadmap impact', icon: <ChartLineUp size={24} weight="duotone" /> }
          ]
        },
        {
          id: 'pm-failure-reflection',
          question: 'Looking back, what caused your most expensive product mistake?',
          helperText: 'Tests self-awareness and seniority',
          options: [
            { value: 'poor-data', label: 'Poor data quality', icon: <XCircle size={24} weight="duotone" /> },
            { value: 'wrong-assumptions', label: 'Incorrect assumptions', icon: <Brain size={24} weight="duotone" /> },
            { value: 'stakeholder-pressure', label: 'Stakeholder pressure', icon: <Users size={24} weight="duotone" /> },
            { value: 'execution-constraints', label: 'Execution constraints', icon: <Gear size={24} weight="duotone" /> }
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
          question: 'Your model contradicts leadership intuition by ~20% downside risk. What do you do?',
          helperText: 'Tests executive communication maturity',
          options: [
            { value: 'recheck-quietly', label: 'Re-check assumptions quietly', icon: <CheckCircle size={24} weight="duotone" /> },
            { value: 'present-as-is', label: 'Present model as-is', icon: <PresentationChart size={24} weight="duotone" /> },
            { value: 'scenarios', label: 'Build upside/downside scenarios', icon: <Path size={24} weight="duotone" /> },
            { value: 'align-narrative', label: 'Align narrative before presenting', icon: <Users size={24} weight="duotone" /> }
          ]
        },
        {
          id: 'finance-forecast-miss',
          question: 'Forecast missed by 18% QoQ. Root cause is unclear. What changes next quarter?',
          helperText: 'Tests analytical depth',
          options: [
            { value: 'conservative-buffers', label: 'Conservative buffers', icon: <Target size={24} weight="duotone" /> },
            { value: 'granular-drivers', label: 'More granular drivers', icon: <ChartBar size={24} weight="duotone" /> },
            { value: 'scenario-modeling', label: 'Scenario + sensitivity modeling', icon: <Path size={24} weight="duotone" /> },
            { value: 'predictive-models', label: 'Predictive models with leading signals', icon: <Brain size={24} weight="duotone" /> }
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
          question: 'Key datasets are noisy, but decisions cannot wait. You:',
          helperText: 'Tests real-world analytics maturity',
          options: [
            { value: 'delay-decision', label: 'Delay decision', icon: <Clock size={24} weight="duotone" /> },
            { value: 'historical-averages', label: 'Use historical averages', icon: <ChartBar size={24} weight="duotone" /> },
            { value: 'confidence-intervals', label: 'Build confidence intervals', icon: <Target size={24} weight="duotone" /> },
            { value: 'ai-anomalies', label: 'Use AI to flag anomalies & bias', icon: <Brain size={24} weight="duotone" /> }
          ]
        },
        {
          id: 'finance-ai-value',
          question: 'Where would AI deliver actual business value today?',
          options: [
            { value: 'faster-reporting', label: 'Faster reporting', icon: <Lightning size={24} weight="duotone" /> },
            { value: 'anomaly-detection', label: 'Anomaly detection', icon: <Target size={24} weight="duotone" /> },
            { value: 'forecasting', label: 'Forecasting & simulations', icon: <ChartLineUp size={24} weight="duotone" /> },
            { value: 'prescriptive', label: 'Prescriptive recommendations', icon: <Brain size={24} weight="duotone" /> }
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
          question: 'Who ultimately owns the outcome of your analysis?',
          helperText: 'Tests trust and seniority',
          options: [
            { value: 'leadership', label: 'Leadership', icon: <Users size={24} weight="duotone" /> },
            { value: 'cross-functional', label: 'Cross-functional team', icon: <Buildings size={24} weight="duotone" /> },
            { value: 'shared', label: 'Me + leadership', icon: <Target size={24} weight="duotone" /> },
            { value: 'me', label: 'Me', icon: <Trophy size={24} weight="duotone" /> }
          ]
        },
        {
          id: 'finance-impact',
          question: 'Which analysis created the most impact in your career?',
          helperText: 'Tests business orientation',
          options: [
            { value: 'cost-reduction', label: 'Cost reduction', icon: <TrendUp size={24} weight="duotone" /> },
            { value: 'revenue-optimization', label: 'Revenue optimization', icon: <CurrencyInr size={24} weight="duotone" /> },
            { value: 'risk-mitigation', label: 'Risk mitigation', icon: <CheckCircle size={24} weight="duotone" /> },
            { value: 'strategic-pivot', label: 'Strategic pivot', icon: <Path size={24} weight="duotone" /> }
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
          question: 'Pipeline coverage is 3×, but close rate drops. Your first move?',
          helperText: 'Tests revenue maturity',
          options: [
            { value: 'push-volume', label: 'Push volume', icon: <TrendUp size={24} weight="duotone" /> },
            { value: 'tighten-qualification', label: 'Tighten qualification', icon: <Target size={24} weight="duotone" /> },
            { value: 'analyze-winloss', label: 'Analyze win/loss patterns', icon: <ChartBar size={24} weight="duotone" /> },
            { value: 'change-pricing', label: 'Change pricing/packaging', icon: <CurrencyInr size={24} weight="duotone" /> }
          ]
        },
        {
          id: 'sales-deal-stuck',
          question: 'A large deal stalls at final approval. You:',
          helperText: 'Tests pattern recognition',
          options: [
            { value: 'increase-followups', label: 'Increase follow-ups', icon: <Clock size={24} weight="duotone" /> },
            { value: 'escalate-internally', label: 'Escalate internally', icon: <Users size={24} weight="duotone" /> },
            { value: 'analyze-blockers', label: 'Analyze historical blockers', icon: <ChartBar size={24} weight="duotone" /> },
            { value: 'change-structure', label: 'Change deal structure', icon: <Path size={24} weight="duotone" /> }
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
          question: 'Where does AI actually help today?',
          helperText: 'Tests senior AI usage',
          options: [
            { value: 'email-drafts', label: 'Email drafts', icon: <Lightning size={24} weight="duotone" /> },
            { value: 'call-summaries', label: 'Call summaries', icon: <PresentationChart size={24} weight="duotone" /> },
            { value: 'deal-risk', label: 'Deal risk prediction', icon: <Target size={24} weight="duotone" /> },
            { value: 'pricing-optimization', label: 'Pricing & discount optimization', icon: <CurrencyInr size={24} weight="duotone" /> }
          ]
        },
        {
          id: 'sales-target-miss',
          question: 'You miss quota despite strong activity metrics. Why?',
          helperText: 'Tests systems thinking',
          options: [
            { value: 'lead-quality', label: 'Lead quality', icon: <Target size={24} weight="duotone" /> },
            { value: 'icp-mismatch', label: 'ICP mismatch', icon: <Users size={24} weight="duotone" /> },
            { value: 'sales-motion', label: 'Sales motion design', icon: <Path size={24} weight="duotone" /> },
            { value: 'market-conditions', label: 'Market conditions', icon: <ChartLineUp size={24} weight="duotone" /> }
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
          question: 'Your sales forecast is based on:',
          helperText: 'Tests data maturity',
          options: [
            { value: 'rep-judgment', label: 'Rep judgment', icon: <Users size={24} weight="duotone" /> },
            { value: 'weighted-pipeline', label: 'Weighted pipeline', icon: <Target size={24} weight="duotone" /> },
            { value: 'historical-patterns', label: 'Historical patterns', icon: <ChartBar size={24} weight="duotone" /> },
            { value: 'predictive-models', label: 'Predictive models', icon: <Brain size={24} weight="duotone" /> }
          ]
        },
        {
          id: 'sales-ownership',
          question: 'What do you own today?',
          helperText: 'Tests seniority',
          options: [
            { value: 'activities', label: 'Activities', icon: <Clock size={24} weight="duotone" /> },
            { value: 'revenue-number', label: 'Revenue number', icon: <CurrencyInr size={24} weight="duotone" /> },
            { value: 'team-number', label: 'Team number', icon: <Users size={24} weight="duotone" /> },
            { value: 'region-business', label: 'Region / business', icon: <Buildings size={24} weight="duotone" /> }
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
          question: 'CTR ↑, CAC ↑, Revenue ↓. What do you trust?',
          helperText: 'Tests metric hierarchy understanding',
          options: [
            { value: 'ctr', label: 'CTR', icon: <ChartLineUp size={24} weight="duotone" /> },
            { value: 'cac', label: 'CAC', icon: <CurrencyInr size={24} weight="duotone" /> },
            { value: 'ltv-cac-cohort', label: 'LTV/CAC by cohort', icon: <ChartBar size={24} weight="duotone" /> },
            { value: 'revenue-attribution', label: 'Revenue attribution model', icon: <Target size={24} weight="duotone" /> }
          ]
        },
        {
          id: 'marketing-budget-shock',
          question: 'Budget cut 30%, targets unchanged. What do you cut first?',
          helperText: 'Tests ROI thinking',
          options: [
            { value: 'experiments', label: 'Experiments', icon: <Lightning size={24} weight="duotone" /> },
            { value: 'branding', label: 'Branding', icon: <MegaphoneSimple size={24} weight="duotone" /> },
            { value: 'low-ltv-segments', label: 'Low LTV segments', icon: <Target size={24} weight="duotone" /> },
            { value: 'agency-spend', label: 'Agency spend', icon: <CurrencyInr size={24} weight="duotone" /> }
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
          question: 'Where does AI create defensible advantage?',
          helperText: 'Tests AI maturity',
          options: [
            { value: 'content-generation', label: 'Content generation', icon: <Lightning size={24} weight="duotone" /> },
            { value: 'creative-testing', label: 'Creative testing', icon: <Target size={24} weight="duotone" /> },
            { value: 'audience-prediction', label: 'Audience prediction', icon: <Users size={24} weight="duotone" /> },
            { value: 'automated-optimization', label: 'Automated optimization loops', icon: <Gear size={24} weight="duotone" /> }
          ]
        },
        {
          id: 'marketing-attribution-reality',
          question: 'Attribution data is unreliable. You:',
          helperText: 'Tests senior pragmatism',
          options: [
            { value: 'accept-imperfect', label: 'Accept imperfect data', icon: <CheckCircle size={24} weight="duotone" /> },
            { value: 'switch-model', label: 'Switch attribution model', icon: <Path size={24} weight="duotone" /> },
            { value: 'directional-insights', label: 'Build directional insights', icon: <ChartBar size={24} weight="duotone" /> },
            { value: 'ai-infer-patterns', label: 'Use AI to infer patterns', icon: <Brain size={24} weight="duotone" /> }
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
          question: 'Growth stalls after initial scale. Why?',
          helperText: 'Tests systems thinking',
          options: [
            { value: 'saturation', label: 'Saturation', icon: <ChartLineUp size={24} weight="duotone" /> },
            { value: 'messaging-mismatch', label: 'Messaging mismatch', icon: <MegaphoneSimple size={24} weight="duotone" /> },
            { value: 'funnel-leakage', label: 'Funnel leakage', icon: <Path size={24} weight="duotone" /> },
            { value: 'ops-constraints', label: 'Ops constraints', icon: <Gear size={24} weight="duotone" /> }
          ]
        },
        {
          id: 'marketing-leadership-metric',
          question: 'Which metric do you defend in leadership reviews?',
          helperText: 'Tests senior accountability',
          options: [
            { value: 'leads', label: 'Leads', icon: <Users size={24} weight="duotone" /> },
            { value: 'cac', label: 'CAC', icon: <CurrencyInr size={24} weight="duotone" /> },
            { value: 'revenue-contribution', label: 'Revenue contribution', icon: <ChartLineUp size={24} weight="duotone" /> },
            { value: 'ltv', label: 'LTV', icon: <Trophy size={24} weight="duotone" /> }
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
          question: 'Demand doubles in 90 days. What breaks first?',
          helperText: 'Tests system-level thinking',
          options: [
            { value: 'hiring-capacity', label: 'Hiring capacity', icon: <Users size={24} weight="duotone" /> },
            { value: 'process-design', label: 'Process design', icon: <Gear size={24} weight="duotone" /> },
            { value: 'data-visibility', label: 'Data visibility', icon: <Database size={24} weight="duotone" /> },
            { value: 'vendor-reliability', label: 'Vendor reliability', icon: <Buildings size={24} weight="duotone" /> }
          ]
        },
        {
          id: 'operations-cost-sla',
          question: 'Costs rise, SLA drops. What do you fix first?',
          helperText: 'Tests ops maturity',
          options: [
            { value: 'headcount', label: 'Headcount', icon: <Users size={24} weight="duotone" /> },
            { value: 'process-bottlenecks', label: 'Process bottlenecks', icon: <Path size={24} weight="duotone" /> },
            { value: 'demand-variability', label: 'Demand variability', icon: <ChartLineUp size={24} weight="duotone" /> },
            { value: 'automation-gaps', label: 'Automation gaps', icon: <Gear size={24} weight="duotone" /> }
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
          question: 'Where does AI deliver highest ROI?',
          helperText: 'Tests AI application depth',
          options: [
            { value: 'reporting', label: 'Reporting', icon: <PresentationChart size={24} weight="duotone" /> },
            { value: 'forecasting', label: 'Forecasting', icon: <ChartLineUp size={24} weight="duotone" /> },
            { value: 'automation', label: 'Automation', icon: <Gear size={24} weight="duotone" /> },
            { value: 'decision-optimization', label: 'Decision optimization', icon: <Brain size={24} weight="duotone" /> }
          ]
        },
        {
          id: 'operations-ownership',
          question: 'Which metric keeps you up at night?',
          helperText: 'Tests accountability',
          options: [
            { value: 'task-completion', label: 'Task completion', icon: <CheckCircle size={24} weight="duotone" /> },
            { value: 'cost-per-unit', label: 'Cost/unit', icon: <CurrencyInr size={24} weight="duotone" /> },
            { value: 'sla-adherence', label: 'SLA adherence', icon: <Target size={24} weight="duotone" /> },
            { value: 'margin', label: 'Margin', icon: <ChartBar size={24} weight="duotone" /> }
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
          question: 'Ops data is delayed by 2 weeks. You:',
          helperText: 'Tests senior pragmatism',
          options: [
            { value: 'wait', label: 'Wait', icon: <Clock size={24} weight="duotone" /> },
            { value: 'use-proxies', label: 'Use proxies', icon: <Target size={24} weight="duotone" /> },
            { value: 'early-warning', label: 'Build early-warning indicators', icon: <Lightning size={24} weight="duotone" /> },
            { value: 'ai-prediction', label: 'Use AI for prediction', icon: <Brain size={24} weight="duotone" /> }
          ]
        },
        {
          id: 'operations-strategic-role',
          question: 'Ops exists primarily to:',
          helperText: 'Tests senior framing',
          options: [
            { value: 'execute-plans', label: 'Execute plans', icon: <CheckCircle size={24} weight="duotone" /> },
            { value: 'reduce-cost', label: 'Reduce cost', icon: <CurrencyInr size={24} weight="duotone" /> },
            { value: 'enable-scale', label: 'Enable scale', icon: <TrendUp size={24} weight="duotone" /> },
            { value: 'competitive-advantage', label: 'Drive competitive advantage', icon: <Trophy size={24} weight="duotone" /> }
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
          question: 'Users sign up but don\'t return. You:',
          helperText: 'Tests founder maturity',
          options: [
            { value: 'add-features', label: 'Add features', icon: <Code size={24} weight="duotone" /> },
            { value: 'increase-marketing', label: 'Increase marketing', icon: <MegaphoneSimple size={24} weight="duotone" /> },
            { value: 'reframe-problem', label: 'Reframe problem', icon: <Brain size={24} weight="duotone" /> },
            { value: 'pivot-icp', label: 'Pivot ICP', icon: <Users size={24} weight="duotone" /> }
          ]
        },
        {
          id: 'founder-ai-dependency',
          question: 'Which dependency would AI remove first?',
          helperText: 'Tests AI strategy',
          options: [
            { value: 'engineering', label: 'Engineering', icon: <Code size={24} weight="duotone" /> },
            { value: 'marketing', label: 'Marketing', icon: <MegaphoneSimple size={24} weight="duotone" /> },
            { value: 'ops', label: 'Ops', icon: <Gear size={24} weight="duotone" /> },
            { value: 'decision-making', label: 'Decision-making', icon: <Brain size={24} weight="duotone" /> }
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
          question: 'Revenue grows, margins fall. Why?',
          helperText: 'Tests business maturity',
          options: [
            { value: 'pricing', label: 'Pricing', icon: <CurrencyInr size={24} weight="duotone" /> },
            { value: 'ops-inefficiency', label: 'Ops inefficiency', icon: <Gear size={24} weight="duotone" /> },
            { value: 'customer-mix', label: 'Customer mix', icon: <Users size={24} weight="duotone" /> },
            { value: 'data-blindness', label: 'Data blindness', icon: <Database size={24} weight="duotone" /> }
          ]
        },
        {
          id: 'founder-resource-constraint',
          question: 'With 3 people and 6 months, you optimize for:',
          helperText: 'Tests founder intent',
          options: [
            { value: 'growth', label: 'Growth', icon: <TrendUp size={24} weight="duotone" /> },
            { value: 'profitability', label: 'Profitability', icon: <CurrencyInr size={24} weight="duotone" /> },
            { value: 'learning', label: 'Learning', icon: <Lightbulb size={24} weight="duotone" /> },
            { value: 'fundraising', label: 'Fundraising', icon: <Rocket size={24} weight="duotone" /> }
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
          question: 'AI helps your startup most by:',
          helperText: 'Tests strategic thinking',
          options: [
            { value: 'speed', label: 'Speed', icon: <Lightning size={24} weight="duotone" /> },
            { value: 'cost', label: 'Cost', icon: <CurrencyInr size={24} weight="duotone" /> },
            { value: 'insight', label: 'Insight', icon: <Brain size={24} weight="duotone" /> },
            { value: 'differentiation', label: 'Differentiation', icon: <Trophy size={24} weight="duotone" /> }
          ]
        },
        {
          id: 'founder-failure-pattern',
          question: 'Your biggest mistake so far?',
          helperText: 'Tests reflection depth',
          options: [
            { value: 'hiring-early', label: 'Hiring too early', icon: <Users size={24} weight="duotone" /> },
            { value: 'scaling-fast', label: 'Scaling too fast', icon: <Rocket size={24} weight="duotone" /> },
            { value: 'weak-data', label: 'Weak data', icon: <Database size={24} weight="duotone" /> },
            { value: 'poor-problem', label: 'Poor problem selection', icon: <Target size={24} weight="duotone" /> }
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
