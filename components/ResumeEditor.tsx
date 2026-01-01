import React, { useState } from 'react';
import { ResumeData, Experience, Education, Project } from '../types';
import { Button } from './ui/Button';
import { Trash2, Plus, ChevronDown, ChevronUp } from 'lucide-react';

interface ResumeEditorProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

export const ResumeEditor: React.FC<ResumeEditorProps> = ({ data, onChange }) => {
  const [activeSection, setActiveSection] = useState<string | null>('personal');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value });
  };

  const handleArrayChange = <K extends 'experience' | 'education' | 'projects'>(
    section: K,
    index: number,
    field: keyof ResumeData[K][number],
    value: any
  ) => {
    const newArray = [...(data[section] as any[])];
    newArray[index] = { ...newArray[index], [field]: value };
    onChange({ ...data, [section]: newArray });
  };

  const addItem = (section: 'experience' | 'education' | 'projects') => {
    const id = Math.random().toString(36).substr(2, 9);
    if (section === 'experience') {
      onChange({
        ...data,
        experience: [...data.experience, { id, company: 'New Company', role: 'Role', dates: '2024', description: '' }]
      });
    } else if (section === 'education') {
      onChange({
        ...data,
        education: [...data.education, { id, school: 'University', degree: 'Degree', dates: '2024', description: '' }]
      });
    } else if (section === 'projects') {
      onChange({
        ...data,
        projects: [...data.projects, { id, name: 'Project Name', description: '', technologies: [] }]
      });
    }
  };

  const removeItem = (section: keyof ResumeData, index: number) => {
    const newArray = [...(data[section] as any[])];
    newArray.splice(index, 1);
    onChange({ ...data, [section]: newArray });
  };

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const SectionHeader = ({ title, sectionKey }: { title: string, sectionKey: string }) => (
    <button
      onClick={() => toggleSection(sectionKey)}
      className="flex items-center justify-between w-full py-3 px-4 bg-white hover:bg-gray-50 border-b border-gray-100 transition-colors"
    >
      <span className="font-semibold text-gray-800">{title}</span>
      {activeSection === sectionKey ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
    </button>
  );

  return (
    <div className="h-full overflow-y-auto bg-gray-50 border-r border-gray-200 w-full md:w-[400px] lg:w-[450px] shadow-xl z-20 flex flex-col">
      <div className="p-4 border-b border-gray-200 bg-white sticky top-0 z-10">
        <h2 className="text-lg font-bold text-gray-900">Editor</h2>
        <p className="text-xs text-gray-500">Customize your resume content</p>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="border-b border-gray-200">
          <SectionHeader title="Personal Info" sectionKey="personal" />
          {activeSection === 'personal' && (
            <div className="p-4 space-y-4 bg-white">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Full Name</label>
                <input type="text" name="fullName" value={data.fullName} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-black focus:border-transparent outline-none" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Job Title</label>
                <input type="text" name="title" value={data.title} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-black focus:border-transparent outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" name="email" value={data.email} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Phone</label>
                  <input type="tel" name="phone" value={data.phone} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Location</label>
                <input type="text" name="location" value={data.location} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Website</label>
                <input type="text" name="website" value={data.website} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md text-sm" />
              </div>
            </div>
          )}
        </div>

        <div className="border-b border-gray-200">
          <SectionHeader title="Summary" sectionKey="summary" />
          {activeSection === 'summary' && (
            <div className="p-4 bg-white">
              <label className="block text-xs font-medium text-gray-700 mb-1">Professional Summary</label>
              <div className="relative">
                <textarea
                  name="summary"
                  rows={6}
                  value={data.summary}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-black focus:border-transparent outline-none resize-none"
                />
              </div>
            </div>
          )}
        </div>

        <div className="border-b border-gray-200">
          <SectionHeader title="Experience" sectionKey="experience" />
          {activeSection === 'experience' && (
            <div className="p-4 bg-white space-y-6">
              {data.experience.map((exp, index) => (
                <div key={exp.id} className="p-3 border border-gray-200 rounded-lg relative group">
                  <button
                    onClick={() => removeItem('experience', index)}
                    className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <input
                      placeholder="Company"
                      value={exp.company}
                      onChange={(e) => handleArrayChange('experience', index, 'company', e.target.value)}
                      className="text-sm font-semibold border-b border-transparent focus:border-gray-300 outline-none"
                    />
                    <input
                      placeholder="Role"
                      value={exp.role}
                      onChange={(e) => handleArrayChange('experience', index, 'role', e.target.value)}
                      className="text-sm border-b border-transparent focus:border-gray-300 outline-none"
                    />
                    <input
                      placeholder="Dates"
                      value={exp.dates}
                      onChange={(e) => handleArrayChange('experience', index, 'dates', e.target.value)}
                      className="text-xs text-gray-500 border-b border-transparent focus:border-gray-300 outline-none col-span-2"
                    />
                  </div>
                  <div className="relative">
                    <textarea
                      placeholder="Description"
                      rows={4}
                      value={exp.description}
                      onChange={(e) => handleArrayChange('experience', index, 'description', e.target.value)}
                      className="w-full text-sm p-2 bg-gray-50 rounded border-none focus:ring-1 focus:ring-gray-200 resize-none"
                    />
                  </div>
                </div>
              ))}
              <Button onClick={() => addItem('experience')} variant="outline" className="w-full border-dashed">
                <Plus className="w-4 h-4 mr-2" /> Add Experience
              </Button>
            </div>
          )}
        </div>

        <div className="border-b border-gray-200">
          <SectionHeader title="Education" sectionKey="education" />
          {activeSection === 'education' && (
            <div className="p-4 bg-white space-y-6">
              {data.education.map((edu, index) => (
                <div key={edu.id} className="p-3 border border-gray-200 rounded-lg relative group">
                  <button
                    onClick={() => removeItem('education', index)}
                    className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="grid grid-cols-1 gap-2 mb-2">
                    <input
                      placeholder="School"
                      value={edu.school}
                      onChange={(e) => handleArrayChange('education', index, 'school', e.target.value)}
                      className="text-sm font-semibold border-b border-transparent focus:border-gray-300 outline-none"
                    />
                    <input
                      placeholder="Degree"
                      value={edu.degree}
                      onChange={(e) => handleArrayChange('education', index, 'degree', e.target.value)}
                      className="text-sm border-b border-transparent focus:border-gray-300 outline-none"
                    />
                    <input
                      placeholder="Dates"
                      value={edu.dates}
                      onChange={(e) => handleArrayChange('education', index, 'dates', e.target.value)}
                      className="text-xs text-gray-500 border-b border-transparent focus:border-gray-300 outline-none"
                    />
                  </div>
                  <textarea
                    placeholder="Description (optional)"
                    rows={2}
                    value={edu.description}
                    onChange={(e) => handleArrayChange('education', index, 'description', e.target.value)}
                    className="w-full text-sm p-2 bg-gray-50 rounded border-none focus:ring-1 focus:ring-gray-200 resize-none"
                  />
                </div>
              ))}
              <Button onClick={() => addItem('education')} variant="outline" className="w-full border-dashed">
                <Plus className="w-4 h-4 mr-2" /> Add Education
              </Button>
            </div>
          )}
        </div>

        <div className="border-b border-gray-200">
          <SectionHeader title="Projects" sectionKey="projects" />
          {activeSection === 'projects' && (
            <div className="p-4 bg-white space-y-6">
              {data.projects.map((proj, index) => (
                <div key={proj.id} className="p-3 border border-gray-200 rounded-lg relative group">
                  <button
                    onClick={() => removeItem('projects', index)}
                    className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <input
                    placeholder="Project Name"
                    value={proj.name}
                    onChange={(e) => handleArrayChange('projects', index, 'name', e.target.value)}
                    className="text-sm font-semibold w-full border-b border-transparent focus:border-gray-300 outline-none mb-2"
                  />
                  <input
                    placeholder="Link (optional)"
                    value={proj.link || ''}
                    onChange={(e) => handleArrayChange('projects', index, 'link', e.target.value)}
                    className="text-xs text-gray-500 w-full border-b border-transparent focus:border-gray-300 outline-none mb-2"
                  />
                  <textarea
                    placeholder="Description"
                    rows={2}
                    value={proj.description}
                    onChange={(e) => handleArrayChange('projects', index, 'description', e.target.value)}
                    className="w-full text-sm p-2 bg-gray-50 rounded border-none focus:ring-1 focus:ring-gray-200 resize-none mb-2"
                  />
                  <input
                    placeholder="Tech Stack (comma separated)"
                    value={proj.technologies.join(', ')}
                    onChange={(e) => handleArrayChange('projects', index, 'technologies', e.target.value.split(',').map(s => s.trim()))}
                    className="text-xs w-full p-1 bg-gray-50 rounded border-none focus:ring-1 focus:ring-gray-200"
                  />
                </div>
              ))}
              <Button onClick={() => addItem('projects')} variant="outline" className="w-full border-dashed">
                <Plus className="w-4 h-4 mr-2" /> Add Project
              </Button>
            </div>
          )}
        </div>

        <div className="border-b border-gray-200 mb-20">
          <SectionHeader title="Skills" sectionKey="skills" />
          {activeSection === 'skills' && (
            <div className="p-4 bg-white">
              <p className="text-xs text-gray-500 mb-2">Separate skills with commas</p>
              <textarea
                className="w-full p-2 border border-gray-300 rounded-md text-sm h-32"
                value={data.skills.join(', ')}
                onChange={(e) => onChange({ ...data, skills: e.target.value.split(',').map(s => s.trim()) })}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
