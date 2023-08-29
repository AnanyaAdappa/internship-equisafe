import { useContext, useEffect, useState } from "react";
import { RiArrowRightSLine } from "react-icons/ri";
import { toast } from 'react-toastify';
import ProjectList from "../components/ProjectList";
import FilterButton from "../components/navbar/FilterButton";
// import loading from "../../../../../../../../SVG/loading.svg";
import loading from "../../public/SVG/loading.svg";
import Search from "../components/navbar/Search";
import { loadingContext } from "../components/context/LoadingState";

const filters = [
  {
    label: "featured",
    property: "#featured",
  },
  {
    label: "Newest first",
    property: "#newest_first_project",
  },
  {
    label: "Sort A-Z",
    property: "#proj_sort_asc",
  },
  {
    label: "Sort Z-A",
    property: "#proj_sort_dsc",
  },
  {
    label: "Open to work",
    property: "#open_for_development",
  },
];

function ProjectListings() {
  // const [isOpen, setIsOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [searchInput, setSearchInput] = useState({ searchString: "" });
  const [saveBtnState, SetsaveBtnState] = useState(false);
  const [bestMatchesBtnState, setBestMatchesBtnState] = useState(true);
  const authToken = localStorage.getItem("authToken");

  const progressState = useContext(loadingContext);
  const { setProgress } = progressState;

  const fetchProjects = async () => {
    const searchTitle = `?title=${searchInput.searchString}`;
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/projects${searchTitle}`,
      { mode: "cors" },
    );
    const fetchedProjects = await response.json();
    setProjects(fetchedProjects.data);
    return fetchedProjects.message;
  };
  useEffect(() => {
    if (!localStorage.getItem("isDev")) {
      SetsaveBtnState(false);
    }
    fetchProjects();
  }, [searchInput]);

  const orgToken = localStorage.getItem("isOrg");

  const fetchSavedProjects = async () => {
    // always start the loader with 0
    await setProgress(0);
    await setProgress(10);

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/projects?bookmark=${localStorage.getItem("isDev")}`,
      { mode: "cors" },
    );
    await setProgress(30);
    const fetchedProjects = await response.json();
    setProjects(fetchedProjects.data);
    await setProgress(50);
    // alert(`${fetchedProjects.message}`);
    toast.success(`${fetchedProjects.message}`, {
      position: toast.POSITION.TOP_CENTER, autoClose: 2000,
    });
    await setProgress(1000);
  };
  const handleBestMatches = async () => {
    // always start the loader with 0
    await setProgress(0);
    await setProgress(10);

    // using async-await is imp here as fetchProjects returns a Promise so need to handle it untill it is resolved by the fetchProjects() method.
    const message = await fetchProjects();

    await setProgress(30);
    toast.success(`${message}`, {
      position: toast.POSITION.TOP_CENTER, autoClose: 2000,
    });
    await setProgress(50);
    SetsaveBtnState(false);
    setBestMatchesBtnState(true);
    await setProgress(100);
  };
  const handleSaved = async () => {
    await fetchSavedProjects();
    SetsaveBtnState(true);
    setBestMatchesBtnState(false);
  };
  return (
    <div className="flex flex-col justify-center w-full">
      {/* ------------- Background Gradient ------------ */}
      <div className="gradient z-0" />

      {/* ------------- Headings ------------ */}

      <div className="gap-0 z-[1] mt-5">
        <h1 className=" text-gray-900 text-center text-3xl md:text-4xl font-semibold">
          Find your dream projects
        </h1>
        <h1 className=" blue-gradient text-center text-3xl md:text-4xl  font-semibold">
          Complete Trust & Freedom
        </h1>

        {/* ----------------Show Only for Organizations------------ */}
        {orgToken && (
          <div className="flex my-8 items-center justify-center gap-10 z-[1]">
            <div className="flex justify-between  items-center cursor-pointer bg-accent hover:bg-accent/50 rounded-lg text-white font-semibold text-center">
              <a
                href="/projects/create"
                className="flex p-3 md:p-4 items-center justify-center"
              >
                Add Project
                <RiArrowRightSLine className="ml-2 text-md" />
              </a>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-center my-6 relative mx-3">
        <div className="flex lg:w-3/5 flex-col justify-center w-full md:w-4/5 items-start border z-10 border-slate-300  bg-white/50 rounded-2xl py-5">
          <h1 className="text-2xl text-start font-medium text-slate-800 px-5">
            Projects open for development
          </h1>
          <div className="flex mt-6 w-full justify-between border-b ">
            <div className="tabs gap-4 pl-6">
              <button type="button" className={`tab ${bestMatchesBtnState ? "tab-bordered tab-active" : ""}`} onClick={handleBestMatches}>
                Best Matches
              </button>
              {localStorage.getItem("isDev") ? (
                <button type="button" className={`tab ${saveBtnState ? "tab-bordered tab-active" : ""}`} onClick={handleSaved}>
                  Saved Jobs
                </button>
              ) : null}
            </div>

            {/* --------sort button--------- */}
            <FilterButton
              filters={filters}
              projects={projects}
              setProjects={setProjects}
            />

            {/* --------sort button END--------- */}
          </div>

          <p className="mx-5 my-2 text-base">
            Browse projects that match your experience to a client&apos;s hiring
            preferences. Ordered by most relevant.
          </p>
          <div className="flex w-full px-4 py-2">
            <Search
              searchInput={searchInput}
              setSearchInput={setSearchInput}
              searchPlaceholder="Type project title to search.."
            />
            {/* <Search /> */}
          </div>

          {projects.length > 0 ? (
            <ProjectList projectsProp={projects} />
          ) : (
            <div className="flex w-full py-10 justify-center text-slate-500">
              <img alt="loader" src={loading} />
            </div>
          )}
          {!authToken && projects.length > 0 ? (
            <h1 className=" blue-gradient text-center text-3xl md:text-4xl font-semibold ml-5">
              Please login to see more...
            </h1>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default ProjectListings;
