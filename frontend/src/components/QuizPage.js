import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../context/ProfileContext';
// TODO: REVERT TO FinalModeQuiz for tech career evaluation
// import FinalModeQuiz from './quiz/FinalModeQuiz';
import MBAQuiz from './quiz/MBAQuiz';
import attribution from '../utils/attribution';
import { apiRequest, generateJWT } from '../utils/api';
import { getURLWithUTMParams, getPathWithQueryParams } from '../utils/url';

function QuizPage({ onProgressChange }) {
  const navigate = useNavigate();
  const { evaluationResults } = useProfile();

  const trackVisit = useCallback(async () => {
    try {
      attribution.setAttribution('page_visit');
      const refererUrl = getURLWithUTMParams();
      const jwt = await generateJWT();
      if (!jwt) return;

      await apiRequest(
        'POST',
        '/api/v3/analytics/attributions/',
        {
          attributions: {
            ...attribution.getAttribution(),
            program: 'business_ai_mba',
            product: 'scaler',
            sub_product: 'mba_readiness_assessment',
            element: 'mba_quiz_page'
          },
          owner: {
            id: 1,
            type: 'MBAReadinessAssessment'
          }
        },
        {
          headers: {
            'X-user-token': jwt,
            'X-REFERER': refererUrl.toString()
          }
        }
      );
    } catch (e) {
      // Silently fail
    }
  }, []);

  useEffect(() => {
    if (evaluationResults) {
      navigate(getPathWithQueryParams('/mba-results'), { replace: true });
    } else {
      trackVisit();
    }
  }, [evaluationResults, navigate]);

  // Using MBAQuiz for business <> AI MBA assessment
  return <MBAQuiz onProgressChange={onProgressChange} />;
}

export default QuizPage;
