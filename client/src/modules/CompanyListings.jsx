import { useEffect, useState } from "react";
import CompanyList from "../components/CompanyList";
import FilterButton from "../components/navbar/FilterButton";
// import loading from "../../../../../../../../SVG/loading.svg";
import loading from "../../public/SVG/loading.svg";
import Search from "../components/navbar/Search";

const filters = [
  {
    label: "Newest first",
    property: "#newest_first_org",
  },
  {
    label: "Sort A-Z",
    property: "#sort_asc_org",
  },
  {
    label: "Sort Z-A",
    property: "#sort_dsc_org",
  },
];

function CompanyListings() {
  const [organizations, setOrganizations] = useState([]);
  const [searchInput, setSearchInput] = useState({ searchString: "" });
  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchOrganizations = async () => {
      const searchName = `?name=${searchInput.searchString}`;
      // console.log("------", searchName);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/organizations${searchName}`,
        { mode: "cors" },
      );
      const fetchedOrganizations = await response.json();
      setOrganizations(fetchedOrganizations.data);
      // console.log('fetch Organizations------------', fetchedOrganizations.data);
    };
    fetchOrganizations();
  }, [searchInput]);
  return (
    <div className="flex flex-col justify-center w-full">
      {/* ------------- Background Gradient ------------ */}
      <div className="gradient z-0" />

      {/* ------------- Headings ------------ */}

      <div className="gap-0 z-[1] mt-5">
        <h1 className=" text-gray-900 text-center text-3xl md:text-4xl font-semibold">
          Discover Best Places to Work!
        </h1>
        <h1 className=" blue-gradient text-center text-3xl md:text-4xl font-semibold">
          Company reviews. Salaries. Interviews. Jobs.
        </h1>
      </div>

      {/* ------------- Search Bar ------------*/}
      {/* <div className="flex justify-center mt-4 py-0 relative mx-3">
        <form className="flex lg:w-3/5 flex-col justify-center w-full md:w-4/5">
          <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Companies..."
              required
            />
            <button
              type="submit"
              className="text-white absolute right-2.5 bottom-2.5 bg-accent hover:bg-slate-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>
      </div> */}

      <div className="flex justify-center my-6 relative mx-3">
        <div className="flex lg:w-3/5 flex-col justify-center w-full md:w-4/5 items-start border z-10 border-slate-300  bg-white/50 rounded-2xl py-5">
          <div className="flex mt-6 w-full justify-between border-b ">
            <h1 className="text-2xl text-start font-medium text-slate-800 px-5 my-2">
              List of Companies
            </h1>
            {/* <div className="tabs">
              <a className="tab tab-bordered tab-active ">Best Matches</a>
              <a className="tab">Saved Jobs</a>
            </div> */}

            {/* --------sort button--------- */}
            <FilterButton
              filters={filters}
              organizations={organizations}
              setOrganizations={setOrganizations}
            />

            {/* --------sort button END--------- */}
          </div>
          <div className="flex w-full px-4 py-2">
            <Search
              searchInput={searchInput}
              setSearchInput={setSearchInput}
              searchPlaceholder="Type company name to search.."
            />
          </div>
          {organizations.length > 0 ? (
            <CompanyList organizationsProp={organizations} />
          ) : (
            <div className="flex w-full py-10 justify-center text-slate-500">
              <img alt="loader" src={loading} />
            </div>
          )}
          {!authToken && organizations.length > 0 ? (
            <h1 className=" blue-gradient text-center text-3xl md:text-4xl font-semibold ml-5">
              Please login to see more...
            </h1>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default CompanyListings;
