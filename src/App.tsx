import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { App as KonstaApp } from 'konsta/react';
import { PrivateRoute } from './components/PrivateRoute';
import { Layout } from './components/Layout';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import {
  HomePage,
  StockAnalysisPage,
  AccountPage,
  WatchlistPage,
  TopStocksPage,
  TopInvestorsPage,
  FAQPage,
  SocialPage,
  PortfolioPage,
  ManualPage,
  RiskAssessmentPage,
  CognitiveBiasPage,
  AuthCallback,
  SettingsPage,
} from './pages';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';

const AppContent: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <KonstaApp theme="ios" dark={theme === 'dark'} safeAreas>
      <div className="min-h-screen bg-gray-50 dark:bg-black">
        <Router>
          <Routes>
            {/* Routes d'authentification */}
            <Route 
              path="/auth/login" 
              element={
                <PrivateRoute requireAuth={false}>
                  <LoginPage />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/auth/signup" 
              element={
                <PrivateRoute requireAuth={false}>
                  <SignupPage />
                </PrivateRoute>
              } 
            />
            <Route path="/auth/callback" element={<AuthCallback />} />

            {/* Routes protégées avec Layout */}
            <Route
              element={
                <PrivateRoute requireAuth={true}>
                  <Layout />
                </PrivateRoute>
              }
            >
              <Route path="/home" element={<HomePage />} />
              <Route path="/stock-analysis" element={<StockAnalysisPage />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/account/portfolio" element={<PortfolioPage />} />
              <Route path="/account/settings" element={<SettingsPage />} />
              <Route path="/watchlist" element={<WatchlistPage />} />
              <Route path="/top-stocks" element={<TopStocksPage />} />
              <Route path="/top-investors" element={<TopInvestorsPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/social" element={<SocialPage />} />
              <Route path="/manual" element={<ManualPage />} />
              <Route path="/risk-assessment" element={<RiskAssessmentPage />} />
              <Route path="/cognitive-bias" element={<CognitiveBiasPage />} />
            </Route>

            {/* Redirection par défaut */}
            <Route path="/" element={<Navigate to="/auth/login" replace />} />
            <Route path="*" element={<Navigate to="/auth/login" replace />} />
          </Routes>
        </Router>
      </div>
    </KonstaApp>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App; 