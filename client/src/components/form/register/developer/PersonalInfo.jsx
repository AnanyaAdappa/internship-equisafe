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
      <div className="flex flex-auto gap-5 w-full items-center justify-between">
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
        <div className="relative w-full">
          <p
            className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute"
          >
            {/* -----------technical_role----------- */}
            Profession
          </p>
          <input
            placeholder="web developer"
            type="text"
            value={formData.technical_role}
            onChange={(event) => setFormData({ ...formData, technical_role: event.target.value })}
            className="border   placeholder-gray-400 focus:outline-none focus:border-accent w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md"
          />
        </div>
      </div>
      <div className="relative w-full">
        <p
          className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute"
        >
          {/* -----------qualification----------- */}
          Qualification
        </p>
        <input
          placeholder="B.E (Computer Science)"
          type="text"
          value={formData.qualification}
          onChange={(event) => setFormData({ ...formData, qualification: event.target.value })}
          className="border   placeholder-gray-400 focus:outline-none focus:border-accent w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md"
        />
      </div>
      <div className="relative w-full">
        <p
          className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute"
        >
          Skills
        </p>
        <textarea
          rows="2"
          placeholder="HTML, CSS, JS, .....(Please insert skills comma and space separated"
          value={formData.skills}
          onChange={(event) => updateFormValue("skills", event.target.value)}
          className={`border placeholder-gray-400 focus:outline-none focus:border-accent w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md ${validationErrors.skills ? 'focus:border-red-500 border-red-300' : ''}`}
        />
        {validationErrors.skills && (
        <p className="text-red-500">{validationErrors.skills}</p>
        )}

      </div>
      <div className="mb-4">
        <label
          htmlFor="flexSwitchChecked"
          className="inline-block text-gray-700 text-sm font-bold mb-2"
        >
          Open to work ?
          <div className="inline form-control">
            <input
              className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
              type="checkbox"
              role="switch"
              id="flexSwitchChecked"
              checked={formData.openToWork}
              onChange={(e) => setFormData({
                ...formData,
                openToWork: e.target.checked,
              })}
            />
          </div>
        </label>
      </div>
      <div className="relative w-full">
        <p
          className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute"
        >
          Linkedin Profile URL
        </p>
        <input
          placeholder="http://linkedin.com/...."
          type="text"
          value={formData.linkedin}
          onChange={(event) => updateFormValue("linkedin", event.target.value)}
          className={`border   placeholder-gray-400 focus:outline-none focus:border-accent w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md ${validationErrors.linkedin ? 'focus:border-red-500 border-red-300' : ''}`}
        />
        {validationErrors.linkedin && (
        <p className="text-red-500">{validationErrors.linkedin}</p>
        )}
      </div>
      <div className="relative w-full">
        <p
          className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute"
        >
          Github Profile URL
        </p>
        <input
          placeholder="http://github.com/...."
          type="text"
          value={formData.github}
          onChange={(event) => updateFormValue("github", event.target.value)}
          className={`border   placeholder-gray-400 focus:outline-none focus:border-accent w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md ${validationErrors.github ? 'focus:border-red-500 border-red-300' : ''}`}
        />
        {validationErrors.github && (
        <p className="text-red-500">{validationErrors.github}</p>
        )}

      </div>
    </div>
  );
}

export default PersonalInfo;
