import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import Form from './Component/Forms/Form';
import LoadingAnimation from './Animation/Animation';
import AddNewUser from './Component/Forms/AddNewUser';
import Navbar from './Navbar/Navbar';
import { useSnackbar } from 'notistack';
import Pagination from './Component/Pagination';

export const config = {
  endpoint: `http://localhost:3002/api`,
};

function App() {
  const [data, setData] = useState([]);
  const [userId, setUserId] = useState('');
  const [form, setForm] = useState(false);
  const [animation, setAnimation] = useState(true);
  const [newUserForm, setNewUserForm] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(8);

  //This function is used to fetch usersData from backend
  const fetchData = async () => {
    const response = await axios.get(`${config.endpoint}/users`);
    setData(response.data);
  };

  useEffect(() => {
    // Remove loading animation after a delay
    setTimeout(() => {
      setAnimation(false);
    }, 1000);
  });

  useEffect(() => {
    // Fetch data when the component mounts
    fetchData();
  }, []);

  //This function is used to delete the user with given userId
  const handleDelete = async (userId) => {
    try {
      const response = await axios.delete(`${config.endpoint}/users/${userId}`);
      console.log(response.data);
      if (response.status === 200) {
        enqueueSnackbar('Deleted Successfull', { variant: 'success' });
      } else {
        enqueueSnackbar('Deletion Failed', { variant: 'error' });
      }
      fetchData(); // Fetch updated data after deletion
    } catch (error) {
      console.log(error);
    }
  };

  //This function is used to delete the user with given userId
  const openForm = async (userId) => {
    setUserId(userId);
    setForm(!form);
  };

  // Toggle the visibility of the "Add New User" form
  const openNewUserForm = async (userId) => {
    setNewUserForm(!newUserForm);
  };

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPosts = data.slice(firstPostIndex, lastPostIndex);

  return (
    <div>
      {animation ? (
        // Display loading animation while data is loading
        <>
          <LoadingAnimation />
        </>
      ) : (
        <>
          <Navbar openNewUserForm={openNewUserForm} />
          <div
            className={`${form && 'brightness-50'} ${
              newUserForm && 'brightness-50'
            } relative top-8 rounded-full flex flex-col justify-center items-center`}
          >
            {/* User Table */}
            <table className="bg-[#1e293b] text-white rounded-xl table-width">
              <thead>
                <tr className="">
                  <th className="px-3 py-2 text-lg">First name</th>
                  <th className="px-3 py-2 text-lg">Last name</th>
                  <th className="px-3 py-2 text-lg">E-mail</th>
                  <th className="px-3 py-2 text-lg">Department</th>
                  <th className="px-3 py-2 text-lg">Delete</th>
                  <th className="px-3 py-2 text-lg">Update</th>
                </tr>
              </thead>
              <tbody>
                {currentPosts.map((user) => (
                  <tr
                    className="text-center border border-black hover:bg-gray-700"
                    key={user._id}
                  >
                    <td className="px-3 py-2 font-semibold">
                      {user.firstname}
                    </td>
                    <td className="px-3 py-2 font-semibold">{user.lastname}</td>
                    <td className="px-3 py-2 font-semibold">{user.email}</td>
                    <td className="px-3 py-2 font-semibold">
                      {user.department}
                    </td>
                    <td className="px-3 py-2">
                      {/* Delete Button */}
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="px-2 py-1 font-semibold text-white bg-red-500 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                    <td className="px-3 py-2">
                      {/* Update Button */}
                      <button
                        onClick={() => openForm(user._id)}
                        className="px-2 py-1 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="absolute top-[500px] pb-4">
              {/* Pagination Component */}
              <Pagination
                totalPosts={data.length}
                setCurrentPage={setCurrentPage}
                postsPerPage={postPerPage}
                currentPage={currentPage}
              />
            </div>
          </div>
          <div className="flex items-center justify-center">
            {form && (
              // Display the Update User form when 'form' is true
              <div className="absolute top-32">
                <Form
                  userId={userId}
                  userData={data.find((user) => user._id === userId)}
                  fetchData={fetchData}
                  setForm={setForm}
                />
              </div>
            )}
          </div>
          <div className="flex items-center justify-center">
            {newUserForm && (
              // Display the Add New User form when 'newUserForm' is true
              <div className="absolute top-32">
                <AddNewUser
                  fetchData={fetchData}
                  setNewUserForm={setNewUserForm}
                />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
