import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import Xarrow from 'react-xarrows';
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
  Phone,
  Clock,
  CalendarBlank,
  MapPin,
  CheckSquare
} from 'phosphor-react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../context/ProfileContext';
import { useRequestCallback } from '../app/context/RequestCallbackContext';
import { apiRequest } from '../utils/api';
import { getPathWithQueryParams } from '../utils/url';
import tracker from '../utils/tracker';
import oliveBranchLeft from '../assets/Left-Olive-Branch.png';
import oliveBranchRight from '../assets/Right-Olive-branch.png';
import transformationCompaniesData from '../data/transformation_companies.json';

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
  min-height: 100vh;
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
    if (props.score > 55) return '#065f46';
    return '#0F2B48';
  }};
  color: #ffffff;
  padding: ${(props) =>
    props.score > 55 ? '48px 120px 48px 60px' : '48px 80px 48px 40px'};
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
    ${(props) => (props.score > 55 ? '#065f46' : '#1a3a52')};

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

  @media (max-width: 768px) {
    font-size: 1.75rem;
    text-align: left;

    br {
      display: none;
    }
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

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
  max-width: 550px;
`;

const Tag = styled.span`
  display: inline-block;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 6px 16px;
  border-radius: 0;
  font-size: 0.875rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.95);
  white-space: nowrap;
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
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 16px;
  color: #cbd5e1;
  text-transform: uppercase;
  letter-spacing: 1px;

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
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

  &:first-child {
    @media (max-width: 768px) {
      padding-top: 32px;
    }
  }

  @media (max-width: 768px) {
    margin-bottom: 56px;
  }
`;

const SectionHeading = styled.h4`
  font-size: ${props => props.smaller ? '0.875rem' : '1rem'};
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

// TOOLS GRID
const ToolsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Tool = styled.div`
  background: white;
  border: 1px solid #e2e8f0;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  border-radius: 0;
  padding: 16px;
`;

const ToolLogo = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 4px;
  object-fit: contain;
  flex-shrink: 0;
  background: #f8fafc;
  padding: 6px;
`;

const ToolContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ToolName = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  color: #1e293b;
`;

const ToolDescription = styled.div`
  font-size: 0.8125rem;
  color: #64748b;
  line-height: 1.4;
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
    height: 350px;
    overflow: hidden;
    padding: 10px 0 10px 0;
    transform: translateY(-50px);
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

const SkillLevelTag = styled.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 0;
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  @media (max-width: 768px) {
    font-size: 0.625rem;
    padding: 3px 10px;
  }

  ${props => {
    switch(props.level) {
      case 'needs-improvement':
        return `
          background-color: #fee2e2;
          color: #991b1b;
        `;
      case 'proficient':
        return `
          background-color: #dbeafe;
          color: #1e40af;
        `;
      case 'strong':
        return `
          background-color: #d1fae5;
          color: #065f46;
        `;
      default:
        return `
          background-color: #f1f5f9;
          color: #475569;
        `;
    }
  }}
`;

// CAREER TIMELINE SECTION - Copied from ProfileMatchHeroV2
const CareerTransitionContainer = styled.div`
  margin-bottom: 36px;
`;

const CareerTransitionTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 8px;
`;

const CareerTransitionSubtitle = styled.p`
  font-size: 0.8125rem;
  color: #64748b;
  margin: 0 0 20px 0;
`;

const PathContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 60px;
  margin-bottom: 24px;
  position: relative;
  max-width: 100%;
  overflow: visible;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileRolesContainer = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
`;

const MobileRoleCategory = styled.div`
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: ${(props) => {
    if (props.type === 'target') return '#059669';
    if (props.type === 'alternate') return '#64748b';
    return '#64748b';
  }};
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 0;

  &:nth-child(2) {
    align-items: center;
    justify-content: flex-start;
  }
`;

const CurrentRoleCard = styled.div`
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 0;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const CurrentRoleInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const CurrentRoleTitle = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: #0f172a;
  margin-bottom: 12px;
`;

