// Utility functions for localStorage management

export const saveToFavorites = (university) => {
  const userEmail = localStorage.getItem('userEmail');
  if (!userEmail) return false;
  
  const favorites = JSON.parse(localStorage.getItem('favorites') || '{}');
  if (!favorites[userEmail]) {
    favorites[userEmail] = [];
  }
  
  // Check if already favorited
  const exists = favorites[userEmail].some(fav => 
    fav.name === university.name && fav.program === university.program
  );
  
  if (!exists) {
    favorites[userEmail].push({
      ...university,
      favoritedAt: new Date().toISOString(),
    });
    localStorage.setItem('favorites', JSON.stringify(favorites));
    return true;
  }
  return false;
};

export const removeFromFavorites = (university) => {
  const userEmail = localStorage.getItem('userEmail');
  if (!userEmail) return false;
  
  const favorites = JSON.parse(localStorage.getItem('favorites') || '{}');
  if (favorites[userEmail]) {
    favorites[userEmail] = favorites[userEmail].filter(fav => 
      !(fav.name === university.name && fav.program === university.program)
    );
    localStorage.setItem('favorites', JSON.stringify(favorites));
    return true;
  }
  return false;
};

export const getFavorites = () => {
  const userEmail = localStorage.getItem('userEmail');
  if (!userEmail) return [];
  
  const favorites = JSON.parse(localStorage.getItem('favorites') || '{}');
  return favorites[userEmail] || [];
};

export const isFavorited = (university) => {
  const userEmail = localStorage.getItem('userEmail');
  if (!userEmail) return false;
  
  const favorites = JSON.parse(localStorage.getItem('favorites') || '{}');
  if (!favorites[userEmail]) return false;
  
  return favorites[userEmail].some(fav => 
    fav.name === university.name && fav.program === university.program
  );
};

export const saveComparison = (universities) => {
  const userEmail = localStorage.getItem('userEmail');
  if (!userEmail) return false;
  
  const comparisons = JSON.parse(localStorage.getItem('comparisons') || '{}');
  if (!comparisons[userEmail]) {
    comparisons[userEmail] = [];
  }
  
  const comparison = {
    id: Date.now().toString(),
    universities,
    createdAt: new Date().toISOString(),
  };
  
  comparisons[userEmail].unshift(comparison);
  // Keep only last 10 comparisons
  comparisons[userEmail] = comparisons[userEmail].slice(0, 10);
  localStorage.setItem('comparisons', JSON.stringify(comparisons));
  return true;
};

export const getComparisons = () => {
  const userEmail = localStorage.getItem('userEmail');
  if (!userEmail) return [];
  
  const comparisons = JSON.parse(localStorage.getItem('comparisons') || '{}');
  return comparisons[userEmail] || [];
};

export const saveDeadline = (deadline) => {
  const userEmail = localStorage.getItem('userEmail');
  if (!userEmail) return false;
  
  const deadlines = JSON.parse(localStorage.getItem('deadlines') || '{}');
  if (!deadlines[userEmail]) {
    deadlines[userEmail] = [];
  }
  
  const newDeadline = {
    id: Date.now().toString(),
    ...deadline,
    createdAt: new Date().toISOString(),
  };
  
  deadlines[userEmail].push(newDeadline);
  localStorage.setItem('deadlines', JSON.stringify(deadlines));
  return true;
};

export const getDeadlines = () => {
  const userEmail = localStorage.getItem('userEmail');
  if (!userEmail) return [];
  
  const deadlines = JSON.parse(localStorage.getItem('deadlines') || '{}');
  return deadlines[userEmail] || [];
};

export const deleteDeadline = (id) => {
  const userEmail = localStorage.getItem('userEmail');
  if (!userEmail) return false;
  
  const deadlines = JSON.parse(localStorage.getItem('deadlines') || '{}');
  if (deadlines[userEmail]) {
    deadlines[userEmail] = deadlines[userEmail].filter(d => d.id !== id);
    localStorage.setItem('deadlines', JSON.stringify(deadlines));
    return true;
  }
  return false;
};

