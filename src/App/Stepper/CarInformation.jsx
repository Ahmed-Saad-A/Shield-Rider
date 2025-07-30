import React, { useState, useEffect, useCallback } from "react";
import useInsuranceForm from "./../UseInsuranceForm";

const carBrandsModels = {
  Toyota: ["Corolla", "Camry", "RAV4"],
  Hyundai: ["Elantra", "Tucson", "Sonata"],
  Nissan: ["Sunny", "Altima", "Juke"],
  Kia: ["Cerato", "Sportage", "Rio"],
  Chevrolet: ["Optra", "Cruze", "Captiva"],
  BMW: ["320i", "X5", "X3"],
};

const CarInformation = ({ nextStep }) => {
  const { updateForm, formData } = useInsuranceForm();
  const [errors, setErrors] = useState({});
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState(null);

  const [data, setData] = useState({
    carBrand: "",
    carModel: "",
    year: "",
    plateNumber: "",
    chassisNumber: "",
    motorNumber: "",
  });

  useEffect(() => {
    if (formData.CarInformation) {
      setData((prev) => ({ ...prev, ...formData.CarInformation }));
      setBrand(formData.CarInformation.carBrand);
    }
  }, [formData]);

  const calculateInsurancePrice = useCallback(() => {
    const base = 200;
    let brandFactor = 1;
    let modelFactor = 1;
    let yearFactor = 1;

    // Brand influence
    if (data.carBrand === "BMW") brandFactor = 2;
    else if (["Toyota", "Hyundai"].includes(data.carBrand)) brandFactor = 1.2;

    // Model influence
    const luxuryModels = ["X5", "X3", "RAV4", "Tucson", "Captiva", "Sportage"];
    if (luxuryModels.includes(data.carModel)) modelFactor = 1.3;

    // Year influence
    const year = parseInt(data.year);
    if (!isNaN(year)) {
      const currentYear = new Date().getFullYear();
      const age = currentYear - year;
      yearFactor = age < 5 ? 1.1 : age < 10 ? 1.3 : 1.6;
    }

    const total = Math.round(base * brandFactor * modelFactor * yearFactor);
    setPrice(total);
  }, [data.carBrand, data.carModel, data.year]);

  useEffect(() => {
    if (
      data.carBrand &&
      data.carModel &&
      data.year &&
      /^\d{4}$/.test(data.year)
    ) {
      calculateInsurancePrice();
    } else {
      setPrice(null);
    }
  }, [data.carBrand, data.carModel, data.year, calculateInsurancePrice]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleBrandChange = (e) => {
    const selectedBrand = e.target.value;
    setBrand(selectedBrand);
    setData((prev) => ({
      ...prev,
      carBrand: selectedBrand,
      carModel: "",
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!brand) newErrors.carBrand = "Brand is required.";
    if (!data.carModel) newErrors.carModel = "Model is required.";
    if (!/^(19[8-9]\d|20[0-2]\d|2025)$/.test(data.year))
      newErrors.year = "Year must be between 1980 and 2025.";
    if (!/^\d+$/.test(data.plateNumber))
      newErrors.plateNumber = "Plate number must be numeric.";
    if (!/^[A-Z0-9]{10,17}$/i.test(data.chassisNumber))
      newErrors.chassisNumber = "Invalid chassis number.";
    if (!/^[A-Z0-9]{5,15}$/i.test(data.motorNumber))
      newErrors.motorNumber = "Invalid motor number.";
    return newErrors;
  };

  const handleNext = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    updateForm({ CarInformation: data, EstimatedPrice: price });
    nextStep();
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6 text-gray-800">Car Information</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Car Brand
          </label>
          <select
            name="carBrand"
            value={data.carBrand}
            onChange={handleBrandChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="">Select a brand</option>
            {Object.keys(carBrandsModels).map((brandName) => (
              <option key={brandName} value={brandName}>
                {brandName}
              </option>
            ))}
          </select>
          {errors.carBrand && (
            <p className="text-red-600 text-sm mt-1">{errors.carBrand}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Car Model
          </label>
          <select
            name="carModel"
            value={data.carModel}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            disabled={!brand}
          >
            <option value="">Select a model</option>
            {brand &&
              carBrandsModels[brand]?.map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
          </select>
          {errors.carModel && (
            <p className="text-red-600 text-sm mt-1">{errors.carModel}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Year
          </label>
          <input
            type="number"
            name="year"
            value={data.year}
            onChange={handleChange}
            placeholder="e.g. 2020"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          {errors.year && (
            <p className="text-red-600 text-sm mt-1">{errors.year}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Plate Number
          </label>
          <input
            type="text"
            name="plateNumber"
            value={data.plateNumber}
            onChange={handleChange}
            placeholder="e.g. 1234"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          {errors.plateNumber && (
            <p className="text-red-600 text-sm mt-1">{errors.plateNumber}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Chassis Number
          </label>
          <input
            type="text"
            name="chassisNumber"
            value={data.chassisNumber}
            onChange={handleChange}
            placeholder="e.g. X1ABC23456789Z"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          {errors.chassisNumber && (
            <p className="text-red-600 text-sm mt-1">{errors.chassisNumber}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Motor Number
          </label>
          <input
            type="text"
            name="motorNumber"
            value={data.motorNumber}
            onChange={handleChange}
            placeholder="e.g. MTR123456789"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          {errors.motorNumber && (
            <p className="text-red-600 text-sm mt-1">{errors.motorNumber}</p>
          )}
        </div>
      </div>


      <div className="mt-6 text-end">
        <button
          onClick={handleNext}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded shadow-sm transition-all"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CarInformation;
