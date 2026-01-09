# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Free Profile Evaluation is a full-stack application that provides AI-powered career profile evaluations for tech professionals in the Indian market. It uses ChatGPT (GPT-4) to generate personalized career assessments, recommendations, and roadmaps based on user input.

**Key Innovation**: PostgreSQL-based intelligent caching layer that uses SHA256 hash-based deduplication to reduce OpenAI API costs by 50-99%.

### Tech Stack
- **Backend**: FastAPI (Python 3.13+), PostgreSQL, OpenAI API (GPT-4)
- **Frontend**: React 18, Styled Components, Nanostores (state management), Framer Motion
- **Package Managers**: `uv` (Python), `npm` (Node.js)
- **Deployment**: Docker Compose (local), AWS Elastic Beanstalk + CloudFront (production)

## Architecture

### Three-Tier Clean Architecture

```
API Layer (src/api/)
    ↓
Service Layer (src/services/)
    ↓
Repository Layer (src/repositories/)
    ↓
Database (PostgreSQL)
```

**Critical Design Principle**: Each layer has a single responsibility and communicates only with adjacent layers. Never bypass layers (e.g., API → Repository directly).

### Backend Structure (`backend/src/`)

- **`api/main.py`**: FastAPI application with API routes under `/career-profile-tool/api` prefix
  - `/evaluate` - Main profile evaluation endpoint
  - `/health` - Health check endpoint
  - `/admin/view/response/{cache_key}` - Admin endpoint to view cached responses (requires auth)
  - `/crt/store` - Store Career Roadmap Tool quiz responses (returns MD5 hash)
  - `/crt/admin/view/{hash_key}` - Admin endpoint to view CRT responses (requires auth)
- **`services/`**: Business logic modules
  - `run_poc.py` - Main orchestrator, calls OpenAI API (only place that calls OpenAI)
  - `scoring_logic.py` - Profile strength and skill scoring
  - `quick_wins_logic.py` - Generates actionable quick wins
  - `interview_readiness_logic.py` - Interview preparation assessment
  - `peer_comparison_logic.py` - Percentile ranking logic
  - `persona_matcher.py` - Matches user to predefined personas
  - `timeline_logic.py` - Timeline generation for career goals
  - `tools_logic.py` - Tool recommendations for target roles
  - `job_descriptions.py` - Job description templates
  - `profile_notes_logic.py` - Profile notes generation
  - `current_profile_summary.py` - Current profile summarization
- **`repositories/`**: Data access - `cache_repository.py` for PostgreSQL cache operations
- **`models/`**: Pydantic schemas - `models.py` (validated), `models_raw.py` (raw OpenAI)
- **`config/`**: Configuration - `settings.py`, `exceptions.py`, `logging_config.py`
- **`utils/`**: Helpers - `label_mappings.py`, `validate_response.py`

### Hash-Based Caching System

1. User submits profile evaluation request
2. Backend generates SHA256 hash of normalized payload (`json.dumps(payload, sort_keys=True)`)
3. Check PostgreSQL cache using `cache_key` + `model` composite lookup
4. Cache HIT: Return stored response (instant, zero OpenAI cost)
5. Cache MISS: Call OpenAI API, store response with hash, return result

**Critical**: JSONB returns as dict from psycopg2, must convert to JSON string before validation.

### Database Schema

PostgreSQL database (`profile_cache`) contains two main tables:

1. **`response_cache`** - Main caching table
   - `response_id` (VARCHAR, PRIMARY KEY) - SHA256 hash of request payload
   - `model` (VARCHAR) - OpenAI model used (e.g., "gpt-4o")
   - `user_input` (JSONB) - Original request payload
   - `response_json` (JSONB) - Cached OpenAI response
   - `created_at` (TIMESTAMP) - Cache entry creation time

2. **`crt_quiz_responses`** - Career Roadmap Tool responses
   - `hash_key` (VARCHAR, PRIMARY KEY) - MD5 hash of quiz responses
   - `quiz_responses` (JSONB) - Quiz response data
   - `created_at` (TIMESTAMP) - Entry creation time

