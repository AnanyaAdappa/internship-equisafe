import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoginContainer from './LoginContainer';
import 'react-toastify/dist/ReactToastify.min.css';
// import developer from "../../../../../../../../../../developer.svg";
import developer from '../../../../public/developer.svg';

export default function DevLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [validationErrors, setValidationErrors] = useState({
    email: '',
    password: '',
  });

  const validateEmail = (email) => {
    if (!email) {
      setValidationErrors((prevErrors) => ({ ...prevErrors, email: "Email is required" }));
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setValidationErrors((prevErrors) => ({ ...prevErrors, email: "Please enter a valid email address" }));
    } else {
      setValidationErrors((prevErrors) => ({ ...prevErrors, email: "" }));
    }
  };

  const updateFormValue = (field, value) => {
    setForm({ ...form, [field]: value });
    if (field === "email") {
      validateEmail(value);
    }
  };

  const onSignIn = () => {
    if (validationErrors.email || validationErrors.password) {
      toast.error('Please correct the input errors before signing in.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
      });
      return;
    }
    const requiredFields = ['email', 'password'];
    // return those fields from formData which are empty.
    const emptyFields = requiredFields.filter((field) => !form[field]);
    if (emptyFields.length > 0) {
      // map through each item and make a new array
      const emptyFieldNames = emptyFields.map((field) => field.charAt(0).toUpperCase() + field.slice(1));

      const errorMessage = `Please fill in the following required fields: ${emptyFieldNames.join(', ')}`;
      toast.error(`${errorMessage}`, {
        position: toast.POSITION.TOP_CENTER, autoClose: 10000,
      });
      return;
    }

    const id = toast.loading("Please wait...", {
      position: toast.POSITION.TOP_CENTER,
    });
    (fetch(`${import.meta.env.VITE_API_URL}/developers/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    }))
      .then((response) => response.json())
      .then((data) => {
        // if error comes and no data is there then update the toast with the error msg
        if (!data.data) {
          // return is imp so that it doesnt go again in catch block and update the toast again
          return toast.update(id, {
            render: `${data.error}`, type: "error", isLoading: false, autoClose: 2000,
          });
        }
        if (data.data.access_token) {
          // console.log("token is ", data.data.access_token);
          localStorage.setItem('authToken', data.data.access_token);
          localStorage.setItem('isDev', data.data.developer._id);
          localStorage.setItem('dev_uid', data.data.developer.uid);
          toast.update(id, {
            render: "Login Successful", type: "success", isLoading: false, autoClose: 2000,
          });
          navigate('/');
          // alert(`${data.message}`);

          window.location.reload();
        }
        // console.log("LOGGED IN --> ", data);
        // console.log("DEV --> ", localStorage.getItem('isDev'));

        // return is so that the function returns something and stays consistent with above return of if block
        return 0;
      })
      .catch((error) => {
        // console.log('POSTING error --> ', error.message);
        toast.update(id, {
          render: `${error.message}`, type: "error", isLoading: false, autoClose: 2000,
        });
      });
  };

  return (
    <LoginContainer image={developer}>
      <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
        <div className="relative">
          <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">
            Email
          </p>
          <input
            placeholder="johndoe@example.com"
            type="email"
            value={form.email}
            onChange={(e) => updateFormValue("email", e.target.value)}
            className={`border lowercase placeholder-gray-400 focus:outline-none focus:border-accent w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md ${validationErrors.email ? 'focus:border-red-500 border-red-300' : ''}`}
          />
          {validationErrors.email && (
            <p className="text-red-500">{validationErrors.email}</p>
          )}
        </div>
        <div className="relative">
          <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
          absolute"
          >
            Password
          </p>
          <input
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={(e) => updateFormValue("password", e.target.value)}
            className="border placeholder-gray-400 focus:outline-none
          focus:border-accent w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
          border-gray-300 rounded-md"
          />
          {validationErrors.password && (
            <p className="text-red-500">{validationErrors.password}</p>
          )}
        </div>
        <button
          type="button"
          onClick={() => onSignIn()}
          className={`absolute -bottom-52 cursor-pointer  pt-4 pr-5 pb-4 pl-5 text-xl font-medium text-center text-white bg-indigo-500
        rounded-lg transition duration-200 hover:bg-indigo-600 ease w-full`}
        >
          Sign In
        </button>
        {' '}
      </div>
    </LoginContainer>
  );
}
