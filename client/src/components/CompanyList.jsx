import { BsFillBookmarkPlusFill } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import React from "react";

const CompanyList = ({ organizationsProp = [] }) => {
  const authToken = localStorage.getItem("authToken");

  let limitedOrganizations;
  if (!authToken) {
    limitedOrganizations = organizationsProp.slice(0, 4);
  } else {
    limitedOrganizations = organizationsProp;
  }

  return limitedOrganizations.map((organization) => {
    const {
      // eslint-disable-next-line camelcase
      uid,
      name,
      about,
      website,
      banner_img,
    } = organization;
    return (
      <React.Fragment key={uid}>
        {/* ---------------- Project List--------------- */}
        <Link
          to={`/companies/${uid}`}
          className="flex flex-col items-start gap-3 p-5 hover:bg-slate-100 cursor-pointer border-t w-full relative"
        >
          <div className="flex  flex-col lg:flex-row w-full gap-6 items-center relative">
            <BsFillBookmarkPlusFill className="absolute w-7 h-7 top-2 border-spacing-4 right-3 z-30 hover:text-accent" />
            <img
              // eslint-disable-next-line camelcase
              src={banner_img}
              className="aspect-video md:w4 h-40 object-cover rounded-lg"
              alt=""
            />
            <div className="flex flex-col w-full">
              {/* ------------ Company Name------------- */}
              <h1 className="text-xl font-medium text-slate-900">{name}</h1>

              {/* ------------ Rating ------------- */}
              <div className="rating mt-2 md:rating-sm rating-xs">
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
              </div>
              <div className="flex my-5">
                <div className="flex flex-col w-1/2 items-start justify-start gap-3">
                  <div>
                    <h3 className="listing-content-data">Website</h3>
                    <button
                      onClick={() => window.location.assign(website)}
                      type="button"
                      className="link link-hover company-website"
                    >
                      {website}
                    </button>
                  </div>
                </div>
                <div className="flex flex-col w-1/2 items-start justify-start gap-3">
                  {/* ---------TODO: Founded in ---------------*/}
                </div>
              </div>
            </div>
          </div>

          {/* ------------ Description ------------- */}
          <p className="Company-description">{about}</p>

          <div className="flex border  bg-accent/5 shadow-sm p-2 text-sm px-2 py-1 rounded-xl">
            {uid}
          </div>
        </Link>
      </React.Fragment>
    );
  });
};

export default CompanyList;
