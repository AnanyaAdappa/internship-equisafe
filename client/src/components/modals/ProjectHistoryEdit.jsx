import React, { useContext, useEffect, useState } from 'react';
import { LuEdit } from 'react-icons/lu';
import { toast } from 'react-toastify';
import { loadingContext } from '../context/LoadingState';

function ProjectHistoryEdit({ fetchHistory, projectUID }) {
  const progressState = useContext(loadingContext);
  const { setProgress } = progressState;

  const [formData, setFormData] = useState({
    title: "",
    link: "",
    description: "",
    startDate: "",
    endDate: "",
    developer: localStorage.getItem("isDev"),
  });

  // modal
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

  const updateProject = async (uid) => {
    // always start the loader with 0
    await setProgress(0);
    await setProgress(10);
    try {
      await setProgress(20);
      fetch(`${import.meta.env.VITE_API_URL}/project-histories/${uid}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
          authorization: localStorage.getItem("authToken"),
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then(async (data) => {
          await setProgress(30);
          if (data.error) {
            await setProgress(100);
            return toast.success(`${data.message}`, {
              position: toast.POSITION.TOP_CENTER, autoClose: 10000,
            });
          }
          await setProgress(50);
          toast.success(`${data.message}`, {
            position: toast.POSITION.TOP_CENTER, autoClose: 2000,
          });
          await setProgress(80);
          // alert(data.message);
          fetchHistory();
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
  const handleSubmit = (uid) => {
    updateProject(uid);
    setShowModal(!showModal);
  };

  const fetchProject = async (uid) => {
    // always start the loader with 0
    await setProgress(0);
    await setProgress(20);
    fetch(`${import.meta.env.VITE_API_URL}/project-histories/${uid}`, {
      method: "GET",
      headers: {
        authorization: localStorage.getItem("authToken"),
      },
    })
      .then((response) => response.json())
      .then(async (data) => {
        await setProgress(50);
        setFormData({
          title: data.data.title,
          link: data.data.link,
          description: data.data.description,
          startDate: data.data.startDate,
          endDate: data.data.endDate,
        });
        await setProgress(100);
      });
  };

  const handleEdit = async (uid) => {
    await fetchProject(uid);
    await setShowModal(!showModal);
  };
  return (
    <>
      {/* Open the modal using ID.showModal() method */}
      <button
        type="button"
        onClick={() => handleEdit(projectUID)}
        className="text-2xl p-2 md:p-3 rounded-xl bg-accent/10 hover:bg-accent text-accent hover:text-white"
      >
        <LuEdit />
      </button>
      {showModal && (
        <div
          className="flex items-center justify-center flex-col inset-0 fixed bg-slate-800/10 z-[99] overscroll-x-contain"

        >
          <form
            // method="dialog"
            className="w-[90%] max-w-2xl z-[100] modal-box bg-white rounded-2xl py-10 px-2 md:p-10 relative"
          >
            <h1 className="flex items-center justify-center text-2xl font-semibold border-b pb-4 text-slate-800">
              Update Project
            </h1>
            <div className="w-full my-6 mr-0 ml-0 relative space-y-8 h-[60vh] overflow-y-scroll scroll-smooth z-10 scrollbar px-3">
              {/* ------Project title--------- */}
              <div className="relative w-ful pt-3">
                <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">
                  Project title
                </p>
                <input
                  minLength={1}
                  maxLength={50}
                  required
                  placeholder="Google"
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
                  placeholder="e.g example.com"
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
                  Description
                </p>
                <textarea
                  rows={4}
                  maxLength={350}
                  placeholder="e.g key responsibilities"
                  type="text"
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
                    Start Date
                  </p>
                  <input
                    placeholder="e.g example.com"
                    type="date"
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
                    End Date
                  </p>
                  <input
                    placeholder="e.g example.com"
                    type="date"
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
              onClick={() => handleSubmit(projectUID)}
              className="cursor-pointer inline-block  pt-4 pr-5 pb-4 pl-5 text-xl font-medium text-center
             text-white bg-indigo-500 rounded-lg duration-200 hover:bg-indigo-600 ease w-full"
            >
              Update
            </button>
          </form>
          {/* for background click closing */}
          <form method="dialog">
            <button
              type="button"
              className="modalbackdrop"
              onClick={() => setShowModal(!showModal)}
            >
              close
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default ProjectHistoryEdit;
