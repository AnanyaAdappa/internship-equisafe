import { BsFillBookmarkPlusFill } from "react-icons/bs";
import { BiSolidMap } from "react-icons/bi";
import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";

const DeveloperList = ({ developersProp = [] }) => {
  const authToken = localStorage.getItem("authToken");

  let limitedDevelopers;
  if (!authToken) {
    limitedDevelopers = developersProp.slice(0, 4);
  } else {
    limitedDevelopers = developersProp;
  }
  return limitedDevelopers.map((developer) => {
    const {
      fname,
      lname,

      profile_pic,
      uid,

      city,
    } = developer;
    return (
      <Link
        key={uid}
        to={`/developers/${uid}`}
        className="flex flex-col items-start gap-3 p-5 hover:bg-slate-100 cursor-pointer border-t w-full relative"
      >
        <div className="flex w-full gap-6 items-center relative">
          <BsFillBookmarkPlusFill className="absolute w-7 h-7  top-2 border-spacing-4 right-3 z-30 hover:text-accent" />
          <div className="flex items-center relative justify-center h-40 w-56 p-0 m-0">
            {/* -------Developer Pic-------- */}
            <img
              alt="profile"
              src={profile_pic}
              className="inline-block object-cover aspect-square h-full p-0 shadow shadow-accent rounded-full"
            />
          </div>
          <div className="flex flex-col w-full">
            {/* ------------ Developer Name------------- */}
            <h1 className="text-xl font-medium text-slate-900">
              {fname} {lname}
            </h1>

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
                {/* -----------TODO: Experience------------ */}
                <div>
                  <h3 className="flex listing-content-data gap-2 items-center">
                    {" "}
                    <BiSolidMap />
                    City
                  </h3>
                  <h4 className="listing-content-constant">{city}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ------------TODO:  Description ------------- */}
        <p className="description">{about}</p>
      </Link>
    );
  });
};

export default DeveloperList;
