import React, { useMemo } from 'react';
import { ResumeData } from '../types';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

interface ResumePreviewProps {
  data: ResumeData;
}

const HEADER_HEIGHT = 80;
const SUMMARY_HEIGHT = 60;
const PAGE_CONTENT_HEIGHT = 250;

const ITEM_HEIGHTS = {
  experience: 90,
  project: 60,
  education: 50,
  skillRow: 25,
};

export const ResumePreview: React.FC<ResumePreviewProps> = ({ data }) => {
  const { pages } = useMemo(() => {
    if (!data.enablePagination) {
      return { pages: [{ content: 'full', pageIndex: 0 }] };
    }

    const pages: { content: string; pageIndex: number }[] = [];

    // 计算各部分高度
    const sections = [
      { key: 'header', height: HEADER_HEIGHT },
      { key: 'summary', height: data.summary ? SUMMARY_HEIGHT + 20 : 0 },
      { key: 'experience', height: data.experience.length * ITEM_HEIGHTS.experience },
      { key: 'projects', height: data.projects.length * ITEM_HEIGHTS.project },
      { key: 'education', height: data.education.length > 0 ? 30 + data.education.length * ITEM_HEIGHTS.education : 0 },
      { key: 'skills', height: 40 + Math.ceil(data.skills.length / 8) * ITEM_HEIGHTS.skillRow },
    ].filter(s => s.height > 0);

    let currentPage = 0;
    let currentHeight = 0;
    let currentSections: string[] = [];

    for (const section of sections) {
      // 累加高度，如果超过阈值则换页
      if (currentHeight + section.height > PAGE_CONTENT_HEIGHT && currentSections.length > 0) {
        pages.push({ content: currentSections.join(','), pageIndex: currentPage });
        currentPage++;
        currentSections = [section.key];
        currentHeight = section.height;
      } else {
        currentSections.push(section.key);
        currentHeight += section.height;
      }
    }

    if (currentSections.length > 0) {
      pages.push({ content: currentSections.join(','), pageIndex: currentPage });
    }

    return { pages };
  }, [data]);

  const hasSection = (pageContent: string | 'full', sectionKey: string): boolean => {
    if (pageContent === 'full') return true;
    return pageContent.split(',').includes(sectionKey);
  };

  const renderPage = (pageIndex: number, pageContent: string | 'full') => {
    const isLastPage = pageIndex === pages.length - 1;
    const showHeader = hasSection(pageContent, 'header');
    const isFirstPage = pageIndex === 0;

    return (
      <div
        key={pageIndex}
        className={`
          resume-page bg-white w-[210mm] mx-auto shadow-2xl transition-all duration-300 relative
          min-h-[296mm]
          print:w-full print:min-h-0 print:h-auto print:shadow-none print:border-none print:overflow-visible
          ${isLastPage ? 'print:break-after-auto' : 'print:break-after-page'}
        `}
        style={{
          marginBottom: !isLastPage && data.enablePagination ? '20px' : '0',
          padding: '14mm',
        }}
      >
        {!isLastPage && data.enablePagination && (
          <div className="absolute bottom-4 right-4 text-xs text-gray-400 print:hidden">
            Page {pageIndex + 1} of {pages.length}
          </div>
        )}

        <div className="print:pt-0">
          {showHeader && (
            <header className="border-b border-gray-200 pb-3 mb-2 break-inside-avoid">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-1 uppercase leading-none">{data.fullName}</h1>
              <p className="text-base text-gray-500 font-light mb-3 tracking-wide leading-tight">{data.title}</p>

              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-600 leading-tight">
                {data.email && <div className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /><span>{data.email}</span></div>}
                {data.phone && <div className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /><span>{data.phone}</span></div>}
                {data.location && <div className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /><span>{data.location}</span></div>}
                {data.website && <div className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5" /><span>{data.website}</span></div>}
              </div>
            </header>
          )}

          {hasSection(pageContent, 'summary') && data.summary && (
            <section className="mb-8 break-inside-avoid">
              <p className="text-gray-800 text-xs leading-snug">{data.summary}</p>
            </section>
          )}
        </div>

        {hasSection(pageContent, 'experience') && data.experience.length > 0 && (
          <section className="mb-8">
            <h2 className="text-[11px] font-bold text-gray-600 uppercase tracking-widest mb-2">Experience</h2>
            <div className="space-y-3">
              {data.experience.map((exp) => (
                <div key={exp.id} className="group break-inside-avoid">
                  <div className="flex justify-between items-baseline gap-4 mb-0.5">
                    <h3 className="text-sm font-semibold text-gray-900 leading-tight">{exp.role}</h3>
                    <span className="text-xs text-gray-500 font-medium tabular-nums shrink-0">{exp.dates}</span>
                  </div>
                  <div className="text-xs text-gray-600 font-medium mb-0.5 leading-tight">{exp.company}</div>
                  <p className="text-xs text-gray-700 leading-snug whitespace-pre-wrap">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {hasSection(pageContent, 'projects') && data.projects.length > 0 && (
          <section className="mb-8">
            <h2 className="text-[11px] font-bold text-gray-600 uppercase tracking-widest mb-2">Projects</h2>
            <div className="space-y-3">
              {data.projects.map((proj) => (
                <div key={proj.id} className="break-inside-avoid">
                  <div className="flex justify-between items-baseline gap-4 mb-0.5">
                    <h3 className="text-sm font-semibold text-gray-900 leading-tight">
                      {proj.name}
                      {proj.link && <span className="ml-2 text-[11px] font-normal text-gray-400">({proj.link})</span>}
                    </h3>
                  </div>
                  <p className="text-xs text-gray-700 leading-snug mb-1">{proj.description}</p>
                  {proj.technologies && proj.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {proj.technologies.map(tech => (
                        <span key={tech} className="text-[10px] uppercase tracking-wider font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-2 gap-8">
          {hasSection(pageContent, 'education') && data.education.length > 0 && (
            <section className="break-inside-avoid">
              <h2 className="text-[11px] font-bold text-gray-600 uppercase tracking-widest mb-2">Education</h2>
              <div className="space-y-3">
                {data.education.map((edu) => (
                  <div key={edu.id} className="break-inside-avoid">
                    <h3 className="text-sm font-semibold text-gray-900 leading-tight">{edu.school}</h3>
                    <div className="text-xs text-gray-600 leading-tight">{edu.degree}</div>
                    <div className="text-[11px] text-gray-500 tabular-nums mb-0.5">{edu.dates}</div>
                    <p className="text-xs text-gray-700 leading-snug">{edu.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {hasSection(pageContent, 'skills') && data.skills.length > 0 && (
            <section className="break-inside-avoid">
              <h2 className="text-[11px] font-bold text-gray-600 uppercase tracking-widest mb-2">Skills</h2>
              <div className="flex flex-wrap gap-1.5">
                {data.skills.filter(Boolean).map((skill, index) => (
                  <span key={index} className="inline-block bg-gray-100 text-gray-700 text-[11px] font-medium px-2 py-0.5 rounded leading-tight">
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="resume-preview">
      {pages.map((page, index) => renderPage(index, page.content))}
    </div>
  );
};