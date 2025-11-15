import { createContext, useContext, useState } from 'react';

const FormContext = createContext();

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within FormProvider');
  }
  return context;
};

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    sscPercentage: '',
    hsscPercentage: '',
    preferredDegree: '',
    preferredUniversityType: '',
    preferredCities: [],
    budgetPerSemester: '',
    scholarshipPreference: '',
    academicInterests: [],
    careerPreference: '',
    willingToRelocate: '',
    extraCurricularInterests: [],
  });

  const updateFormData = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const resetFormData = () => {
    setFormData({
      sscPercentage: '',
      hsscPercentage: '',
      preferredDegree: '',
      preferredUniversityType: '',
      preferredCities: [],
      budgetPerSemester: '',
      scholarshipPreference: '',
      academicInterests: [],
      careerPreference: '',
      willingToRelocate: '',
      extraCurricularInterests: [],
    });
  };

  return (
    <FormContext.Provider value={{ formData, updateFormData, resetFormData }}>
      {children}
    </FormContext.Provider>
  );
};
