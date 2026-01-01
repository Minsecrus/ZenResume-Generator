import React, { useState, useEffect } from 'react';
import { ResumeEditor } from './components/ResumeEditor';
import { ResumePreview } from './components/ResumePreview';
import { INITIAL_RESUME_DATA } from './constants';
import { ResumeData } from './types';
import { Button } from './components/ui/Button';
import { Download, Eye, Edit2, LayoutTemplate, Info, X, ExternalLink } from 'lucide-react';

const App: React.FC = () => {
  const [resumeData, setResumeData] = useState<ResumeData>(() => {
    const saved = localStorage.getItem('zenresume_data');
    return saved ? JSON.parse(saved) : INITIAL_RESUME_DATA;
  });

  const [isEditorOpen, setIsEditorOpen] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

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
            onClick={() => setIsAboutOpen(true)}
            className="hidden sm:flex"
          >
            <Info className="w-4 h-4 mr-2" />
            About
          </Button>

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
        <div className="flex-1 overflow-y-auto bg-gray-100/50 p-4 md:p-8 lg:p-12 flex justify-center print:bg-white print:p-0 print:overflow-visible">
          <div className="w-full max-w-[210mm] print:max-w-none print:w-full">
            <ResumePreview data={resumeData} />
            <div className="h-20 no-print print:hidden"></div>
          </div>
        </div>

      </main>

      {/* Mobile Editor Toggle Overlay */}
      {isEditorOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-10 md:hidden no-print"
          onClick={() => setIsEditorOpen(false)}
        ></div>
      )}

      {/* About Modal */}
      {isAboutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 no-print">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setIsAboutOpen(false)}
          />
          <div className="relative bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 sm:p-8 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsAboutOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center shrink-0">
                  <LayoutTemplate className="text-white w-7 h-7" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">关于 ZenResume</h2>
                  <p className="text-gray-500 text-sm">极简主义简历构建工具</p>
                </div>
              </div>

              <div className="space-y-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-5 mt-1">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">🛠️ 工作原理</h3>
                  <p className="mb-2">
                    ZenResume 采用<strong>本地优先 (Local-First)</strong> 的架构设计。这意味着您的所有隐私数据仅存储在当前浏览器的 LocalStorage 中，<strong>绝不会上传至任何云端服务器</strong>。
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-gray-500">
                    <li>无需注册登录，即开即用。</li>
                    <li>利用浏览器原生打印引擎生成高质量 PDF。</li>
                    <li>实时渲染，所见即所得。</li>
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 mt-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="block text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">开发者</span>
                      <a
                        href="https://github.com/Minsecrus"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-gray-900 underline underline-offset-2 hover:text-black transition-colors flex items-center gap-1"
                      >
                        Minsecrus
                        <ExternalLink className="w-4 h-4 mr-2" />
                      </a>
                    </div>
                    <div>
                      <span className="block text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">开源协议</span>
                      <span className="font-medium text-gray-900">MIT License</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <Button variant="outline" onClick={() => setIsAboutOpen(false)}>
                  关闭
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;