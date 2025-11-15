import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useTheme } from '../context/ThemeContext';
import { getDocuments, saveDocument, deleteDocument } from '../utils/storage';

const Documents = () => {
  const { theme } = useTheme();
  const [documents, setDocuments] = useState([]);
  const [showUpload, setShowUpload] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setDocuments(getDocuments());
  }, []);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      await saveDocument(file, {});
      setDocuments(getDocuments());
      setShowUpload(false);
      alert('Document uploaded successfully!');
    } catch (error) {
      alert('Error uploading document');
    } finally {
      setUploading(false);
    }
  };

  const handleDownload = (doc) => {
    const link = document.createElement('a');
    link.href = doc.data;
    link.download = doc.name;
    link.click();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      deleteDocument(id);
      setDocuments(getDocuments());
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className={`min-h-screen flex flex-col ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-blue-500 via-indigo-600 to-violet-700'
    }`}>
      <Navbar />
      
      <div className="flex-1 px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
                My Documents
              </h1>
              <p className="text-white/80 text-sm sm:text-base">
                Access and manage your saved documents
              </p>
            </div>
            <button
              onClick={() => setShowUpload(true)}
              className="mt-4 sm:mt-0 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all shadow-lg"
            >
              + Upload Document
            </button>
          </div>

          {documents.length === 0 ? (
            <div className={`text-center py-12 rounded-xl ${
              theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/10'
            }`}>
              <svg className="w-24 h-24 text-white/30 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className={`text-lg mb-4 ${
                theme === 'dark' ? 'text-gray-400' : 'text-white/80'
              }`}>No documents available</p>
              <button
                onClick={() => setShowUpload(true)}
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all"
              >
                Upload Your First Document
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className={`rounded-xl p-6 border transition-all ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 hover:bg-gray-750'
                      : 'bg-white/90 border-gray-200 hover:shadow-lg'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <button
                      onClick={() => handleDelete(doc.id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>

                  <h3 className={`font-semibold text-lg mb-2 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-800'
                  }`}>{doc.name}</h3>
                  <div className={`flex items-center justify-between text-sm mb-4 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    <span>{doc.type || 'Document'}</span>
                    <span>{formatFileSize(doc.size)}</span>
                  </div>
                  <p className={`text-sm mb-4 ${
                    theme === 'dark' ? 'text-gray-500' : 'text-gray-600'
                  }`}>
                    Uploaded: {new Date(doc.uploadedAt).toLocaleDateString()}
                  </p>

                  <button
                    onClick={() => handleDownload(doc)}
                    className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all font-semibold"
                  >
                    Download
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Upload Modal */}
      {showUpload && (
        <div className={`fixed inset-0 z-50 flex items-center justify-center ${
          theme === 'dark' ? 'bg-gray-900/90' : 'bg-black/50'
        } backdrop-blur-sm p-4`}>
          <div className={`${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          } rounded-xl shadow-2xl p-6 max-w-md w-full`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className={`text-xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-gray-800'
              }`}>Upload Document</h2>
              <button
                onClick={() => setShowUpload(false)}
                className={`p-2 rounded-lg hover:bg-gray-200 ${
                  theme === 'dark' ? 'hover:bg-gray-700 text-gray-300' : 'text-gray-600'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <label className={`block ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Select File
                <input
                  type="file"
                  onChange={handleFileUpload}
                  disabled={uploading}
                  className={`mt-2 w-full px-4 py-2 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-gray-100'
                      : 'bg-white border-gray-300 text-gray-800'
                  }`}
                />
              </label>
              {uploading && (
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>Uploading...</p>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Documents;



