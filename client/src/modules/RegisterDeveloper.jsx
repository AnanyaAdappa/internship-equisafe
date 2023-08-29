import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Stepper from '../components/form/register/Stepper';
import StepperControl from '../components/form/register/StepperControl';
import { UseContextProvider } from '../components/form/register/StepperContext';
import AccountCredentials from '../components/form/register/developer/AccountCredentials';
import PersonalInfo from '../components/form/register/developer/PersonalInfo';
import Final from '../components/form/register/developer/Final';
import FormContainer from '../components/form/FormContainer';
import developer from "../../public/developer.svg";
import { loadingContext } from '../components/context/LoadingState';
// import developer from "../../../../../../../../developer.svg";

function RegisterDeveloper() {
  const progressState = useContext(loadingContext);
  const { setProgress } = progressState;

  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [image, setImage] = useState(null); // to show the image preview when image is selected through input tag.
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    password: '',
    phone: '',
    city: '',
    technical_role: '',
    qualification: '',
    skills: "",
    photo: null,
    openToWork: false,
    linkedin: "",
    github: "",
    about: "",
  });
  const [validationErrors, setValidationErrors] = useState({
    fname: '',
    lname: '',
    email: '',
    password: '',
    phone: '',
    city: '',
    technical_role: '',
    qualification: '',
    skills: "",
    photo: null,
    openToWork: false,
    linkedin: "",
    github: "",
    about: "",
  });
  const validateFname = (name) => {
    if (name.length === 0) {
      setValidationErrors((prevErrors) => ({ ...prevErrors, fname: "" }));
    } else if (!name) {
      setValidationErrors((prevErrors) => ({ ...prevErrors, fname: "Firt name is required" }));
    } else if (name.length < 3) {
      setValidationErrors((prevErrors) => ({ ...prevErrors, fname: "First name must be atleast 3 characters long." }));
    } else {
      setValidationErrors((prevErrors) => ({ ...prevErrors, fname: "" }));
    }
  };
  const validateLname = (name) => {
    if (name.length === 0) {
      setValidationErrors((prevErrors) => ({ ...prevErrors, lname: "" }));
    } else if (!name) {
      setValidationErrors((prevErrors) => ({ ...prevErrors, lname: "Last name is required" }));
    } else if (name.length < 2) {
      setValidationErrors((prevErrors) => ({ ...prevErrors, lname: "Last name must be atleast 2 characters long." }));
    } else {
      setValidationErrors((prevErrors) => ({ ...prevErrors, lname: "" }));
    }
  };
  const validateEmail = (email) => {
    if (email.length === 0) {
      setValidationErrors((prevErrors) => ({ ...prevErrors, email: "" }));
    } else if (!email) {
      setValidationErrors((prevErrors) => ({ ...prevErrors, email: "Email is required" }));
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setValidationErrors((prevErrors) => ({ ...prevErrors, email: "Please enter a valid email address" }));
    } else {
      setValidationErrors((prevErrors) => ({ ...prevErrors, email: "" }));
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
  const validatePhone = (phone) => {
    if (phone.length === 0) {
      setValidationErrors((prevErrors) => ({ ...prevErrors, phone: "" }));
    } else if (!phone) {
      setValidationErrors((prevErrors) => ({ ...prevErrors, phone: "Phone number is required" }));
    // eslint-disable-next-line no-useless-escape
    } else if (!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
      .test(phone)) {
      setValidationErrors((prevErrors) => ({ ...prevErrors, phone: "Please enter a valid phone number" }));
    } else {
      setValidationErrors((prevErrors) => ({ ...prevErrors, phone: "" }));
    }
  };
  const validateSkills = (skills) => {
    if (skills.length === 0) {
      setValidationErrors((prevErrors) => ({ ...prevErrors, skills: "" }));
    } else if (!/^([a-zA-Z.]+, )*[a-zA-Z.]+$/.test(skills)) {
      setValidationErrors((prevErrors) => ({ ...prevErrors, skills: "Please provide a valid input with space comma separation." }));
    } else {
      setValidationErrors((prevErrors) => ({ ...prevErrors, skills: "" }));
    }
  };
  const validateLinkedin = (linkedin) => {
    if (linkedin.length === 0) {
      setValidationErrors((prevErrors) => ({ ...prevErrors, linkedin: "" }));
    } else if (!/^(https?:\/\/(www\.)?|http:\/\/(www\.)?)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/.test(linkedin)) {
      setValidationErrors((prevErrors) => ({ ...prevErrors, linkedin: "Please provide a valid URL." }));
    } else {
      setValidationErrors((prevErrors) => ({ ...prevErrors, linkedin: "" }));
    }
  };
  const validateGithub = (github) => {
    if (github.length === 0) {
      setValidationErrors((prevErrors) => ({ ...prevErrors, github: "" }));
    } else if (!/^(https?:\/\/(www\.)?|http:\/\/(www\.)?)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/.test(github)) {
      setValidationErrors((prevErrors) => ({ ...prevErrors, github: "Please provide a valid URL." }));
    } else {
      setValidationErrors((prevErrors) => ({ ...prevErrors, github: "" }));
    }
  };

  const updateFormValue = (field, value) => {
    setFormData({ ...formData, [field]: value });

    if (field === "email") {
      validateEmail(value);
    } else if (field === "password") {
      validatePassword(value);
    } else if (field === "fname") {
      validateFname(value);
    } else if (field === "lname") {
      validateLname(value);
    } else if (field === "phone") {
      validatePhone(value);
    } else if (field === "skills") {
      validateSkills(value);
    } else if (field === "linkedin") {
      validateLinkedin(value);
    } else if (field === "github") {
      validateGithub(value);
    }
  };

  const steps = ['Login Details', 'Personal Details', 'Review'];

  const displayStep = (step) => {
    switch (step) {
      case 1:
        return (
          <AccountCredentials
            formData={formData}
            setFormData={setFormData}
            validationErrors={validationErrors}
            updateFormValue={updateFormValue}
          />
        );
      case 2:
        return (
          <PersonalInfo
            formData={formData}
            setFormData={setFormData}
            validationErrors={validationErrors}
            updateFormValue={updateFormValue}
          />
        );
      case 3:
        return (
          <Final
            formData={formData}
            setFormData={setFormData}
            image={image}
            setImage={setImage}
          />
        );
      default:
        return 0;
    }
  };

  // for not letting the form proceed ahead without these fields being filled
  const requiredFields = ['fname', 'lname', 'email', 'password', 'phone'];
  const requiredFields1 = ['fname', 'lname', 'email', 'password'];
  const requiredFields2 = ['phone'];

  // console.log('currentStep---', currentStep);
  // console.log('steps lenght before?------', steps.length);
  const handleClick = async (direction) => {
    // console.log('currentStep after click---', currentStep);
    // console.log('direction------>', direction);

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

      // console.log('heyyyy ', JSON.stringify(formData));

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

      await setProgress(30);

      bodyData.append('fname', formData.fname);
      bodyData.append('lname', formData.lname);
      bodyData.append('email', formData.email);
      bodyData.append('password', formData.password);
      bodyData.append('phone', formData.phone);
      if (formData.qualification) {
        bodyData.append('qualification', formData.qualification);
      }
      if (formData.skills) {
        // converting input string to array
        const skillsArray = formData.skills.split(", ");
        // appending each array element to a separate form-data key as sending array in form-data type is tricky
        skillsArray.forEach((skill) => {
          bodyData.append('skills', skill);
        });
      }
      if (formData.city) {
        bodyData.append('city', formData.city);
      }
      if (formData.technical_role) {
        bodyData.append('technical_role', formData.technical_role);
      }
      if (formData.openToWork) {
        bodyData.append('openToWork', formData.openToWork);
      }
      if (formData.linkedin) {
        bodyData.append('linkedin', formData.linkedin);
      }
      if (formData.github) {
        bodyData.append('github', formData.github);
      }
      if (formData.about) {
        bodyData.append('about', formData.about);
      }
      if (formData.photo) {
        bodyData.append('photo', formData.photo);
      }

      // console.log("bodyData === ", bodyData);
      fetch(`${import.meta.env.VITE_API_URL}/developers/auth/register`, {
        method: 'POST',
        // when working with multipart/form-data, the browser automatically sets the appropriate Content-Type header, so you don't need to manually set it.
        // including the header manually might cause issues, especially with CORS.
        headers: {
          // 'Content-Type': 'multipart/form-data',
          // 'Content-Type': 'application/json',
        },
        body: bodyData,
      })
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
            // console.log("token is ", data.data.access_token);
            localStorage.setItem("authToken", data.data.access_token);
            localStorage.setItem('isDev', data.data.developer._id);
            localStorage.setItem('dev_uid', data.data.developer.uid);
            toast.success(`${data.message}`, {
              position: toast.POSITION.TOP_CENTER, autoClose: 2000,
            });
            navigate("/");
            // alert(`${data.message}`);
            window.location.reload();
          } else if (data.error) {
            await setProgress(100);
            toast.error(`${data.error}`, {
              position: toast.POSITION.TOP_CENTER, autoClose: 2000,
            });
          }
          return 0;
        })
        .catch(async (error) => {
          await setProgress(100);
          toast.error(`An error occured while sending request. Please try again. (${error})`, {
            position: toast.POSITION.TOP_CENTER, autoClose: 2000,
          });
        });
    }

    // direction === 'next' ? newStep++ : newStep--;
    if (direction === 'next') {
      if (validationErrors.fname || validationErrors.lname || validationErrors.email || validationErrors.password || validationErrors.phone || validationErrors.skills || validationErrors.linkedin || validationErrors.github) {
        toast.error('Please correct the input errors before proceeding ahead.', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
        });
        return;
      }
      if (currentStep === 1) {
      // return those fields from formData which are empty.
        const emptyFields = requiredFields1.filter((field) => !formData[field]);
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
      if (currentStep === 2) {
      // return those fields from formData which are empty.
        const emptyFields = requiredFields2.filter((field) => !formData[field]);
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

    // check if steps are within bounds and save the changes in state variable
    // newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
    if (newStep > 0 && newStep <= steps.length) {
      setCurrentStep(newStep);
    }
  };

  return (
    <div>
      {/* Stepper */}
      <FormContainer image={developer}>
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

export default RegisterDeveloper;
