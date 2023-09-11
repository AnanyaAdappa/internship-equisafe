// import { useEffect, useState } from "react";
// import { BiSolidMap } from "react-icons/bi";
// import { FaEnvelope, FaPhone } from "react-icons/fa";
// import {
//   BsFillCalendarEventFill,
//   BsGithub,
//   BsGlobe,
//   BsLinkedin,
// } from "react-icons/bs";
// import { Link, useParams } from "react-router-dom";
// import Star from "../components/Star";
// import loading from "../../public/SVG/loading.svg";

// function DeveloperMain() {
//   const { uid } = useParams();
//   const [developer, setDeveloper] = useState({});
//   const [projectHistory, setProjectHistory] = useState([]);
//   const [reviews, setReviews] = useState([]);

//   const fetchHistory = async (id) => {
//     const response = await fetch(
//       `${import.meta.env.VITE_API_URL}/project-histories?developer=${id}`,
//       { mode: "cors" }
//     );
//     const fetched = await response.json();
//     await setProjectHistory(fetched.data);
//   };

//   const fetchDeveloper = async () => {
//     const response = await fetch(
//       `${import.meta.env.VITE_API_URL}/developers/${uid}`,
//       { mode: "cors" }
//     );
//     const fetchedDeveloper = await response.json();
//     setDeveloper(fetchedDeveloper.data);

//     // fetching the developer's project history with his _id recieved from response.
//     fetchHistory(fetchedDeveloper.data._id);
//   };

//   const fetchReviews = async () => {
//     await fetch(
//       `${import.meta.env.VITE_API_URL}/reviews?developer=${developer._id}`
//     )
//       .then((response) => response.json())
//       .then((fetched) => {
//         // FILTERING those reviews which were posted by Organization for developer.
//         const filteredData = fetched.data.filter(
//           (doc) => doc.reviewedByOrg === true
//         );

//         setReviews(filteredData);
//       });
//   };

//   useEffect(() => {
//     fetchDeveloper();
//     // if condition is there to avoid the error of 400 BAD REQUEST when on initial render the developer is empty {}
//     if (developer._id) {
//       fetchReviews();
//     }
//   }, [developer]);

//   const skills = developer?.skills;

//   if (!Object.keys(developer).length > 0) {
//     return (
//       <div className="flex w-full py-10 justify-center text-slate-500">
//         <img alt="loader" src={loading} />
//       </div>
//     );
//   }
//   return (
//     <div className="flex flex-col max-w-screen-sm md:max-w-none lg:max-w-none items-center justify-center mx-3">
//       <div
//         className="flex w-full lg:w-3/5 md:w-4/5 flex-col justify-center
//             items-center border z-10 relative
//            border-slate-300  bg-white/50 rounded-2xl my-6 mb-10"
//       >
//         <div className="flex justify-start lg:items-center w-full mt-6 items-start  place-content-start md:gap-[5%] border-b border-slate-300 px-5 py-7 relative">
//           <div className="flex items-center relative justify-center h-24 lg:h-80 p-0 m-0">
//             <img
//               alt="developer"
//               src={developer?.profile_pic}
//               className="inline-block object-cover aspect-square  h-full p-0 shadow shadow-accent rounded-full"
//             />
//           </div>

//           <div className="flex flex-col justify-between lg:pb-16 h-full  gap-3">
//             {/* --------Developer Name------------------- */}
//             <h1 className="text-3xl lg:text-5xl font-medium text-slate-900">
//               {developer?.fname} {developer?.lname}
//             </h1>
//             <div className="flex place-content-start items-center w-full text-slate-600 gap-1">
//               <BiSolidMap />
//               {/* ------------------------ Developer City-------------------------- */}
//               <p>{developer?.city}</p>
//             </div>
//           </div>
//         </div>
//         <div className="flex flex-col-reverse md:flex-row justify-start w-full items-start place-content-start relative">
//           {/* ----------Col-1----------------*/}
//           <div className="flex flex-col gap-6 px-5 py-7 relative flex-wrap  mr-2  md:w-1/3">
//             <div className="flex w-full flex-col gap-2 relative">
//               <h1 className="text-lg text-slate-900 font-medium">Contact</h1>
//               <Link to={`mailto:${developer?.email}`} className="contact-dev">
//                 <FaEnvelope />
//                 {developer?.email}
//               </Link>
//               <Link to={`tel:${developer?.phone}`} className="contact-dev">
//                 <FaPhone />
//                 {developer?.phone}
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default DeveloperMain;
