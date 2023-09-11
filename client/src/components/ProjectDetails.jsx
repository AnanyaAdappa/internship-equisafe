import { Link, useParams } from "react-router-dom";
import { BiSolidMap } from "react-icons/bi";
import { FaCircleDollarToSlot } from "react-icons/fa6";
import { toast } from "react-toastify";
import { useContext, useEffect, useState } from "react";
import Container from "./Container";
import Members from "./Members";
import loading from "../../public/SVG/loading.svg";
import { loadingContext } from "./context/LoadingState";

function ProjectDetails() {
  const { uid } = useParams();
  console.log(uid, "uid");
  const [project, setProject] = useState([]);
  const [proposalsCount, setProposalsCount] = useState(-1);
  const [proposed, setProposed] = useState(false);
  const [bookmarkState, setBookmarkState] = useState("Save");
  const dev = localStorage.getItem("isDev");
  const progressState = useContext(loadingContext);
  const { setProgress } = progressState;
  console.log(project, "project inside projectdetailsd");
  const fetchProposal = async (id) => {

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/proposals?project=${id}&count=1`,
      {
        mode: "cors",
        headers: {
          authorization: localStorage.getItem("authToken"),
        },
      }
    );
    const fetchedProject = await response.json();
    if (fetchedProject.data > 0) {
      setProposalsCount(fetchedProject.data);
    } else {
      setProposalsCount(0);
    }
   
  };
  const fetchProposalHistory = async (id) => {
    
    const response = await fetch(
      `${
        import.meta.env.VITE_API_URL
      }/proposals?project=${id}&developer=${localStorage.getItem("isDev")}`,
      {
        mode: "cors",
        headers: {
          authorization: localStorage.getItem("authToken"),
        },
      }
    );
    const fetchedProject = await response.json();
    
    if (fetchedProject.length === 1) {
      setProposed(true);
    }
   
  };

  const fetchProject = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/projects/${uid}`,
      { mode: "cors" }
    );
    const fetchedProject = await response.json();
    setProject(fetchedProject.data);

    if (
      fetchedProject.data.bookmark?.find(
        (id) => id === localStorage.getItem("isDev")
      )
    ) {
      setBookmarkState("Unsave");
    } else {
      setBookmarkState("Save");
    }
    if (localStorage.getItem("authToken")) {
      fetchProposal(fetchedProject.data._id);
      fetchProposalHistory(fetchedProject.data._id);
    }
  };
  useEffect(() => {
    fetchProject();
  }, [proposalsCount, proposed]);

  const devId = localStorage.getItem("isDev");
  const proposeProject = async (projectId, OrgId) => {
    // always start the loader with 0
    await setProgress(0);
    await setProgress(10);

    const proposalData = {
      project: projectId,
      developer: devId,
      organization: OrgId,
    };
    await setProgress(30);
    fetch(`${import.meta.env.VITE_API_URL}/proposals`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("authToken"),
      },
      body: JSON.stringify(proposalData),
    })
      .then((response) => response.json())
      .then(async (data) => {
        // navigate("/");
        await setProgress(50);
        toast.success(`${data.message}`, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
        await setProgress(70);
        fetchProposalHistory(projectId);
        // window.location.reload();
        await setProgress(100);
      })
      .catch((error) => {
        setProgress(100);
        toast.error(`${error}`, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
      });
  };

  const clickApply = (id, projOrg) => {
    proposeProject(id, projOrg._id);
  };

  const patchProject = async (code) => {
    // always start the loader with 0
    await setProgress(0);
    await setProgress(10);

    const devID = localStorage.getItem("isDev");
    let formData;
    // if the project document from databased doesn't have the bookmark key.
    if (!project.bookmark) {
      // Initialize bookmark as an empty array if undefined
      project.bookmark = [];
    }
    if (code === "Unsave") {
      // removing the current dev from bookmark array
      formData = {
        bookmark: project.bookmark.filter((doc) => doc !== devID),
      };
    } else if (code === "Save") {
      formData = {
        bookmark: [...project.bookmark, devID],
      };
    }
   
    await setProgress(20);

    fetch(`${import.meta.env.VITE_API_URL}/projects/${project.uid}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("authToken"),
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then(async (data) => {
        await setProgress(50);
      
        fetchProject(); // to update the save btn state
        await setProgress(70);
        toast.success(`${data.message}`, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
        await setProgress(100);
        // window.location.reload();
      })
      .catch((error) => {
        setProgress(100);
        toast.error(`${error}`, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
      });
  };
  const handleSave = (code) => {
   
    // setBookmarkState("Unsave");
    
    patchProject(code);
  };

  if (!Object.keys(project).length > 0) {
    return (
      <div className="flex w-full py-10 justify-center text-slate-500">
        <img alt="loader" src={loading} />
      </div>
    );
  }

  return (
    <div className="flex flex-col max-w-screen-sm md:max-w-none lg:max-w-none items-center justify-center mx-3 relative bg-sky-50">
      <Container>
        <div className="flex w-full items-center justify-start flex-col md:flex-row relative">
          <div className="flex w-full items-center justify-center md:items-start md:justify-start px-5 md:w-auto ">
            <img
              alt="project"
              src={project?.thumbnail}
              className="aspect-video  mb-2 w-full  md:h-44 max  object-cover rounded-lg"
            />
          </div>
          {/* Heading */}
          <div className="flex flex-col w-full md:w-auto justify-start items-start  md:ml-0">
            <h1 className="text-2xl px-6 text-start font-medium text-slate-800 mb-6 ">
              {project?.title}
            </h1>
            
            {/* Timestamp */}
            <p className="text-sm px-6 text-slate-600">
              Posted on {project?.createdAt}
            </p>
            <div className="flex px-6 flex-col my-5 gap-2">
              {/* City */}
              <p className="text-base flex items-center gap-2 text-slate-800">
                <BiSolidMap className="text-accent" /> Worldwide
              </p>
             
            </div>
          </div>
        </div>

        <div className="flex w-full border-t py-3">
          {/* description */}
          <h1 className="description px-6">{project?.description}</h1>
        </div>
       
      </Container>
      {/* Apply Button */}
      {dev && (
        <div className="flex md:relative 2xl:absolute 2xl:w-96 md:w-4/5 2xl:bg-transparent 2xl:-top-[79%] 2xl:right-[21%] fixed bottom-0 bg-white gap-2 w-full border-t md:border-0 md:bottom-4 border-slate-300 py-2 items-center justify-center z-10 px-3">
         
          <div className="flex items-center justify-center w-1/2">
            {" "}
            <button
              type="button"
              className="flex bg-white px-4 py-2 w-full items-center justify-center text-accent hover:bg-accent hover:text-white font-medium border border-accent rounded-full"
              onClick={() => handleSave(bookmarkState)}
            >
              {/* {project.bookmark.find((id) => id === localStorage.getItem("isDev")) ? "Unsave" : "Save"} */}
              {bookmarkState}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectDetails;
