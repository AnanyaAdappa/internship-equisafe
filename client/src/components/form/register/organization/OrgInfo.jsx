function OrgInfo({
  formData, setFormData, validationErrors, updateFormValue,
}) {
//   about;
//   domain;
//   website;

  return (
    <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8 h-[30vh] overflow-y-scroll scroll-smooth z-100 scrollbar p-3">
      <div className="relative">
        <p
          className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute"
        >
          {/* -----------industry----------- */}
          Industry
        </p>
        <input
          placeholder="IT & Engineering"
          type="text"
          value={formData.domain}
          onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
          className="border placeholder-gray-400 focus:outline-none focus:border-accent w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md"
        />
      </div>
      <div className="relative w-full">
        <p
          className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute"
        >
          {/* -----------website----------- */}
          Website
        </p>
        <input
          placeholder="example.com"
          type="text"
          value={formData.website}
          onChange={(e) => updateFormValue("website", e.target.value)}
          className={`border placeholder-gray-400 focus:outline-none focus:border-accent w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md ${validationErrors.website ? 'focus:border-red-500 border-red-300' : ''}`}
        />
        {validationErrors.website && (
        <p className="text-red-500">{validationErrors.website}</p>
        )}

      </div>
      <div className="relative w-full">
        <p
          className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute"
        >
          {/* -----------about----------- */}
          About Company
        </p>
        <textarea
          rows="4"
          placeholder="description..."
          value={formData.about}
          onChange={(e) => setFormData({ ...formData, about: e.target.value })}
          className="border placeholder-gray-400 focus:outline-none focus:border-accent w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md"
        />
      </div>
    </div>
  );
}

export default OrgInfo;
