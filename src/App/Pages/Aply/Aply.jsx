import React, { useState } from "react";
import CarInformation from "../../Stepper/CarInformation";
import InsuranceOptions from "../../Stepper/InsuranceOptions";
import PersonalInfo from "../../Stepper/PersonalInfo";
import ReviewAndSubmit from './../../Stepper/ReviewAndSubmit';

const steps = [
  "Car Info",
  "Insurance Options",
  "Personal Info",
  "Review & Submit",
];

const Apply = () => {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    make: "",
    type: "",
    model: "",
    city: "",
    name: "",
    nationalId: "",
    insuranceType: "",
    carPhotos: [],
    roadsideAssistance: false,
    rentalCarCoverage: false,
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const updateForm = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center px-4 py-10">
      {/* Stepper Indicators */}
      <div className="flex items-center justify-center mb-8 space-x-4">
        {steps.map((label, index) => {
          const current = index + 1;
          const isCompleted = current < step;
          const isActive = current === step;

          return (
            <div key={label} className="flex items-center space-x-2">
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full border-2
                  ${
                    isCompleted
                      ? "bg-orange-500 text-white border-orange-500"
                      : ""
                  }
                  ${
                    isActive
                      ? "bg-white border-orange-500 text-orange-500 font-bold"
                      : ""
                  }
                  ${
                    !isActive && !isCompleted
                      ? "bg-gray-200 text-gray-600 border-gray-300"
                      : ""
                  }
                `}
              >
                {current}
              </div>
              <span className="hidden sm:inline-block text-sm text-gray-700">
                {label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Form Card */}
      <div className="w-full max-w-xl bg-white p-6 rounded-lg shadow-lg transition-all duration-300">
        {step === 1 && (
          <CarInformation
            nextStep={nextStep}
            updateForm={updateForm}
            formData={formData}
          />
        )}

        {step === 2 && (
          <InsuranceOptions
            nextStep={nextStep}
            prevStep={prevStep}
            updateForm={updateForm}
            formData={formData}
          />
        )}

        {step === 3 && (
          <PersonalInfo
            nextStep={nextStep}
            prevStep={prevStep}
            updateForm={updateForm}
            formData={formData}
          />
        )}
        {step === 4 && (
          <ReviewAndSubmit
            prevStep={prevStep}
            updateForm={updateForm}
            formData={formData}
          />
        )}
      </div>
    </div>
  );
};

export default Apply;
