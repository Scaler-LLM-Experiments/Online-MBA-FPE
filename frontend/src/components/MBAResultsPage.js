import React, { useState, useEffect, useCallback } from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
  Tooltip
} from 'recharts';
import {
  CheckCircle,
  MagnifyingGlass,
  Target,
  Lightbulb,
  Rocket,
  Books,
  ChartLine,
  Sparkle,
  TrendUp,
  Phone,
  ArrowRight
} from 'phosphor-react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../context/ProfileContext';
import { useRequestCallback } from '../app/context/RequestCallbackContext';
import { apiRequest } from '../utils/api';
import { getPathWithQueryParams } from '../utils/url';
import tracker from '../utils/tracker';
import oliveBranchLeft from '../assets/Left-Olive-Branch.png';
import oliveBranchRight from '../assets/Right-Olive-branch.png';

const PrintStyles = createGlobalStyle`
  @media print {
    @page {
      margin: 12mm;
    }
    body {
      background: white !important;
      color: #1e293b;
    }
  }
`;

const ResultsContainer = styled.div`
  min-height: calc(100vh - 70px);
  background: #f8fafc;
  padding: 40px 20px;

  @media (max-width: 768px) {
    padding: 24px 0;
  }

  @media print {
    min-height: auto;
    background: white;
    padding: 0;
  }
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 100px;

  @media (max-width: 1024px) {
    padding: 0 40px;
  }

  @media (max-width: 768px) {
    padding: 0 16px;
  }

  @media print {
    max-width: none;
    margin: 0;
    padding: 0 24px;
  }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  max-width: 600px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const LoadingContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
  animation: ${pulse} 2s ease-in-out infinite;
`;

const LoadingIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: #f1f5f9;
  border-radius: 0;
  border: 1px solid #e2e8f0;
  color: #c71f69;
  flex-shrink: 0;
`;

const LoadingText = styled.div`
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
  text-align: center;
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 8px;
  background: #e2e8f0;
  border-radius: 0;
  overflow: hidden;
  margin-top: 24px;
`;

const ProgressBarFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #c71f69 0%, #e11d48 100%);
  transition: width 0.3s ease;
  width: ${(props) => props.progress}%;
`;

const LoadingSubtext = styled.div`
  font-size: 0.875rem;
  color: #64748b;
  margin-top: 4px;
  text-align: center;
`;

// HERO SECTION - Exact copy from ProfileMatchHeroV2
const HeroContainer = styled.div`
  background: white;
  border-radius: 0;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 48px;
  display: flex;
  flex-direction: column;
  min-height: auto;
  overflow: visible;

  @media (max-width: 1024px) {
    display: flex;
    flex-direction: column;
    min-height: auto;
  }
`;

const LeftPanel = styled.div`
  background: ${(props) => {
    if (props.score >= 60) return '#059669';
    return '#0F2B48';
  }};
  color: #ffffff;
  padding: ${(props) =>
    props.score >= 60 ? '48px 120px 48px 60px' : '48px 80px 48px 40px'};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 60px;
  position: relative;
  height: auto;
  overflow-y: visible;
  border-right: none;
  border-bottom: 2px solid
    ${(props) => (props.score >= 60 ? '#065f46' : '#1a3a52')};

  @media (max-width: 1024px) {
    position: relative;
    height: auto;
    overflow-y: visible;
    border-right: none;
    flex-direction: column;
    padding: 32px 24px;
  }

  @media (max-width: 768px) {
    padding: 16px;
    flex-direction: column;
    gap: 24px;
    align-items: stretch;
  }
`;

const GreetingSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  gap: 16px;
`;

const HeroGreeting = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
  color: #ffffff;
  white-space: pre-line;

  @media (max-width: 768px) {
    font-size: 1.75rem;
    text-align: left;
  }
`;

const GreetingSubtext = styled.div`
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.85);
  max-width: 550px;

  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`;

const ScoreSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: ${(props) => (props.hasOliveBranches ? '24px 0' : '12px 0')};
  position: relative;

  @media (max-width: 768px) {
    ${(props) =>
    !props.hasOliveBranches
      ? `
      align-items: flex-start;
      text-align: left;
    `
      : ''}
  }
`;

const OliveBranch = styled.img`
  position: absolute;
  height: 100px;
  width: auto;
  opacity: 0.8;

  ${(props) =>
    props.position === 'left'
      ? `
    left: -65px;
    top: 40%;
    transform: translateY(-50%);
  `
      : `
    right: -65px;
    top: 40%;
    transform: translateY(-50%);
  `}

  @media (max-width: 768px) {
    ${(props) =>
    props.position === 'left'
      ? `
      left: 0;
    `
      : `
      right: 0;
    `}
  }
`;

const ScoreDisplay = styled.div`
  font-size: 4.625rem;
  font-weight: 700;
  line-height: 1;
  margin-bottom: 8px;
  color: #ffffff;

  @media (max-width: 768px) {
    font-size: 3.5rem;
  }
`;

const ScoreLabel = styled.div`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 16px;
  color: #cbd5e1;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const MaturityLevel = styled.div`
  display: inline-block;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 8px 20px;
  border-radius: 24px;
  font-size: 0.875rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.95);
  text-transform: capitalize;
`;

const RightPanel = styled.div`
  padding: 64px;
  overflow-y: visible;
  height: auto;

  @media (max-width: 1024px) {
    height: auto;
    overflow-y: visible;
    padding: 32px 24px;
  }

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const SectionBlock = styled.div`
  margin-bottom: 64px;

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    margin-bottom: 40px;
  }
`;

const SectionHeading = styled.h4`
  font-size: 1rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SectionSubtitle = styled.p`
  font-size: 0.875rem;
  color: #64748b;
  margin: 0 0 16px 0;
  line-height: 1.4;
`;

const SectionDivider = styled.div`
  height: 1px;
  background: #e2e8f0;
  margin-bottom: 20px;
`;

// QUICK WINS - Exact copy from ProfileMatchHeroV2
const QuickWinsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
`;

const QuickWinItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0;
  padding: 0;
  background: transparent;
  border: none;
  width: 100%;
  text-align: left;
  transition: all 0.2s ease;
  position: relative;
`;

const QuickWinNumber = styled.div`
  background: #f1f5f9;
  color: #1e293b;
  width: 64px;
  height: 64px;
  border-radius: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  flex-shrink: 0;
  border: 2px solid #e2e8f0;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    left: 100%;
    top: 50%;
    transform: translateY(-50%);
    width: 104px;
    height: 2px;
    background: #e2e8f0;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const QuickWinSpacer = styled.div`
  width: 104px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    display: none;
  }
`;

const QuickWinCard = styled.div`
  flex: 1;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 0;
  padding: 16px;

  @media (max-width: 768px) {
    padding: 12px;
  }
`;

const QuickWinIconContainer = styled.div`
  width: 48px;
  height: 48px;
  background: ${(props) => props.iconColor || '#e8eaf6'};
  border-radius: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  flex-shrink: 0;
  margin-bottom: 16px;

  svg {
    color: white;
  }
`;

const QuickWinContent = styled.div`
  flex: 1;
  width: 100%;
`;

const QuickWinTitle = styled.div`
  font-size: 1.0625rem;
  color: #1e293b;
  font-weight: 700;
  margin-bottom: 8px;
  line-height: 1.3;
`;

const QuickWinDescription = styled.div`
  font-size: 0.875rem;
  color: #64748b;
  line-height: 1.5;
`;

// TOOLS GRID - Exact copy from ProfileMatchHeroV2
const ToolsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const Tool = styled.div`
  background: white;
  border: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  gap: 12px;
  border-radius: 0;
  padding: 12px 16px;
