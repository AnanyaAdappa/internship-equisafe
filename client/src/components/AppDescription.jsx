import { RiArrowRightSLine } from "react-icons/ri";

export default function AppDescription() {
  return (
    <div className="flex flex-col max-w-7xl">
      <div className="flex flex-col">
        <h2 className="text-cyan-950 font-semibold uppercase text-xl ">
          Our Services
        </h2>
         <br />
        <h3 className="text-cyan-950 font-semibold uppercase text-sm">
          We present the best services that you can choose with various categories and needs.
        </h3>
        <br />
        <h2 className="text-3xl font-semibold text-cyan-950 ">
         "Always Provide The Best Service"
        </h2>
        {/* <div className="flex">
          <a
            href="/about"
            className="flex items-center p-3 mt-10 text-sm rounded-lg font-semibold bg-accent hover:bg-accent/50 bg-blue-400"
          >
            About EquiSafe <RiArrowRightSLine className="ml-2 text-md" />
          </a>
        </div> */}
      </div>
      <br />

      {/* ------------- Features Card ------------ */}

      <div className="flex flex-col md:flex-row my-8 gap-5">
        <div className="flex flex-col gap-4 bg-[#164e63] rounded-xl border border-slate-800 p-5 w-4/5">
          {/* <img alt="card" src="/SVG/card-1.svg" /> */}
          <h2 className="font-semibold text-xl">
            Home Insurance
          </h2>
          <p className="opacity-75">
          "Home is where your story begins, so protect it with the shield of home insurance"
          </p>
        </div>
        <div className="flex flex-col gap-4 bg-[#164e63] rounded-xl border border-slate-800 p-5 w-4/5">
          {/* <img alt="card-2" src="/SVG/card-1.svg" /> */}
          <h2 className="font-semibold text-xl">
            {" "}
            Auto Insurance
          </h2>
          <p className="opacity-75">
         " Life's a journey, and so is your car. Make sure your ride is covered every step of the way"
          </p>
        </div>
        <div className="flex flex-col gap-4 bg-[#164e63] rounded-xl border border-slate-800 p-5 w-4/5">
          {/* <img alt="card-2" src="/SVG/card-1.svg" /> */}
          <h2 className="font-semibold text-xl">Health Insurance</h2>
          <p className="opacity-75">
          "Protecting your health is protecting your future. Prioritize your well-being with the right health insurance coverage"
          </p>
        </div>

        <div className="flex flex-col gap-4 bg-[#164e63] rounded-xl border border-slate-800 p-5 w-4/5">
          {/* <img alt="card" src="/SVG/card-1.svg" /> */}
          <h2 className="font-semibold text-xl">
            Life Insurance
          </h2>
          <p className="opacity-75">
          "Life Insurance: Love Beyond Life"
          </p>
        </div>
        
      </div>
    </div>
  );
}
