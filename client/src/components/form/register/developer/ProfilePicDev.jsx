import React, { useRef } from 'react';
import { RxAvatar } from 'react-icons/rx';

function ProfilePicDev({
  formData,
  setFormData, image, setImage,
}) {
  const hiddenFileInput = useRef(null);

  // onChange handler
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
        <label
          htmlFor="image-upload-input"
          className="image-upload-label"
        >
          {image ? image.name : 'Choose an image'}

          <div
            role="button"
            tabIndex={0}
        //   onClick={handleClick}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleClick();
              }
            }}
            style={{ cursor: 'pointer' }}
          >
            {image ? (
              <img
                alt="Upload"
                src={URL.createObjectURL(image)}
                className="img-display-after"
              />
            ) : (
              <RxAvatar className="w-40 h-40 text-accent" />
            )}

            <input
              id="image-upload-input"
              type="file"
              onChange={handleImageChange}
              ref={hiddenFileInput}
              style={{ display: 'none' }}
              accept="image/*"
            />
          </div>

        </label>
      </div>
    </div>
  );
}

export default ProfilePicDev;
