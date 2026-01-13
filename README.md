# Business <> AI MBA Free Profile Evaluator

**Status**: 🟢 Production Ready | **Architecture**: ✅ Clean & Professional | **AWS**: ✅ CloudFront + Elastic Beanstalk

---

## 🎯 What This Is

A dual-purpose career evaluation platform that provides:

1. **MBA Readiness Evaluation** (Primary) - Deterministic, mapping-based assessment for business professionals
2. **Tech Career Evaluation** (Legacy) - AI-powered career profile evaluation using GPT-4

**Key Innovation**: Intelligent caching layer with PostgreSQL reduces OpenAI API costs by 50-99% for tech evaluations.

---

## 🚀 Quick Start

### Development with Docker Compose Watch (Recommended)

```bash
# 1. Set up PostgreSQL locally (macOS)
brew install postgresql@15
brew services start postgresql@15
createdb profile_cache
psql -d profile_cache -f backend/init.sql

# 2. Create .env file in project root
cat > .env << EOF
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxx
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_secure_password
DATABASE_URL=postgresql://your_username@localhost:5432/profile_cache
EOF

# 3. Start with live code reloading (RECOMMENDED)
docker compose watch

# Changes in backend/src/** and frontend/src/** auto-sync
# Python: uvicorn auto-reloads, React: auto-rebuilds
# No container restarts needed!
```

### Access Points

- **Frontend**: http://localhost/career-profile-tool/
- **Backend API**: http://localhost:8000/career-profile-tool/api/
- **Health Check**: http://localhost:8000/career-profile-tool/api/health

**⚠️ Security Note**: `ADMIN_USERNAME` and `ADMIN_PASSWORD` are **required** for admin endpoints (`/admin/view/*`)

---

## 📂 Project Structure

```
Online MBA FPE/
├── frontend/                    # React 18 Application (Nginx on port 80)
│   ├── src/
│   │   ├── components/         # React components
│   │   │   ├── MBAResultsPage.js       # MBA results (current)
│   │   │   ├── quiz/MBAQuizScreens.js  # MBA quiz questions
│   │   │   └── quiz/MBAQuiz.js         # MBA quiz logic
│   │   ├── store/              # Nanostores state management
│   │   ├── app/                # App-level components
│   │   └── utils/              # Utility functions
│   └── package.json            # homepage: "/career-profile-tool"
│
└── backend/                     # FastAPI Application (port 8000)
    └── src/
        ├── api/
        │   └── main.py         # Routes under /career-profile-tool/api
        ├── services/
        │   ├── mba_evaluator.py          # MBA evaluation (no OpenAI)
        │   ├── mba_openai_service.py     # OpenAI integration for MBA
        │   ├── mba_career_journey.py     # Career path recommendations
        │   └── run_poc.py                # Tech eval (uses OpenAI + cache)
        ├── repositories/
        │   └── cache_repository.py       # PostgreSQL cache access
        ├── models/
        │   ├── mba_models.py             # MBA evaluation schemas
        │   └── models.py                 # Tech eval schemas
        └── config/              # Configuration & logging
```

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| **[CLAUDE.md](CLAUDE.md)** | 🤖 **START HERE** - Complete guide for Claude Code |
| **[DEV_SETUP.md](DEV_SETUP.md)** | 💻 Local development workflow (`docker compose watch`) |
| **[AWS_INFRASTRUCTURE.md](AWS_INFRASTRUCTURE.md)** | ☁️ AWS deployment architecture |
| **[VPC_DEEP_DIVE.md](VPC_DEEP_DIVE.md)** | 🔒 VPC configuration for production |
| **[README.md](README.md)** | 📋 This file - project overview |

---

## ✅ What's Included

### Evaluation Engines
- ✅ **MBA Readiness Evaluation** - Pure mapping-based logic (no API costs)
- ✅ **Tech Career Evaluation** - GPT-4 with intelligent caching (50-99% savings)
- ✅ PostgreSQL-based SHA256 hash caching for OpenAI responses

### Architecture
- ✅ Clean three-tier architecture (API → Service → Repository)
- ✅ FastAPI backend with Pydantic validation
- ✅ React 18 frontend with Nanostores state management
- ✅ Docker Compose for local development with live reloading

### Production Features
- ✅ AWS CloudFront + Elastic Beanstalk deployment
- ✅ Admin endpoints with secure authentication
- ✅ Health check endpoints
- ✅ Structured JSON logging
- ✅ Custom exception handling
- ✅ Comprehensive error tracking

---

## 🔧 Common Commands

```bash
# Daily development with live code reloading (RECOMMENDED)
docker compose watch

# Start all services (traditional)
docker compose up --build

# View logs
docker compose logs -f backend
docker compose logs -f frontend

# Restart individual service
docker compose restart backend

# Stop all services
docker compose down

# Check service health
curl http://localhost:8000/career-profile-tool/api/health

# Deploy frontend changes
cd frontend && npm run build
docker cp frontend/build/. cpe-frontend:/usr/share/nginx/html/
docker-compose restart frontend

# Clear PostgreSQL cache (for testing)
psql -d profile_cache -c "DELETE FROM response_cache;"
```

---

## 🌐 Production Deployment

**Architecture**: CloudFront (CDN) → Elastic Beanstalk (Application) → Local PostgreSQL

### Environment Variables

```bash
# Production .env (required)
OPENAI_API_KEY=sk-proj-xxxxx
DATABASE_URL=postgresql://user:pass@rds-endpoint:5432/dbname
ENVIRONMENT=production
LOG_LEVEL=INFO
LOG_FORMAT=json
ADMIN_USERNAME=xxx
ADMIN_PASSWORD=xxx
REACT_APP_TURNSTILE_SITEKEY=xxx  # Cloudflare Turnstile
NPM_TOKEN=xxx                     # If using private packages
```