const CurrentBadge = styled.div`
  display: inline-block;
  background: #e0f2fe;
  color: #0369a1;
  padding: 4px 10px;
  border-radius: 0;
  font-size: 0.7rem;
  font-weight: 600;
  margin-bottom: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  width: fit-content;
  align-self: flex-start;
`;

const CurrentRoleDetail = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.875rem;
  color: #475569;
  margin-bottom: 8px;

  svg {
    color: #64748b;
    flex-shrink: 0;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const CategoryCard = styled.div`
  background: white;
  border: 1px solid
    ${(props) => {
    if (props.type === 'target') return '#86efac';
    if (props.type === 'alternate') return '#cbd5e1';
    return '#cbd5e1';
  }};
  border-radius: 0;
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  color: #334155;
  font-size: 0.8125rem;
  font-weight: 600;
  position: relative;
  z-index: 10;
  width: 180px;

  svg {
    color: ${(props) => {
    if (props.type === 'target') return '#059669';
    if (props.type === 'alternate') return '#64748b';
    return '#64748b';
  }};
  }
`;

const CategoryLabel = styled.div`
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: ${(props) => {
    if (props.type === 'target') return '#059669';
    if (props.type === 'alternate') return '#64748b';
    return '#64748b';
  }};
  text-align: left;
  width: 100%;
`;

const CategoryTimeline = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.875rem;
  font-weight: 600;
  color: #334155;
  width: 100%;
`;

const TimelineRoleCard = styled.div`
  background: ${(props) =>
    props.isPriority
      ? 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)'
      : '#ffffff'};
  border: 1px solid ${(props) => (props.isPriority ? '#86efac' : '#e2e8f0')};
  border-radius: 0;
  padding: 16px;
  display: flex;
  gap: 10px;
  position: relative;
  z-index: 10;

  &:not(:last-child) {
    margin-bottom: 10px;
  }

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const TimelineRoleContent = styled.div`
  flex: 1;
`;

const TimelineRoleHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 8px;
`;

const TimelineRoleTitle = styled.h4`
  font-size: 0.95rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
  flex: 1;
  line-height: 1.3;
`;

const TimelineRoleDescription = styled.p`
  font-size: 0.8125rem;
  color: #475569;
  line-height: 1.5;
  margin: 8px 0 0 0;

  strong {
    color: #1e293b;
    font-weight: 600;
  }
`;

const TimelineSalary = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  background: transparent;
  border: 1px solid #059669;
  padding: 4px 10px;
  border-radius: 0;
  font-size: 0.75rem;
  font-weight: 700;
  color: #059669;
  white-space: nowrap;
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
  background: #01031F;
  padding: 24px;
  text-align: center;
`;

const CompanyLogo = styled.img`
  width: 100%;
  max-width: 180px;
  height: 60px;
  object-fit: contain;
  margin: 0 auto;
  display: block;
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
  line-height: 1.6;
  margin-bottom: 16px;
`;

const TransformationList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 16px 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const TransformationListItem = styled.li`
  font-size: 0.875rem;
  color: #1e293b;
  line-height: 1.5;
  padding-left: 20px;
  position: relative;

  &::before {
    content: '•';
    position: absolute;
    left: 0;
    color: #64748b;
    font-size: 1.1rem;
    font-weight: bold;
    top: -1px;
  }
`;

const RelevanceBox = styled.div`
  background: #FFF6ED;
  border: 1px solid #FED7AA;
  border-radius: 0;
  padding: 16px;
  margin-top: 20px;
`;

const RelevanceTitle = styled.div`
  font-size: 0.6875rem;
  font-weight: 700;
  color: #C2410D;
  text-transform: uppercase;
  margin-bottom: 12px;
  letter-spacing: 0.5px;
`;

