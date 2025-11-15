import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Documents = () => {
  const [documents] = useState([
    {
      id: 1,
      name: 'Questionnaire Response',
      type: 'PDF',
      date: '2024-01-15',
      size: '245 KB',
    },
    {
      id: 2,
      name: 'University Recommendations Report',
      type: 'PDF',
      date: '2024-01-15',
      size: '1.2 MB',
    },
    {
      id: 3,
      name: 'Admission Checklist',
      type: 'DOCX',
      date: '2024-01-10',
      size: '89 KB',
    },
  ]);

  const handleDownload = (doc) => {
    // Mock download functionality
    alert(`Downloading ${doc.name}...`);
  };

  const handleDelete = (docId) => {
    // Mock delete functionality
    if (confirm('Are you sure you want to delete this document?')) {
      alert('Document deleted successfully');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-500 via-indigo-600 to-violet-700">
      <Navbar />
      
      <div className="flex-1 px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 animate-fadeIn">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              My Documents
            </h1>
            <p className="text-white/80">
              Access and manage your saved documents
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all animate-slideIn"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <button
                    onClick={() => handleDelete(doc.id)}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>

                <h3 className="text-white font-semibold text-lg mb-2">{doc.name}</h3>
                <div className="flex items-center justify-between text-sm text-white/70 mb-4">
                  <span>{doc.type}</span>
                  <span>{doc.size}</span>
                </div>
                <p className="text-white/60 text-sm mb-4">Created: {doc.date}</p>

                <button
                  onClick={() => handleDownload(doc)}
                  className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all font-semibold hover:scale-105"
                >
                  Download
                </button>
              </div>
            ))}
          </div>

          {documents.length === 0 && (
            <div className="text-center py-12">
              <svg className="w-24 h-24 text-white/30 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-white/60 text-lg">No documents available</p>
            </div>
          )}
        </div>
      </div>

      <Footer />

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
        .animate-slideIn {
          animation: slideIn 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Documents;