`;

const ToolLogoPlaceholder = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 4px;
  background: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 600;
  color: #64748b;
  flex-shrink: 0;
`;

const ToolName = styled.div`
  font-size: 0.875rem;
  font-weight: 500;
  color: #1e293b;
`;

// RADIAL CHART SECTION - styled to match SkillMapNew
const RadialChartWrapper = styled.div`
  display: flex;
  gap: 48px;
  align-items: center;

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 32px;
  }
`;

const ChartContainer = styled.div`
  flex: 0 0 600px;
  width: 100%;
  max-width: 600px;
  height: 440px;
  min-width: 0;
  overflow: visible;
  position: relative;
  background: linear-gradient(to bottom, #ffffff 0%, #f8f9fa 100%);
  border-radius: 8px;
  padding: 20px;

  @media (max-width: 1024px) {
    flex: none;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 400px;
    overflow-x: auto;
    padding: 24px 0 10px 0;
  }
`;

const ChartDescription = styled.div`
  flex: 1;
`;

const DescriptionText = styled.p`
  font-size: 0.9375rem;
  color: #475569;
  line-height: 1.6;
  margin-bottom: 24px;

  strong {
    color: #c71f69;
    font-weight: 600;
  }
`;

const SkillsSummaryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SkillSummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 0;
`;

const SkillSummaryName = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  color: #1e293b;
  text-transform: capitalize;
`;

const SkillSummaryLevel = styled.div`
  font-size: 0.875rem;
  color: #64748b;

  span {
    color: #c71f69;
    font-weight: 700;
    margin-left: 8px;
  }
`;

// TRANSFORMATION STORIES - styled to match
const TransformationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TransformationCard = styled.div`
  border: 1px solid #e2e8f0;
  border-radius: 0;
  background: white;
  overflow: hidden;
`;

const TransformationHeader = styled.div`
  background: #1e3a52;
  padding: 24px;
  text-align: center;
`;

const CompanyLogo = styled.div`
  width: 64px;
  height: 64px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 12px auto;
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e3a52;
`;

const CompanyName = styled.div`
  font-size: 1.125rem;
  font-weight: 700;
  color: white;
  margin-bottom: 4px;
`;

const CompanyIndustry = styled.div`
  font-size: 0.8125rem;
  color: rgba(255, 255, 255, 0.7);
`;

const TransformationBody = styled.div`
  padding: 20px;
`;

const TransformationLabel = styled.div`
  font-size: 0.6875rem;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 6px;
`;

const TransformationText = styled.div`
  font-size: 0.875rem;
  color: #1e293b;
  line-height: 1.5;
  margin-bottom: 16px;
`;

const LookingForBox = styled.div`
  background: #fefce8;
  border: 2px solid #fde047;
  border-radius: 0;
  padding: 12px;
  margin-top: 20px;
`;

const LookingForTitle = styled.div`
  font-size: 0.75rem;
  font-weight: 700;
  color: #854d0e;
  text-transform: uppercase;
  margin-bottom: 6px;
`;

const LookingForText = styled.div`
  font-size: 0.8125rem;
  color: #713f12;
  line-height: 1.4;
`;

const UpskillBanner = styled.div`
  background: linear-gradient(135deg, #c71f69 0%, #a01855 100%);
  color: white;
  padding: 20px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-top: 24px;
  border-radius: 0;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const UpskillText = styled.div`
  font-size: 0.9375rem;
  font-weight: 600;
  flex: 1;
`;

const UpskillCTA = styled.button`
  background: white;
  color: #c71f69;
  border: none;
  padding: 10px 20px;
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;

  &:hover {
    transform: translateX(4px);
  }
`;

// INDUSTRY STATS - styled to match
const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
`;

const StatCard = styled.div`
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 0;
  padding: 20px;
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #c71f69;
  margin-bottom: 8px;
`;

const StatDescription = styled.div`
  font-size: 0.875rem;
  color: #475569;
  line-height: 1.5;
  margin-bottom: 8px;
`;

