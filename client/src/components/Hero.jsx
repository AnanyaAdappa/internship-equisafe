import { RiArrowRightSLine } from 'react-icons/ri';
import { AiFillPlayCircle } from 'react-icons/ai';
import { MdCelebration } from 'react-icons/md';
import { useEffect, useState } from 'react';

function Hero() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/projects`,
        { mode: 'cors' },
      );
      const fetchedProjects = await response.json();
      setProjects(fetchedProjects.data);
    };
    fetchProjects();
  }, []);

  return (
    <div
      className=" antialiased flex flex-col py-12 px-6  items-center justify-center gap-4"
    >
      {/* ------------- Background Gradient ------------ */}
      <div className="flex flex-row gap-0 z-0">
        <div className="gradient bg-sky-950" />
      </div>

      {/* ------------- Milestone ------------ */}

      {/* <div
        className="flex flex-row px-2 border items-center justify-center animate-bounce border-accent rounded-full text-gray-700 text-md z-10"
      >
        <MdCelebration className="mr-2" />
        More than
        {' '}
        {projects.length}
        + projects on the platform.
      </div> */}

      {/* ------------- Headings ------------ */}

      <div className="gap-0 z-[1]">
        <h1
          className=" text-sky-700 text-center text-4xl md:text-6xl font-semibold"
        >
          Insurance made easy
        </h1>
        {/* <h1
          className=" blue-gradient text-center text-4xl md:text-6xl font-semibold"
        >
          Complete Freelancing Platform
        </h1> */}
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
            href="/register"
            className="flex p-3 md:p-4 items-center justify-center"
          >
            Book a free call
            {' '}
            <RiArrowRightSLine className="ml-2 text-md" />
          </a>
        </div>

        {/* ------------- Demo Video ------------ */}

        {/* <a
          href="/"
          className="flex p-0 gap-3 items-center justify-center"
        >
          <AiFillPlayCircle className="text-accent text-5xl md:text-6xl animate-pulse" />
          <div className="flex flex-col">
            <p className="text-accent">Watch demo</p>
            <p>2 min</p>
          </div>
        </a> */}
      </div>
      {/* ------------- Screenshots ------------ */}

      <div className="flex md:px-[10%]">
        <img
          alt="hero"
          src="/new-hero.png"
          className=""
        />
      </div>
      <h2
        className="text-center text-3xl md:text-4xl font-semibold my-4"
      >
        Completed
        {' '}
        <span className="blue-gradient">
          {projects.length}
          +
        </span>
        {' '}
        projects and
        <br />
        <span className="blue-gradient">thousands</span>
        {' '}
        of users on platform
      </h2>
    </div>
  );
}

export default Hero;
