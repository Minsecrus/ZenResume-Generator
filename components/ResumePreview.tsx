import React from 'react';
import { ResumeData } from '../types';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

interface ResumePreviewProps {
  data: ResumeData;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({ data }) => {
  return (
    <div 
      id="resume-preview" 
      className="resume-page bg-white w-[210mm] min-h-[296mm] mx-auto p-[15mm] md:p-[20mm] shadow-2xl transition-all duration-300 print:shadow-none print:w-full print:p-0"
    >
      
      {/* Header */}
      <header className="border-b border-gray-200 pb-8 mb-8 break-inside-avoid">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-2 uppercase">{data.fullName}</h1>
        <p className="text-xl text-gray-500 font-light mb-6 tracking-wide">{data.title}</p>
        
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          {data.email && (
            <div className="flex items-center gap-1.5">
              <Mail className="w-4 h-4" />
              <span>{data.email}</span>
            </div>
          )}
          {data.phone && (
            <div className="flex items-center gap-1.5">
              <Phone className="w-4 h-4" />
              <span>{data.phone}</span>
            </div>
          )}
          {data.location && (
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              <span>{data.location}</span>
            </div>
          )}
          {data.website && (
            <div className="flex items-center gap-1.5">
              <Globe className="w-4 h-4" />
              <span>{data.website}</span>
            </div>
          )}
        </div>
      </header>

      {/* Summary */}
      {data.summary && (
        <section className="mb-10 break-inside-avoid">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Profile</h2>
          <p className="text-gray-800 leading-relaxed text-sm md:text-base">
            {data.summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Experience</h2>
          <div className="space-y-8">
            {data.experience.map((exp) => (
              <div key={exp.id} className="group break-inside-avoid">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{exp.role}</h3>
                  <span className="text-sm text-gray-500 font-medium tabular-nums">{exp.dates}</span>
                </div>
                <div className="text-sm text-gray-600 font-medium mb-2">{exp.company}</div>
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Projects</h2>
          <div className="space-y-6">
            {data.projects.map((proj) => (
              <div key={proj.id} className="break-inside-avoid">
                 <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                  <h3 className="text-base font-semibold text-gray-900">
                    {proj.name}
                    {proj.link && <span className="ml-2 text-xs font-normal text-gray-400">({proj.link})</span>}
                  </h3>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed mb-2">{proj.description}</p>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Education */}
        {data.education.length > 0 && (
          <section className="break-inside-avoid">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Education</h2>
            <div className="space-y-6">
              {data.education.map((edu) => (
                <div key={edu.id} className="break-inside-avoid">
                  <h3 className="text-base font-semibold text-gray-900">{edu.school}</h3>
                  <div className="text-sm text-gray-600 mb-1">{edu.degree}</div>
                  <div className="text-xs text-gray-400 tabular-nums mb-2">{edu.dates}</div>
                  <p className="text-sm text-gray-700">{edu.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <section className="break-inside-avoid">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, index) => (
                <span key={index} className="inline-block bg-black text-white text-xs font-medium px-3 py-1.5 rounded-full">
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