const StatSource = styled.div`
  font-size: 0.75rem;
  color: #94a3b8;
  font-style: italic;
`;

// FLOATING CTA - Exact copy from ProfileMatchHeroV2
const FloatingCTA = styled.button`
  position: fixed;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  background: #c71f69;
  color: white;
  border: none;
  padding: 16px 32px;
  font-size: 0.9375rem;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(199, 31, 105, 0.35);
  z-index: 100;
  transition: all 0.3s ease;
  white-space: nowrap;
  width: auto;
  max-width: 90%;
  display: flex;
  align-items: center;
  gap: 10px;

  &:hover {
    background: #a01855;
    box-shadow: 0 12px 32px rgba(199, 31, 105, 0.45);
    transform: translateX(-50%) translateY(-2px);
  }

  &:active {
    transform: translateX(-50%) translateY(0);
  }

  @media (max-width: 768px) {
    bottom: 20px;
    padding: 14px 24px;
    font-size: 0.875rem;
  }

  @media print {
    display: none;
  }
`;

// TOOLTIP STYLING - Exact copy from SkillMapNew.jsx (monochromatic grey)
const TooltipBox = styled.div`
  background: #2d2d2d;
  color: #ffffff;
  padding: 14px 16px;
  border-radius: 0;
  border: 1px solid #3a3a3a;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
  font-family: 'Plus Jakarta Sans', sans-serif;
  width: 340px;
  z-index: 100;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -8px;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 8px solid #2d2d2d;
  }
`;

const TooltipTitle = styled.div`
  font-weight: 700;
  font-size: 14px;
  color: #ffffff;
  margin-bottom: 8px;
  width: 100%;
`;

const TooltipDescription = styled.div`
  font-size: 13px;
  color: #f0f0f0;
  line-height: 1.6;
  margin-bottom: 10px;
  width: 100%;
  word-wrap: break-word;
  overflow-wrap: break-word;
`;

// CUSTOM TOOLTIP COMPONENT - Exact copy from SkillMapNew.jsx
const CustomTooltip = ({ active, payload, position }) => {
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    checkMobileView();
    window.addEventListener('resize', checkMobileView);
    return () => window.removeEventListener('resize', checkMobileView);
  }, []);

  // Don't show tooltip on mobile
  if (isMobileView) {
    return null;
  }

  if (active && payload && payload.length) {
    const dataPoint = payload[0].payload;

    // Skill descriptions for MBA skills
    const skillDescriptions = {
      'business_acumen': {
        title: 'Business Acumen',
        description: 'Your understanding of business models, market dynamics, and strategic thinking. Essential for making data-driven business decisions.'
      },
      'data_analytics': {
        title: 'Data Analytics',
        description: 'Your ability to analyze data and derive actionable insights. Critical for informed decision-making and strategy formulation.'
      },
      'ai_literacy': {
        title: 'AI Literacy',
        description: 'Your proficiency in understanding and applying AI tools and concepts. Key to leveraging AI for business transformation.'
      },
      'strategic_thinking': {
        title: 'Strategic Thinking',
        description: 'Your capacity for long-term planning and systems thinking. Vital for leadership roles and organizational growth.'
      },
      'leadership': {
        title: 'Leadership',
        description: 'Your ownership, accountability, and ability to influence teams. Essential for driving change and managing complex projects.'
      },
      'problem_solving': {
        title: 'Problem Solving',
        description: 'Your analytical approach to challenges and structured problem-solving skills. Crucial for navigating complex business scenarios.'
      }
    };

    const skillInfo = skillDescriptions[dataPoint.category];

    const tooltipX = position?.x || 0;
    const tooltipY = position?.y || 0;

    const horizontalOffset = 28;
    const verticalOffset = -30;

    return (
      <TooltipBox
        style={{
          position: 'absolute',
          left: '50%',
          transform: `translateX(${horizontalOffset}%)`,
          top: `${tooltipY + verticalOffset}px`,
          pointerEvents: 'none'
        }}
      >
        <TooltipTitle>{skillInfo?.title}</TooltipTitle>
        <TooltipDescription>{skillInfo?.description}</TooltipDescription>
      </TooltipBox>
    );
  }
  return null;
};

