import { Link } from 'react-router-dom';
import FormContainer from '../components/form/FormContainer';
// import developer from '/developer.svg';
// import organization from '/organization.svg';
// import Skate from '/Run_Skate.png';
import developer from '../../public/developer.svg';
import organization from '../../public/organization.svg';
import Skate from '../../public/Run_Skate.png';

function Register() {
  return (
    <FormContainer image={Skate} className="relative h-full w-full">
      <div className="flex flex-col w-full relative h-full py-3 items-center transition-transform gap-5 justify-center">
        <Link
          className="flex flex-col text-xl transition items-center
                         justify-center hover:bg-accent/5 hover:font-semibold rounded-lg h-full p-2"
          to="/register/developer"
        >
          <img
            alt="developer"
            src={developer}
            className="h-auto lg:h-auto w-full object-contain"
          />
          <h1 className=" blue-gradient ">Developer</h1>
        </Link>
        <div className="border-b border-slate-300 w-full"> </div>
        <Link
          className="flex flex-col text-xl transition items-center
                    justify-center hover:bg-accent/5 hover:font-semibold rounded-lg h-full w-[60%] max-w-full relative p-2"
          to="/register/company"
        >
          <img
            alt="organization"
            src={organization}
            className="h-auto lg:h-auto w-full 2xl:max-w-[100%] aspect-square object-contain"
          />
          <h1 className=" blue-gradient ">Organization</h1>
        </Link>
      </div>
    </FormContainer>
  );
}

export default Register;
