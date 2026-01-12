"""
MBA Persona Matcher
Maps quiz role + readiness to persona with maturity-aware content
"""
import json
import os
from typing import Dict, Any
from src.config.logging_config import get_logger

logger = get_logger(__name__)


def load_personas() -> Dict[str, Any]:
    """Load persona definitions from JSON file"""
    personas_file = os.path.join(
        os.path.dirname(__file__),
        '..', 'config', 'mba_personas.json'
    )
    with open(personas_file, 'r') as f:
        return json.load(f)


def match_persona(role: str, readiness: Dict[str, Any]) -> Dict[str, Any]:
    """
    Match user to persona based on role and maturity level

    Args:
        role: User's role (product-manager, finance, sales, marketing, operations, founder)
        readiness: Readiness dict with overall_score, maturity_level, category_scores, etc.

    Returns:
        {
            'persona_id': 'mba_product_manager',
            'persona_label': 'Product Manager',
            'role_context': 'Business x AI Product Leadership',
            'description': '...',
            'maturity_variant': 'ai_strategic',
            'badge_label': 'AI-Strategic Product Manager',
            'variant_description': '...',
            'persona_tags': ['AI Strategic', 'Product Manager', ...],
            'key_strengths': [...],
            'mba_fit': '...',
            'ideal_profile': '...'
        }
    """
    try:
        personas = load_personas()

        # Default to pm if role not found
        persona_def = personas['personas'].get(role, personas['personas']['pm'])

        # Determine maturity variant based on AI maturity level
        maturity_level = readiness.get('maturity_level', 'ai_curious')

        # Map maturity levels to variants
        if maturity_level == 'ai_native':
            variant_key = 'ai_native'
        elif maturity_level in ['ai_strategic', 'ai_capable']:
            variant_key = 'ai_strategic'
        else:  # ai_curious, ai_unaware
            variant_key = 'developing'

        variant = persona_def['maturity_variants'][variant_key]

        persona_info = {
            'persona_id': persona_def['id'],
            'persona_label': persona_def['label'],
            'role_context': persona_def['role_context'],
            'description': persona_def['description'],
            'maturity_variant': variant_key,
            'badge_label': variant['badge_label'],
            'variant_description': variant['variant_description'],
            'persona_tags': variant['persona_tags'],
            'key_strengths': variant.get('key_strengths', []),
            'mba_fit': variant['mba_fit'],
            'ideal_profile': persona_def.get('ideal_profile', '')
        }

        logger.info(f"Matched persona: {persona_info['badge_label']} (role={role}, variant={variant_key})")
        return persona_info

    except Exception as exc:
        logger.error(f"Failed to match persona: {exc}")
        # Fallback to generic persona
        return {
            'persona_id': 'mba_generic',
            'persona_label': 'Business Professional',
            'role_context': 'Business x AI Readiness',
            'description': 'Professional building business and AI skills',
            'maturity_variant': 'developing',
            'badge_label': 'Business Professional',
            'variant_description': 'You are building your AI and business skillset',
            'persona_tags': ['Business Professional', 'AI Learner'],
            'key_strengths': ['Professional development', 'Career growth'],
            'mba_fit': 'Focus on building AI fluency and strategic thinking',
            'ideal_profile': ''
        }
