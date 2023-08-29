import { useEffect, useState } from "react";
import DeveloperList from "../components/DeveloperList";
import FilterButton from "../components/navbar/FilterButton";
// import loading from '/SVG/loading.svg';
import loading from "../../public/SVG/loading.svg";
import Search from "../components/navbar/Search";

const filters = [
  {
    label: "Newest first",
    property: "#newest_first_dev",
  },
  {
    label: "open for work",
    property: "#open_to_work_dev",
  },
  {
    label: "Sort A-Z",
    property: "#sort_asc_dev",
  },
  {
    label: "Sort Z-A",
    property: "#sort_dsc_dev",
  },
];

function DevelopersListing() {
  const [developers, setDevelopers] = useState([]);
  const [searchInput, setSearchInput] = useState({ searchString: "" });

  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchDevelopers = async () => {
      const searchName = `?fname=${searchInput.searchString}`;
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/developers${searchName}`,
        { mode: "cors" },
      );
      const fetchedDevelopers = await response.json();
      setDevelopers(fetchedDevelopers.data);
      // console.log('fetch Developers------------', fetchedDevelopers.data);
      // console.log('fetch Developers------------', developers);
    };
    fetchDevelopers();
  }, [searchInput]);
  return (
    <div className="flex flex-col justify-center w-full">
      {/* ------------- Background Gradient ------------ */}
      <div className="gradient z-0" />

      {/* ------------- Headings ------------ */}

      <div className="gap-0 z-[1] mt-5">
        <h1 className=" text-gray-900 text-center text-3xl md:text-4xl font-semibold">
          Discover Best People to Hire!
        </h1>
        <h1 className=" blue-gradient text-center text-3xl md:text-4xl font-semibold">
          Developer reviews. Rates. Interviews.
        </h1>
      </div>
      <div className="flex justify-center my-6 relative mx-3">
        <div className="flex lg:w-3/5 flex-col justify-center w-full md:w-4/5 items-start border z-10 border-slate-300  bg-white/50 rounded-2xl py-5">
          <div className="flex mt-6 w-full justify-between border-b ">
            <h1 className="text-2xl text-start font-medium text-slate-800 px-5 my-2">
              List of Developers
            </h1>
            {/* <div className="tabs">
              <a className="tab tab-bordered tab-active ">Best Matches</a>
              <a className="tab">Saved Jobs</a>
            </div> */}

            {/* --------sort button--------- */}
            <FilterButton filters={filters} setDevelopers={setDevelopers} />

            {/* --------sort button END--------- */}
          </div>
          <div className="flex w-full px-4 py-2">
            <Search
              searchInput={searchInput}
              setSearchInput={setSearchInput}
              searchPlaceholder="Type first name to search.."
            />
          </div>
          {/* ---------------- Developer List--------------- */}
          {developers.length > 0 ? (
            <DeveloperList developersProp={developers} />
          ) : (
            <div className="flex w-full py-10 justify-center text-slate-500">
              <img alt="loader" src={loading} />
            </div>
          )}
          {!authToken && developers.length > 0 ? (
            <h1 className=" blue-gradient text-center text-3xl md:text-4xl font-semibold ml-5">
              Please login to see more...
            </h1>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default DevelopersListing;
