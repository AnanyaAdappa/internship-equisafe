function Footer() {
  return (
    <footer className=" p-10 bg-[#0a0c3d] text-white gap-4 grid-cols-4 flex flex-col items-center justify-center">
      <img
        src="/logo.jpg"
        alt="logo"
        className="filter bg-blend-multiply rounded-lg max-w-xs"
      />
      <div>
        <h1 className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          IdeaBox - linking people | All credits goes to team.
        </h1>
      </div>
    </footer>
  );
}

export default Footer;
