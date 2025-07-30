import { useContext } from 'react';
import { InsuranceFormContext } from './InsuranceFormContext';

const useInsuranceForm = () => {
  const context = useContext(InsuranceFormContext);
  if (!context) {
    throw new Error('useInsuranceForm must be used within an InsuranceFormProvider');
  }
  return context;
};

export default useInsuranceForm;
