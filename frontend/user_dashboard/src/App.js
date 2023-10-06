import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import Form from './Component/Form';
import LoadingAnimation from './Animation/Animation';

function App() {
  const [data, setData] = useState([]);
  const [userId, setUserId] = useState('');
  const [form, setForm] = useState(false);
  const [animation, setAnimation] = useState(true);

  //This function is used to fetch usersData from backend
  const fetchData = async () => {
    const response = await axios.get('http://localhost:3002/api/users/');
    setData(response.data);
  };

  useEffect(() => {
    setTimeout(() => {
      setAnimation(false);
    }, 3000);
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:3002/api/users/');
      setData(response.data);
    };
    fetchData();
  }, []);

  // //This function is used to get the userId
  // const handleClick = (userId) => {
  //   console.log(`User id is ${userId}`);
  //   setUserIdToDelete(userId);
  // };

  //This function is used to delete the user with given userId
  const handleDelete = async (userId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3002/api/users/${userId}`
      );
      console.log(response.data);
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

  return (
    <div>
      {animation ? (
        <>
          <LoadingAnimation />
        </>
      ) : (
        <>
          <div
            className={`${
              form && 'brightness-50'
            } rounded-full flex justify-center items-center`}
            >
              <button onClick={handleAddData}>Add</button></div>
            <table className="bg-[#1e293b] text-white rounded-xl relative top-32 lg:w-3/4 sm:w-2/3">
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
                {data.map((user) => (
                  <tr
                    className="text-center hover:bg-gray-700 border border-black"
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
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="font-semibold bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                    <td className="px-3 py-2">
                      <button
                        onClick={() => openForm(user._id)}
                        className="font-semibold bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center items-center">
            {form && (
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
        </>
      )}
    </div>
  );
}

export default App;
