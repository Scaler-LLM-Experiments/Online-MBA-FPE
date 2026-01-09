import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState
} from 'react';

import RequestCallbackModal from "../components/RequestCallbackModal";
import { apiRequest } from "../../utils/api";
import tracker from "../../utils/tracker";
import attribution from "../../utils/attribution";
import { generateJWT } from "../../utils/api";
import { getURLWithUTMParams } from "../../utils/url";
import { sendLSQActivity } from "../../utils/leadSquared";

const RequestCallbackContext = createContext({
  open: () => {}
});

const INITIAL_FORM_STATE = {
  program: '',
  jobTitle: ''
};

const SUBMISSION_STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error'
};

const PROGRAMS_MAPPING = {
  academy: 'software_development'
};

const PROGRAM_NAME_MAPPING = {
  data_science: "Data Science",
  academy: "Software Development",
  devops: "DevOps",
  ai_ml: "AI/ML",
};

export const RequestCallbackProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formState, setFormState] = useState(INITIAL_FORM_STATE);
  const [submissionStatus, setSubmissionStatus] = useState(
    SUBMISSION_STATUS.IDLE
  );
  const [errorMessage, setErrorMessage] = useState('');
  const [clickSource, setClickSource] = useState('');

  const open = useCallback((initialState = {}) => {
    setFormState({
      program: initialState.program || '',
      jobTitle: initialState.jobTitle || ''
    });
    setClickSource(initialState.source || 'unknown');
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setFormState(INITIAL_FORM_STATE);
    setSubmissionStatus(SUBMISSION_STATUS.IDLE);
    setErrorMessage('');
    setClickSource('');
  }, []);

  const updateField = useCallback((field, value) => {
    if (value) {
      tracker.click({
        click_type: 'form_input_filled',
        custom: {
          field: field
        }
      });
    }
    setFormState((prev) => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const submit = useCallback(async (adminPageLink = null) => {
    setSubmissionStatus(SUBMISSION_STATUS.LOADING);
    setErrorMessage('');

    attribution.setAttribution('cpe_requested_callback', {
      program:
        PROGRAMS_MAPPING[formState.program] ||
        formState.program ||
        'software_development'
    });

    const programName = PROGRAM_NAME_MAPPING[formState.program] || formState.program || "";

    try {
      await sendLSQActivity({ 
        activityName: 'rcb_from_cpe',
        fields: [programName, adminPageLink]
      });

      const jwt = await generateJWT();
      const refererUrl = getURLWithUTMParams();
    
      await apiRequest(
        'POST', 
        '/api/v3/analytics/attributions/', 
        {
          attributions: {
            ...attribution.getAttribution(),
            product: 'scaler',
            sub_product: 'career_profile_tool',
            element: 'cpe_requested_callback_btn'
          },
          owner: {
            id: 1,
            type: 'CareerProfileEvaluation',
          },
        },
        {
          headers: {
            'X-user-token': jwt,
            'X-REFERER': refererUrl.toString()
          }
        }
      );

      tracker.click({
        click_type: 'rcb_form_submitted',
        custom: {
          source: clickSource,
          program: formState.program,
          job_title: formState.jobTitle || 'not_specified'
        }
      });

      setSubmissionStatus(SUBMISSION_STATUS.SUCCESS);
      setTimeout(() => {
        close();
      }, 2000);
    } catch (error) {
      console.error('Request callback submission failed:', error);
      setSubmissionStatus(SUBMISSION_STATUS.ERROR);
      const errorMsg =
        error.responseJson?.error ||
        error.message ||
        'Failed to submit request. Please try again.';
      setErrorMessage(errorMsg);
    }
  }, [close, formState, clickSource]);

  const contextValue = useMemo(
    () => ({
      open
    }),
    [open]
  );

  return (
    <RequestCallbackContext.Provider value={contextValue}>
      {children}
      <RequestCallbackModal
        isOpen={isOpen}
        program={formState.program}
        jobTitle={formState.jobTitle}
        onChangeField={updateField}
        onClose={close}
        onSubmit={submit}
        submissionStatus={submissionStatus}
        errorMessage={errorMessage}
      />
    </RequestCallbackContext.Provider>
  );
};

export const useRequestCallback = () => useContext(RequestCallbackContext);




  