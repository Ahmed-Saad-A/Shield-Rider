import React, { useState, useEffect } from "react";
import { useInsuranceForm } from "./../Layout/useInsuranceForm";

const InsuranceOptions = ({ nextStep, prevStep }) => {
  const { updateForm, formData } = useInsuranceForm();
  const [carImagePreviews, setCarImagePreviews] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (formData.InsuranceOptions?.carPhotos?.length) {
      const previews = formData.InsuranceOptions.carPhotos.map((file) =>
        typeof file === "string" ? file : URL.createObjectURL(file)
      );
      setCarImagePreviews(previews);
    }
  }, [formData.InsuranceOptions?.carPhotos]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const currentData = formData.InsuranceOptions || {};
    let updatedOptions = { ...currentData };

    if (type === "checkbox") {
      let updatedAddons = currentData.addons || [];

      if (checked) {
        updatedAddons = [...new Set([...updatedAddons, value])];
      } else {
        updatedAddons = updatedAddons.filter((item) => item !== value);
      }

      updatedOptions = { ...updatedOptions, addons: updatedAddons };
    } else {
      updatedOptions = { ...updatedOptions, [name]: value };
    }

    updateForm({ InsuranceOptions: updatedOptions });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      setError("You can upload a maximum of 5 images.");
      return;
    }

    setError("");
    updateForm({
      InsuranceOptions: {
        ...formData.InsuranceOptions,
        carPhotos: files,
      },
    });

    const previews = files.map((file) => URL.createObjectURL(file));
    setCarImagePreviews(previews);
  };

  const calculateOptionPrice = () => {
    const {
      coverageType,
      insurancePeriod,
      addons = [],
    } = formData.InsuranceOptions || {};
    let price = 0;

    switch (coverageType) {
      case "Third-Party Liability":
        price += 100;
        break;
      case "Comprehensive Coverage":
        price += 200;
        break;
      case "Extended Comprehensive Coverage":
        price += 300;
        break;
      default:
        price += 0;
    }

    switch (insurancePeriod) {
      case "6 Months":
        price *= 1;
        break;
      case "1 Year":
        price *= 1.8;
        break;
      case "2 Years":
        price *= 3;
        break;
      default:
        price *= 1;
    }

    price += addons.length * 50;

    return Math.round(price);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      coverageType,
      insurancePeriod,
      carPhotos = [],
      addons = [],
    } = formData.InsuranceOptions || {};

    if (!coverageType || !insurancePeriod) {
      setError("Please select coverage type and period.");
      return;
    }

    if (carPhotos.length === 0) {
      setError("Please upload at least one car photo.");
      return;
    }

    if (addons.length === 0) {
      setError("Please select at least one addon.");
      return;
    }

    if (carPhotos.length > 5) {
      setError("Maximum 5 car photos allowed.");
      return;
    }

    // Validate with regex
    const coverageValid =
      /^(Third-Party Liability|Comprehensive Coverage|Extended Comprehensive Coverage)$/.test(
        coverageType
      );
    const periodValid = /^(6 Months|1 Year|2 Years)$/.test(insurancePeriod);
    const addonsValid = addons.every((addon) =>
      ["fireTheft", "naturalDisaster", "roadside", "rental"].includes(addon)
    );

    if (!coverageValid || !periodValid || !addonsValid) {
      setError("Invalid insurance data provided.");
      return;
    }

    const optionPrice = calculateOptionPrice();

    updateForm({
      InsuranceOptions: { coverageType, insurancePeriod, carPhotos, addons },
      OptionPrice: optionPrice,
    });

    setError("");
    nextStep();
  };

  const addonOptions = [
    { value: "fireTheft", label: "Fire & Theft Protection" },
    { value: "naturalDisaster", label: "Natural Disaster Coverage" },
    { value: "roadside", label: "Roadside Assistance" },
    { value: "rental", label: "Rental Car Coverage" },
  ];

  const selectedAddons = formData.InsuranceOptions?.addons || [];

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Insurance Options
        </h2>

        {/* Coverage Type */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Desired Coverage Type
          </label>
          <select
            name="coverageType"
            value={formData.InsuranceOptions?.coverageType || ""}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="" disabled>
              Select a coverage type
            </option>
            <option value="Third-Party Liability">Third-Party Liability</option>
            <option value="Comprehensive Coverage">
              Comprehensive Coverage
            </option>
            <option value="Extended Comprehensive Coverage">
              Extended Comprehensive Coverage
            </option>
          </select>
        </div>

        {/* Insurance Period */}
        <div className="mt-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Preferred Insurance Period
          </label>
          <div className="grid grid-cols-3 gap-3">
            {["6 Months", "1 Year", "2 Years"].map((period) => (
              <label
                key={period}
                className="flex items-center gap-2 text-sm text-gray-700"
              >
                <input
                  type="radio"
                  name="insurancePeriod"
                  value={period}
                  checked={
                    formData.InsuranceOptions?.insurancePeriod === period
                  }
                  onChange={handleInputChange}
                  className="accent-orange-500"
                />
                {period}
              </label>
            ))}
          </div>
        </div>

        {/* Additional Coverage */}
        <div className="mt-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Additional Coverage Options
          </label>
          <div className="grid grid-cols-2 gap-3">
            {addonOptions.map((opt) => (
              <label
                key={opt.value}
                className="flex items-center gap-2 text-sm text-gray-700"
              >
                <input
                  type="checkbox"
                  name="addons"
                  value={opt.value}
                  checked={selectedAddons.includes(opt.value)}
                  onChange={handleInputChange}
                  className="accent-orange-500"
                />
                {opt.label}
              </label>
            ))}
          </div>
        </div>

        {/* Upload Car Photos */}
        <div className="mt-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Upload Car Photos (max 5)
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-600 bg-gray-50 border border-gray-300 rounded-lg px-3 py-2"
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          {carImagePreviews.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
              {carImagePreviews.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`Car ${idx + 1}`}
                  className="w-full h-32 object-cover rounded-lg border"
                />
              ))}
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-between pt-6">
          <button
            type="button"
            onClick={prevStep}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-6 rounded-lg transition"
          >
            ← Back
          </button>
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg shadow transition duration-200"
          >
            Next →
          </button>
        </div>
      </form>
    </div>
  );
};

export default InsuranceOptions;
