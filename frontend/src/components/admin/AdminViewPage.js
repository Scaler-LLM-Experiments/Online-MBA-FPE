import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import { MagnifyingGlass, FileText, CheckCircle, House } from 'phosphor-react';
import ProfileMatchHeroV2 from '../results/ProfileMatchHeroV2';
import BasicAuthModal from '../auth/BasicAuthModal';
import { fetchAdminResponse } from '../../utils/adminAuth';

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

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
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

const PageHeader = styled.div`
  background: white;
  border-bottom: 1px solid #e2e8f0;
  padding: 24px;
  margin-bottom: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    padding: 16px;
  }

  @media print {
    display: none;
  }
`;

const PageTitle = styled.h1`
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const Section = styled.div`
  background: white;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  font-size: 0.875rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 2px solid #e2e8f0;
  text-transform: uppercase;
  letter-spacing: 1px;
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

const LoadingSubtext = styled.div`
  font-size: 0.875rem;
  color: #64748b;
  margin-top: 4px;
  text-align: center;
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 8px;
  background: #e2e8f0;
  overflow: hidden;
  margin-top: 24px;
`;

const ProgressBarFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #c71f69 0%, #e11d48 100%);
  transition: width 0.3s ease;
  width: ${props => props.progress}%;
`;

const ErrorContainer = styled(LoadingContainer)`
  flex-direction: column;
  gap: 16px;
  color: #dc2626;
  text-align: center;
`;

const ErrorTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  color: #b91c1c;
`;

const ErrorMessage = styled.p`
  font-size: 0.95rem;
  color: #7f1d1d;
  margin: 0;
`;

const PrimaryButton = styled.button`
  background: #c71f69;
  color: white;
  border: none;
  padding: 12px 24px;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: #a01855;
  }

  @media print {
    display: none;
  }
`;

const SecondaryButton = styled.button`
  background: transparent;
  color: #c71f69;
  border: 2px solid #c71f69;
  padding: 10px 22px;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: #c71f69;
    color: white;
  }

  @media print {
    display: none;
  }
`;

const QASection = styled.div`
  background: white;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const QATitle = styled.h3`
  font-size: 0.875rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 20px 0;
  padding-bottom: 12px;
  border-bottom: 2px solid #e2e8f0;
  text-transform: uppercase;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const QAList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const QAItem = styled.div`
  padding: 16px;
  background: #f8fafc;
  border-left: 3px solid #c71f69;
`;

const QuestionText = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  color: #475569;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const AnswerText = styled.div`
  font-size: 0.9375rem;
  font-weight: 500;
  color: #1e293b;
