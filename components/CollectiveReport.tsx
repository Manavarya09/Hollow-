import React, { useState, useEffect } from 'react';
import { Post, Report } from '../types';
import { generateCollectiveReport } from '../services/geminiService';
import { LoaderIcon } from './icons/LoaderIcon';
import { ClusterMap } from './ClusterMap';

interface CollectiveReportProps {
  posts: Post[];
}

const mockClusters = [
    {id: 'c1', label: 'Hope & Future', size: 4},
    {id: 'c2', label: 'Anxiety & Dread', size: 4},
    {id: 'c3', label: 'Daily Observations', size: 4},
    {id: 'c4', label: 'Existential Questions', size: 3}
];


export const CollectiveReport: React.FC<CollectiveReportProps> = ({ posts }) => {
  const [report, setReport] = useState<Report | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateReport = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const generatedReport = await generateCollectiveReport(posts);
      setReport(generatedReport);
    } catch (err) {
      setError('An error occurred while generating the report. The AI may be resting.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if(posts.length > 0 && !report) { // Only generate on first load if no report exists
        handleGenerateReport();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posts]);


  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-3xl font-serif mb-2 text-[var(--color-text-primary)]">The Collective</h2>
            <p className="text-[var(--color-text-secondary)]">An AI-synthesized reflection of the void's consciousness.</p>
          </div>
          <button
              onClick={handleGenerateReport}
              disabled={isLoading}
              className="px-4 py-2 border border-[var(--color-text-primary)] text-[var(--color-text-primary)] text-sm font-semibold hover:bg-[var(--color-accent-bg)] hover:text-[var(--color-accent-text)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
          >
              {isLoading ? <><LoaderIcon /> Generating...</> : 'Regenerate'}
          </button>
        </div>
        
        {error && <p className="text-red-600 bg-red-100 p-4 border border-red-300 mb-6">{error}</p>}

        {!report && !isLoading && (
          <div className="text-center py-16 border border-dashed border-[var(--color-border)]">
            <p className="text-[var(--color-text-secondary)]">Generate a report to see the collective mood.</p>
          </div>
        )}
        
        {isLoading && !report && (
          <div className="text-center py-16">
            <LoaderIcon className="mx-auto h-8 w-8 text-[var(--color-text-secondary)]" />
            <p className="mt-4 text-[var(--color-text-secondary)]">Synthesizing thoughts...</p>
          </div>
        )}

        {report && (
          <div className="space-y-8 animate-fade-in-slow">
            <div>
                <h3 className="font-serif text-xl mb-4 border-b border-[var(--color-border)] pb-2">Emotional Landscape</h3>
                <ClusterMap data={mockClusters} />
                <p className="text-xs text-[var(--color-text-secondary)] mt-2 text-center">A visual representation of thematic clusters. Larger circles indicate more thoughts.</p>
            </div>

            <div>
              <h3 className="font-serif text-xl mb-4 border-b border-[var(--color-border)] pb-2">Summary</h3>
              <p className="font-serif text-lg leading-relaxed text-[var(--color-text-primary)] whitespace-pre-wrap">{report.generatedText}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-serif text-xl mb-4 border-b border-[var(--color-border)] pb-2">Top Themes</h3>
                <div className="space-y-4">
                  {report.topThemes.map((theme, index) => (
                    <div key={index}>
                      <h4 className="font-semibold text-[var(--color-text-primary)]">{theme.theme}</h4>
                      <blockquote className="border-l-2 border-[var(--color-border)] pl-3 mt-1 italic text-[var(--color-text-secondary)] text-sm">"{theme.snippet}"</blockquote>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-serif text-xl mb-4 border-b border-[var(--color-border)] pb-2">Sentiment</h3>
                <div className="space-y-3">
                  {report.sentimentSummary.map((sentiment, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-[var(--color-text-primary)]">{sentiment.sentiment}</span>
                        <span className="text-sm text-[var(--color-text-secondary)]">{sentiment.percentage}%</span>
                      </div>
                      <div className="w-full bg-[var(--color-border)] h-2">
                        <div className="bg-[var(--color-text-primary)] h-2" style={{ width: `${sentiment.percentage}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-xs text-[var(--color-text-secondary)] text-center pt-4">Report generated on {new Date(report.date).toLocaleString()}</p>
          </div>
        )}
         <style>{`
            @keyframes fade-in-slow {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            .animate-fade-in-slow { animation: fade-in-slow 0.5s ease-in-out forwards; }
          `}</style>
      </div>
    </div>
  );
};
