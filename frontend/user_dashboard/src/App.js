import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import Form from './Component/Form';

function App() {
  const [data, setData] = useState([]);
  const [userId, setUserId] = useState('');
  const [form, setForm] = useState(false);

  //This function is used to fetch usersData from backend
  const fetchData = async () => {
    const response = await axios.get('http://localhost:3002/api/users/');
    setData(response.data);
  };

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
    <div className="App">
      <table>
        <thead>
          <tr>
            <th>firstName</th>
            <th>lastName</th>
            <th>email</th>
            <th>department</th>
            <th>delete</th>
            <th>update</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user._id}>
              <td>{user.firstname}</td>
              <td>{user.lastname}</td>
              <td>{user.email}</td>
              <td>{user.department}</td>
              <td>
                <button onClick={() => handleDelete(user._id)}>delete</button>
              </td>
              <td>
                <button onClick={() => openForm(user._id)}>update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {form && <Form userId={userId} fetchData={fetchData} setForm={setForm} />}
    </div>
  );
}

export default App;
