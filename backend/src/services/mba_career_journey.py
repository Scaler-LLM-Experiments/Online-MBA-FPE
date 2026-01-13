"""
MBA Career Journey Mockservice

Generates career transition recommendations based on career goals (Q2).
Returns 3 roles: 1 recommended + 2 alternate paths with milestones.
"""

from typing import Dict, List, Any


# Career journey recommendations mapped to Q2 options
CAREER_JOURNEY_RECOMMENDATIONS = {
    "ai-leadership": {
        "recommended": {
            "title": "Director of AI Strategy",
            "description": "Lead AI transformation initiatives across the organization",
            "milestones": [
                "Complete Executive AI Leadership program",
                "Lead 2-3 cross-functional AI initiatives",
                "Build relationships with C-suite stakeholders"
            ]
        },
        "alternate_1": {
            "title": "VP of Product (AI-Powered Products)",
            "description": "Oversee product portfolio with AI/ML capabilities",
            "milestones": [
                "Manage a team of 5+ product managers",
                "Define AI product roadmap for next 2 years",
                "Partner with engineering to scale AI features"
            ]
        },
        "alternate_2": {
            "title": "Head of Business Transformation",
            "description": "Drive company-wide digital and AI transformation",
            "milestones": [
                "Develop transformation roadmap with leadership",
                "Implement AI-driven process improvements",
                "Mentor department heads on AI adoption"
            ]
        }
    },

    "ai-pm": {
        "recommended": {
            "title": "Senior Product Manager - AI/ML",
            "description": "Own AI-powered product features from ideation to launch",
            "milestones": [
                "Complete AI for Product Managers certification",
                "Ship 2 AI-powered features to production",
                "Build case studies demonstrating AI impact"
            ]
        },
        "alternate_1": {
            "title": "Product Manager - Data Products",
            "description": "Build data analytics and insights products",
            "milestones": [
                "Master SQL and data visualization tools",
                "Launch analytics dashboard for users",
                "Partner with data science team on features"
            ]
        },
        "alternate_2": {
            "title": "AI Product Consultant",
            "description": "Advise companies on AI product strategy",
            "milestones": [
                "Build portfolio of AI consulting projects",
                "Develop AI product playbook",
                "Network with 10+ AI product leaders"
            ]
        }
    },

    "analytics-strategy": {
        "recommended": {
            "title": "Senior Business Analyst - AI/Data",
            "description": "Drive business decisions using AI and advanced analytics",
            "milestones": [
                "Master Python and advanced Excel/SQL",
                "Complete data analytics certification",
                "Present data-driven recommendations to leadership"
            ]
        },
        "alternate_1": {
            "title": "Strategy Manager - Digital Transformation",
            "description": "Shape company strategy leveraging AI insights",
            "milestones": [
                "Lead strategic planning for AI initiatives",
                "Conduct competitive analysis on AI adoption",
                "Build business cases for new AI investments"
            ]
        },
        "alternate_2": {
            "title": "Data Science Translator",
            "description": "Bridge business and data science teams",
            "milestones": [
                "Learn machine learning fundamentals",
                "Translate business problems into ML projects",
                "Collaborate on 3 data science initiatives"
            ]
        }
    },

    "improve-current": {
        "recommended": {
            "title": "Senior [Current Role] with AI Skills",
            "description": "Advance in current role by integrating AI capabilities",
            "milestones": [
                "Complete AI fundamentals course",
                "Apply AI tools to automate daily workflows",
                "Present AI use case to management"
            ]
        },
        "alternate_1": {
            "title": "AI Champion in Current Department",
            "description": "Lead AI adoption within your team",
            "milestones": [
                "Pilot AI tool for team productivity",
                "Train colleagues on AI best practices",
                "Document AI success stories"
            ]
        },
        "alternate_2": {
            "title": "Cross-Functional AI Contributor",
            "description": "Collaborate on company-wide AI projects",
            "milestones": [
                "Join AI task force or working group",
                "Contribute domain expertise to AI initiatives",
                "Build network across AI-focused teams"
            ]
        }
    },

    "build-startup": {
        "recommended": {
            "title": "AI-First Founder",
            "description": "Launch and scale an AI-powered startup",
            "milestones": [
                "Validate AI product idea with 50+ interviews",
                "Build MVP using no-code AI tools",
                "Secure pre-seed funding or first customers"
            ]
        },
        "alternate_1": {
            "title": "Technical Co-Founder (Non-Technical)",
            "description": "Partner with technical founder on AI startup",
            "milestones": [
                "Learn AI product management basics",
                "Find technical co-founder in AI space",
                "Define go-to-market strategy"
            ]
        },
        "alternate_2": {
            "title": "AI Consultant / Freelancer",
            "description": "Build independent AI consulting practice",
            "milestones": [
                "Land first 3 AI consulting clients",
                "Develop AI implementation playbook",
                "Create content showcasing AI expertise"
            ]
        }
    },

    "salary-growth": {
        "recommended": {
            "title": "Senior Manager with AI Premium",
            "description": "Command higher compensation through AI expertise",
            "milestones": [
                "Obtain high-demand AI certifications",
                "Negotiate 20-30% raise with AI skills",
                "Build portfolio of AI project successes"
            ]
        },
        "alternate_1": {
            "title": "AI Solutions Architect",
            "description": "High-paying role designing AI implementations",
            "milestones": [
                "Learn cloud AI platforms (AWS/Azure/GCP)",
                "Complete solutions architect certification",
                "Lead 2 enterprise AI implementation projects"
            ]
        },
        "alternate_2": {
            "title": "AI Product Manager at Big Tech",
            "description": "Join high-paying AI team at major company",
            "milestones": [
                "Ace behavioral + AI case interviews",
                "Build strong referral network at target companies",
                "Demonstrate AI product impact in current role"
            ]
        }
    }
}


