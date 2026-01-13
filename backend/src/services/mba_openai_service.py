"""
MBA OpenAI Service - Real OpenAI Integration
Generates personalized content using OpenAI API with structured outputs
"""
import json
from typing import Dict, Any, List
from openai import OpenAI
from pydantic import BaseModel
from src.config.settings import settings
from src.config.logging_config import get_logger

logger = get_logger(__name__)

# Initialize OpenAI client
client = OpenAI(api_key=settings.openai_api_key)


# Pydantic models for structured output
class TransformationStory(BaseModel):
    company: str
    before_ai: str
    after_ai: str
    relevance_to_user: str


class ToolDescription(BaseModel):
    tool_name: str
    personalized_use_case: str
    why_it_helps: str


class QuickWin(BaseModel):
    title: str
    description: str
    timeline: str
    impact: str
    priority: str


class CareerPath(BaseModel):
    title: str
    description: str
    action_items: List[str]


class MBAOpenAIContent(BaseModel):
    transformation_stories: List[TransformationStory]
    tool_descriptions: List[ToolDescription]
    quick_wins: List[QuickWin]
    career_paths: List[CareerPath]


def generate_mba_openai_content(
    role: str,
    experience: str,
    career_goal: str,
    skill_gaps: List[str],
    skills: Dict[str, Any],
    readiness_score: int,
    companies: List[Dict[str, str]],
    tools: List[Dict[str, str]],
    current_role: str = None
) -> Dict[str, Any]:
    """
    Generate all personalized OpenAI content in one call

    Args:
        role: User's role (pm, finance, sales, marketing, operations, founder)
        experience: Years of experience
        career_goal: Career goal from Q2
        skill_gaps: List of skill gap keys
        skills: Full skills analysis with levels
        readiness_score: Overall readiness score
        companies: 3 selected companies for transformation stories
        tools: List of AI tools to personalize
        current_role: Display name of current role

    Returns:
        Dictionary with transformation_stories, tool_descriptions, quick_wins, career_paths
    """

    # Build tight user context JSON
    user_context = {
        "role": role,
        "current_role_name": current_role or role,
        "experience": experience,
        "career_goal": career_goal,
        "readiness_score": readiness_score,
        "skills": {
            "strengths": skills.get("strengths", []),
            "proficient": [
                skill_data.get("title", skill_name)
                for skill_name, skill_data in skills.get("skills", {}).items()
                if skill_data.get("level") == 2
            ],
            "gaps": skills.get("gaps", [])
        },
        "companies_to_analyze": [{"name": c["name"], "industry": c["industry"]} for c in companies],
        "tools_to_personalize": [{"name": t["name"], "category": t["category"]} for t in tools]
    }

    # Craft comprehensive prompt
    prompt = f"""You are an expert MBA career advisor specializing in Business x AI transformation. Generate highly personalized career development content for this user.

USER CONTEXT:
{json.dumps(user_context, indent=2)}

GENERATE THE FOLLOWING:

1. TRANSFORMATION STORIES (3 companies):
For each company in companies_to_analyze:
- before_ai: EXACTLY 2 bullet points separated by " | ". Each point 8-12 words. Describe how they operated before AI. Format: "point one | point two"
- after_ai: EXACTLY 2 bullet points separated by " | ". Each point 8-12 words with specific metrics/outcomes. Format: "point one | point two"
- relevance_to_user: EXACTLY 2 bullet points separated by " | ". Each point 6-10 words. Why this matters for user's role/goal. Format: "point one | point two"

2. TOOL DESCRIPTIONS ({len(tools)} tools):
For each tool in tools_to_personalize:
- personalized_use_case: 1-2 sentences ONLY (max 25 words total). How THIS user should use it to address their gaps/goals.
- why_it_helps: 1 sentence ONLY (max 15 words). Concrete career impact.

3. QUICK WINS (5 items):
Actionable steps based on skill gaps and career goal:
- title: 3-5 words ONLY (punchy, action-oriented)
- description: 1-2 sentences ONLY (max 25 words). Tell them exactly what to do.
- timeline: Realistic estimate (e.g., "2-3 weeks", "1 month")
- impact: 1 sentence ONLY (max 15 words). Specific, measurable outcome.
- priority: "must-have", "recommended", or "nice-to-have"

4. CAREER PATHS (3 roles):
Based on career_goal, suggest:
- 1 recommended path (target role)
- 2 alternate paths (adjacent opportunities)
For each:
- title: Job title with goal context
  * If career_goal is "ai-leadership", "ai-pm", "analytics-strategy", or "build-startup" (transition goals), add "(Transition Goal)" to the recommended path title
  * If career_goal is "improve-current" or "salary-growth" (upskilling goals), show it as an upgraded version of their current role with "(Upskill Path)" label
  * For alternate paths, just use the job title without labels
- description: 1-2 sentences ONLY (max 25 words). Focus on core responsibilities.
- action_items: 3-4 milestones. Each milestone MUST be 6-10 words ONLY. Concrete and actionable.

TONE: Professional, motivational, actionable. Focus on concrete steps and realistic outcomes.
WRITING STYLE: Sharp, crisp, scannable. No fluff. Users should be able to quickly scan and understand the value. Use specific metrics and concrete examples whenever possible.

CRITICAL WORD LIMITS (DO NOT EXCEED):
- before_ai: 2 bullets, each 8-12 words
- after_ai: 2 bullets, each 8-12 words
- relevance_to_user: 2 bullets, each 6-10 words
- tool descriptions: Max 25 words for use_case, max 15 words for why_it_helps
- quick wins: Max 25 words for description, max 15 words for impact
- career paths: Max 25 words for description, max 10 words per action_item

OUTPUT: Return JSON matching the structure exactly."""

    try:
        logger.info(f"Calling OpenAI for MBA content generation (role={role}, goal={career_goal})")

        response = client.chat.completions.create(
            model="gpt-4o",  # Using GPT-4 for quality
            messages=[
                {
                    "role": "system",
                    "content": "You are an expert MBA career advisor specializing in Business x AI. Generate personalized, actionable career guidance."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            response_format={
                "type": "json_schema",
                "json_schema": {
                    "name": "mba_content",
                    "strict": True,
                    "schema": {
                        "type": "object",
                        "properties": {
                            "transformation_stories": {
                                "type": "array",
                                "items": {
                                    "type": "object",
                                    "properties": {
                                        "company": {"type": "string"},
                                        "before_ai": {"type": "string"},
                                        "after_ai": {"type": "string"},
                                        "relevance_to_user": {"type": "string"}
                                    },
                                    "required": ["company", "before_ai", "after_ai", "relevance_to_user"],
                                    "additionalProperties": False
                                }
                            },
                            "tool_descriptions": {
                                "type": "array",
                                "items": {
                                    "type": "object",
                                    "properties": {
                                        "tool_name": {"type": "string"},
                                        "personalized_use_case": {"type": "string"},
                                        "why_it_helps": {"type": "string"}
                                    },
                                    "required": ["tool_name", "personalized_use_case", "why_it_helps"],
                                    "additionalProperties": False
                                }
                            },
                            "quick_wins": {
                                "type": "array",
                                "items": {
                                    "type": "object",
                                    "properties": {
                                        "title": {"type": "string"},
                                        "description": {"type": "string"},
                                        "timeline": {"type": "string"},
                                        "impact": {"type": "string"},
                                        "priority": {"type": "string"}
                                    },
                                    "required": ["title", "description", "timeline", "impact", "priority"],
                                    "additionalProperties": False
                                }
                            },
                            "career_paths": {
                                "type": "array",
                                "items": {
                                    "type": "object",
                                    "properties": {
                                        "title": {"type": "string"},
                                        "description": {"type": "string"},
                                        "action_items": {
                                            "type": "array",
                                            "items": {"type": "string"}
                                        }
                                    },
                                    "required": ["title", "description", "action_items"],
                                    "additionalProperties": False
                                }
                            }
                        },
                        "required": ["transformation_stories", "tool_descriptions", "quick_wins", "career_paths"],
                        "additionalProperties": False
                    }
                }
            },
            temperature=0.7,
            max_tokens=4000
        )

        # Parse response
        content = json.loads(response.choices[0].message.content)

        logger.info(f"OpenAI content generated successfully: {len(content.get('transformation_stories', []))} stories, "
                   f"{len(content.get('tool_descriptions', []))} tools, {len(content.get('quick_wins', []))} wins, "
                   f"{len(content.get('career_paths', []))} paths")

        return content

    except Exception as e:
        logger.error(f"OpenAI API call failed: {str(e)}")
        # Return empty structure on error
        return {
            "transformation_stories": [],
            "tool_descriptions": [],
            "quick_wins": [],
            "career_paths": [],
            "error": str(e)
        }
