import { RiArrowRightSLine } from "react-icons/ri";

export default function AppFeatures() {
  return (
    <div className="flex flex-col max-w-7xl">
      <div className="flex flex-col">
        <h3 className="text-cyan-950 font-semibold uppercase text-sm">
          What we do
        </h3>
        <h2 className="text-3xl font-semibold ">
          We help you choose the best policy for your needs. We help you buy the
          policy. And we help you with claims if you ever have to use the
          policy. Basically, we do everything.
        </h2>
        <div className="flex">
          <a
            href="/about"
            className="flex items-center p-3 mt-10 text-sm rounded-lg font-semibold bg-accent hover:bg-accent/50 bg-blue-400"
          >
            About EquiSafe <RiArrowRightSLine className="ml-2 text-md" />
          </a>
        </div>
      </div>

      {/* ------------- Features Card ------------ */}

      <div className="flex flex-col md:flex-row my-8 gap-5">
        <div className="flex flex-col gap-4 bg-[#164e63] rounded-xl border border-slate-800 p-5 w-4/5">
          {/* <img alt="card" src="/SVG/card-1.svg" /> */}
          <h2 className="font-semibold text-xl">
            Comprehensive Policy Selection
          </h2>
          <p className="opacity-75">
            EquiSafe offers a diverse range of insurance products from various
            insurers, ensuring you have ample choices to find the perfect
            coverage that suits your needs. With an intuitive interface, you can
            easily compare policies side by side, making informed decisions
            about your insurance.
          </p>
        </div>
        <div className="flex flex-col gap-4 bg-[#164e63] rounded-xl border border-slate-800 p-5 w-4/5">
          {/* <img alt="card-2" src="/SVG/card-1.svg" /> */}
          <h2 className="font-semibold text-xl">
            {" "}
            Hassle-Free Insurer Comparison
          </h2>
          <p className="opacity-75">
            EquiSafe simplifies the often complex process of comparing insurance
            providers. Our website presents transparent information about each
            insurer's offerings, benefits, and costs, allowing you to assess and
            select the policy that aligns with your requirements.
          </p>
        </div>
        <div className="flex flex-col gap-4 bg-[#164e63] rounded-xl border border-slate-800 p-5 w-4/5">
          {/* <img alt="card-2" src="/SVG/card-1.svg" /> */}
          <h2 className="font-semibold text-xl">Tailored Policies for You</h2>
          <p className="opacity-75">
            EquiSafe goes beyond a mere listing of policies. Our platform
            empowers you to customize your insurance coverage. You can tweak
            policy parameters, adjust coverage limits, and add specific
            features, ensuring that the policy you choose is precisely tailored
            to safeguard what matters most to you. With EquiSafe, you're in
            control of your insurance journey.
          </p>
        </div>
      </div>
    </div>
  );
}
