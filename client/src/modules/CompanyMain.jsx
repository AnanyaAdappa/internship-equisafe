import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import CompanyDetails from '../components/CompanyDetails';

function CompanyMain() {
  const [organization, setOrganization] = useState({});
  const { uid } = useParams();
  const fetchorganization = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/organizations/${uid}`,
        { mode: 'cors' },
      );
      if (response.status === 0) {
        throw new Error("Network error: The connection was reset.");
      }
      if (!response.ok) {
        throw new Error(`${response.status} : ${response.message}`);
      }
      const fetchedOrganization = await response.json();
      setOrganization(fetchedOrganization.data);
      // console.log('fetch organization------------', fetchedOrganization.data);
    } catch (error) {
      console.log("status code :", error);
      toast.error(`${error}`, {
        position: toast.POSITION.TOP_CENTER, autoClose: false,
      });
    }
  };
  useEffect(() => {
    fetchorganization();
  }, []);

  return (
    <div>
      <CompanyDetails
        edit="hidden"
        org_data={organization}
      />
    </div>
  );
}

export default CompanyMain;
