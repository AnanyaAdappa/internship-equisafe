import React, { useState } from 'react';
import { toast } from 'react-toastify';
// import organization from '/organization.svg';
import { useNavigate } from 'react-router-dom';
import organization from '../../../../public/organization.svg';
import LoginContainer from './LoginContainer';

export default function OrgLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    uid: '',
    password: '',
  });
  const [validationErrors, setValidationErrors] = useState({ uid: '' });

  const validateUID = (uid) => {
    if (uid.length === 0) {
      setValidationErrors((prevErrors) => ({ ...prevErrors, uid: "" }));
    } else if (!uid) {
      setValidationErrors((prevErrors) => ({ ...prevErrors, uid: "UID is required" }));
    } else if (!/^org_\d{8}$/.test(uid)) {
      setValidationErrors((prevErrors) => ({ ...prevErrors, uid: "Please enter a valid uid" }));
    } else {
      setValidationErrors((prevErrors) => ({ ...prevErrors, uid: "" }));
    }
  };
  const updateFormValue = (field, value) => {
    setForm({ ...form, [field]: value });
    if (field === "uid") {
      validateUID(value);
    }
  };

  const onSignIn = () => {
    if (validationErrors.uid) {
      toast.error('Please correct the input errors before signing in.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
      });
      return;
    }

    const requiredFields = ['uid', 'password'];
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

    (fetch(`${import.meta.env.VITE_API_URL}/organizations/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    }))
      .then((response) => response.json())
      .then((data) => {
        if (!data.data) {
          return toast.update(id, {
            render: `${data.error}`, type: "error", isLoading: false, autoClose: 2000,
          });
        }
        if (data.data.access_token) {
          // console.log("token is ", data.data.access_token);
          localStorage.setItem('authToken', data.data.access_token);
          localStorage.setItem('isOrg', data.data.organization._id);
          localStorage.setItem('orgUID', data.data.organization.uid);
          toast.update(id, {
            render: "Login Successful", type: "success", isLoading: false, autoClose: 2000,
          });
          navigate('/');
          window.location.reload();
        }
        // console.log("ORG----------", data);
        // console.log("ORG id ----------", localStorage.getItem("isOrg"));

        return 0;
      })
      .catch((error) => {
        toast.update(id, {
          render: `${error.message}`, type: "error", isLoading: false, autoClose: 2000,
        });
        // console.log('POSTING error --> ', error);
      });
  };

  // console.log("Orglogin----", form);
  return (
    <LoginContainer image={organization}>
      <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
        <div className="relative">
          <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">
            UID
          </p>
          <input
            placeholder="Eg. org_24157813"
            type="text"
            value={form.uid}
            onChange={(e) => updateFormValue("uid", e.target.value)}
            className={`border lowercase placeholder-gray-400 focus:outline-none focus:border-accent w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md ${validationErrors.uid ? 'focus:border-red-500 border-red-300' : ''}`}
          />
          {validationErrors.uid && (
          <p className="text-red-500">{validationErrors.uid}</p>
          )}

        </div>
        <div className="relative">
          <p
            className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
  absolute"
          >
            Password
          </p>
          <input
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="border placeholder-gray-400 focus:outline-none
  focus:border-accent w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
  border-gray-300 rounded-md"
          />
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
