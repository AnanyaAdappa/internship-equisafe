/* eslint-disable react/destructuring-assignment */
import { AiFillLinkedin, AiFillGithub } from 'react-icons/ai';
import { MdEmail } from 'react-icons/md';
import { LuLink2 } from 'react-icons/lu';
import { Link } from 'react-router-dom';

export default function AboutCard(props) {
  return (
    <div
      className="flex z-49 flex-col bg-red
                  backdrop-blur-2xl
             rounded-3xl gap-5 bg-slate-400/5 items-center border relative border-slate-300/50 hover:bg-slate-400/20 p-5 transition-all duration-200"
    >
      <img
        src={props.image}
        alt={props.name}
        className="rounded-3xl max-w-md w-[80%]"
      />
      <div className="flex items-center flex-col">
        <h2 className="text-center capitalize font-medium blue-gradient text-3xl drop-shadow font-sans shadow-accent">
          {props.name}
        </h2>
        <p className="text-xl capitalize text-slate-800 font-medium">
          Fullstack Developer
        </p>
      </div>
      <div className="flex flex-grow justify-around w-[60%] text-accent text-2xl">
        <Link to={`https://github.com/${props.github}`} target="_blank">
          <AiFillGithub className="hover:text-blue-600 " />
        </Link>
        <Link to={`https://www.linkedin.com/in/${props.linkedin}`} target="_blank">
          <AiFillLinkedin className="hover:text-blue-600 " />
        </Link>
        <Link to={`mailto:${props.email}`}>
          <MdEmail className="hover:text-blue-600 " />
        </Link>
        <Link to={`${props.portfolio}`} target="_blank">
          <LuLink2 className="hover:text-blue-600 " />
        </Link>
      </div>
    </div>
  );
}