const RelevanceList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const RelevanceItem = styled.li`
  font-size: 0.875rem;
  color: #1e293b;
  line-height: 1.6;
  padding-left: 20px;
  position: relative;

  &::before {
    content: '•';
    position: absolute;
    left: 0;
    color: #C2410D;
    font-size: 1.25rem;
    font-weight: bold;
    top: -2px;
  }
`;


// INDUSTRY STATS - styled to match
const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div`
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 0;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 12px;
`;

const StatDescription = styled.div`
  font-size: 0.875rem;
  color: #475569;
  line-height: 1.5;
  margin-bottom: 16px;
`;

const StatSourceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding-top: 16px;
  margin-top: 16px;
  border-top: 1px solid #e2e8f0;
`;

const StatSourceLogo = styled.img`
  height: 32px;
  width: auto;
  object-fit: contain;
  flex-shrink: 0;
  padding-right: 12px;
  border-right: 1px solid #e2e8f0;
`;

const StatSourceText = styled.div`
  font-size: 0.75rem;
  color: #64748b;
  line-height: 1.3;
  flex: 1;
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

    // Use dynamic skill metadata from backend
    const skillTitle = dataPoint.categoryDisplay;
    const skillDescription = dataPoint.description;

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
        <TooltipTitle>{skillTitle}</TooltipTitle>
        <TooltipDescription>{skillDescription}</TooltipDescription>
      </TooltipBox>
    );
  }
  return null;
};

// Helper function to get skill level tag info (3-level system)
const getSkillLevelTag = (level) => {
  if (level === 1) {
    return { label: 'Needs Improvement', type: 'needs-improvement' };
  } else if (level === 2) {
    return { label: 'Proficient', type: 'proficient' };
  } else {
    // level === 3
    return { label: 'Strong', type: 'strong' };
  }
};