export const saveRecommendationHistory = (recommendations, completed = false) => {
  const userEmail = localStorage.getItem('userEmail');
  if (!userEmail) return false;
  
  // Check if questionnaire was completed
  let isCompleted = completed;
  if (!isCompleted) {
    const questionnaires = JSON.parse(localStorage.getItem('questionnaires') || '[]');
    const userQuestionnaires = questionnaires.filter(q => q.userEmail === userEmail);
    // Check if there's a completed questionnaire
    isCompleted = userQuestionnaires.some(q => q.completedAt && q.userEmail === userEmail);
  }
  
  // Only save if completed
  if (!isCompleted) return false;
  
  const history = JSON.parse(localStorage.getItem('recommendationHistory') || '{}');
  if (!history[userEmail]) {
    history[userEmail] = [];
  }
  
  const entry = {
    id: Date.now().toString(),
    recommendations,
    completed: true,
    createdAt: new Date().toISOString(),
  };
  
  history[userEmail].unshift(entry);
  // Keep only last 20 entries
  history[userEmail] = history[userEmail].slice(0, 20);
  localStorage.setItem('recommendationHistory', JSON.stringify(history));
  return true;
};

export const getRecommendationHistory = (completedOnly = true) => {
  const userEmail = localStorage.getItem('userEmail');
  if (!userEmail) return [];
  
  const history = JSON.parse(localStorage.getItem('recommendationHistory') || '{}');
  const userHistory = history[userEmail] || [];
  
  // Filter to only return completed entries if requested
  if (completedOnly) {
    return userHistory.filter(entry => entry.completed === true);
  }
  
  return userHistory;
};

export const deleteRecommendationHistory = (entryId) => {
  const userEmail = localStorage.getItem('userEmail');
  if (!userEmail) return false;
  
  const history = JSON.parse(localStorage.getItem('recommendationHistory') || '{}');
  if (history[userEmail]) {
    history[userEmail] = history[userEmail].filter(entry => entry.id !== entryId);
    localStorage.setItem('recommendationHistory', JSON.stringify(history));
    return true;
  }
  return false;
};

export const saveDocument = (file, metadata) => {
  const userEmail = localStorage.getItem('userEmail');
  if (!userEmail) return false;
  
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onload = (e) => {
      const documents = JSON.parse(localStorage.getItem('documents') || '{}');
      if (!documents[userEmail]) {
        documents[userEmail] = [];
      }
      
      const document = {
        id: Date.now().toString(),
        name: file.name,
        type: file.type,
        size: file.size,
        data: e.target.result, // base64
        metadata: metadata || {},
        uploadedAt: new Date().toISOString(),
      };
      
      documents[userEmail].push(document);
      localStorage.setItem('documents', JSON.stringify(documents));
      resolve(document);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const getDocuments = () => {
  const userEmail = localStorage.getItem('userEmail');
  if (!userEmail) return [];
  
  const documents = JSON.parse(localStorage.getItem('documents') || '{}');
  return documents[userEmail] || [];
};

export const deleteDocument = (id) => {
  const userEmail = localStorage.getItem('userEmail');
  if (!userEmail) return false;
  
  const documents = JSON.parse(localStorage.getItem('documents') || '{}');
  if (documents[userEmail]) {
    documents[userEmail] = documents[userEmail].filter(d => d.id !== id);
    localStorage.setItem('documents', JSON.stringify(documents));
    return true;
  }
  return false;
};

export const updateProgress = (milestone) => {
  const userEmail = localStorage.getItem('userEmail');
  if (!userEmail) return false;
  
  const progress = JSON.parse(localStorage.getItem('userProgress') || '{}');
  if (!progress[userEmail]) {
    progress[userEmail] = {
      milestones: [],
      achievements: [],
      points: 0,
    };
  }
  
  if (!progress[userEmail].milestones.includes(milestone)) {
    progress[userEmail].milestones.push(milestone);
    progress[userEmail].points += 10;
    localStorage.setItem('userProgress', JSON.stringify(progress));
    return true;
  }
  return false;
};

export const getProgress = () => {
  const userEmail = localStorage.getItem('userEmail');
  if (!userEmail) return { milestones: [], achievements: [], points: 0 };
  
  const progress = JSON.parse(localStorage.getItem('userProgress') || '{}');
  return progress[userEmail] || { milestones: [], achievements: [], points: 0 };
};

export const addAchievement = (achievement) => {
  const userEmail = localStorage.getItem('userEmail');
  if (!userEmail) return false;
  
  const progress = JSON.parse(localStorage.getItem('userProgress') || '{}');
  if (!progress[userEmail]) {
    progress[userEmail] = {
      milestones: [],
      achievements: [],
      points: 0,
    };
  }
  
  if (!progress[userEmail].achievements.includes(achievement)) {
    progress[userEmail].achievements.push(achievement);
    progress[userEmail].points += 50;
    localStorage.setItem('userProgress', JSON.stringify(progress));
    return true;
  }
  return false;
};

