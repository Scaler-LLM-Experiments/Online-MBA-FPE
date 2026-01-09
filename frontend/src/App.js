import { useEffect, useMemo, useState } from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import { useStore } from '@nanostores/react';

import { ProfileProvider } from './context/ProfileContext';
import { $initialData } from './store/initial-data';
import InitialDataBootstrapper from './app/bootstrap/InitialDataBootstrapper';
import AppLayout from './app/layouts/AppLayout';
import AppRoutes from './app/routing/AppRoutes';
import LoadingScreen from './app/screens/LoadingScreen';
import { RequestCallbackProvider } from './app/context/RequestCallbackContext';
import useGTMSectionTracking from './hooks/useGTMSectionTracking';
import AuthSplitPage from './components/auth/AuthSplitPage';

// LOCAL DEV: Private package styles commented out
// TODO: Uncomment these for production deployment
// import '@vectord/ui/dist/style.css';
// import '@vectord/fp-styles';

function AppContent() {
  const [quizProgress, setQuizProgress] = useState(0);
  const [quizMode, setQuizMode] = useState('final');
  const { data, loading } = useStore($initialData);
  const location = useLocation();
  useGTMSectionTracking();
  const shouldShowNav = !(
    quizMode === 'final' && location.pathname === '/quiz'
  ) && !location.pathname.startsWith('/admin');

  const navigationProps = useMemo(
    () => ({
      progress: quizProgress,
      quizMode,
      onQuizModeChange: setQuizMode
    }),
    [quizProgress, quizMode]
  );

  if (loading) return <LoadingScreen />;
  if (!data?.isLoggedIn) return <AuthSplitPage />;

  return (
    <AppLayout showNavigation={shouldShowNav} navigationProps={navigationProps}>
      <AppRoutes onQuizProgressChange={setQuizProgress} {...{ quizMode }} />
    </AppLayout>
  );
}

function App() {
  return (
    <ProfileProvider>
      <Router basename="/career-profile-tool">
        <RequestCallbackProvider>
          <InitialDataBootstrapper
            product="career_profile_tool"
            subProduct="free_evaluation"
          />
          <AppContent />
        </RequestCallbackProvider>
      </Router>
    </ProfileProvider>
  );
}

export default App;