`;


const AdminViewPage = () => {
  const { response_id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authError, setAuthError] = useState('');
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingStep, setLoadingStep] = useState(0);

  const loadingSteps = [
    { icon: <MagnifyingGlass size={28} weight="bold" />, text: 'Authenticating...', subtext: 'Verifying your credentials' },
    { icon: <FileText size={28} weight="bold" />, text: 'Loading response data...', subtext: 'Fetching user profile evaluation' },
    { icon: <CheckCircle size={28} weight="bold" />, text: 'Preparing results...', subtext: 'Almost there!' }
  ];

  // Loading animation effect
  useEffect(() => {
    if (loading && !showAuthModal) {
      setLoadingProgress(0);
      setLoadingStep(0);

      const progressInterval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 95) {
            clearInterval(progressInterval);
            return 95;
          }
          return prev + 2;
        });
      }, 100);

      const stepInterval = setInterval(() => {
        setLoadingStep(prev => {
          if (prev >= loadingSteps.length - 1) {
            clearInterval(stepInterval);
            return prev;
          }
          return prev + 1;
        });
      }, 1500);

      return () => {
        clearInterval(progressInterval);
        clearInterval(stepInterval);
      };
    }
  }, [loading, showAuthModal]);

  // Fetch response data using the admin auth utility
  const fetchResponse = async (authUsername, authPassword) => {
    setError(null);
    setAuthError('');

    await fetchAdminResponse(
      response_id,
      authUsername,
      authPassword,
      {
        onLoadingChange: setLoading,
        onSuccess: (result) => {
          setData(result);
          setShowAuthModal(false);
          setAuthError('');
        },
        onError: (errorJson) => {
          setShowAuthModal(false);
          setError(errorJson.detail || 'Response not found for the given ID.');
        },
        onAuthError: (errorJson) => {
          setShowAuthModal(true);
          setAuthError(errorJson.detail || 'Invalid username or password. Please try again.');
        }
      }
    );
  };

  useEffect(() => {
    if (response_id) {
      setShowAuthModal(true);
      setLoading(false);
    }
  }, [response_id]);

  const handleAuthSubmit = (username, password) => {
    fetchResponse(username, password);
  };

  const handleCancel = () => {
    setShowAuthModal(false);
    setAuthError('');
    navigate('/');
  };

  if (showAuthModal) {
    return (
      <BasicAuthModal
        show={showAuthModal}
        onSubmit={handleAuthSubmit}
        onCancel={handleCancel}
        title="Sign in"
        origin={window.location.origin}
        error={authError}
        loading={loading}
      />
    );
  }

  if (loading) {
    const currentStep = loadingSteps[loadingStep];
    return (
      <ResultsContainer>
        <Container>
          <LoadingContainer>
            <LoadingContent>
              <LoadingIcon>
                {currentStep.icon}
              </LoadingIcon>
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
          <ErrorContainer>
            <ErrorTitle>We ran into a problem</ErrorTitle>
            <ErrorMessage>{error}</ErrorMessage>
            <PrimaryButton onClick={() => navigate('/')}>
              <House size={20} weight="bold" />
              Back to Home
            </PrimaryButton>
          </ErrorContainer>
        </Container>
      </ResultsContainer>
    );
  }

  if (!data || !data.response?.profile_evaluation) {
    return (
      <ResultsContainer>
        <Container>
          <ErrorContainer>
            <ErrorTitle>Invalid Data Format</ErrorTitle>
            <ErrorMessage>Unable to display evaluation results. The response data may be corrupted.</ErrorMessage>
            <PrimaryButton onClick={() => navigate('/')}>
              <House size={20} weight="bold" />
              Back to Home
            </PrimaryButton>
          </ErrorContainer>
        </Container>
      </ResultsContainer>
    );
  }

  const evaluationResults = data.response.profile_evaluation;
  const userInput = data.user_input || {};
  const background = userInput.background || 'non-tech';
  const quizResponses = userInput.quizResponses || {};
  const goals = userInput.goals || {};

  // Use questionsAndAnswers directly from the payload
  const qaPairs = Array.isArray(userInput.questionsAndAnswers)
    ? userInput.questionsAndAnswers
    : [];

  return (
    <ResultsContainer>
      <PrintStyles />
      <Container>
        <PageHeader>
          <PageTitle>Admin Response Viewer</PageTitle>
        </PageHeader>

        <QASection>
          <QATitle>
            <FileText size={20} weight="bold" color="#c71f69" />
            Quiz Questions & Answers
          </QATitle>
          <QAList>
            {qaPairs.map((qa, index) => (
              <QAItem key={index}>
                <QuestionText>Q{index + 1}: {qa.question}</QuestionText>
                <AnswerText>{qa.answer}</AnswerText>
              </QAItem>
            ))}
          </QAList>
        </QASection>

        <Section>
          <SectionTitle>Evaluation Output</SectionTitle>
          <ProfileMatchHeroV2
            score={evaluationResults.profile_strength_score}
            notes={evaluationResults.profile_strength_notes}
            badges={evaluationResults.badges}
            evaluationResults={evaluationResults}
            background={background}
            quizResponses={quizResponses}
            goals={goals}
            hideCTAs={true}
          />
        </Section>
      </Container>
    </ResultsContainer>
  );
};

export default AdminViewPage;

