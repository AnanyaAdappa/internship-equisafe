import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function ProjectAdd() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    timeframe: "",
    techStack: "",
    board: "",
    project_type: "",
    required_personnel: "",
    open: false,
    proj_organization: localStorage.getItem("isOrg"),
  });
  // console.log("Form data ---- ", formData);

  const patchORG = (projId, projMessage) => {
    fetch(`${import.meta.env.VITE_API_URL}/organizations/${localStorage.getItem("orgUID")}`)
      .then((response) => response.json())
      .then((orgData) => {
        // update the org_projects array with newly added project to that organization :
        const existingProjects = orgData.data.org_projects ? orgData.data.org_projects.map((project) => project._id) : [];
        const updatedProjects = [...existingProjects, projId];

        fetch(`${import.meta.env.VITE_API_URL}/organizations/${localStorage.getItem("orgUID")}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            authorization: localStorage.getItem("authToken"),
          },
          body: JSON.stringify({ org_projects: updatedProjects }),
        })
          .then((response) => response.json())
          .then((data) => {
            // console.log("Done patching ----", data);
            // alert(`${projMessage} Also ${data.message}`);
            toast.success(`${projMessage} Also ${data.message}`, {
              position: toast.POSITION.TOP_CENTER, autoClose: 2000,
            });
            navigate("/");
          })
          .catch((error) => {
            console.log("Error updating organization : ", error);
          });
      });
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    const requiredFields = ['title', 'description'];
    // return those fields from formData which are empty.
    const emptyFields = requiredFields.filter((field) => !formData[field]);
    if (emptyFields.length > 0) {
      // map through each item and make a new array
      const emptyFieldNames = emptyFields.map((field) => field.charAt(0).toUpperCase() + field.slice(1));

      const errorMessage = `Please fill in the following required fields: ${emptyFieldNames.join(', ')}`;
      toast.error(`${errorMessage}`, {
        position: toast.POSITION.TOP_CENTER, autoClose: 10000,
      });
      // setShowModal(!showModal);
      return;
    }
    fetch(`${import.meta.env.VITE_API_URL}/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("authToken"),
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          // alerts_toast
          // alert(`${data.message}: ${data.error}`);
          toast.success(`${data.message}`, {
            position: toast.POSITION.TOP_CENTER, autoClose: 2000,
          });
        } else {
          patchORG(data.data._id, data.message);
          // alert(`${data.message}`);
        }
        // navigate("/");
      })
      .catch((error) => {
        console.log("Error posting the project : ", error);
      });
  };
  return (
    <div className="flex justify-center my-10 items-center h-screen">
      <div className="gradient z-0" />
      <div className="max-w-3xl z-10 w-full">
        <form
          className="bg-white/50 shadow-md px-8 pt-6 pb-8 mb-4 border z-10 border-slate-300 rounded-2xl py-5"
        >
          <h2
            className="text-gray-900 text-center text-2xl md:text-3xl mb-5 font-semibold"
          >
            Create Project
          </h2>
          {/* <div className="mb-4">
            <label
              htmlFor="project_name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Project Name
            </label>
            <input
              type="text"
              name="project_name"
              id="project_name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter project name"
            />
          </div> */}
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-gray-700 stext-sm font-bold mb-2"
            >
              Project Title*
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                id="title"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter Project title"
              />
            </label>
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Description*
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows="3"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter description"
              />
            </label>
          </div>
          <div className="mb-4">
            <label
              htmlFor="timeframe"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Timeframe
              <input
                type="text"
                name="timeframe"
                id="timeframe"
                value={formData.timeframe}
                onChange={(e) => setFormData({ ...formData, timeframe: e.target.value })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter timeframe like one week/two months/one year"
              />
            </label>
          </div>
          {/* <div className="mb-4">
            <label
              htmlFor="timeframe"
              className="block text-gray-700 text-sm font-bold mb-2 flex-left"
            >
              Project Thumbnail
            </label>
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:text-accent  hover:bg-accent/10 "
            >
              <div className="flex flex-col text-gray-500  hover:text-accent items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm  ">
                  <span className="font-semibold">Click to upload</span>
                  {' '}
                  or
                  drag and drop
                </p>
                <p className="text-xs  ">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
              />
            </label>
          </div> */}
          <div className="mb-4">
            <label
              htmlFor="techStack"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Project&apos;s Tech-stack
              <input
                type="text"
                name="techStack"
                id="techStack"
                value={formData.techStack}
                onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="MERN / MEAN / ROR...."
              />
            </label>
          </div>
          <div className="mb-4">
            <label
              htmlFor="board"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Project Board
              <select
                id="board"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={formData.board}
                onChange={(e) => setFormData({ ...formData, board: e.target.value })}
              >
                <option
                  disabled
                  defaultValue
                >
                  Pick the suitable board
                </option>
                <option value="Scrum">Scrum</option>
                <option value="Agile">Agile</option>
                <option value="Kanban">Kanban</option>
              </select>
            </label>
          </div>
          <div className="mb-4">
            <label
              htmlFor="project_type"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Project Type
              <input
                type="text"
                name="project_type"
                id="project_type"
                value={formData.project_type}
                onChange={(e) => setFormData({ ...formData, project_type: e.target.value })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="One-time/long-time"
              />
            </label>
          </div>
          <div className="mb-4">
            <label
              htmlFor="required_personnel"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Required Personnel
              <input
                type="text"
                name="required_personnel"
                id="required_personnel"
                value={formData.required_personnel}
                onChange={(e) => setFormData({ ...formData, required_personnel: e.target.value })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="UI/UX Engineer?"
              />
            </label>
          </div>
          <div className="mb-4">
            {/* innline-block display is necessary for that clicking outside the input doesnt change the selection. */}
            <div className="form-control inline-block">
              <label
                htmlFor="flexSwitchChecked"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Project Open to work ?
                <input
                  className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchChecked"
                  checked={formData.open}
                  onChange={(e) => setFormData({ ...formData, open: e.target.checked })}
                />
              </label>

            </div>
          </div>
          <div className="flex items-center justify-between glass">
            <button
              type="submit"
              className="w-full text-white bg-accent hover:bg-accent/75 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              onClick={(e) => handleSubmit(e)}
            >
              Add Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
