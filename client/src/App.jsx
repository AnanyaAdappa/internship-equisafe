import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import './App.css';
import LoadingBar from 'react-top-loading-bar';
import { useContext } from 'react';
import Header from './components/Header';
import Home from './modules/Home';
import CompanyListings from './modules/CompanyListings';
import DevelopersListing from './modules/DevelopersListing';
import ProjectListings from './modules/ProjectListings';
import CompanyMain from './modules/CompanyMain';
import ProjectMain from './modules/ProjectMain';
import DeveloperMain from './modules/DeveloperMain';
import Login from './modules/Login';
import Register from './modules/Register';
import RegisterDeveloper from './modules/RegisterDeveloper';
import RegisterOrganization from './modules/RegisterOrganization';
import AboutUs from './modules/AboutUs';
import ProjectAdd from './modules/ProjectAdd';
import DevLogin from './components/form/login/DevLogin';
import OrgLogin from './components/form/login/OrgLogin';
import Profile from './components/profile/Profile';
import { loadingContext } from './components/context/LoadingState';

function App() {
  const progressState = useContext(loadingContext);
  const { progress } = progressState;

  // console.log("env : ", import.meta.env.VITE_API_URL);
  // console.log("env : ", process.env.REACT_APP_API_URL);
  return (
    <>
      <LoadingBar
        color="#6c47ff"
        height={10}
        progress={progress}
      />
      <Header />
      <div className="pt-20">
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/projects"
            element={<ProjectListings />}
          />
          <Route
            path="/projects/create"
            element={<ProjectAdd />}
          />
          <Route
            path="/about"
            element={<AboutUs />}
          />
          <Route
            path="/projects/:uid"
            element={<ProjectMain />}
          />
          <Route
            path="/companies"
            element={<CompanyListings />}
          />
          <Route
            path="/companies/:uid"
            element={<CompanyMain />}
          />
          {/* -------------Company Profile----------------- */}
          <Route
            path="/companies/:id"
            element={<CompanyMain />}
          />
          <Route
            path="/developers"
            element={<DevelopersListing />}
          />
          <Route
            path="/developers/:uid"
            element={<DeveloperMain />}
          />

          {/* -------------Dev Profile----------------- */}
          <Route
            path="/profile"
            element={<Profile />}
          />
          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path="/login/developer"
            element={<DevLogin />}
          />
          <Route
            path="/login/company"
            element={<OrgLogin />}
          />
          <Route
            path="/register"
            element={<Register />}
          />
          <Route
            path="/register/developer"
            element={<RegisterDeveloper />}
          />
          <Route
            path="/register/company"
            element={<RegisterOrganization />}
          />
        </Routes>
      </div>
      <ToastContainer autoClose={2000} />
    </>
  );
}

export default App;
