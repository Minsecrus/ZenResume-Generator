import React, { useState, useEffect } from 'react';
import { ResumeEditor } from './components/ResumeEditor';
import { ResumePreview } from './components/ResumePreview';
import { INITIAL_RESUME_DATA } from './constants';
import { ResumeData } from './types';
import { Button } from './components/ui/Button';
import { Download, Eye, Edit2, LayoutTemplate } from 'lucide-react';

// Declare html2pdf on window
declare global {
  interface Window {
    html2pdf: any;
  }
}

const App: React.FC = () => {
  const [resumeData, setResumeData] = useState<ResumeData>(() => {
    const saved = localStorage.getItem('zenresume_data');
    return saved ? JSON.parse(saved) : INITIAL_RESUME_DATA;
  });

  const [isEditorOpen, setIsEditorOpen] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);

  // Auto-save to local storage
  useEffect(() => {
    localStorage.setItem('zenresume_data', JSON.stringify(resumeData));
  }, [resumeData]);

  const handleDownloadPDF = async () => {
    window.print();
  };

  return (
    <div className="min-h-screen flex flex-col h-screen overflow-hidden font-sans">

      {/* Top Bar - No Print */}
      <nav className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-4 md:px-6 shrink-0 z-30 no-print">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
            <LayoutTemplate className="text-white w-5 h-5" />
          </div>
          <span className="font-bold text-lg tracking-tight hidden sm:inline-block">ZenResume</span>
          <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full border border-gray-200">Beta</span>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsEditorOpen(!isEditorOpen)}
          >
            {isEditorOpen ? <Eye className="w-4 h-4 mr-2" /> : <Edit2 className="w-4 h-4 mr-2" />}
            {isEditorOpen ? 'View' : 'Edit'}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setResumeData(INITIAL_RESUME_DATA)}
            className="hidden md:flex"
            title="Reset to default template"
          >
            Reset
          </Button>

          <Button onClick={handleDownloadPDF} isLoading={isDownloading}>
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </nav>

      <main className="flex-1 flex overflow-hidden relative">

        {/* Editor Sidebar */}
        <div
          className={`
            fixed md:relative inset-y-0 left-0 w-full md:w-auto 
            transform ${isEditorOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0 md:hidden'} 
            transition-transform duration-300 ease-in-out z-20 
            md:flex md:border-r border-gray-200 bg-white h-full no-print
            top-16 md:top-0
          `}
        >
          <ResumeEditor data={resumeData} onChange={setResumeData} />
        </div>

        {/* Preview Area */}
        <div className="flex-1 overflow-y-auto bg-gray-100/50 p-4 md:p-8 lg:p-12 flex justify-center">
          <div className="w-full max-w-[210mm]">
            <ResumePreview data={resumeData} />
            <div className="h-20 no-print"></div> {/* Bottom spacer */}
          </div>
        </div>

      </main>

      {/* Mobile Editor Toggle Overlay - Closes editor when clicking outside on mobile */}
      {isEditorOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-10 md:hidden no-print"
          onClick={() => setIsEditorOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default App;