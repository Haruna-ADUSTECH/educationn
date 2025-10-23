
import React, { useState, useCallback } from 'react';
import { generateEducationalAppIdea } from './services/geminiService';
import { EducationalAppIdea } from './types';
import Header from './components/Header';
import LoadingSpinner from './components/LoadingSpinner';
import IdeaCard from './components/IdeaCard';

const TargetIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
);

const SolutionIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
);

const FeatureIcon = () => (
 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16v4m-2-2h4m6 14v4m-2-2h4M12 8a2 2 0 100-4 2 2 0 000 4zm0 12a2 2 0 100-4 2 2 0 000 4z" /></svg>
);

const AudienceIcon = () => (
 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
);

const MonetizationIcon = () => (
 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
);

const JourneyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" /></svg>
);


function App() {
  const [idea, setIdea] = useState<EducationalAppIdea | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isGenerated, setIsGenerated] = useState<boolean>(false);

  const handleGenerateIdea = useCallback(async () => {
    setIsLoading(true);
    setIdea(null);
    setError(null);
    setIsGenerated(false);
    try {
      const newIdea = await generateEducationalAppIdea();
      setIdea(newIdea);
      setIsGenerated(true);
    } catch (e: any) {
      setError(e.message || 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  const renderIdea = (idea: EducationalAppIdea) => (
      <div className={`space-y-8 animate-fade-in ${isGenerated ? 'opacity-100' : 'opacity-0'}`}>
        <div className="text-center p-6 bg-gray-800/30 rounded-xl">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-teal-300 to-cyan-400 text-transparent bg-clip-text">{idea.appName}</h2>
          <p className="text-gray-300 text-xl mt-2 italic">"{idea.tagline}"</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
            <IdeaCard title="The Problem" icon={<TargetIcon />}>
                <p>{idea.problem}</p>
            </IdeaCard>
            <IdeaCard title="Our Solution" icon={<SolutionIcon />}>
                <p>{idea.solution}</p>
            </IdeaCard>
        </div>

        <IdeaCard title="Key Features" icon={<FeatureIcon />}>
            <ul className="space-y-4">
                {idea.keyFeatures.map((feature, index) => (
                    <li key={index} className="p-4 bg-gray-700/50 rounded-lg">
                        <h4 className="font-bold text-cyan-300">{feature.feature} <span className="text-xs font-mono bg-gray-600 text-gray-300 px-2 py-1 rounded-md ml-2">{feature.technology}</span></h4>
                        <p className="mt-1 text-gray-400">{feature.description}</p>
                    </li>
                ))}
            </ul>
        </IdeaCard>

        <div className="grid md:grid-cols-2 gap-8">
            <IdeaCard title="Target Audience" icon={<AudienceIcon />}>
                <p>{idea.targetAudience}</p>
            </IdeaCard>
            <IdeaCard title="Monetization" icon={<MonetizationIcon />}>
                <p>{idea.monetization}</p>
            </IdeaCard>
        </div>
        
        <IdeaCard title="Example User Journey" icon={<JourneyIcon />}>
            <p>{idea.userJourney}</p>
        </IdeaCard>
      </div>
  )

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans p-4 md:p-8">
      <style>{`
        .animate-fade-in { 
          animation: fadeIn 1s ease-in-out;
        }
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div className="max-w-5xl mx-auto">
        <Header />

        <main className="mt-8">
          <div className="flex justify-center">
            <button
              onClick={handleGenerateIdea}
              disabled={isLoading}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-full shadow-lg hover:shadow-cyan-500/50 transform transition-all duration-300 ease-in-out hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Generating...' : '✨ Generate a New Idea'}
            </button>
          </div>

          <div className="mt-12">
            {isLoading && <LoadingSpinner />}
            {error && <div className="text-center p-4 bg-red-900/50 border border-red-700 rounded-lg text-red-300">{error}</div>}
            {!isLoading && !error && !idea && (
              <div className="text-center text-gray-400">
                <p className="text-lg">Click the button to generate an innovative educational app concept.</p>
              </div>
            )}
            {idea && renderIdea(idea)}
          </div>
        </main>

        <footer className="text-center mt-16 py-6 border-t border-gray-800">
            <p className="text-gray-500">Powered by Google Gemini</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
