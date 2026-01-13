"""
Pydantic models for MBA Readiness API
"""
from typing import Dict, List, Any, Optional
from pydantic import BaseModel, Field


class MBAQuizRequest(BaseModel):
    """Request model for MBA evaluation"""
    # Required fields
    role: str = Field(..., description="User's selected role (product-manager, finance, sales, marketing, operations, founder)")
    experience: str = Field(..., description="Years of experience (0-2, 2-5, 5-8, 8-12, 12+)")
    career_goal: str = Field(..., description="Career goal (career-growth, skill-development, role-transition, entrepreneurship)")

    # Role-specific responses (all optional since different roles have different questions)
    # Product Manager
    pm_retention_problem: Optional[str] = Field(None, alias="pm-retention-problem")
    pm_roadmap_tradeoff: Optional[str] = Field(None, alias="pm-roadmap-tradeoff")
    pm_mvp_validation: Optional[str] = Field(None, alias="pm-mvp-validation")
    pm_metrics_conflict: Optional[str] = Field(None, alias="pm-metrics-conflict")
    pm_ai_leverage: Optional[str] = Field(None, alias="pm-ai-leverage")
    pm_failure_reflection: Optional[str] = Field(None, alias="pm-failure-reflection")

    # Finance
    finance_metrics_conflict: Optional[str] = Field(None, alias="finance-metrics-conflict")
    finance_forecast_miss: Optional[str] = Field(None, alias="finance-forecast-miss")
    finance_ai_usage: Optional[str] = Field(None, alias="finance-ai-usage")
    finance_decision_speed: Optional[str] = Field(None, alias="finance-decision-speed")
    finance_stakeholder_conflict: Optional[str] = Field(None, alias="finance-stakeholder-conflict")
    finance_leadership_weight: Optional[str] = Field(None, alias="finance-leadership-weight")

    # Sales
    sales_pipeline_reality: Optional[str] = Field(None, alias="sales-pipeline-reality")
    sales_deal_stuck: Optional[str] = Field(None, alias="sales-deal-stuck")
    sales_ai_usage: Optional[str] = Field(None, alias="sales-ai-usage")
    sales_target_miss: Optional[str] = Field(None, alias="sales-target-miss")
    sales_forecasting: Optional[str] = Field(None, alias="sales-forecasting")
    sales_ownership: Optional[str] = Field(None, alias="sales-ownership")

    # Marketing
    marketing_conflicting_signals: Optional[str] = Field(None, alias="marketing-conflicting-signals")
    marketing_budget_shock: Optional[str] = Field(None, alias="marketing-budget-shock")
    marketing_ai_application: Optional[str] = Field(None, alias="marketing-ai-application")
    marketing_attribution_reality: Optional[str] = Field(None, alias="marketing-attribution-reality")
    marketing_scale_failure: Optional[str] = Field(None, alias="marketing-scale-failure")
    marketing_leadership_metric: Optional[str] = Field(None, alias="marketing-leadership-metric")

    # Operations
    operations_scale_stress: Optional[str] = Field(None, alias="operations-scale-stress")
    operations_cost_sla: Optional[str] = Field(None, alias="operations-cost-sla")
    operations_ai_leverage: Optional[str] = Field(None, alias="operations-ai-leverage")
    operations_ownership: Optional[str] = Field(None, alias="operations-ownership")
    operations_data_constraint: Optional[str] = Field(None, alias="operations-data-constraint")
    operations_strategic_role: Optional[str] = Field(None, alias="operations-strategic-role")

    # Founder
    founder_mvp_failure: Optional[str] = Field(None, alias="founder-mvp-failure")
    founder_ai_dependency: Optional[str] = Field(None, alias="founder-ai-dependency")
    founder_scale_pain: Optional[str] = Field(None, alias="founder-scale-pain")
    founder_resource_constraint: Optional[str] = Field(None, alias="founder-resource-constraint")
    founder_ai_advantage: Optional[str] = Field(None, alias="founder-ai-advantage")
    founder_failure_pattern: Optional[str] = Field(None, alias="founder-failure-pattern")

    class Config:
        populate_by_name = True  # Allow both alias and field name


class CategoryScore(BaseModel):
    """Category breakdown of readiness score"""
    experience: int
    role_maturity: int
    ai_fluency: int
    ownership: int


class ReadinessScore(BaseModel):
    """MBA Readiness Score"""
    overall_score: int = Field(..., ge=0, le=100)
    category_scores: CategoryScore
    maturity_level: str
    percentile: int
    readiness_tags: List[str]


class SkillLevel(BaseModel):
    """Individual skill level (simplified 3-level system)"""
    level: int = Field(..., ge=1, le=3)
    label: str
    title: str = ""  # Display name for frontend
    description: str = ""  # Tooltip text for frontend


class SkillsAnalysis(BaseModel):
    """Skills analysis"""
    skills: Dict[str, SkillLevel]
    strengths: List[str]
    gaps: List[str]


class QuickWin(BaseModel):
    """Single quick win action item"""
    title: str
    description: str
    impact: str
    timeframe: str


class AITool(BaseModel):
    """AI tool recommendation"""
    name: str
    category: str
    use_case: str
    impact: str
    priority: str
    url: Optional[str] = None


class IndustryStat(BaseModel):
    """Industry statistic"""
    stat: str
    description: str
    source: str
    impact: str


class TransformationInsight(BaseModel):
    """Industry transformation insight"""
    title: str
    description: str
    example: str
    takeaway: str


class PeerComparison(BaseModel):
    """Peer comparison data"""
    percentile: int
    message: str
    comparison_text: str
    badge: str
    cohort_size: str


class MetaData(BaseModel):
    """Evaluation metadata"""
    role: str
    experience: str
    career_goal: str


class PersonaInfo(BaseModel):
    """Role-based persona information"""
    persona_id: str
    persona_label: str
    role_context: str
    maturity_variant: str
    badge_label: str
    variant_description: str
    persona_tags: List[str]
    key_strengths: List[str]
    mba_fit: str
    ideal_profile: str = ""


class OpenAIQuickWin(BaseModel):
    """OpenAI-generated personalized quick win"""
    title: str
    description: str
    impact: str
    timeframe: str
    reasoning: str  # Why this matters for this user


class OpenAITransformationStory(BaseModel):
    """OpenAI-generated transformation story"""
    company: str
    industry: str
    transformation_narrative: str
    relevance_to_user: str
    skill_connection: List[str]


class OpenAIToolDescription(BaseModel):
    """OpenAI-generated personalized tool description"""
    name: str
    category: str
    priority: str
    personalized_use_case: str
    personalized_impact: str
    learning_path: str


class OpenAIContent(BaseModel):
    """Container for all OpenAI-generated content"""
    quick_wins: List[OpenAIQuickWin]
    transformation_stories: List[OpenAITransformationStory]
    tool_descriptions: List[OpenAIToolDescription]
    generation_metadata: Dict[str, Any]


class MBAEvaluationResponse(BaseModel):
    """Complete MBA evaluation response"""
    readiness: ReadinessScore
    persona: PersonaInfo  # NEW: Role-based persona information
    skills: SkillsAnalysis
    quick_wins: List[QuickWin]
    ai_tools: List[AITool]
    industry_stats: List[IndustryStat]
    transformation_insights: List[TransformationInsight]
    peer_comparison: PeerComparison
    openai_content: Optional[OpenAIContent] = None  # NEW: OpenAI-generated personalized content
    cache_status: Optional[str] = None  # NEW: 'mock' | 'hit' | 'miss' | 'disabled'
    meta: MetaData
