import { Drawer } from "vaul";
import { AiFillStar } from 'react-icons/ai';
import { useContext, useState } from "react";
import { toast } from 'react-toastify';
import { loadingContext } from "../context/LoadingState";

function ReviewVaul({
  children, orgID, devID, proposalUID, reviewVaulOpen, setReviewVaulOpen, fetchProposals,
}) {
  const [formData, setFormData] = useState({
    review: null,
    rating: null,
    organization: orgID,
    developer: localStorage.getItem("isDev") ? localStorage.getItem("isDev") : devID,
  });

  const progressState = useContext(loadingContext);
  const { setProgress } = progressState;

  // console.log("review for ", orgID);
  // console.log("review form : ", formData);
  // console.log("child reviewing : ", reviewVaulOpen);

  const patchProposal = async (reviewResponse) => {
    // console.log("prop_uid is ", proposalUID);
    let patchBody;
    if (localStorage.getItem("isDev")) {
      patchBody = {
        reviewedByDev: true,
      };
    } else if (localStorage.getItem("isOrg")) {
      patchBody = {
        reviewedByOrg: true,
      };
    }
    // console.log("patch body --- ", patchBody);
    const response = await fetch(`${import.meta.env.VITE_API_URL}/proposals/${proposalUID}`, {
      method: "PATCH",
      headers: {
        authorization: localStorage.getItem('authToken'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(patchBody),
    });
    const fetched = await response.json();
    // console.log("Proposal patched ? ", fetched);
    // alerts_toast
    // alert(`${reviewResponse.message} and ${fetched.message}`);
    toast.success(`${reviewResponse.message} and ${fetched.message}`, {
      position: toast.POSITION.TOP_CENTER, autoClose: 2000,
    });
    fetchProposals();
  };
  const postReview = async () => {
    // always start the loader with 0
    await setProgress(0);
    await setProgress(10);
    let bodyData;
    if (localStorage.getItem("isDev")) {
      bodyData = { ...formData, reviewedByDev: true };
    }
    const response = await fetch(`${import.meta.env.VITE_API_URL}/reviews`, {
      method: "POST",
      headers: {
        authorization: localStorage.getItem("authToken"),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyData),
    });
    await setProgress(30);
    const data = await response.json();
    await setProgress(70);
    // console.log("Review posted ? ", data);
    patchProposal(data);
    await setProgress(100);
  };
  const handleSubmit = () => {
    setReviewVaulOpen(false);
    // console.log("Submitting ", reviewVaulOpen);
    postReview();
  };

  // Reviews starts
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const stars = Array(5).fill(0);

  const handleClick = (value) => {
    setCurrentValue(value);
    setFormData({ ...formData, rating: value });
    // console.log(value);
  };

  const handleMouseOver = (newHoverValue) => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  const colors = {
    accent: "#6c47ff",
    grey: "#d4d4d8",

  };
  // const reviewStar = currentValue;

  // console.log(reviewStar);
  // console.log(`${formData.rating} and ${formData.review}`);
  // Reviews End
  return (
    <Drawer.Root>
      <Drawer.Trigger asChild className="cursor-pointer">
        {children}
      </Drawer.Trigger>

      {reviewVaulOpen && (
        <Drawer.Portal className="">
          <Drawer.Overlay className="fixed inset-0 bg-black/40 z-[989]" />
          <Drawer.Content className="bg-zinc-100 flex flex-col rounded-t-[10px] mt-24 fixed bottom-0 left-0 right-0 z-[989]">
            <div className="p-4 bg-white rounded-t-[10px] flex-1">
              <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-2" />
              <div className="max-w-lg mx-auto">
                <Drawer.Title className="font-medium text-xl lg:text-2xl mb-4">
                  Please leave a review.
                  <p className="text-lg font-normal text-slate-600 mt-4">Help others make better decision</p>
                </Drawer.Title>
                <div className="rating my-8 justify-around text-3xl md:text-4xl px-4 rating-base w-full text-accent transition-all cursor-pointer">
                  {stars.map((_, index) => (
                    <AiFillStar
                      key={index}
                      onClick={() => handleClick(index + 1)}
                      onMouseOver={() => handleMouseOver(index + 1)}
                      onMouseLeave={handleMouseLeave}
                      color={(hoverValue || currentValue) > index ? colors.accent : colors.grey}
                    />
                  ))}
                </div>
                {/* <input
                  type="number"
                  className="text-zinc-600 my-2 border border-zinc-600 p-3 w-[35%]  rounded-xl"
                  name="rating"
                  min="0"
                  max="5"
                  step="0.1"
                  onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                  placeholder="Rate between 0-5"
                /> */}
                <textarea
                  rows={5}
                  placeholder="How was your experience?"
                  className="text-zinc-600 my-2 w-full border border-zinc-600 p-5 rounded-xl"
                  onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                />
              </div>
              <div className="flex items-center justify-center w-full mt-4">
                <button type="submit" className="flex items-center justify-center w-full max-w-lg py-2 text-white bg-accent hover:border border-zinc-600 rounded-xl" onClick={handleSubmit}>
                  Submit
                </button>
              </div>
            </div>
            <div className="p-4 bg-zinc-100 border-t border-zinc-200">
              <div className="flex gap-6 justify-center max-w-lg mx-auto">
                <p>Thank you for using IdeaBox</p>
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      )}

    </Drawer.Root>
  );
}

export default ReviewVaul;
