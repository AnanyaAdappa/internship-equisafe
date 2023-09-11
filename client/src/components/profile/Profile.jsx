import { useContext, useEffect, useRef, useState } from "react";
import { BiSolidMap } from "react-icons/bi";
import { MdReviews } from "react-icons/md";
import { FaEnvelope, FaPhone } from "react-icons/fa";
import {
  BsGithub,
  BsLinkedin,
  BsGlobe,
  BsFillCalendarEventFill,
} from "react-icons/bs";
import { IoTrashBinOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import UpdateModal from "./UpdateModal";
import CompanyDetails from "../CompanyDetails";
import CompanyUpdateModal from "./CompanyUpdateModal";
import ConfirmationDialog from "../modals/ConfirmationDialog";
import ProjectHistoryAdd from "../modals/ProjectHistoryAdd";
import ProjectHistoryEdit from "../modals/ProjectHistoryEdit";
import ReviewVaul from "../modals/ReviewVaul";
import loading from "../../../public/SVG/loading.svg";
import { loadingContext } from "../context/LoadingState";

export default function Profile() {
  const [developer, setDeveloper] = useState([]);
  const [organization, setOrganization] = useState([]);
  const [proposals, setProposals] = useState([]);
  const [projectHistory, setProjectHistory] = useState([]);
  const [deleteBtn, setDeleteBtn] = useState(false);
  const [reviewVaulOpen, setReviewVaulOpen] = useState(false);

  // need this state variable to keep track of the uid got from edit and delete button click
  const [selectedUID, setSelectedUID] = useState([]);

  const progressState = useContext(loadingContext);
  const { setProgress } = progressState;

  // --------------!Can avoid this useRef part as it is was later on not needed.
  // using useRef hook create a reference to the developer state variable and access its updated value immediately after it is updated by setDeveloper.
  // useRef allows you to store a mutable value that persists across renders without causing a re-render when the value changes.
  const developerRef = useRef(developer);
  const proposalsRef = useRef(proposals);

  useEffect(() => {
    developerRef.current = developer;
    proposalsRef.current = proposals;
  }, [developer, proposals]);

  const fetchProposals = async () => {
    // The developerRef.current will always have the most recent value of developer without triggering a re-render.
    const url = `?developer=${localStorage.getItem("isDev")}`;
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/proposals${url}`,
      {
        mode: "cors",
        headers: { authorization: localStorage.getItem("authToken") },
      }
    );
    const fetched = await response.json();
    setProposals(fetched.data);
  };

  // fetching profile based on current logged in user type i.e. developer or organization
  const fetchProfile = async () => {
    await setProgress(0);
    await setProgress(30);
    let id;
    let url;
    if (localStorage.getItem("isDev")) {
      id = localStorage.getItem("isDev");
      url = `developers?_id=${id}`;
    } else if (localStorage.getItem("isOrg")) {
      id = localStorage.getItem("isOrg");
      url = `organizations?_id=${id}`;
    }

    const response = await fetch(`${import.meta.env.VITE_API_URL}/${url}`, {
      mode: "cors",
    });
    await setProgress(40);
    const fetched = await response.json();
    if (localStorage.getItem("isDev")) {
      await setDeveloper(fetched.data[0]);
      await setProgress(60);
      // proposals needs to have authentication token for GET request
      // therefore fetch proposals only after setting authToken
      fetchProposals();
      await setProgress(100);
    } else if (localStorage.getItem("isOrg")) {
      await setProgress(60);
      // CompanyDetails component handles fetching proposals for itself with a differend query paramter so no need to do here.
      setOrganization(fetched.data[0]);
      await setProgress(100);
    }
  };

  const fetchHistory = async () => {
    const response = await fetch(
      `${
        import.meta.env.VITE_API_URL
      }/project-histories?developer=${localStorage.getItem("isDev")}`,
      { mode: "cors" }
    );
    const fetched = await response.json();
    await setProjectHistory(fetched.data);
  };

  useEffect(() => {
    fetchProfile();

    // fetch history only for developer.
    if (localStorage.getItem("isDev")) {
      fetchHistory();
    }
  }, []);

  const deleteProposal = (uid) => {
    setDeleteBtn(!deleteBtn);
    setSelectedUID(uid);
  };

  // Callback function to be passed to the ConfirmationDialog
  const handleDeleteSuccess = async () => {
    // Fetch the updated proposals and history from the server
    await fetchProposals();
    await fetchHistory();
    await setProgress(100);
  };

  // dynamix text for proposals status
  const getStatusText = (proposal) => {
    if (proposal.pending) {
      return "Pending";
    }
    if (proposal.accepted) {
      return "Accepted";
    }
    return "Rejected";
  };

  const deleteProject = (uid) => {
    setDeleteBtn(!deleteBtn); // toggle dialogue
    setSelectedUID(uid); // set uid for the confirmationDialogue component.
  };

  const skills = developer?.skills;
  if (
    !Object.keys(developer).length > 0 &&
    !Object.keys(organization).length > 0
  ) {
    return (
      <div className="flex w-full py-10 justify-center text-slate-500">
        <img alt="loader" src={loading} />
      </div>
    );
  }
  if (localStorage.getItem("isDev")) {
    return (
      <div className="flex flex-col max-w-screen-sm md:max-w-none lg:max-w-none items-center justify-center mx-3 bg-sky-100">
        <div
          className="flex w-full lg:w-3/5 md:w-4/5 flex-col justify-center
            items-center border z-10 relative
           border-slate-300  bg-white/50 rounded-2xl my-6 mb-10"
        >
          <div className="flex justify-start lg:items-center w-full mt-6 items-start  place-content-start md:gap-[5%] border-b border-slate-300 px-5 py-7 relative">
            <div className="flex items-center relative justify-center h-24 lg:h-80 p-0 m-0">
              <img
                alt="profile"
                src={developer?.profile_pic}
                className="inline-block object-cover aspect-square  h-full p-0 shadow shadow-accent rounded-full"
              />
            </div>
            <UpdateModal
              developer={developer}
              setDeveloper={setDeveloper}
              fetchProfile={fetchProfile}
            />

            <div className="flex flex-col justify-between lg:pb-16 h-full  gap-3">
              {/* --------Developer Name------------------- */}
              <h1 className="text-3xl lg:text-5xl font-medium text-slate-900 capitalize">
                {developer?.fname} {developer?.lname}
              </h1>
              <div className="flex place-content-start items-center w-full text-slate-600 gap-1">
                <BiSolidMap />
                {/* ------------------------ Developer City-------------------------- */}
                <p>{developer?.city}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col-reverse md:flex-row justify-start w-full items-start place-content-start">
            {/* ----------Col-1----------------*/}
            <div className="flex flex-col gap-6 px-5 py-7  mr-2  md:w-1/3">
              <div className="flex flex-col gap-2">
                <h1 className="text-lg text-slate-900 font-medium">Contact</h1>
                <Link to={`mailto:${developer?.email}`} className="contact-dev">
                  <FaEnvelope />
                  {developer?.email}
                </Link>
                <Link to={`tel:${developer?.phone}`} className="contact-dev">
                  <FaPhone />
                  {developer?.phone}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <CompanyDetails
      org_data={organization}
      fetchOrg={fetchProfile}
      edit=""
      update={
        <CompanyUpdateModal
          organization={organization}
          setOrganization={setOrganization}
          fetchProfile={fetchProfile}
        />
      }
    />
  );
}
