/* eslint-disable react/destructuring-assignment */
import { Link } from 'react-router-dom';

function Members(props) {
  return (
    <div className="flex md:flex-row flex-col w-full items-start justify-start">
      <Link
        to={props.to}
        className="flex items-center hover:text-accent justify-start gap-3 text-lg text-slate-800"
      >
        <img
          src={props.image}
          alt=""
          className={`${props.imageclass} rounded-full  object-cover aspect-square`}
        />
        <h1 className={`${props.className}`}>{props.name}</h1>
      </Link>
    </div>
  );
}

export default Members;
