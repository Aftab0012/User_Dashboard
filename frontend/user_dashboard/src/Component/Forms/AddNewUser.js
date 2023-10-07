import React, { useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import validateInput from '../../Validations/validateInput';

const Form = ({ fetchData, setNewUserForm }) => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    department: '',
  });
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        department: formData.department,
      };
      if (validateInput(data, enqueueSnackbar)) {
        const response = await axios.post(
          `http://localhost:3002/api/users/add`,
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
        if (response.status === 201) {
          enqueueSnackbar('User Added Successfully', { variant: 'success' });
        }
        fetchData();
        setNewUserForm(false);
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        enqueueSnackbar('The user you are trying to add already exists', {
          variant: 'info',
        });
      } else if (error.inner) {
        // Handle Yup validation errors
        error.inner.forEach((validationError) => {
          enqueueSnackbar(validationError.message, { variant: 'warning' });
        });
      } else {
        console.error(error);
        enqueueSnackbar(
          'Something went wrong. Check that the backend is running, reachable, and returns valid JSON.',
          { variant: 'error' }
        );
      }
    }
  };

  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg w-[350px]">
      <h2 className="mb-4 text-2xl font-semibold">User Form</h2>
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
      </form>
    </div>
  );
};

export default Form;