const MBAResultsPage = () => {
  const navigate = useNavigate();
  const { quizResponses } = useProfile();
  const { open: openCallbackModal } = useRequestCallback();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const loadingSteps = [
    {
      icon: <MagnifyingGlass size={28} weight="bold" />,
      text: 'Analyzing your profile...',
      subtext: 'Evaluating your Business x AI readiness'
    },
    {
      icon: <CheckCircle size={28} weight="bold" />,
      text: 'Mapping your skills...',
      subtext: 'Identifying strengths and gaps'
    },
    {
      icon: <Target size={28} weight="bold" />,
      text: 'Generating quick wins...',
      subtext: 'Finding actionable next steps'
    },
    {
      icon: <Sparkle size={28} weight="bold" />,
      text: 'Finalizing your report...',
      subtext: 'Almost there!'
    }
  ];

  const [loadingStep, setLoadingStep] = useState(0);

  const transformationStories = [
    {
      company: 'Netflix',
      industry: 'Entertainment',
      preAI:
        'Manual content categorization and basic recommendation system based on genre matching.',
      postAI:
        'AI-powered recommendation engine analyzing viewing patterns, resulting in 80% of watched content coming from recommendations.',
      lookingFor:
        'Data Scientists, ML Engineers, AI Product Managers who can build and scale recommendation systems'
    },
    {
      company: 'Zomato',
      industry: 'Food Tech',
      preAI:
        'Static delivery time estimates and manual restaurant ranking based on ratings.',
      postAI:
        'Dynamic AI-driven delivery routing and personalized restaurant recommendations, reducing delivery time by 30%.',
      lookingFor:
        'AI Engineers, Operations Analysts with ML knowledge, Product Managers with data expertise'
    },
    {
      company: 'HDFC Bank',
      industry: 'Banking & Finance',
      preAI:
        'Manual fraud detection processes with high false positive rates and delayed responses.',
      postAI:
        'Real-time AI fraud detection system processing millions of transactions, reducing fraud by 60%.',
      lookingFor:
        'Risk Analysts with ML skills, AI Security Specialists, Fintech Product Managers'
    }
  ];

  useEffect(() => {
    tracker.pageview({ page_name: 'mba_results_page' });

    const fetchEvaluation = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!quizResponses || !quizResponses.currentRole) {
          navigate(getPathWithQueryParams('/quiz'));
          return;
        }

        setLoadingProgress(0);
        setLoadingStep(0);

        const progressInterval = setInterval(() => {
          setLoadingProgress((prev) => {
            if (prev >= 95) {
              clearInterval(progressInterval);
              return 95;
            }
            return prev + 1;
          });
        }, 60);

        const stepInterval = setInterval(() => {
          setLoadingStep((prev) => {
            if (prev >= loadingSteps.length - 1) {
              clearInterval(stepInterval);
              return prev;
            }
            return prev + 1;
          });
        }, 1500);

        const payload = {
          role: quizResponses.currentRole,
          experience: quizResponses.experience,
          career_goal: quizResponses.careerGoal || 'career-growth',
          ...quizResponses
        };

        const response = await apiRequest(
          'POST',
          '/career-profile-tool/api/mba/evaluate',
          payload
        );

        clearInterval(progressInterval);
        clearInterval(stepInterval);
        setLoadingProgress(100);

        setTimeout(() => {
          setResults(response);
          setLoading(false);
        }, 500);
      } catch (err) {
        console.error('Failed to fetch MBA evaluation:', err);
        setError('Failed to load your evaluation. Please try again.');
        setLoading(false);
      }
    };

    fetchEvaluation();
  }, [quizResponses, navigate]);

  const handleRCBClick = useCallback(() => {
    tracker.click({
      click_type: 'rcb_btn_clicked',
      custom: { source: 'mba_results_page_floating_cta' }
    });
    tracker.ctaClick({
      click_type: 'rcb_btn_clicked',
      custom: { source: 'mba_results_page_floating_cta' }
    });
    openCallbackModal?.({ source: 'mba_results_page_floating_cta' });
  }, [openCallbackModal]);

  if (loading) {
    const currentStep = loadingSteps[loadingStep];
    return (
      <ResultsContainer>
        <Container>
          <LoadingContainer>
            <LoadingContent>
              <LoadingIcon>{currentStep.icon}</LoadingIcon>
              <div>
                <LoadingText>{currentStep.text}</LoadingText>
                <LoadingSubtext>{currentStep.subtext}</LoadingSubtext>
              </div>
            </LoadingContent>
            <ProgressBarContainer>
              <ProgressBarFill progress={loadingProgress} />
            </ProgressBarContainer>
          </LoadingContainer>
        </Container>
      </ResultsContainer>
    );
  }

  if (error) {
    return (
      <ResultsContainer>
        <Container>
          <LoadingContainer>
            <LoadingText style={{ color: '#dc2626' }}>{error}</LoadingText>
          </LoadingContainer>
        </Container>
      </ResultsContainer>
    );
  }

  if (!results) return null;

  const { readiness, skills, quick_wins, ai_tools, industry_stats } = results;
  const hasOliveBranches = readiness.overall_score >= 60;

  const iconColors = ['#D90065', '#D77C00', '#C32841', '#1D925B', '#0052FF', '#016DD9'];
  const iconMap = {
    0: <Lightbulb size={24} weight="fill" />,
    1: <Rocket size={24} weight="fill" />,
    2: <Books size={24} weight="fill" />,
    3: <Target size={24} weight="fill" />,
    4: <ChartLine size={24} weight="fill" />
  };

  // Prepare data for Recharts RadarChart
  const radarData = Object.entries(skills.skills).map(([skillName, skillData]) => ({
    category: skillName,
    user: skillData.level * 20, // Convert 1-5 scale to 0-100
    average: 60, // Average MBA baseline at 60%
    fullMark: 100
  }));

  return (
    <ResultsContainer>
      <PrintStyles />
      <Container>
        <HeroContainer>
          <LeftPanel score={readiness.overall_score}>
            <GreetingSection>
              <HeroGreeting>
                {readiness.overall_score >= 60
                  ? `Hey There,\nYour Profile Has Potential`
                  : `Let's Build Your\nMBA Readiness`}
              </HeroGreeting>
              <GreetingSubtext>
                {readiness.overall_score >= 60
                  ? 'Your path to 100% career readiness starts here.'
                  : 'You have room to grow. Follow the personalized action items below to boost your readiness.'}
              </GreetingSubtext>
            </GreetingSection>

            <ScoreSection hasOliveBranches={hasOliveBranches}>
              {hasOliveBranches && (
                <OliveBranch position="left" src={oliveBranchLeft} alt="" />
              )}
              <ScoreDisplay>{readiness.overall_score}</ScoreDisplay>
              <ScoreLabel>MBA Readiness Score</ScoreLabel>
              <MaturityLevel>
                {readiness.maturity_level.replace('_', ' ')}
              </MaturityLevel>
              {hasOliveBranches && (
                <OliveBranch position="right" src={oliveBranchRight} alt="" />
              )}
            </ScoreSection>
          </LeftPanel>

          <RightPanel>
            {/* Skills Analysis with Recharts Radar */}
            <SectionBlock>
              <SectionHeading>
                <ChartLine size={18} weight="regular" />
                See Where You Stand Today
              </SectionHeading>
              <SectionSubtitle>
                Compare your strengths and areas for improvement
              </SectionSubtitle>
              <SectionDivider />

              <RadialChartWrapper>
                <ChartContainer>
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart
                      data={radarData}
                      cx="50%"
                      cy="45%"
                      outerRadius="80%"
                      margin={{ top: 40, right: 80, bottom: 40, left: 80 }}
                    >
                      <PolarGrid stroke="#e2e8f0" />
                      <PolarAngleAxis
                        dataKey="category"
                        tick={{ fill: '#475569', fontSize: 14, fontWeight: 600 }}
                      />
                      <PolarRadiusAxis
                        angle={90}
                        domain={[0, 100]}
                        tick={{ fill: '#94a3b8', fontSize: 10 }}
                      />
                      <Tooltip content={<CustomTooltip />} />

                      {/* Average learner (dotted outline) */}
                      <Radar
                        name="Avg. MBA Candidate"
                        dataKey="average"
                        stroke="#94a3b8"
                        fill="#94a3b8"
                        fillOpacity={0.1}
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={{ fill: '#94a3b8', r: 4 }}
                        activeDot={{ fill: '#60a5fa', r: 7 }}
                      />

                      {/* User's skills (filled area) */}
                      <Radar
                        name="My Skills"
                        dataKey="user"
                        stroke="#3B82F6"
                        fill="#3B82F6"
                        fillOpacity={0.5}
                        strokeWidth={2}
                        dot={{ fill: '#3B82F6', r: 5 }}
                        activeDot={{
                          fill: '#1e40af',
                          r: 8,
                          strokeWidth: 2,
                          stroke: '#fff'
                        }}
                      />

                      <Legend
                        wrapperStyle={{
                          paddingTop: '10px',
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                          fontSize: '0.875rem'
                        }}
                        iconType="rect"
                        formatter={(value) => (
                          <span style={{ marginLeft: '8px', marginRight: '24px' }}>
                            {value}
                          </span>
                        )}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </ChartContainer>

                <ChartDescription>
                  <DescriptionText>
                    Your skills profile shows{' '}
                    <strong>
                      {Object.values(skills.skills).filter((s) => s.level >= 4).length}{' '}
                      strong competencies
                    </strong>{' '}
                    and{' '}
                    <strong>
                      {Object.values(skills.skills).filter((s) => s.level <= 2).length}{' '}
                      areas for growth
                    </strong>
                    . The chart above compares your current skills against the average MBA
                    candidate profile.
                  </DescriptionText>

                  <SkillsSummaryList>
                    {Object.entries(skills.skills)
                      .slice(0, 4)
                      .map(([skillName, skillData]) => (
                        <SkillSummaryItem key={skillName}>
                          <SkillSummaryName>
                            {skillName.replace('_', ' ')}
                          </SkillSummaryName>
                          <SkillSummaryLevel>
                            {skillData.label}<span>{skillData.level}/5</span>
                          </SkillSummaryLevel>
                        </SkillSummaryItem>
                      ))}
                  </SkillsSummaryList>
                </ChartDescription>
              </RadialChartWrapper>
            </SectionBlock>

            {/* Quick Wins */}
            {quick_wins && quick_wins.length > 0 && (
              <SectionBlock>
                <SectionHeading>Quick Wins for You</SectionHeading>
                <SectionSubtitle>
                  Take these actionable steps to improve your profile
                </SectionSubtitle>
                <SectionDivider />
                <QuickWinsList>
                  {quick_wins.slice(0, 4).map((win, index) => {
                    const iconColor = iconColors[index % iconColors.length];
                    const IconComponent = iconMap[index] || iconMap[0];

                    return (
                      <QuickWinItem key={index}>
                        <QuickWinNumber>{index + 1}</QuickWinNumber>
                        <QuickWinSpacer />
                        <QuickWinCard>
                          <QuickWinIconContainer iconColor={iconColor}>
                            {IconComponent}
                          </QuickWinIconContainer>
                          <QuickWinContent>
                            <QuickWinTitle>{win.title}</QuickWinTitle>
                            <QuickWinDescription>{win.description}</QuickWinDescription>
                          </QuickWinContent>
                        </QuickWinCard>
                      </QuickWinItem>
                    );
                  })}
                </QuickWinsList>
              </SectionBlock>
            )}

            {/* Industry Transformation Stories */}
            <SectionBlock>
              <SectionHeading>
                <Sparkle size={18} weight="regular" />
                How Companies Are Transforming with AI
              </SectionHeading>
              <SectionSubtitle>
                Real examples of AI-driven business transformation in India
              </SectionSubtitle>
              <SectionDivider />

              <TransformationGrid>
                {transformationStories.map((story, index) => (
                  <TransformationCard key={index}>
                    <TransformationHeader>
                      <CompanyLogo>{story.company.charAt(0)}</CompanyLogo>
                      <CompanyName>{story.company}</CompanyName>
                      <CompanyIndustry>{story.industry}</CompanyIndustry>
                    </TransformationHeader>

                    <TransformationBody>
                      <div>
                        <TransformationLabel>Before AI</TransformationLabel>
                        <TransformationText>{story.preAI}</TransformationText>
                      </div>

                      <div>
                        <TransformationLabel>After AI</TransformationLabel>
                        <TransformationText>{story.postAI}</TransformationText>
                      </div>

                      <LookingForBox>
                        <LookingForTitle>What They're Looking For</LookingForTitle>
                        <LookingForText>{story.lookingFor}</LookingForText>
                      </LookingForBox>
                    </TransformationBody>
                  </TransformationCard>
                ))}
              </TransformationGrid>

              <UpskillBanner>
                <UpskillText>
                  Ready to transition into these high-growth roles? Start with our
                  personalized learning path.
                </UpskillText>
                <UpskillCTA onClick={handleRCBClick}>
                  Get Your Learning Plan
                  <ArrowRight size={16} weight="bold" />
                </UpskillCTA>
              </UpskillBanner>
            </SectionBlock>

            {/* AI Tools */}
            {ai_tools && ai_tools.length > 0 && (
              <SectionBlock>
                <SectionHeading>
                  <Rocket size={18} weight="regular" />
                  AI Tools & Technologies to Learn
                </SectionHeading>
                <SectionSubtitle>
                  Master these tools to enhance your Business x AI skillset
                </SectionSubtitle>
                <SectionDivider />
                <ToolsGrid>
                  {ai_tools.slice(0, 12).map((tool, index) => (
                    <Tool key={index}>
                      <ToolLogoPlaceholder>
                        {tool.name.charAt(0).toUpperCase()}
                      </ToolLogoPlaceholder>
                      <ToolName>{tool.name}</ToolName>
                    </Tool>
                  ))}
                </ToolsGrid>
              </SectionBlock>
            )}

            {/* Industry Stats */}
            {industry_stats && industry_stats.length > 0 && (
              <SectionBlock>
                <SectionHeading>
                  <TrendUp size={18} weight="regular" />
                  Why Business x AI Matters Now
                </SectionHeading>
                <SectionSubtitle>
                  The data speaks for itself - AI is reshaping careers
                </SectionSubtitle>
                <SectionDivider />
                <StatsGrid>
                  {industry_stats.slice(0, 4).map((stat, index) => (
                    <StatCard key={index}>
                      <StatValue>{stat.stat}</StatValue>
                      <StatDescription>{stat.description}</StatDescription>
                      <StatSource>{stat.source}</StatSource>
                    </StatCard>
                  ))}
                </StatsGrid>
              </SectionBlock>
            )}
          </RightPanel>
        </HeroContainer>
      </Container>

      <FloatingCTA onClick={handleRCBClick}>
        <Phone size={20} weight="bold" />
        Book Free 1:1 Career Call
      </FloatingCTA>
    </ResultsContainer>
  );
};

export default MBAResultsPage;