See `backend/init.sql` for full schema definitions.

### API Routing

**Base Path**: All routes under `/career-profile-tool`

- **Development**: Frontend at `localhost:3000/career-profile-tool/`, Backend at `localhost:8000/career-profile-tool/api/*`
- **Production**: CloudFront routes `scaler.com/career-profile-tool/*` to Elastic Beanstalk

No CORS needed (same-origin in both environments). Root (`/`) returns 404 by design.

## Environment Setup

### Required Environment Variables

Create a `.env` file in the root directory with the following variables:

```bash
# Required for all environments
OPENAI_API_KEY=sk-proj-xxxxx              # OpenAI API key
ADMIN_USERNAME=your_admin_username         # Admin endpoint authentication
ADMIN_PASSWORD=your_secure_password        # Admin endpoint authentication

# Optional (defaults provided)
DATABASE_URL=postgresql://...              # PostgreSQL connection (Docker sets this automatically)
ENVIRONMENT=development                    # development | production
LOG_LEVEL=INFO                            # DEBUG | INFO | WARNING | ERROR
LOG_FORMAT=json                           # json | text
```

**Security Note**: `ADMIN_USERNAME` and `ADMIN_PASSWORD` are **required**. These protect admin endpoints (`/admin/view/*` and `/crt/admin/view/*`). Authentication supports:
- Basic Auth (standard method)
- Token-based auth via `?admin_token=SHA256(username:password)` query parameter (for CloudFront compatibility)
- Token in `X-Admin-Token` header

### Database Access (for debugging)

When using Docker Compose, PostgreSQL is exposed on port 5432:

```bash
# Connect to database
psql -h localhost -U postgres -d profile_cache

# Or if you have DATABASE_URL set
psql $DATABASE_URL

# Clear cache for testing
psql $DATABASE_URL -c "DELETE FROM response_cache;"
```

## Development Commands

### Docker Development (Recommended)

**Best Practice**: Use `docker compose watch` for active development - it auto-syncs code changes without rebuilding containers.

```bash
# First time setup
docker compose up --build

# Daily development with live code reloading (RECOMMENDED)
docker compose watch

# Changes in backend/src/** and frontend/src/** auto-sync immediately
# Python: uvicorn auto-reloads, React: auto-rebuilds
# No container restarts needed - just save and refresh!

# View logs
docker compose logs -f backend
docker compose logs -f frontend
docker compose logs -f           # All services

# Rebuild specific service (if Dockerfile changed)
docker compose up --build backend

# Stop services
docker compose down

# Check service status
docker compose ps
```

### Backend-Only Development (without Docker)

```bash
cd backend

# Install dependencies (uses uv package manager)
uv sync --all-extras

# Run server with auto-reload (backend/main.py imports from src.api.main)
uv run uvicorn main:app --reload --port 8000

# Linting and formatting
uv run black src/
uv run ruff check src/

# Type checking (if mypy configured)
uv run mypy src/
```

**Note**: Tests were removed from production deployment. If adding tests, place in `backend/tests/` directory.

### Frontend-Only Development (without Docker)

```bash
cd frontend

# Install dependencies
npm install

# Run dev server (uses setupProxy.js to proxy API requests)
npm start

# Build for production
npm run build

# Run tests (if configured)
npm test

# Linting
npm run lint              # Check for issues
npm run lint:fix          # Auto-fix issues
npm run lint:check        # Check with zero warnings allowed
```

**Note**: Frontend uses `homepage: "/career-profile-tool"` in package.json for proper routing in production.

### Health Checks and Debugging

```bash
# Backend health check (Docker)
curl http://localhost:8000/career-profile-tool/api/health

# Backend health check (local)
curl http://localhost:8000/career-profile-tool/api/health

# Frontend (Docker - served by Nginx on port 80)
curl http://localhost/career-profile-tool/

# Frontend (local dev server - port 3000)
curl http://localhost:3000/career-profile-tool/

# Check database connection
docker compose logs postgres

# Clear cache for testing
docker compose exec postgres psql -U postgres -d profile_cache -c "DELETE FROM response_cache;"
# Or without Docker:
psql -h localhost -U postgres -d profile_cache -c "DELETE FROM response_cache;"
```

