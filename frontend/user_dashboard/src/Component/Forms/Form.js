import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import validateInput from '../../Validations/validateInput';
import { config } from '../../App';

const Form = ({ userId, fetchData, setForm, userData }) => {
  // State to hold form data
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    department: '',
  });
  const { enqueueSnackbar } = useSnackbar();

  // Populate the form data if userData is provided
  useEffect(() => {
    if (userData) {
      setFormData({
        firstname: userData.firstname,
        lastname: userData.lastname,
        email: userData.email,
        department: userData.department,
      });
    }
  }, [userData]);

  // Handle changes in input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        department: formData.department,
      };
      // Validate user input using validateInput function
      if (validateInput(data, enqueueSnackbar)) {
        const response = await axios.patch(
          `${config.endpoint}/users/${userId}`,
          formData
        );
        console.log(response.data);
        // Reset the form after successful submission
        setFormData({
          firstname: '',
          lastname: '',
          email: '',
          department: '',
        });
        if (response.status === 200) {
          enqueueSnackbar('User Updated Successfully', { variant: 'success' });
        }
        fetchData();
        setForm(false);
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 500) {
        enqueueSnackbar('Internal Server Error', { variant: 'error' });
      }
    }
  };

  const closeForm = () => {
    setForm(false);
  };

  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg w-[350px]">
      <h2 className="mb-4 text-2xl font-semibold">User Update Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="firstname" className="block mb-2 text-lg">
            First Name:
          </label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            required
            className="w-full p-2 text-white bg-gray-700 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="lastname" className="block mb-2 text-lg">
            Last Name:
          </label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            required
            className="w-full p-2 text-white bg-gray-700 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 text-lg">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 text-white bg-gray-700 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="department" className="block mb-2 text-lg">
            Department:
          </label>
          <input
            type="text"
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
            className="w-full p-2 text-white bg-gray-700 rounded"
          />
        </div>
        <div className="flex justify-between">
          <button
            className="px-4 py-2 text-white bg-red-700 rounded hover:bg-red-800"
            onClick={closeForm}
          >
            Close
          </button>
          <button
            type="submit"
            className={`px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 ${
              formData.firstname === '' ||
              formData.lastname === '' ||
              formData.email === '' ||
              formData.department === ''
                ? 'opacity-50 cursor-not-allowed'
                : ''
            }`}
            disabled={
              formData.firstname === '' ||
              formData.lastname === '' ||
              formData.email === '' ||
              formData.department === ''
            }
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
