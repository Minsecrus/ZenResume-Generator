import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const style = document.createElement('style');
style.textContent = `
  @media print {
    @page {
      size: A4;
      margin: 15mm;
    }
    
    body {
      margin: 0;
      padding: 0;
      background: white;
    }
    
    .no-print {
      display: none !important;
    }
    
    .resume-preview {
      width: 100%;
    }
    
    .resume-page {
      width: 100% !important;
      height: auto !important; 
      min-height: auto !important;
      
      margin: 0 !important;
      padding: 0 !important; 
      
      box-shadow: none !important;
      page-break-after: always !important;
      break-after: page !important;
    }

    .resume-page:last-child {
      page-break-after: avoid !important;
      break-after: avoid !important;
      page-break-inside: avoid !important;
      margin-bottom: 0 !important;
      padding-bottom: 0 !important;
    }
    
    .break-inside-avoid, section, li, p {
      break-inside: avoid;
      page-break-inside: avoid;
    }
    
    * {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
  }
`;
document.head.appendChild(style);