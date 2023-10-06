import React, { useState } from 'react';
import axios from 'axios';

const Form = ({ fetchData, setNewUserForm }) => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    department: '',
  });

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
      fetchData();
      setNewUserForm(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg w-[350px]">
      <h2 className="text-2xl font-semibold mb-4">User Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="firstname" className="block text-lg mb-2">
            First Name:
          </label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            required
            className="w-full p-2 bg-gray-700 rounded text-white"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="lastname" className="block text-lg mb-2">
            Last Name:
          </label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            required
            className="w-full p-2 bg-gray-700 rounded text-white"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-lg mb-2">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 bg-gray-700 rounded text-white"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="department" className="block text-lg mb-2">
            Department:
          </label>
          <input
            type="text"
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
            className="w-full p-2 bg-gray-700 rounded text-white"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