def get_career_journey_recommendations(
    career_goal: str,
    current_role: str = None,
    years_experience: str = None
) -> Dict[str, Any]:
    """
    Get career journey recommendations based on career goal.

    Args:
        career_goal: Career goal from Q2 (ai-leadership, ai-pm, etc.)
        current_role: Current job role (optional, for personalization)
        years_experience: Years of experience (optional)

    Returns:
        Dictionary with career_journey containing 3 roles
    """

    # Get recommendations for this career goal
    recommendations = CAREER_JOURNEY_RECOMMENDATIONS.get(
        career_goal,
        CAREER_JOURNEY_RECOMMENDATIONS["improve-current"]  # Default fallback
    )

    # For "improve-current", personalize the title with current role
    if career_goal == "improve-current" and current_role:
        recommendations["recommended"]["title"] = f"Senior {current_role} with AI Skills"

    # Format as expected by frontend (rename milestones to action_items)
    career_transitions = []
    for idx, (key, rec) in enumerate([
        ("recommended", recommendations["recommended"]),
        ("alternate_1", recommendations["alternate_1"]),
        ("alternate_2", recommendations["alternate_2"])
    ]):
        card_type = "target" if idx == 0 else "alternate"
        career_transitions.append({
            "title": rec["title"],
            "description": rec["description"],
            "action_items": rec["milestones"],  # Rename milestones to action_items
            "card_type": card_type,
            "timeline": None,  # No timeline in mockservice
            "salary": None,  # Can add salary later if needed
            "goal": None,  # Optional - can add per role
            "key_focus": None  # Optional - can add per role
        })

    return {
        "career_transitions": career_transitions
    }


# For testing
if __name__ == "__main__":
    import json

    # Test all career goals
    for goal in CAREER_JOURNEY_RECOMMENDATIONS.keys():
        print(f"\n{'='*60}")
        print(f"Career Goal: {goal}")
        print('='*60)
        result = get_career_journey_recommendations(goal, "Product Manager", "3")
        print(json.dumps(result, indent=2))