### Deployment Process

1. **Build locally**: `cd frontend && npm run build`
2. **Deploy backend**: Push to Elastic Beanstalk (see AWS_INFRASTRUCTURE.md)
3. **Update CloudFront**: Invalidate cache if needed
4. **Verify**: Check https://scaler.com/career-profile-tool/

**Complete guide**: See [AWS_INFRASTRUCTURE.md](AWS_INFRASTRUCTURE.md) for full deployment steps

---

## 🎯 Key Features

### MBA Readiness Evaluation (Primary)
- **Role-based assessment** for PM, Finance, Sales, Marketing, Operations, Founder
- **Deterministic scoring** using weighted logic (no OpenAI = zero API cost)
- **Skill inference** from quiz responses with predefined mappings
- **Personalized quick wins** and AI tool recommendations
- **Career path mapping** based on role and goals
- **Industry transformation insights** from real companies

### Tech Career Evaluation (Legacy)
- **GPT-4 powered** personalized career advice
- **Intelligent caching** with SHA256 hashing
- **50-99% cost reduction** through deduplication
- **Admin panel** to view cached responses

### UI/UX Features
- **Mandatory 5-second loader** for smooth user experience
- **Recharts radar visualization** for skill comparison
- **Responsive design** with mobile optimization
- **CSAT feedback** via Tally integration
- **Real-time progress tracking** during quiz

---

## 🗄️ Database Schema

### response_cache (Tech Career Evaluation)
- `cache_key` (SHA256 hash) + `model` = composite unique key
- `user_input` (JSONB) - Original request payload
- `response_json` (JSONB) - Cached OpenAI response
- Automatic timestamp tracking

### crt_quiz_responses (Career Roadmap Tool)
- `hash_key` (MD5 hash) - Unique per response
- `quiz_responses` (JSONB) - Quiz data

**Schema**: See [backend/init.sql](backend/init.sql)

---

## 📊 API Endpoints

### MBA Evaluation
- `POST /career-profile-tool/api/mba/evaluate` - MBA readiness evaluation

### Tech Career Evaluation
- `POST /career-profile-tool/api/evaluate` - Tech career evaluation (with caching)

### Admin
- `GET /career-profile-tool/api/admin/view/response/:response_id` - View cached tech eval
- `GET /career-profile-tool/api/crt/admin/view/:hash_key` - View CRT responses

### System
- `GET /career-profile-tool/api/health` - Health check

**Base Path**: All routes prefixed with `/career-profile-tool/api`

---

## 🆘 Troubleshooting

### Backend not starting
```bash
docker compose logs backend
# Check: OPENAI_API_KEY, DATABASE_URL in .env
# Verify PostgreSQL: psql -d profile_cache -c "SELECT 1"
```

### Database connection issues
```bash
# Start PostgreSQL
brew services start postgresql@15

# Check connection
psql -d profile_cache -c "SELECT 1"

# Verify DATABASE_URL in .env
```

### Frontend can't reach backend
```bash
# Check backend health
curl http://localhost:8000/career-profile-tool/api/health

# Verify setupProxy.js configuration
```

### Build errors
```bash
# Frontend
cd frontend && npm install && npm run build

# Backend
cd backend && uv sync --all-extras
```

**Full troubleshooting**: See [DEV_SETUP.md](DEV_SETUP.md) and [AWS_INFRASTRUCTURE.md](AWS_INFRASTRUCTURE.md)

---

## 💰 Cost Breakdown

### API Costs
- **MBA Evaluation**: $0 (pure mapping logic, no API calls)
- **Tech Evaluation**: 50-99% reduction via caching
  - First evaluation: ~$0.05-0.10 per user
  - Cached evaluations: $0

### AWS Infrastructure
- **CloudFront**: ~$5-10/month (CDN, SSL)
- **Elastic Beanstalk**: ~$30-60/month (t3.medium instance)
- **Total**: ~$35-70/month (no RDS needed - PostgreSQL in Docker)

---

## 🎉 Recent Updates

### Latest Changes (2026-01-13)
- ✅ **5-second mandatory loader** with parallel API requests
- ✅ **Center-aligned loader** for better UX
- ✅ **CSAT banner update** with new Tally form
- ✅ **Business <> AI branding** across all pages
- ✅ **Codebase cleanup** - removed redundant tech career quiz files

### MBA Evaluation Features
- ✅ **OpenAI integration** for personalized transformation stories
- ✅ **Career path recommendations** with actionable milestones
- ✅ **Tool personalization** based on user role and gaps
- ✅ **Scenario-based questions** for seniority assessment
- ✅ **Mobile-responsive results** with print-friendly styling

### Infrastructure
- ✅ CloudFront + Elastic Beanstalk production setup
- ✅ Docker Compose watch mode for development
- ✅ PostgreSQL caching layer (tech eval only)
- ✅ Admin endpoints with secure authentication

---

## 📞 Need Help?

1. **Start here**: [CLAUDE.md](CLAUDE.md) - Complete project guide
2. **Development**: [DEV_SETUP.md](DEV_SETUP.md) - Local setup with `docker compose watch`
3. **AWS Deployment**: [AWS_INFRASTRUCTURE.md](AWS_INFRASTRUCTURE.md) - Production deployment
4. **Architecture**: See `src/` structure and CLAUDE.md for design decisions

---

**Version**: 3.0.0 - MBA Readiness Evaluation
**Status**: 🟢 Production Ready
**Last Updated**: 2026-01-13

🚀 **Live at**: https://scaler.com/career-profile-tool/