// Helper function to map role keys to display labels
const getRoleDisplayLabel = (roleKey) => {
  const roleMapping = {
    'pm': 'Product / Program / Project Manager',
    'finance': 'Finance / Business Analyst',
    'sales': 'Sales / Growth / Revenue',
    'marketing': 'Marketing / Brand / Performance Marketing',
    'operations': 'Operations / Supply Chain / Strategy',
    'founder': 'Startup Founder / Entrepreneur'
  };
  return roleMapping[roleKey] || roleKey;
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
  const [transformationStories, setTransformationStories] = useState([]);

  // Use OpenAI transformation stories directly (no fallback)
  useEffect(() => {
    if (!results) return;

    // Get OpenAI transformation stories - these are already personalized
    const openAIStories = results.openai_content?.transformation_stories || [];

    // Map OpenAI stories to frontend format with company logos
    const stories = openAIStories.map((story) => {
      // Find company details from transformationCompaniesData to get logo
      let companyDetails = null;
      Object.values(transformationCompaniesData).forEach((roleCompanies) => {
        const found = roleCompanies.find(
          (c) => c.name.toLowerCase() === story.company.toLowerCase()
        );
        if (found) companyDetails = found;
      });

      // Use OpenAI content directly (no fallback)
      return {
        company: story.company,
        industry: companyDetails?.industry || '',
        domain: companyDetails?.domain || '',
        logo: companyDetails?.logoUrl || '',
        brandColor: '#01031F', // Fixed background color
        preAI: story.before_ai,
        postAI: story.after_ai,
        lookingFor: story.relevance_to_user
      };
    });

    setTransformationStories(stories);
  }, [results]);

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

  const { readiness, persona, skills, quick_wins, ai_tools, industry_stats, openai_content, cache_status } = results;
  const hasOliveBranches = readiness.overall_score > 55;

  const iconColors = ['#D90065', '#D77C00', '#C32841', '#1D925B', '#0052FF', '#016DD9'];
  const iconMap = {
    0: <Lightbulb size={24} weight="fill" />,
    1: <Rocket size={24} weight="fill" />,
    2: <Books size={24} weight="fill" />,
    3: <Target size={24} weight="fill" />,
    4: <ChartLine size={24} weight="fill" />
  };

  // Prepare data for Recharts RadarChart with dynamic skill metadata
  // Map 3-level system to percentages (capped at 80% max)
  const getLevelPercentage = (level) => {
    switch(level) {
      case 1: return 30;  // Needs Improvement
      case 2: return 55;  // Proficient
      case 3: return 75;  // Strong (capped under 80%)
      default: return 55;
    }
  };

  // Variable baselines per skill (average candidate levels)
  const getAverageBaseline = (skillName) => {
    // AI literacy is relatively new - lower baseline
    if (skillName === 'ai_literacy') return 20;

    // Strategic skills - moderate baseline
    if (skillName === 'strategic_thinking') return 45;
    if (skillName === 'leadership') return 50;

    // Role-specific skills - varying baselines
    if (skillName.includes('data') || skillName.includes('analytics')) return 48;
    if (skillName.includes('financial') || skillName.includes('revenue')) return 52;

    // Default baseline for other skills
    return 50;
  };

  const radarData = Object.entries(skills.skills).map(([skillName, skillData]) => ({
    category: skillName,
    categoryDisplay: skillData.title || skillName.replace(/_/g, ' '),  // Use title from backend
    user: getLevelPercentage(skillData.level), // Map 3-level system (1-3) to percentages
    average: getAverageBaseline(skillName), // Variable baseline per skill
    fullMark: 100,
    description: skillData.description || ''  // Use description from backend
  }));

  return (
    <ResultsContainer>
      <PrintStyles />
      <Container>
        <HeroContainer>
          <LeftPanel score={readiness.overall_score}>
            <GreetingSection>
              <HeroGreeting>
                Your AI&lt;&gt;Business
                <br />
                Readiness Report is Ready!
              </HeroGreeting>
              <GreetingSubtext>
                {persona?.variant_description ||
                  'You have room to grow. Follow the personalized action items below to boost your readiness.'}
              </GreetingSubtext>
              {persona?.persona_tags && persona.persona_tags.length > 0 && (
                <TagsContainer>
                  {persona.persona_tags.map((tag, index) => (
                    <Tag key={index}>{tag}</Tag>
                  ))}
                </TagsContainer>
              )}
            </GreetingSection>

            <ScoreSection hasOliveBranches={hasOliveBranches}>
              {hasOliveBranches && (
                <OliveBranch position="left" src={oliveBranchLeft} alt="" />
              )}
              <ScoreDisplay>{readiness.overall_score}%</ScoreDisplay>
              <ScoreLabel>Readiness Score</ScoreLabel>
              {hasOliveBranches && (
                <OliveBranch position="right" src={oliveBranchRight} alt="" />
              )}
            </ScoreSection>
          </LeftPanel>

          <RightPanel>
            {/* Skills Analysis with Recharts Radar */}
            <SectionBlock>
              <SectionHeading>
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
                      outerRadius={typeof window !== 'undefined' && window.innerWidth <= 768 ? "65%" : "80%"}
                      margin={typeof window !== 'undefined' && window.innerWidth <= 768
                        ? { top: 20, right: 30, bottom: 20, left: 30 }
                        : { top: 40, right: 80, bottom: 40, left: 80 }}
                    >
                      <PolarGrid stroke="#e2e8f0" />
                      <PolarAngleAxis
                        dataKey="categoryDisplay"
                        tick={{
                          fill: '#475569',
                          fontSize: typeof window !== 'undefined' && window.innerWidth <= 768 ? 10 : 14,
                          fontWeight: 600
                        }}
                        tickFormatter={(value) => {
                          if (typeof window !== 'undefined' && window.innerWidth <= 768) {
                            return value.length > 12 ? value.substring(0, 10) + '...' : value;
                          }
                          return value;
                        }}
                      />
                      <PolarRadiusAxis
                        angle={90}
                        domain={[0, 100]}
                        tick={{ fill: '#94a3b8', fontSize: 10 }}
                      />
                      <Tooltip content={<CustomTooltip />} />

                      {/* Average learner (dotted outline) */}
                      <Radar
                        name="Avg. Candidate"
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
                    {(() => {
                      const strongCount = Object.values(skills.skills).filter((s) => s.level >= 3).length;
                      const needsImprovementCount = Object.values(skills.skills).filter((s) => s.level === 1).length;

                      if (strongCount > 0 && needsImprovementCount > 0) {
                        // Show both
                        return (
                          <>
                            Your skills profile shows{' '}
                            <strong>
                              {strongCount} {strongCount === 1 ? 'strong skill' : 'strong skills'}
                            </strong>{' '}
                            and{' '}
                            <strong>
                              {needsImprovementCount} {needsImprovementCount === 1 ? 'area' : 'areas'} needing improvement
                            </strong>.
                          </>
                        );
                      } else if (strongCount > 0) {
                        // Only strong skills
                        return (
                          <>
                            Your skills profile shows{' '}
                            <strong>
                              {strongCount} {strongCount === 1 ? 'strong skill' : 'strong skills'}
                            </strong>.
                          </>
                        );
                      } else if (needsImprovementCount > 0) {
                        // Only areas needing improvement
                        return (
                          <>
                            Your skills profile shows{' '}
                            <strong>
                              {needsImprovementCount} {needsImprovementCount === 1 ? 'area' : 'areas'} needing improvement
                            </strong>.
                          </>
                        );
                      } else {
                        // All proficient (no strong, no gaps)
                        return <>Your skills are at a proficient level.</>;
                      }
                    })()}{' '}
                    The chart above compares your current skills against the average
                    candidate profile.
                  </DescriptionText>

                  <SkillsSummaryList>
                    {Object.entries(skills.skills)
                      .map(([skillName, skillData]) => {
                        const tagInfo = getSkillLevelTag(skillData.level);
                        return (
                          <SkillSummaryItem key={skillName}>
                            <SkillSummaryName>
                              {skillData.title || skillName.replace(/_/g, ' ')}
                            </SkillSummaryName>
                            <SkillLevelTag level={tagInfo.type}>
                              {tagInfo.label}
                            </SkillLevelTag>
                          </SkillSummaryItem>
                        );
                      })}
                  </SkillsSummaryList>
                </ChartDescription>
              </RadialChartWrapper>
            </SectionBlock>

            {/* Career Journey Section */}
            {results.career_transitions && results.career_transitions.length > 0 && (
              <CareerTransitionContainer>
                <CareerTransitionTitle>Career Journey</CareerTransitionTitle>
                <CareerTransitionSubtitle>
                  Personalized role recommendations based on your career goals and Business x AI aspirations
                </CareerTransitionSubtitle>
                <SectionDivider />

                {/* Desktop Layout - 3 columns with arrows */}
                <PathContainer>
                  {/* Column 1: Current Role */}
                  <Column>
                    <CurrentRoleCard id="current-role-mba">
                      <CurrentBadge>You are here</CurrentBadge>
                      <CurrentRoleInfo>
                        <CurrentRoleTitle>
                          {getRoleDisplayLabel(quizResponses?.currentRole) || 'Your Current Role'}
                        </CurrentRoleTitle>
                        <CurrentRoleDetail>
                          <CalendarBlank size={18} weight="regular" />
                          <span>{quizResponses?.experience || '0'} years of experience</span>
                        </CurrentRoleDetail>
                      </CurrentRoleInfo>
                    </CurrentRoleCard>
                  </Column>

                  {/* Column 2: Path Labels */}
                  <Column>
                    {results.career_transitions.slice(0, 3).map((transition, index) => {
                      const cardType = index === 0 ? 'target' : 'alternate';
                      const label = index === 0 ? 'Recommended Path' : `Alternative Path ${index}`;

                      return (
                        <CategoryCard
                          key={index}
                          type={cardType}
                          id={`timeline-mba-${index}`}
                        >
                          <CategoryLabel type={cardType}>{label}</CategoryLabel>
                        </CategoryCard>
                      );
                    })}
                  </Column>

                  {/* Column 3: Target Role Cards */}
                  <Column>
                    {results.career_transitions.slice(0, 3).map((transition, index) => {
                      const isPrimary = index === 0;

                      return (
                        <TimelineRoleCard
                          key={index}
                          id={`role-mba-${index}`}
                          isPriority={isPrimary}
                        >
                          {transition.salary && (
                            <TimelineSalary>{transition.salary}</TimelineSalary>
                          )}
                          <TimelineRoleContent>
                            <TimelineRoleHeader>
                              <TimelineRoleTitle>{transition.title}</TimelineRoleTitle>
                            </TimelineRoleHeader>

                            {transition.description && (
                              <TimelineRoleDescription style={{ fontStyle: 'italic', marginBottom: '12px' }}>
                                {transition.description}
                              </TimelineRoleDescription>
                            )}

                            {transition.goal && (
                              <TimelineRoleDescription
                                style={{
                                  display: 'flex',
                                  alignItems: 'flex-start',
                                  marginBottom: '12px',
                                  fontWeight: '600'
                                }}
                              >
                                <Target
                                  size={16}
                                  weight="regular"
                                  color="#059669"
                                  style={{ marginRight: '6px', marginTop: '2px', flexShrink: 0 }}
                                />
                                <span>{transition.goal}</span>
                              </TimelineRoleDescription>
                            )}

                            {transition.action_items && transition.action_items.length > 0 && (
                              <>
                                <TimelineRoleDescription style={{ fontWeight: '600', marginBottom: '8px' }}>
                                  Milestones:
                                </TimelineRoleDescription>
                                {transition.action_items.map((item, itemIndex) => (
                                  <TimelineRoleDescription
                                    key={itemIndex}
                                    style={{
                                      display: 'flex',
                                      alignItems: 'flex-start',
                                      marginBottom: '6px'
                                    }}
                                  >
                                    <CheckCircle
                                      size={14}
                                      weight="fill"
                                      color="#10b981"
                                      style={{ marginRight: '8px', marginTop: '3px', flexShrink: 0 }}
                                    />
                                    <span style={{ fontSize: '0.95rem' }}>{item}</span>
                                  </TimelineRoleDescription>
                                ))}
                              </>
                            )}

                            {transition.key_focus && (
                              <TimelineRoleDescription
                                style={{ display: 'flex', alignItems: 'flex-start' }}
                              >
                                <MapPin
                                  size={16}
                                  weight="regular"
                                  color="#64748b"
                                  style={{ marginRight: '6px', marginTop: '2px', flexShrink: 0 }}
                                />
                                <span>
                                  <strong>Key Focus:</strong> {transition.key_focus}
                                </span>
                              </TimelineRoleDescription>
                            )}
                          </TimelineRoleContent>
                        </TimelineRoleCard>
                      );
                    })}
                  </Column>

                  {/* Arrows connecting the columns */}
                  {typeof window !== 'undefined' && (
                    <>
                      {results.career_transitions.slice(0, 3).map((_, index) => (
                        <React.Fragment key={`arrows-mba-${index}`}>
                          <Xarrow
                            start="current-role-mba"
                            end={`timeline-mba-${index}`}
                            color={index === 0 ? '#a7f3d0' : index === 1 ? '#bfdbfe' : '#e9d5ff'}
                            strokeWidth={6}
                            curveness={0.8}
                            headSize={0}
                            path="smooth"
                            zIndex={1}
                          />
                          <Xarrow
                            start={`timeline-mba-${index}`}
                            end={`role-mba-${index}`}
                            color={index === 0 ? '#a7f3d0' : index === 1 ? '#bfdbfe' : '#e9d5ff'}
                            strokeWidth={6}
                            curveness={0.6}
                            startAnchor="right"
                            endAnchor="left"
                            headSize={0}
                            path="smooth"
                            zIndex={1}
                          />
                        </React.Fragment>
                      ))}
                    </>
                  )}
                </PathContainer>

                {/* Mobile Layout - Collapsible cards without arrows */}
                <MobileRolesContainer>
                  {results.career_transitions.slice(0, 3).map((transition, index) => {
                    const isPrimary = index === 0;
                    const categoryType = index === 0 ? 'target' : 'alternate';
                    const label = index === 0 ? 'Target Role' : `Alternative Path ${index}`;

                    return (
                      <div key={index}>
                        <MobileRoleCategory type={categoryType}>
                          <Clock size={14} weight="bold" />
                          {label}: {transition.timeline || '6-12 months'}
                        </MobileRoleCategory>
                        <TimelineRoleCard isPriority={isPrimary}>
                          {transition.salary && (
                            <TimelineSalary>{transition.salary}</TimelineSalary>
                          )}
                          <TimelineRoleContent>
                            <TimelineRoleHeader>
                              <TimelineRoleTitle>{transition.title}</TimelineRoleTitle>
                            </TimelineRoleHeader>
                            {transition.description && (
                              <TimelineRoleDescription style={{ fontStyle: 'italic' }}>
                                {transition.description}
                              </TimelineRoleDescription>
                            )}
                            {transition.key_focus && (
                              <TimelineRoleDescription
                                style={{ display: 'flex', alignItems: 'flex-start' }}
                              >
                                <MapPin
                                  size={16}
                                  weight="regular"
                                  color="#64748b"
                                  style={{ marginRight: '6px', marginTop: '2px', flexShrink: 0 }}
                                />
                                <span>
                                  <strong>Key Focus:</strong> {transition.key_focus}
                                </span>
                              </TimelineRoleDescription>
                            )}
                          </TimelineRoleContent>
                        </TimelineRoleCard>
                      </div>
                    );
                  })}
                </MobileRolesContainer>
              </CareerTransitionContainer>
            )}

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
            {transformationStories.length > 0 && (
              <SectionBlock>
                <SectionHeading>
                  How Companies Are Transforming with AI
                </SectionHeading>
                <SectionSubtitle>
                  Real examples of AI-driven business transformation in India
                </SectionSubtitle>
                <SectionDivider />

                <TransformationGrid>
                  {transformationStories.map((story, index) => (
                  <TransformationCard key={index}>
                    <TransformationHeader brandColor={story.brandColor || '#F8F8F8'}>
                      <CompanyLogo src={story.logo} alt={story.company} />
                    </TransformationHeader>

                    <TransformationBody>
                      <div>
                        <TransformationLabel>Before AI</TransformationLabel>
                        <TransformationList>
                          {story.preAI.split(' | ').filter(s => s.trim()).map((point, i) => (
                            <TransformationListItem key={i}>{point.trim()}</TransformationListItem>
                          ))}
                        </TransformationList>
                      </div>

                      <div>
                        <TransformationLabel>After AI</TransformationLabel>
                        <TransformationList>
                          {story.postAI.split(' | ').filter(s => s.trim()).map((point, i) => (
                            <TransformationListItem key={i}>{point.trim()}</TransformationListItem>
                          ))}
                        </TransformationList>
                      </div>

                      <RelevanceBox>
                        <RelevanceTitle>Why this is relevant to you</RelevanceTitle>
                        <RelevanceList>
                          {story.lookingFor.split(' | ').filter(s => s.trim()).map((point, i) => (
                            <RelevanceItem key={i}>{point.trim()}</RelevanceItem>
                          ))}
                        </RelevanceList>
                      </RelevanceBox>
                    </TransformationBody>
                  </TransformationCard>
                ))}
              </TransformationGrid>
              </SectionBlock>
            )}

            {/* AI Tools */}
            {ai_tools && ai_tools.length > 0 && (
              <SectionBlock>
                <SectionHeading>
                  AI Tools & Technologies to Learn
                </SectionHeading>
                <SectionSubtitle>
                  Master these tools to enhance your Business x AI skillset
                </SectionSubtitle>
                <SectionDivider />
                <ToolsGrid>
                  {ai_tools.slice(0, 10).map((tool, index) => {
                    // Get OpenAI personalized description if available
                    const openAITool = results.openai_content?.tool_descriptions?.find(
                      t => t.tool_name?.toLowerCase() === tool.name?.toLowerCase()
                    );

                    // Generate Brandfetch logo URL from tool name
                    const toolDomain = tool.url
                      ? new URL(tool.url).hostname.replace('www.', '')
                      : `${tool.name.toLowerCase().replace(/\s+/g, '')}.com`;
                    const logoUrl = `https://cdn.brandfetch.io/${toolDomain}/w/400`;

                    // Get user role for personalization
                    const userRole = results.meta?.role || 'pm';
                    const roleLabel = results.meta?.role === 'pm' ? 'product management' :
                                     results.meta?.role === 'finance' ? 'finance' :
                                     results.meta?.role === 'sales' ? 'sales' :
                                     results.meta?.role === 'marketing' ? 'marketing' :
                                     results.meta?.role === 'operations' ? 'operations' :
                                     'your role';

                    // Use OpenAI personalized description or create role-specific fallback
                    let description = openAITool?.personalized_use_case || tool.use_case;

                    // Make description more personal if it's generic
                    if (!openAITool && description && !description.toLowerCase().includes('you')) {
                      description = `Since you're in ${roleLabel}, ${description.charAt(0).toLowerCase()}${description.slice(1)}`;
                    }

                    return (
                      <Tool key={index}>
                        <ToolLogo
                          src={logoUrl}
                          alt={tool.name}
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                        <ToolContent>
                          <ToolName>{tool.name}</ToolName>
                          <ToolDescription>{description}</ToolDescription>
                        </ToolContent>
                      </Tool>
                    );
                  })}
                </ToolsGrid>
              </SectionBlock>
            )}

            {/* Industry Stats */}
            {industry_stats && industry_stats.length > 0 && (
              <SectionBlock>
                <SectionHeading smaller>
                  Why Business x AI Matters Now
                </SectionHeading>
                <SectionSubtitle>
                  The data speaks for itself - AI is reshaping careers
                </SectionSubtitle>
                <SectionDivider />
                <StatsGrid>
                  {(() => {
                    return industry_stats.slice(0, 3).map((stat, index) => {
                      // Extract source domain for logo (e.g., "McKinsey 2024" -> "mckinsey.com")
                      const sourceDomainMap = {
                        'McKinsey': 'mckinsey.com',
                        'Gartner': 'gartner.com',
                        'Deloitte': 'deloitte.com',
                        'BCG': 'bcg.com',
                        'PwC': 'pwc.com',
                        'Forbes': 'forbes.com',
                        'Harvard Business Review': 'hbr.org',
                        'LinkedIn': 'linkedin.com',
                        'World Economic Forum': 'weforum.org',
                        'MIT': 'mit.edu',
                        'Microsoft': 'microsoft.com'
                      };

                      // Find matching domain
                      const sourceDomain = Object.keys(sourceDomainMap).find(key =>
                        stat.source.includes(key)
                      );
                      const logoUrl = sourceDomain
                        ? `https://cdn.brandfetch.io/${sourceDomainMap[sourceDomain]}/w/400`
                        : null;

                      return (
                        <StatCard key={index}>
                          <StatValue>{stat.stat}</StatValue>
                          <StatDescription>{stat.description}</StatDescription>
                          <StatSourceContainer>
                            {logoUrl && (
                              <StatSourceLogo
                                src={logoUrl}
                                alt={stat.source}
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                  e.target.parentElement.style.borderRight = 'none';
                                }}
                              />
                            )}
                            <StatSourceText>{stat.source}</StatSourceText>
                          </StatSourceContainer>
                        </StatCard>
                      );
                    });
                  })()}
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
