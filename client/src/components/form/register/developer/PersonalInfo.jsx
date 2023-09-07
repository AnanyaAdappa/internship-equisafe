import React from 'react';

function PersonalInfo({
  formData, setFormData, validationErrors, updateFormValue,
}) {
//   2.Form
// Phone
// City
// Qualification
// Technical role
// Skills
// OpenToWork

  return (
    <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8 h-[40vh] overflow-y-scroll scroll-smooth z-100 scrollbar p-3">
      <div className="relative">
        <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">
          {/* -----------phone----------- */}
          Phone*
        </p>
        <input
          placeholder="+91-9876543210"
          type="tel"
          required
          value={formData.phone}
          onChange={(event) => updateFormValue("phone", event.target.value)}
          className={`border placeholder-gray-400 focus:outline-none focus:border-accent w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md ${validationErrors.phone ? 'focus:border-red-500 border-red-300' : ''}`}
        />
        {validationErrors.phone && (
        <p className="text-red-500">{validationErrors.phone}</p>
        )}

      </div>
      
        <div className="relative w-full">
          <p
            className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute"
          >
            {/* -----------city----------- */}
            City
          </p>
          <input
            placeholder="Eg. Mumbai"
            type="text"
            value={formData.city}
            onChange={(event) => setFormData({ ...formData, city: event.target.value })}
            className="border   placeholder-gray-400 focus:outline-none focus:border-accent w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md"
          />
        </div>
        {/* <div className="relative w-full">
          <p
            className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute"
          >
            -----------technical_role-----------
            Profession
          </p>
          <input
            placeholder="web developer"
            type="text"
            value={formData.technical_role}
            onChange={(event) => setFormData({ ...formData, technical_role: event.target.value })}
            className="border   placeholder-gray-400 focus:outline-none focus:border-accent w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md"
          />
        </div> */}
      
      
    </div>
  );
}

export default PersonalInfo;