## Implementation Guidelines

### Import Paths

All imports use absolute `src.*` paths:
```python
from src.models import FullProfileEvaluationResponse
from src.services.run_poc import run_poc
from src.repositories.cache_repository import CacheRepository
```

Never use relative imports like `from models import ...` or `from ..services import ...`

### Configuration

Access all configuration via `src.config.settings`:
```python
from src.config.settings import settings
api_key = settings.openai_api_key
```

### OpenAI API Calls

**Only one place calls OpenAI**: `src/services/run_poc.py` in `call_openai_structured()`.

Always follow this pattern:
1. Generate cache key: `cache_repo.generate_cache_key(payload, model)`
2. Check cache: `cache_repo.get(cache_key, model)`
3. If cached, return immediately
4. If not cached, call OpenAI, then store result

### Error Handling

Use custom exceptions from `src.config.exceptions`:
- `DatabaseError`, `OpenAIError`, `CacheError`, `ValidationError`

### Logging

Use structured logging (never print statements):
```python
from src.config.logging_config import get_logger
logger = get_logger(__name__)
```

### Frontend State Management

The frontend uses **Nanostores** for state management (not Redux or Context API):
- `src/store/` - Contains nanostore state definitions
- `@nanostores/react` - React integration hooks
- `@nanostores/query` - Query state management

Component structure:
- `src/components/` - React components
- `src/app/` - Application-level components
- `src/api/` - API client functions
- `src/utils/` - Utility functions
- `src/constants/` - Constants and configurations
- `src/hooks/` - Custom React hooks
- `src/context/` - React Context (if used alongside Nanostores)

### Coding Style

- Python: 4-space indent, full type hints, `snake_case` files
- Format with Black, lint with Ruff
- Frontend: PascalCase component files, camelCase hooks/stores
- Python files use absolute imports: `from src.module import ...`

## Common Issues

- **Import errors**: Ensure all use `src.*` absolute paths, rebuild containers
- **Cache not working**: Check database logs, look for "Cache HIT/MISS" in backend logs
- **JSONB validation errors**: PostgreSQL JSONB returns dict, convert to JSON string before validation
- **Backend won't start**: Check `OPENAI_API_KEY` and `DATABASE_URL` in `.env`

## Production

AWS Elastic Beanstalk + CloudFront. CloudFront routes `scaler.com/career-profile-tool/*` to EB.

Environment variables:
```
OPENAI_API_KEY=sk-proj-xxxxx
DATABASE_URL=postgresql://user:pass@rds-endpoint:5432/dbname
ENVIRONMENT=production
LOG_LEVEL=INFO
LOG_FORMAT=json
ADMIN_USERNAME=xxx
ADMIN_PASSWORD=xxx
REACT_APP_TURNSTILE_SITEKEY=xxx  # Cloudflare Turnstile for frontend
NPM_TOKEN=xxx                     # If using private npm packages
```

## Additional Documentation

This repository contains several other documentation files:

- **README.md** - Quick start guide and project overview
- **DEV_SETUP.md** - Detailed local development workflow (emphasizes `docker compose watch`)
- **AWS_INFRASTRUCTURE.md** - Comprehensive AWS deployment architecture and networking
- **VPC_DEEP_DIVE.md** - Deep dive into VPC configuration for production
- **AGENTS.md** - Documentation about AI agents/personas used in evaluations
- **QUIZ_FIELDS_DOCUMENTATION.md** - Detailed quiz field specifications
- **QUIZ_QUESTIONS_AND_OPTIONS.md** - Quiz question templates and options

When working on AWS deployment or networking issues, refer to AWS_INFRASTRUCTURE.md and VPC_DEEP_DIVE.md for detailed information.
