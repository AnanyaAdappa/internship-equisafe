import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { VscOrganization } from "react-icons/vsc";

export default function ProjectAdd() {
  const [image, setImage] = useState(null);
  const hiddenFileInput = useRef(null);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    photo: null,

    open: false,
    proj_organization: localStorage.getItem("isOrg"),
  });

  const patchORG = (projId, projMessage) => {
    fetch(
      `${import.meta.env.VITE_API_URL}/organizations/${localStorage.getItem(
        "orgUID"
      )}`
    )
      .then((response) => response.json())
      .then((orgData) => {
        // update the org_projects array with newly added project to that organization :
        const existingProjects = orgData.data.org_projects
          ? orgData.data.org_projects.map((project) => project._id)
          : [];
        const updatedProjects = [...existingProjects, projId];

        fetch(
          `${import.meta.env.VITE_API_URL}/organizations/${localStorage.getItem(
            "orgUID"
          )}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              authorization: localStorage.getItem("authToken"),
            },
            body: JSON.stringify({ org_projects: updatedProjects }),
          }
        )
          .then((response) => response.json())
          .then((data) => {
            toast.success(`${projMessage} Also ${data.message}`, {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 2000,
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

    const requiredFields = ["title", "description"];

    const emptyFields = requiredFields.filter((field) => !formData[field]);
    if (emptyFields.length > 0) {
      const emptyFieldNames = emptyFields.map(
        (field) => field.charAt(0).toUpperCase() + field.slice(1)
      );

      const errorMessage = `Please fill in the following required fields: ${emptyFieldNames.join(
        ", "
      )}`;
      toast.error(`${errorMessage}`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 10000,
      });

      return;
    }

    const bodyData = new FormData();

    if (formData.title) {
      bodyData.append("title", formData.title);
    }
    if (formData.description) {
      bodyData.append("description", formData.description);
    }
    if (formData.photo) {
      bodyData.append("photo", formData.photo);
    }

    fetch(`${import.meta.env.VITE_API_URL}/projects`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
      body: bodyData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          toast.success(`${data.message}`, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });
        } else {
          patchORG(data.data._id, data.message);
        }
        // navigate("/");
      })
      .catch((error) => {
        console.log("Error posting the project : ", error);
      });
  };

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
    <div className="flex justify-center my-10 items-center h-screen">
      <div className="gradient z-0" />
      <div className="max-w-3xl z-10 w-full">
        <form className="bg-white/50 shadow-md px-8 pt-6 pb-8 mb-4 border z-10 border-slate-300 rounded-2xl py-5 ">
          <h2 className="text-gray-900 text-center text-2xl md:text-3xl mb-5 font-semibold">
            Create Policy
          </h2>

          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-gray-700 stext-sm font-bold mb-2"
            >
              Policy Type*
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
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
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows="3"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter description"
              />
            </label>
          </div>

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

          <div className="flex items-center justify-between glass">
            <button
              type="submit"
              className="w-full text-white bg-accent hover:bg-accent/75 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              onClick={(e) => handleSubmit(e)}
            >
              Add Policy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
