import { RiArrowRightSLine } from "react-icons/ri";
import { AiFillPlayCircle } from "react-icons/ai";
import { MdCelebration } from "react-icons/md";
import { useEffect, useState } from "react";

function Hero() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/projects`, {
        mode: "cors",
      });
      const fetchedProjects = await response.json();
      setProjects(fetchedProjects.data);
    };
    fetchProjects();
  }, []);

  return (
    <div className=" antialiased flex flex-col py-12 px-6  items-center justify-center gap-4">
      {/* ------------- Background Gradient ------------ */}
      <div className="flex flex-row gap-0 z-0">
        <div className="gradient bg-sky-950" />
      </div>

      {/* ------------- Headings ------------ */}

      <div className="gap-0 z-[1]">
        <h1 className=" text-sky-700 text-center text-4xl md:text-6xl font-semibold">
          Insurance made easy
        </h1>
      </div>

      {/* ------------- SubHeading ------------ */}

      <p className="my-3 text-center md:text-2xl text-xl text-gray-700">
        With EquiSafe, you get the best advice on insurance.
        <br />
        Understand your policy, get answers to your questions,
        <br />
        and buy insurance, all at the same place
      </p>
      <div className="flex my-8 items-center justify-center gap-10 z-[1]">
        <div className="flex justify-between  items-center cursor-pointer bg-accent hover:bg-accent/50 rounded-lg text-white font-semibold text-center bg-blue-400">
          <a
            href="/register/developer"
            className="flex p-3 md:p-4 items-center justify-center"
          >
            Start your journey <RiArrowRightSLine className="ml-2 text-md" />
          </a>
        </div>
      </div>
      {/* ------------- Screenshots ------------ */}

      <div className="flex md:px-[10%]">
        <img alt="insurance" src="/insurance.jpg" className="" />
      </div>
      <h2 className="text-center text-3xl md:text-4xl font-semibold my-4 text-cyan-950">
        "Protecting your today ensures a
        <span className="text-blue-400"> secure</span> tomorrow"
      </h2>
    </div>
  );
}

export default Hero;
