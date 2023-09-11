import { toast } from "react-toastify";
import { useContext, useEffect, useState } from "react";
import { IoTrashBinOutline } from "react-icons/io5";
import { TiThumbsUp, TiThumbsDown } from "react-icons/ti";
import { MdPendingActions, MdReviews } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import ProjectDeleteConfirmationDialog from "./modals/ProjectDeleteConfirmationDialog";
import Star from "./Star";
import ReviewVaul from "./modals/ReviewVaul";
import loading from "../../public/SVG/loading.svg";
import { loadingContext } from "./context/LoadingState";

function CompanyDetails({ org_data, update, edit, fetchOrg }) {
  const progressState = useContext(loadingContext);
  const { setProgress } = progressState;

  const [orgProposals, setOrgProposals] = useState([]);
  const [deleteBtn, setDeleteBtn] = useState(false);
  const [selectedUID, setSelectedUID] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [reviewVaulOpen, setReviewVaulOpen] = useState(false);

  // it will get empty object for `/profile` page.
  // but it will get {uid : xxx} object for `/companies/:uid` page
  const profile = useParams();

  const fetchProposals = () => {
    let orgId;
    // only render if the url param has {} object due to no :uid in url
    if (profile.uid) {
      orgId = org_data._id;
    } else if (localStorage.getItem("isOrg")) {
      orgId = localStorage.getItem("isOrg");
    }
    fetch(`${import.meta.env.VITE_API_URL}/proposals?organization=${orgId}`, {
      headers: {
        authorization: localStorage.getItem("authToken"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setOrgProposals(data.data);
      });
  };

  const fetchReviews = async () => {
    await fetch(
      `${import.meta.env.VITE_API_URL}/reviews?organization=${org_data._id}`
    )
      .then((response) => response.json())
      .then((fetched) => {
        // FILTERING those reviews which were posted by Developer for organization.
        const filteredData = fetched.data.filter(
          (doc) => doc.reviewedByDev === true
        );
        setReviews(filteredData);
      });
  };
  useEffect(() => {
    // if condition is there to fetch only for org profile pages.
    // !profile.uid is to check that the proposals request isnt hit when on company/:uid page.
    if (!profile.uid && localStorage.getItem("isOrg")) {
      fetchProposals();
    }
    // if condition is there to avoid the error of 400 BAD REQUEST when on initial render the org_data is empty {}
    if (org_data._id) {
      fetchReviews();
    }
  }, [org_data]); // org_data for fetchReviews as it needs id

  const deleteProject = (uid) => {
    setSelectedUID(uid);
    setDeleteBtn(!deleteBtn);
  };

  // Callback function to be passed to the ConfirmationDialog
  const handleDeleteSuccess = () => {
    // Fetch the updated proposals from the server
    fetchOrg();
  };

  const patchProposal = async (uid, body) => {
    // always start the loader with 0
    await setProgress(0);
    await setProgress(30);

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/proposals/${uid}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("authToken"),
        },
        body: JSON.stringify(body),
      }
    );
    const result = await response.json();
    await setProgress(50);
    if (result.error) {
      await setProgress(100);
      toast.error(`${result.error}`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    }
    await setProgress(100);
    toast.success(`${result.message}`, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });
    fetchProposals();
  };

  const handleProposal = (action, uid) => {
    let body;
    if (action === "accept") {
      body = {
        accepted: true,
        pending: false,
        rejected: false,
      };
    } else if (action === "reject") {
      body = {
        rejected: true,
        pending: false,
        accepted: false,
      };
    } else if (action === "pending") {
      body = {
        rejected: false,
        pending: true,
        accepted: false,
      };
    }
    patchProposal(uid, body);
  };

  const getStatusText = (proposal) => {
    if (proposal.pending) {
      return "Pending";
    }
    if (proposal.accepted) {
      return "Accepted";
    }
    return "Rejected";
  };

  // return true/false for the org_data object prop recieved
  function isObjectEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  return !isObjectEmpty(org_data) ? (
    <div className="flex flex-col max-w-screen-sm md:max-w-none lg:max-w-none items-center justify-center mx-3 bg-blue-50">
      <div
        className="flex w-full lg:w-3/5 md:w-4/5 flex-col justify-center
            items-center border z-10 relative
           border-slate-300  bg-white/50 rounded-2xl my-6 mb-10"
      >
        {/* ------------------Company Banner-------------------- */}
        <div className="flex justify-start w-full mt-6 items-start place-content-start gap-[5%] border-b border-slate-300 px-5 py-7 relative">
          <div className="flex items-center relative justify-center h-24 p-0 m-0">
            <img
              alt="banner"
              src={org_data.banner_img}
              className="inline-block object-cover aspect-video h-full p-0 shadow rounded-xl"
            />
          </div>
          {/* <LuEdit className='absolute right-8 top-9 text-2xl text-accent hover:bg-accent/10' /> */}
          <div
            className={` absolute -top-12 -right-5 md:right-0  md:top-0 ${edit}`}
          >
            {update}{" "}
          </div>
          <div className="flex flex-col justify-between items-start gap-3">
            {/* --------Company Name------------------- */}
            <h1 className="text-3xl font-medium text-slate-900">
              {org_data.name}
            </h1>
            <div className="flex place-content-start items-center w-full text-slate-600 gap-1">
              {/* <BiSolidMap /> */}
              {/* ------------------------ Company Location-------------------------- */}
              {/* <p>India</p> */}
            </div>
          </div>
        </div>
        <div className="flex flex-col-reverse md:flex-row justify-start w-full items-start place-content-start">
          {/* ----------Col-1----------------*/}
          <div className="flex flex-col gap-6 px-5 py-7  mr-2  md:w-1/3 relative">
            <div className="flex flex-col gap-2">
              <h1 className="text-lg text-slate-900 font-medium">
                Company Website
              </h1>
              <a
                href={org_data.website}
                target="_blank"
                className="description break-words hover:text-accent transition-all"
                rel="noreferrer"
              >
                {org_data.website}
              </a>
            </div>
          </div>
          {/* ----------Col-2----------------*/}
          <div className="flex flex-col border-b md:border-b-0 md:border-l md:pl-2 border-slate-300 md:gap-6 md:w-2/3 pb-10">
            <div className="flex flex-col gap-2 px-5 py-7">
              {/* ---------Company Name------------ */}
              <h1 className="text-2xl font-semibold mb-3">
                About {org_data.name}
              </h1>
              <p className="description">{org_data.about}</p>
            </div>
          </div>
        </div>
      </div>

      {/* keep thiss dialog component ouotside here so that it doesnt overlap with other components */}
      {/* render ConfirmationDialog only if selectedUID && deleteBtn are available */}
      {selectedUID && deleteBtn && (
        <ProjectDeleteConfirmationDialog
          cancel={() => setDeleteBtn(!deleteBtn)}
          deleteBtn={deleteBtn}
          setDeleteBtn={setDeleteBtn}
          propUid={selectedUID}
          onDeleteSuccess={handleDeleteSuccess}
        />
      )}
    </div>
  ) : (
    <div className="flex w-full py-10 justify-center text-slate-500">
      <img alt="loader" src={loading} />
    </div>
  );
}

export default CompanyDetails;
