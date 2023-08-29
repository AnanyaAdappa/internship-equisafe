import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Stepper from '../components/form/register/Stepper';
import StepperControl from '../components/form/register/StepperControl';
import { UseContextProvider } from '../components/form/register/StepperContext';
import FormContainer from '../components/form/FormContainer';
// import organization from '/organization.svg';
import organization from '../../public/organization.svg';
import OrgAccount from '../components/form/register/organization/OrgAccount';
import OrgInfo from '../components/form/register/organization/OrgInfo';
import OrgBanner from '../components/form/register/organization/OrgBanner';
import { loadingContext } from '../components/context/LoadingState';

function RegisterOrganization() {
  const progressState = useContext(loadingContext);
  const { setProgress } = progressState;

  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    about: '',
    password: '',
    domain: '',
    website: '',
    photo: null,
  });
  const [validationErrors, setValidationErrors] = useState({
    name: '',
    password: '',
    website: '',
  });

  const validateName = (name) => {
    if (name.length === 0) {
      setValidationErrors((prevErrors) => ({ ...prevErrors, name: "" }));
    } else if (!name) {
      setValidationErrors((prevErrors) => ({ ...prevErrors, name: "Company name is required" }));
    } else if (name.length < 2) {
      setValidationErrors((prevErrors) => ({ ...prevErrors, name: "Company name must be atleast 2 characters long." }));
    } else {
      setValidationErrors((prevErrors) => ({ ...prevErrors, name: "" }));
    }
  };
  const validatePassword = (password) => {
    if (password.length === 0) {
      setValidationErrors((prevErrors) => ({ ...prevErrors, password: "" }));
    } else if (!password) {
      setValidationErrors((prevErrors) => ({ ...prevErrors, password: "Password is required" }));
    } else if (password.length < 8) {
      setValidationErrors((prevErrors) => ({ ...prevErrors, password: "Password must be at least 8 characters long." }));
    } else if (password.length > 16) {
      setValidationErrors((prevErrors) => ({ ...prevErrors, password: "Password must not exceed 16 characters." }));
    } else {
      setValidationErrors((prevErrors) => ({ ...prevErrors, password: "" }));
    }
  };
  const validateWebsite = (website) => {
    if (website.length === 0) {
      setValidationErrors((prevErrors) => ({ ...prevErrors, website: "" }));
    } else if (!/^(https?:\/\/(www\.)?|http:\/\/(www\.)?)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/.test(website)) {
      setValidationErrors((prevErrors) => ({ ...prevErrors, website: "Please provide a valid URL." }));
    } else {
      setValidationErrors((prevErrors) => ({ ...prevErrors, website: "" }));
    }
  };

  const updateFormValue = (field, value) => {
    setFormData({ ...formData, [field]: value });

    if (field === "name") {
      validateName(value);
    } else if (field === "password") {
      validatePassword(value);
    } else if (field === "website") {
      validateWebsite(value);
    }
  };

  const steps = ['Login Details', 'Company Details', 'Review'];

  const displayStep = (step) => {
    switch (step) {
      case 1:
        return (
          <OrgAccount
            formData={formData}
            setFormData={setFormData}
            validationErrors={validationErrors}
            updateFormValue={updateFormValue}
          />
        );
      case 2:
        return (
          <OrgInfo
            formData={formData}
            setFormData={setFormData}
            validationErrors={validationErrors}
            updateFormValue={updateFormValue}
          />
        );
      case 3:
        return <OrgBanner formData={formData} setFormData={setFormData} />;
      default:
        return 0;
    }
  };

  const requiredFields = ['name', 'password'];

  const handleClick = async (direction) => {
    let newStep = currentStep;
    // console.log('newstep---', newStep);
    // console.log('lenght?------', steps.length);

    // --- POST if the you reach at the last step
    // means when 3 === 3
    // and when back button is not clicked otherwise even for back button click, network calls will be made.
    if (newStep === steps.length && direction !== "back") {
      // always start the loader with 0
      await setProgress(0);
      await setProgress(10);

      // return those fields from formData which are empty.
      const emptyFields = requiredFields.filter((field) => !formData[field]);
      if (emptyFields.length > 0) {
        // map through each item and make a new array
        const emptyFieldNames = emptyFields.map((field) => field.charAt(0).toUpperCase() + field.slice(1));

        const errorMessage = `Please fill in the following required fields: ${emptyFieldNames.join(', ')}`;
        toast.error(`${errorMessage}`, {
          position: toast.POSITION.TOP_CENTER, autoClose: 10000,
        });
        // setShowModal(!showModal);
        return;
      }

      const bodyData = new FormData();

      await setProgress(15);

      bodyData.append("name", formData.name);
      bodyData.append("password", formData.password);
      if (formData.about) {
        bodyData.append("about", formData.about);
      }
      if (formData.domain) {
        bodyData.append("domain", formData.domain);
      }
      if (formData.website) {
        bodyData.append("website", formData.website);
      }
      if (formData.photo) {
        bodyData.append("photo", formData.photo);
      }
      await setProgress(30);
      fetch(
        `${import.meta.env.VITE_API_URL}/organizations/auth/register`,
        {
          method: 'POST',
          // when working with multipart/form-data, the browser automatically sets the appropriate Content-Type header, so you don't need to manually set it.
          // including the header manually might cause issues, especially with CORS.
          // headers: {
          //   'Content-Type': 'application/json',
          // },
          // body: JSON.stringify(formData),
          body: bodyData,
        },
      )
        .then((response) => response.json())
        .then(async (data) => {
          await setProgress(70);
          // console.log('POSTED --> ', data);
          if (!data.data) {
            await setProgress(100);

            // return is imp so that it doesnt go again in catch block and update the toast again
            return toast.error(`${data.message} : ${data.error}`, {
              position: toast.POSITION.TOP_CENTER, autoClose: 2000,
            });
          }
          if (data.data.access_token) {
            await setProgress(100);

            localStorage.setItem("authToken", data.data.access_token);
            localStorage.setItem('isOrg', data.data.organization._id);

            toast.success(`${data.message}`, {
              position: toast.POSITION.TOP_CENTER, autoClose: 2000,
            });
            navigate("/");
            // alert(`${data.message}`);
            window.location.reload();
          }
          return 0;
        })
        .catch(async (error) => {
          await setProgress(100);
          console.log('POSTING error --> ', error.message);
          toast.error(`An error occured while sending request. Please try again.`, {
            position: toast.POSITION.TOP_CENTER, autoClose: 2000,
          });
        });
    }

    // direction === 'next' ? (newStep += 1) : (newStep -= 1);
    if (direction === "next") {
      if (validationErrors.name || validationErrors.password || validationErrors.website) {
        toast.error('Please correct the input errors before proceeding ahead.', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
        });
        return;
      }
      if (currentStep === 1) {
      // return those fields from formData which are empty.
        const emptyFields = requiredFields.filter((field) => !formData[field]);
        if (emptyFields.length > 0) {
        // map through each item and make a new array
          const emptyFieldNames = emptyFields.map((field) => field.charAt(0).toUpperCase() + field.slice(1));

          const errorMessage = `Please fill in the following required fields: ${emptyFieldNames.join(', ')}`;
          toast.error(`${errorMessage}`, {
            position: toast.POSITION.TOP_CENTER, autoClose: 10000,
          });
          // setShowModal(!showModal);
          return;
        }
      }
      newStep += 1;
    } else {
      newStep -= 1;
    }
    // check if steps are within bounds
    // newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
    if (newStep > 0 && newStep <= steps.length) {
      setCurrentStep(newStep);
    }
  };

  // console.log('org data ==== ', formData);
  return (
    <div>
      {/* Stepper */}
      <FormContainer image={organization}>
        <div className="relative h-full w-full">
          <div className="w-full h-full relative">
            <Stepper
              steps={steps}
              currentStep={currentStep}
            />
            <UseContextProvider>{displayStep(currentStep)}</UseContextProvider>
          </div>
          {/* navigation button */}
          <div className=" w-full absolute bottom-0">
            {/* {currentStep !== steps.length && ( */}
            <StepperControl
              handleClick={handleClick}
              currentStep={currentStep}
              steps={steps}
            />
            {/* )} */}
          </div>
        </div>
      </FormContainer>
    </div>
  );
}

export default RegisterOrganization;
