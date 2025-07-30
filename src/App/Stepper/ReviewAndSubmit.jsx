import React from "react";
import { useInsuranceForm } from "./../Layout/useInsuranceForm";
import { useNavigate } from "react-router-dom";

const ReviewAndSubmit = () => {
  const navigate = useNavigate();
  const { formData } = useInsuranceForm();

  const handleSubmit = () => {
    console.log("Submitting full form data:", formData);
    alert("Form submitted successfully!");
  };

  const prevStep = () => {
    navigate("/aply/personalInfo");
  };

  const coverageLabels = {
    fireTheft: "Fire & Theft Protection",
    naturalDisaster: "Natural Disaster Coverage",
    roadside: "Roadside Assistance",
    rental: "Rental Car Coverage",
  };

  // السعر الخاص بخيارات التأمين
  const calculateInsuranceOptionsPrice = () => {
    let total = 0;

    switch (formData.InsuranceOptions?.coverageType) {
      case "Comprehensive":
        total += 10000;
        break;
      case "Third Party":
        total += 4000;
        break;
      default:
        total += 2000;
    }

    switch (formData.InsuranceOptions?.insurancePeriod) {
      case "1 Year":
        total += 1000;
        break;
      case "6 Months":
        total += 600;
        break;
      case "3 Months":
        total += 300;
        break;
      default:
        total += 0;
    }

    if (formData.InsuranceOptions?.addons?.length) {
      formData.InsuranceOptions.addons.forEach((addon) => {
        switch (addon) {
          case "fireTheft":
            total += 700;
            break;
          case "naturalDisaster":
            total += 900;
            break;
          case "roadside":
            total += 500;
            break;
          case "rental":
            total += 1000;
            break;
          default:
            break;
        }
      });
    }

    return total;
  };

  const carInfoPrice = formData?.EstimatedPrice || 0;
  const insurancePrice = calculateInsuranceOptionsPrice();
  const totalPriceEGP = carInfoPrice + insurancePrice;
  const totalPriceUSD = (totalPriceEGP / 49).toFixed(2);

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold border-b pb-2">Review Your Details</h2>

      {/* Car Information */}
      <section className="bg-gray-50 p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Car Information</h3>
        <ul className="space-y-1">
          <li><strong>Brand:</strong> {formData.CarInformation?.carBrand || "N/A"}</li>
          <li><strong>Model:</strong> {formData.CarInformation?.carModel || "N/A"}</li>
          <li><strong>Year:</strong> {formData.CarInformation?.year || "N/A"}</li>
          <li><strong>Plate Number:</strong> {formData.CarInformation?.plateNumber || "N/A"}</li>
          <li><strong>Chassis Number:</strong> {formData.CarInformation?.chassisNumber || "N/A"}</li>
          <li><strong>Motor Number:</strong> {formData.CarInformation?.motorNumber || "N/A"}</li>
        </ul>

        <div className="mt-4 p-3 border-t font-semibold text-lg text-blue-700">
          Car Info Price: <span className="text-black">{carInfoPrice} EGP</span>
        </div>
      </section>

      {/* Insurance Options */}
      <section className="bg-gray-50 p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Insurance Options</h3>
        <ul className="space-y-1 text-sm">
          <li><strong>Desired Coverage Type:</strong> {formData.InsuranceOptions?.coverageType || "N/A"}</li>
          <li><strong>Preferred Insurance Period:</strong> {formData.InsuranceOptions?.insurancePeriod || "N/A"}</li>
          <li>
            <strong>Additional Coverage Options:</strong>{" "}
            {formData.InsuranceOptions?.addons?.length
              ? formData.InsuranceOptions.addons
                  .map((key) => coverageLabels[key] || key)
                  .join(", ")
              : "None"}
          </li>
          <li>
            <strong>Uploaded Files:</strong>{" "}
            {formData.InsuranceOptions?.carPhotos?.length ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                {formData.InsuranceOptions.carPhotos.map((file, index) => {
                  const isFile = typeof file !== "string";
                  const src = isFile ? URL.createObjectURL(file) : file;
                  return (
                    <div key={index} className="text-center">
                      <img
                        src={src}
                        alt={`Car Photo ${index + 1}`}
                        className="h-24 w-full object-cover rounded shadow"
                      />
                      <p className="text-xs mt-1">
                        {isFile ? file.name : `Image ${index + 1}`}
                      </p>
                    </div>
                  );
                })}
              </div>
            ) : (
              "None"
            )}
          </li>
        </ul>

        <div className="mt-4 p-3 border-t font-semibold text-lg text-green-700">
          Insurance Price: <span className="text-black">{insurancePrice} EGP</span>
        </div>
      </section>

      {/* Personal Info */}
      <section className="bg-gray-50 p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Personal Information</h3>
        <ul className="space-y-1">
          <li><strong>Full Name:</strong> {formData.PersonalInfo?.fullName || "N/A"}</li>
          <li><strong>National ID:</strong> {formData.PersonalInfo?.nationalId || "N/A"}</li>
          <li><strong>Email:</strong> {formData.PersonalInfo?.email || "N/A"}</li>
          <li><strong>Phone:</strong> {formData.PersonalInfo?.phone || "N/A"}</li>
          <li><strong>Address:</strong> {formData.PersonalInfo?.address || "N/A"}</li>
        </ul>
      </section>

      {/* Total Summary */}
      <div className="bg-white border-t pt-4">
        <h3 className="text-xl font-bold mb-2">Total Summary</h3>
        <div className="p-4 bg-green-50 rounded text-lg">
          <p><strong>Total in EGP:</strong> {totalPriceEGP} جنيه</p>
          <p><strong>Total in USD:</strong> ${totalPriceUSD}</p>
        </div>
      </div>

      <div className="flex justify-between items-center pt-4">
        <button
          onClick={() => prevStep()}
          className="bg-gray-300 hover:bg-gray-400 text-black px-6 py-2 rounded-md transition"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ReviewAndSubmit;
