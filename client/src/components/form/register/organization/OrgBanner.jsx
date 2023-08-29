import React, { useState, useRef } from "react";
import { VscOrganization } from "react-icons/vsc";

function OrgBanner({ formData, setFormData }) {
  const [image, setImage] = useState(null);
  const hiddenFileInput = useRef(null);

  const handleImageChange = (event) => {
    //  event.target.files provides access to the files selected by the user through an HTML
    // [0] gets the first selected file
    const file = event.target.files[0];
    setImage(file);
    setFormData({ ...formData, photo: file });
  };

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  return (
    <div className="flex w-full justify-center">
      <div className="box-decoration w-full py-6">
        <label htmlFor="image-upload-input" className="image-upload-label">
          {image ? image.name : "Choose an image"}
        </label>
        <div
          onClick={handleClick}
          style={{ cursor: "pointer" }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleClick();
            }
          }}
        >
          {image ? (
            <img
              src={URL.createObjectURL(image)}
              alt="upload"
              className="aspect-video md:w4 h-40 object-cover rounded-lg"
            />
          ) : (
            <VscOrganization className="w-40 h-40 text-accent" />
          )}

          <input
            id="image-upload-input"
            type="file"
            onChange={handleImageChange}
            ref={hiddenFileInput}
            style={{ display: "none" }}
            accept="image/*"
          />
        </div>

      </div>
    </div>
  );
}

export default OrgBanner;
