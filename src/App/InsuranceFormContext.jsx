// context/InsuranceFormContext.jsx
import React, { createContext, useState } from 'react';

export const InsuranceFormContext = createContext(null);

export const InsuranceFormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    CarInformation: {},
    InsuranceOptions: {},
    PersonalInfo: {},
  });

  const updateForm = (newData) => {
    setFormData((prev) => ({
      ...prev,
      ...newData,
    }));
  };

  return (
    <InsuranceFormContext.Provider value={{ formData, updateForm }}>
      {children}
    </InsuranceFormContext.Provider>
  );
};
