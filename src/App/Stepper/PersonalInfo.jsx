import React from "react";
import { User, IdCard, Phone, MapPin, Mail } from "lucide-react";
import useInsuranceForm from './../UseInsuranceForm';

const PersonalInfo = ({ nextStep, prevStep }) => {
  const { updateForm, formData } = useInsuranceForm();

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateForm({
      PersonalInfo: {
        ...formData.PersonalInfo,
        [name]: value,
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Personal Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
              <input
                type="text"
                name="fullName"
                value={formData.PersonalInfo?.fullName || ""}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Enter your full name"
              />
            </div>
          </div>

          {/* National ID */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              National ID
            </label>
            <div className="relative">
              <IdCard className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
              <input
                type="text"
                name="nationalId"
                maxLength={14}
                value={formData.PersonalInfo?.nationalId || ""}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Enter your national ID"
              />
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
              <input
                type="tel"
                name="phone"
                value={formData.PersonalInfo?.phone || ""}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Enter your phone number"
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Address
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
              <input
                type="text"
                name="address"
                value={formData.PersonalInfo?.address || ""}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Enter your address"
              />
            </div>
          </div>

          {/* Email */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email (optional)
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
              <input
                type="email"
                name="email"
                value={formData.PersonalInfo?.email || ""}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Enter your email"
              />
            </div>
          </div>
        </div>

        <div className="text-right mt-8 flex justify-between">
          <button
            type="button"
            onClick={prevStep}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-6 rounded-lg transition"
          >
            ← Back
          </button>
          
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition-all duration-200"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalInfo;
