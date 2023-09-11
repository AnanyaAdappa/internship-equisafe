import { useContext, useRef, useState } from "react";
import { LuEdit } from "react-icons/lu";
import { RxAvatar } from "react-icons/rx";
import { toast } from "react-toastify";
import { loadingContext } from "../context/LoadingState";

function UpdateModal({ developer, fetchProfile }) {
  // need to make a local copy of the state came from parent component
  // because the update in original state using onChange handler was causing unnessary change in original state before saving it up through the PATCH request.
  const [localDev, setLocalDev] = useState(developer);
  const [image, setImage] = useState(null);
  const hiddenFileInput = useRef(null);

  const progressState = useContext(loadingContext);
  const { setProgress } = progressState;
  const uid = localStorage.getItem("dev_uid");

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  // const handleSkills = (event) => {
  //   const { name, value } = event.target;
  //   setLocalDev({
  //     ...localDev,
  //     [name]: name === "skills" ? value.split(", ") : value,
  //   });
  // };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
    setLocalDev({ ...localDev, photo: file });
  };

  const handleModalClose = () => {
    const modal = document.getElementById("my_modal_2");
    if (modal) {
      modal.close();
    }
  };
  const handleUpdate = async (event) => {
    await setProgress(0);
    await setProgress(10);
    event.preventDefault();
    const bodyData = new FormData();
    bodyData.append("fname", localDev.fname);
    bodyData.append("lname", localDev.lname);
    bodyData.append("email", localDev.email);
    bodyData.append("phone", localDev.phone);
    // if (localDev.qualification) {
    //   bodyData.append('qualification', localDev.qualification);
    // }
    // if (localDev.skills) {

    //   localDev.skills.forEach((skill) => {
    //     bodyData.append('skills', skill);
    //   });
    // }
    if (localDev.city) {
      bodyData.append("city", localDev.city);
    }
    // if (localDev.technical_role) {
    //   bodyData.append('technical_role', localDev.technical_role);
    // }
    // if (localDev.openToWork) {
    //   bodyData.append('openToWork', localDev.openToWork);
    // }
    // if (localDev.linkedin) {
    //   bodyData.append('linkedin', localDev.linkedin);
    // }
    // if (localDev.github) {
    //   bodyData.append('github', localDev.github);
    // }
    // if (localDev.about) {
    //   bodyData.append('about', localDev.about);
    // }
    if (localDev.photo) {
      bodyData.append("photo", localDev.photo);
    }
    await setProgress(30);
    fetch(`${import.meta.env.VITE_API_URL}/developers/${uid}`, {
      method: "PATCH",
      headers: {
        authorization: localStorage.getItem("authToken"),
      },
      body: bodyData,
    })
      .then((response) => response.json())
      .then(async (data) => {
        await setProgress(50);

        // alert(`${data.message}`);
        toast.success(`${data.message}`, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
        fetchProfile();
        await setProgress(80);
        handleModalClose();
        await setProgress(100);
      })
      .catch(async (error) => {
        await setProgress(100);
        handleModalClose();
        toast.error(`${error}`, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
      });
  };
  return (
    <>
      {/* Open the modal using ID.showModal() method */}
      <button
        type="button"
        className="btn"
        onClick={() => window.my_modal_2.showModal()}
      >
        <LuEdit className="absolute right-8 top-9 text-2xl text-accent hover:bg-accent/10 " />
      </button>
      <dialog id="my_modal_2" className="modal p-4 bg-transparent">
        <form method="dialog" className="modal-box  bg-white rounded-2xl p-10">
          <h1 className="flex items-center justify-center w-full text-2xl font-semibold border-b pb-4 text-slate-800">
            Update Profile
          </h1>
          <div className="w-full my-6 mr-0 ml-0 relative space-y-8 h-[60vh] overflow-y-scroll scroll-smooth z-10 scrollbar px-3">
            <div className="flex flex-auto gap-5 w-full items-center justify-between">
              <div className="relative w-full  pt-3">
                <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">
                  First Name
                </p>
                <input
                  placeholder="John"
                  type="text"
                  value={localDev.fname}
                  onChange={(event) =>
                    setLocalDev({ ...localDev, fname: event.target.value })
                  }
                  className="border capitalize placeholder-gray-400 focus:outline-none focus:border-accent w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md"
                />
              </div>
              <div className="relative w-full">
                <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">
                  Last Name
                </p>
                <input
                  placeholder="Doe"
                  type="text"
                  value={localDev.lname}
                  onChange={(event) =>
                    setLocalDev({ ...localDev, lname: event.target.value })
                  }
                  className="border capitalize placeholder-gray-400 focus:outline-none focus:border-accent w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div className="relative">
              <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">
                Email
              </p>
              <input
                placeholder="johndoe@example.com"
                type="text"
                value={localDev.email}
                onChange={(event) =>
                  setLocalDev({ ...localDev, email: event.target.value })
                }
                className="border   placeholder-gray-400 focus:outline-none
                  focus:border-accent w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
                  border-gray-300 rounded-md"
              />
            </div>
            <div className="relative">
              <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">
                Phone
              </p>
              <input
                placeholder="+91 84597 25190"
                type="phone"
                value={localDev.phone}
                onChange={(event) =>
                  setLocalDev({ ...localDev, phone: event.target.value })
                }
                className="border   placeholder-gray-400 focus:outline-none
                  focus:border-accent w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
                  border-gray-300 rounded-md"
              />
            </div>
            <div className="relative">
              <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">
                City
              </p>
              <input
                placeholder="Mumbai"
                type="text"
                value={localDev.city}
                onChange={(event) =>
                  setLocalDev({ ...localDev, city: event.target.value })
                }
                className="border   placeholder-gray-400 focus:outline-none
                  focus:border-accent w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
                  border-gray-300 rounded-md"
              />
            </div>

            {/* ----------------Image Update-------------- */}
            <div className="relative">
              <div className="flex w-full justify-center">
                <div className="box-decoration w-full py-6">
                  <label
                    htmlFor="image-upload-input"
                    className="image-upload-label"
                  >
                    {image ? image.name : "Choose an image"}

                    <div
                      role="button"
                      tabIndex={0}
                      //   onClick={handleClick}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          handleClick();
                        }
                      }}
                      style={{ cursor: "pointer" }}
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
                        style={{ display: "none" }}
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
          <button type="button" className="modalbackdrop">
            close
          </button>
        </form>
      </dialog>
    </>
  );
}

export default UpdateModal;
