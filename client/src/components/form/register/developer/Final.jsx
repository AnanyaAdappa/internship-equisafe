import ProfilePicDev from './ProfilePicDev';


function Final({
  formData,
  setFormData, image, setImage,
}) {
  /* Show details */

  return (
    <div className="flex flex-col gap-8 w-full justify-center items-center h-1/2 font-bold text-accent h-[50vh] overflow-y-scroll scroll-smooth z-100 scrollbar p-3">
      
      <ProfilePicDev
        formData={formData}
        setFormData={setFormData}
        image={image}
        setImage={setImage}
      />
      <h1>Confirm your details and click confirm to register.</h1>
    </div>
  );
}

export default Final;
