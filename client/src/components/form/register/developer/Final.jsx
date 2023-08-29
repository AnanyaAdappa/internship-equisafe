// import { RxAvatar } from 'react-icons/rx';
import ProfilePicDev from './ProfilePicDev';
// import Avatar from 'react-avatar-edit';

function Final({
  formData,
  setFormData, image, setImage,
}) {
  /* Show details */

  return (
    <div className="flex flex-col gap-8 w-full justify-center items-center h-1/2 font-bold text-accent h-[40vh] overflow-y-scroll scroll-smooth z-100 scrollbar p-3">
      <div className="relative w-full mt-[25%]">
        <p
          className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute"
        >
          About yourself
        </p>
        <textarea
          rows="2"
          placeholder="I am a web developer working majorly in MERN stack and....."
          value={formData.about}
          onChange={(event) => setFormData({ ...formData, about: event.target.value })}
          className="border placeholder-gray-400 focus:outline-none focus:border-accent w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-black font-normal block bg-white border-gray-300 rounded-md"
        />
      </div>
      <ProfilePicDev
        formData={formData}
        setFormData={setFormData}
        image={image}
        setImage={setImage}
      />
      {/* <RxAvatar className="w-40 h-40 text-accent" /> */}
      <h1>Confirm your details and click confirm to register.</h1>
    </div>
  );
}

export default Final;
