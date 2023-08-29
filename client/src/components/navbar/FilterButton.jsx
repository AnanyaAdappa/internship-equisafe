import { useContext, useState } from "react";
import { loadingContext } from "../context/LoadingState";

export default function FilterButton({
  filters,
  setProjects,
  setOrganizations,
  setDevelopers,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const progressState = useContext(loadingContext);
  const { setProgress } = progressState;

  const filterProjectsFunc = (filter) => {
    // console.log("Heloooo", filter.property);

    let queryParam;

    const filterProjects = async () => {
      // always start the loader with 0
      await setProgress(0);
      await setProgress(30);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/projects${queryParam}`,
        { mode: "cors" },
      );
      await setProgress(60);
      const filtered = await response.json();
      setProjects(filtered.data);
      await setProgress(100);
      // console.log('fetch filtered projects------------', filtered.data);
      // console.log('fetch Developers------------', developers);
    };

    const filterOrganizations = async () => {
      // always start the loader with 0
      await setProgress(0);
      await setProgress(30);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/organizations${queryParam}`,
        { mode: "cors" },
      );
      await setProgress(50);
      const filtered = await response.json();
      await setProgress(70);
      setOrganizations(filtered.data);
      await setProgress(100);
    };

    const filterDevelopers = async () => {
      // always start the loader with 0
      await setProgress(0);
      await setProgress(10);

      // console.log("got-", queryParam);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/developers${queryParam}`,
        { mode: "cors" },
      );
      await setProgress(50);
      const filtered = await response.json();
      await setProgress(70);
      setDevelopers(filtered.data);
      await setProgress(100);
    };

    if (filter.label === "featured") {
      queryParam = "?featured=true";
      filterProjects();
    } else if (filter.property === "newest_first_project") {
      queryParam = "?sort=-createdAt";
      filterProjects();
    } else if (filter.label === "Open to work") {
      queryParam = "?open=true";
      filterProjects();
    } else if (filter.property === "#proj_sort_asc") {
      queryParam = "?sort=title";
      filterProjects();
    } else if (filter.property === "#proj_sort_dsc") {
      queryParam = "?sort=-title";
      filterProjects();
    }

    if (filter.property === "#newest_first_dev") {
      queryParam = "?sort=createdAt";
      filterDevelopers();
    } else if (filter.property === "#open_to_work_dev") {
      queryParam = "?openToWork=true";
      filterDevelopers();
    } else if (filter.property === "#sort_asc_dev") {
      queryParam = "?sort=fname";
      filterDevelopers();
    } else if (filter.property === "#sort_dsc_dev") {
      queryParam = "?sort=-fname";
      filterDevelopers();
    }

    if (filter.property === "#newest_first_org") {
      queryParam = "?sort=-createdAt";
      filterOrganizations();
    } else if (filter.property === "#hiring") {
      queryParam = "?hiring=true";
      filterOrganizations();
    } else if (filter.property === "#sort_asc_org") {
      queryParam = "?sort=name";
      filterOrganizations();
    } else if (filter.property === "#sort_dsc_org") {
      queryParam = "?sort=-name";
      filterOrganizations();
    }

    setIsOpen(!isOpen);
  };
  return (
    <div className="flex items-center justify-end px-4">
      <div className="relative inline-block text-left">
        <button
          type="button"
          className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-accent"
          id="menu-button"
          aria-expanded="false"
          aria-haspopup="true"
          onClick={() => setIsOpen(!isOpen)}
        >
          Sort
          <svg
            className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {isOpen && (
          <div
            className={`absolute right-0 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 z-50 ring-black ring-opacity-5 focus:outline-none `}
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
          >
            {" "}
            <div className="py-1" role="none">
              {filters.map((filter, index) => (
                <a
                  onClick={() => filterProjectsFunc(filter)}
                  key={index}
                  href={filter.property}
                  className="font-medium capitalize hover:bg-slate-100 text-gray-900 block px-4 py-2 text-sm"
                >
                  {filter.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
