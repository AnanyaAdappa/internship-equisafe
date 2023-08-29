import { useRef, useState } from 'react';
import { LuEdit } from 'react-icons/lu';
import { RxAvatar } from "react-icons/rx";
import { toast } from 'react-toastify';

function CompanyUpdateModal({ organization, fetchProfile }) {
  // need to make a local copy of the state came from parent component
  // because the update in original state using onChange handler was causing unnessary network requests for proposals and reviews as this state variable is useEffect hook's dependency
  const [localOrg, setLocalOrg] = useState(organization);
  const [image, setImage] = useState(null);
  const hiddenFileInput = useRef(null);

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
    setLocalOrg({ ...localOrg, photo: file });
  };

  const handleCloseModal = () => {
    const modal = document.getElementById('my_modal_2');
    if (modal) {
      modal.close();
    }
  };
  const handleUpdate = (e) => {
    e.preventDefault();

    const bodyData = new FormData();
    bodyData.append('name', localOrg.name);
    if (localOrg.website) {
      bodyData.append('website', localOrg.website);
    }
    if (localOrg.domain) {
      bodyData.append('domain', localOrg.domain);
    }
    if (localOrg.about) {
      bodyData.append('openToWork', localOrg.about);
    }
    if (localOrg.photo) {
      bodyData.append('photo', localOrg.photo);
    }

    fetch(`${import.meta.env.VITE_API_URL}/organizations/${localOrg.uid}`, {
      method: 'PATCH',
      headers: {
        authorization: localStorage.getItem('authToken'),
      },
      body: bodyData,
    })
      .then((response) => response.json())
      .then((data) => {
        // alert(`${data.message}`);
        toast.success(`${data.message}`, {
          position: toast.POSITION.TOP_CENTER, autoClose: 2000,
        });
        fetchProfile();
        handleCloseModal();
      })
      .catch((error) => {
        console.log('POSTING error --> ', error);
      });
  };
  return (
    <>
      {/* Open the modal using ID.showModal() method */}
      <button
        type="button"
        onClick={() => window.my_modal_2.showModal()}
      >
        <LuEdit className="absolute right-8 top-9 text-2xl text-accent hover:bg-accent/10 " />
      </button>
      <dialog
        id="my_modal_2"
        className="modal p-4 bg-transparent"
      >
        <form
          method="dialog"
          className="modal-box  bg-white rounded-2xl p-10"
        >
          <h1 className="flex items-center justify-center w-full text-2xl font-semibold border-b pb-4 text-slate-800">
            Update Profile
          </h1>
          <div className="w-full my-6 mr-0 ml-0 relative space-y-8 h-[60vh] overflow-y-scroll scroll-smooth z-10 scrollbar px-3">
            <div className="relative lg:w-[700px] w-[60vw] pt-3">
              <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">
                Company Name
              </p>
              <input
                placeholder="Google"
                type="text"
                value={localOrg.name}
                onChange={(event) => setLocalOrg({ ...localOrg, name: event.target.value })}
                className="border placeholder-gray-400 focus:outline-none focus:border-accent w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md"
              />
            </div>

            <div className="relative">
              <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">
                Website
              </p>
              <input
                placeholder="e.g example.com"
                type="text"
                value={localOrg.website}
                onChange={(event) => setLocalOrg({ ...localOrg, website: event.target.value })}
                className="border placeholder-gray-400 focus:outline-none
                  focus:border-accent w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
                  border-gray-300 rounded-md"
              />
            </div>
            <div className="relative">
              <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">
                Industry (Domain)
              </p>
              <input
                placeholder="e.g I.T Engineering"
                type="phone"
                value={localOrg.domain}
                onChange={(event) => setLocalOrg({ ...localOrg, domain: event.target.value })}
                className="border placeholder-gray-400 focus:outline-none
                  focus:border-accent w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
                  border-gray-300 rounded-md"
              />
            </div>
            <div className="relative">
              <p
                className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute"
              >
                About Company
              </p>
              <textarea
                rows="4"
                placeholder="description..."
                value={localOrg.about}
                onChange={(e) => setLocalOrg({ ...localOrg, about: e.target.value })}
                className="border placeholder-gray-400 focus:outline-none focus:border-accent w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md"
              />
            </div>
            {/* ----------------Image Update-------------- */}
            <div className="relative">
              <p
                className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute"
              >
                Change Company Banner
              </p>

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
                          className="aspect-video md:w4 h-40 object-cover rounded-lg"
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

            </div>
          </div>
          <button
            type="button"
            onClick={(e) => handleUpdate(e)}
            className="cursor-pointer inline-block  pt-4 pr-5 pb-4 pl-5 text-xl font-medium text-center text-white bg-indigo-500 rounded-lg duration-200 hover:bg-indigo-600 ease w-full"
          >
            Update
          </button>
        </form>
        <form method="dialog">
          <button
            type="button"
            className="modalbackdrop"
          >
            close
          </button>
        </form>
      </dialog>
    </>
  );
}

export default CompanyUpdateModal;
