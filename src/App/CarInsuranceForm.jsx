import React, { useState } from "react";
import CarInfoStep from "./steps/CarInfoStep";
import InsuranceOptionsStep from "./steps/InsuranceOptionsStep";
import PersonalInfoStep from "./steps/PersonalInfoStep";
import ReviewSubmitStep from "./steps/ReviewSubmitStep";

const CarInsuranceForm = () => {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    carInfo: {
      make: "",
      model: "",
      year: "",
      plateNumber: "",
      images: [],
    },
    insuranceOptions: {
      coverageType: "",
      period: "",
      extras: [],
    },
    personalInfo: {
      fullName: "",
      nationalId: "",
      email: "",
      phone: "",
      address: "",
    },
  });

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const updateSection = (section, data) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...data,
      },
    }));
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      {/* Step Indicator */}
      <div className="flex justify-between mb-6">
        {[
          "Car Info",
          "Insurance Options",
          "Personal Info",
          "Review & Submit",
        ].map((label, index) => (
          <div
            key={index}
            className={`flex-1 text-center font-bold ${
              step === index + 1 ? "text-blue-600" : "text-gray-400"
            }`}
          >
            {index + 1}. {label}
          </div>
        ))}
      </div>

      {/* Render current step */}
      <div>
        {step === 1 && (
          <CarInfoStep
            data={formData.carInfo}
            onChange={(data) => updateSection("carInfo", data)}
          />
        )}
        {step === 2 && (
          <InsuranceOptionsStep
            data={formData.insuranceOptions}
            onChange={(data) => updateSection("insuranceOptions", data)}
          />
        )}
        {step === 3 && (
          <PersonalInfoStep
            data={formData.personalInfo}
            onChange={(data) => updateSection("personalInfo", data)}
          />
        )}
        {step === 4 && <ReviewSubmitStep data={formData} />}
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        {step > 1 && (
          <button
            onClick={handleBack}
            className="bg-gray-200 px-4 py-2 rounded"
          >
            Back
          </button>
        )}
        {step < 4 && (
          <button
            onClick={handleNext}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default CarInsuranceForm;
