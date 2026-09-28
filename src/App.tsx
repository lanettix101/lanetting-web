import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import ServiceDetail from './pages/ServiceDetail';
import NotFound from './pages/NotFound';
import WhatsAppButton from './components/ui/WhatsAppButton';
import { LanguageProvider } from './i18n/LanguageContext';

const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));

function RouteFallback() {
  return <div className="min-h-[100svh]" aria-busy="true" />;
}

export default function App() {
  return (
    <LanguageProvider>
      <Router basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
        <div className="min-h-screen flex flex-col font-sans">
          <Header />
          <main className="flex-1">
            <Suspense fallback={<RouteFallback />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/service/:id" element={<ServiceDetail />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/portfolio/:slug" element={<ProjectDetail />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
          <WhatsAppButton />
        </div>
      </Router>
    </LanguageProvider>
  );
}
