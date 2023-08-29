/* eslint-disable camelcase */
import React from "react";
import { BsFillBookmarkPlusFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const ProjectList = ({ projectsProp = [] }) => {
  const authToken = localStorage.getItem("authToken");

  let limitedProjects;
  if (!authToken) {
    // const maxToShow = 4;
    limitedProjects = projectsProp.slice(0, 4);
  } else {
    limitedProjects = projectsProp;
  }

  return limitedProjects.map((projects, index) => {
    const {
      uid,
      title,
      description,
      timeframe,
      thumbnail,
      project_type,
      required_personnel,
    //   featured,
    //   board,
    //   techstack,
    //   fixed_price,
    } = projects;

    return (
    // giving key prop to react fragment is imp to avoid unique key warnings
      <React.Fragment key={index}>
        {/* ---------------- Project List--------------- */}
        <Link
          key={index}
          to={`/projects/${uid}`}
          className="flex flex-col items-start gap-3 p-5 hover:bg-slate-100 cursor-pointer border-t w-full relative"
        >
          <div className="flex flex-col lg:flex-row w-full gap-6 items-center relative">
            <BsFillBookmarkPlusFill className="text-white lg:text-accent absolute w-7 h-7 top-2 border-spacing-4 right-3 z-30 hover:text-accent/30 drop-shadow-xl drop-shadow-white" />
            <img
              src={thumbnail}
              className="flex place-content-start items-start w-full aspect-video  h-48 object-cover rounded-lg"
              alt={title}
            />
            <div className="flex flex-col w-full">
              {/* ------------ title------------- */}
              <h1 className="text-xl font-medium text-slate-900">{title}</h1>

              {/* ------------ timestamp ------------- */}
              <p className="text-sm text-slate-600">Posted by Google</p>
              <div className="flex my-5">
                <div className="flex flex-col w-1/2 items-start justify-start gap-3">
                  <div>
                    <h3 className="listing-content-data">{timeframe}</h3>
                    <h4 className="listing-content-constant">Duration</h4>
                  </div>
                  <div>
                    <h3 className="listing-content-data">
                      {required_personnel}
                    </h3>
                    <h4 className="listing-content-constant">Role</h4>
                  </div>
                </div>
                <div className="flex flex-col w-1/2 items-start justify-start gap-3">
                  <div>
                    <h3 className="listing-content-data">{project_type}</h3>
                    <h4 className="listing-content-constant">Project Type</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ------------ description ------------- */}
          <p className="listing-description">{description}</p>

          {/* -------------tech Stack---------------- */}
          <div className="flex border  bg-accent/5 shadow-sm p-2 text-sm px-2 py-1 rounded-xl">
            {uid}
          </div>
        </Link>
      </React.Fragment>
    );
  });
};

export default ProjectList;
