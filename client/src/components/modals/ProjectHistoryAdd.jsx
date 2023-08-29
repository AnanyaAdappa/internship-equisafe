import { useContext, useEffect, useState } from 'react';
import { MdOutlineLibraryAdd } from 'react-icons/md';
import { toast } from 'react-toastify';
import { loadingContext } from '../context/LoadingState';

function ProjectHistoryAdd({ fetchHistory }) {
  const progressState = useContext(loadingContext);
  const { setProgress } = progressState;

  const devID = localStorage.getItem("isDev");
  const [formData, setFormData] = useState({
    title: "",
    link: "",
    description: "",
    startDate: "",
    endDate: "",
    developer: devID,
  });
  // console.log("FromData : ", formData);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.keyCode === 27) { // Escape key
        setShowModal(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const postProject = async () => {
    // always start the loader with 0
    await setProgress(0);
    await setProgress(10);
    try {
      await setProgress(20);
      fetch(`${import.meta.env.VITE_API_URL}/project-histories`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          authorization: localStorage.getItem("authToken"),
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then(async (data) => {
          await setProgress(40);
          if (data.error) {
            // alerts_toast
            await setProgress(100);
            return toast.error(`${data.message} - ${data.error}`, {
              position: toast.POSITION.TOP_CENTER, autoClose: 10000,
            });
          // alert(`${data.message} : ${data.error}`);
          }
          fetchHistory();
          await setProgress(60);
          toast.success(`${data.message}`, {
            position: toast.POSITION.TOP_CENTER, autoClose: 2000,
          });
          await setProgress(80);
          // setFormData({
          //   title: "",
          //   link: "",
          //   description: "",
          //   startDate: "",
          //   endDate: "",
          // });
          await setProgress(100);
          return 0;
        })
        .catch((error) => {
          setProgress(100);
          toast.error(`${error}`, {
            position: toast.POSITION.TOP_CENTER, autoClose: 2000,
          });
        });
    } catch (error) {
      setProgress(100);
      toast.error(`${error}`, {
        position: toast.POSITION.TOP_CENTER, autoClose: 2000,
      });
    }
  };

  // const handleModalClose = () => {
  //   const modal = document.getElementById("my_modal_2");
  //   if (modal) {
  //     modal.close();
  //   }
  // };

  const handleSubmit = () => {
    const requiredFields = ['title', 'description', 'startDate', 'endDate'];

    // return those fields from formData which are empty.
    const emptyFields = requiredFields.filter((field) => !formData[field]);

    if (emptyFields.length > 0) {
      // map through each item and make a new array
      const emptyFieldNames = emptyFields.map((field) => field.charAt(0).toUpperCase() + field.slice(1));

      const errorMessage = `Please fill in the following required fields: ${emptyFieldNames.join(', ')}`;
      // alert(errorMessage);
      // setShowModal(!showModal);
      toast.error(`${errorMessage}`, {
        position: toast.POSITION.TOP_CENTER, autoClose: 10000,
      });

      return;
    }

    postProject();
    setShowModal(!showModal);

    // handleModalClose();
  };
  return (
    <>
      {/* Open the modal using ID.showModal() method */}
      <button
        type="button"
        onClick={() => setShowModal(!showModal)}
        className="absolute right-6 top-8 md:top-5 p-3 text-2xl text-accent hover:bg-accent hover:text-white rounded-xl "
      >
        <MdOutlineLibraryAdd />
      </button>
      {showModal && (
        <div
          className="flex items-center justify-center flex-col inset-0 fixed bg-slate-800/10 z-[99] overscroll-x-contain"

        >
          <form
            className="w-[90%] max-w-2xl z-[100] modal-box bg-white rounded-2xl py-10 px-2 md:p-10 relative"
          >
            <h1 className="flex items-center justify-center w-full text-2xl font-semibold border-b pb-4 text-slate-800">
              Add your Project in History
            </h1>
            <div className="w-full my-6 mr-0 ml-0 relative space-y-8 h-[60vh] overflow-y-scroll scroll-smooth z-10 scrollbar px-3">
              {/* ------Project title--------- */}
              <div className="relative w-full pt-3">
                <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">
                  Project title*
                </p>
                <input
                  minLength={1}
                  maxLength={50}
                  required
                  placeholder="E-commerce platform"
                  type="text"
                  value={formData.title}
                  onChange={(event) => setFormData({ ...formData, title: event.target.value })}
                  className="border placeholder-gray-400 focus:outline-none focus:border-accent w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md"
                />
              </div>
              {/* ------Project Link--------- */}
              <div className="relative">
                <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">
                  Demo link
                </p>
                <input
                  placeholder="https://www.example.com"
                  type="text"
                  value={formData.link}
                  onChange={(event) => setFormData({ ...formData, link: event.target.value })}
                  className="border lowercase placeholder-gray-400 focus:outline-none
                  focus:border-accent w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
                  border-gray-300 rounded-md"
                />
              </div>
              {/* ------Project description--------- */}
              <div className="relative">
                <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">
                  Description*
                </p>
                <textarea
                  rows={4}
                  maxLength={350}
                  placeholder="Describe your project in short"
                  type="text"
                  required
                  value={formData.description}
                  onChange={(event) => setFormData({ ...formData, description: event.target.value })}
                  className="border placeholder-gray-400 focus:outline-none
                  focus:border-accent w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
                  border-gray-300 rounded-md"
                />
              </div>
              {/* ------------date---------- */}
              <div className="flex w-full items-center justify-between relative z-[100]">
                <div className="relative w-[49%]">
                  <p className="bg-white pt-0  pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">
                    Start Date*
                  </p>
                  <input
                    placeholder="e.g example.com"
                    type="date"
                    required
                    value={formData.startDate}
                    onChange={(event) => setFormData({ ...formData, startDate: event.target.value })}
                    className="border lowercase placeholder-gray-400 focus:outline-none
                  focus:border-accent w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
                  border-gray-300 rounded-md"
                  />
                </div>
                {' '}
                <div className="relative w-[49%]">
                  <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">
                    End Date*
                  </p>
                  <input
                    placeholder="e.g example.com"
                    type="date"
                    required
                    value={formData.endDate}
                    onChange={(event) => setFormData({ ...formData, endDate: event.target.value })}
                    className="border lowercase placeholder-gray-400 focus:outline-none
                  focus:border-accent w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
                  border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={(e) => handleSubmit(e)}
              className="cursor-pointer inline-block  pt-4 pr-5 pb-4 pl-5 text-xl font-medium text-center
             text-white bg-indigo-500 rounded-lg duration-200 hover:bg-indigo-600 ease w-full"
            >
              Add
            </button>
          </form>
          <form method="dialog">
            <button
              onClick={() => setShowModal(!showModal)}
              type="button"
              className="modalbackdrop border-transparent"
            >
              close
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default ProjectHistoryAdd;
