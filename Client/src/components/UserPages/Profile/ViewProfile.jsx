import React, { useEffect, useState } from 'react';
import AxiosInstance from '../../Axios/AxiosInstance';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { decodeToken } from "../../../utils/parseJwt";
import Loading from '../LoadingPage';
import { Link } from 'react-router-dom';

const SettingsPage = () => {
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState('');
  const [error, setError] = useState('');
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decodedToken = decodeToken(token);
      if (decodedToken) {
        setUserId(decodedToken.id);
      }
    }
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await AxiosInstance.get(`/api/auth/profile/${userId}`);
        const userData = response.data.user;

        setUser(userData);

        if (userData.profileImage) {
          setProfileImage(`http://localhost:5000${userData.profileImage}`);
        } else {
          setProfileImage('https://th.bing.com/th/id/OIP.T9s09Pl74H7Yzy0Wdj5ZjQHaHa?rs=1&pid=ImgDetMain');
        }

      } catch (error) {
        setError('Error fetching user data');
        toast.error(error.message || 'Error fetching user data');
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  if (!user) return <Loading />;

  return (
    <div className="mt-5">
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row">
        <div className="col-md-8 mx-auto">
          <div className="card">
            <div className="card-header text-end">
              <button className="btn btn-primary">Edit Profile</button>
            </div>
            <div className="card-body d-flex justify-content-center align-items-center">
              <img
                src={profileImage}
                alt="Profile"
                className="img-fluid rounded-circle"
                style={{ width: '150px', height: '150px' }}
              />
              <div className="ms-4 text-center">
                <h3>{user.name}</h3>
                <div className="d-flex justify-content-center">
                  <p className="me-2">0 Followers</p>
                  <p>0 Following</p>
                </div>
              </div>
            </div>

            <div className="tab-content mt-3">
              <ul className="nav nav-tabs justify-content-center">
                <li className="nav-item">
                  <Link to="/settings-page/posts" className="nav-link active">Questions</Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Posts</a>
                </li>
              </ul>
              <p className="text-center mt-3">You haven't shared, answered, or posted anything yet.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;


// import React, { useEffect, useState } from 'react';
// import AxiosInstance from '../Controller/AxiosInstance';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { decodeToken } from "../../utils/parseJwt";
// import Loading from './LoadingPage';
// import { Link } from 'react-router-dom';

// const SettingsPage = () => {
//   const [user, setUser] = useState(null);
//   const [profileImage, setProfileImage] = useState('');
//   const [error, setError] = useState('');
//   const [userId, setUserId] = useState("");

//   useEffect(() => {
//     // Get the token from local storage
//     const token = localStorage.getItem("token");

//     if (token) {
//       // Decode the token to get the user ID
//       const decodedToken = decodeToken(token);
//       if (decodedToken) {
//         setUserId(decodedToken.id);
//       }
//     }
//   }, []);

//   useEffect(() => {
//     // Function to fetch user data
//     const fetchUserData = async () => {
//       try {
//         const response = await AxiosInstance.get(`/api/auth/profile/${userId}`);
//         const userData = response.data.user;

//         // Set the user data and profile image
//         setUser(userData);

//         // Check if the profile image is available
//         if (userData.profileImage) {
//           setProfileImage(`http://localhost:5000${userData.profileImage}`);
//         } else {
//           setProfileImage('https://th.bing.com/th/id/OIP.T9s09Pl74H7Yzy0Wdj5ZjQHaHa?rs=1&pid=ImgDetMain');
//         }

//       } catch (error) {
//         // Handle any errors during data fetching
//         setError('Error fetching user data');
//         toast.error(error.message || 'Error fetching user data');
//       }
//     };

//     // Fetch user data if userId is available
//     if (userId) {
//       fetchUserData();
//     }
//   }, [userId]);

//   // Display loading page if user data hasn't been fetched yet
//   if (!user) return <Loading />;

//   return (
//     <div className="mt-5">
//       {error && <div className="alert alert-danger">{error}</div>}
//       <div className="row">
//         <div className="col-md-8 mx-auto">
//           <div className="card">
//             <div className="card-header text-end">
//               <button className="btn btn-primary">Edit Profile</button>
//             </div>
//             <div className="card-body d-flex justify-content-center align-items-center">
//               <img
//                 src={`http://localhost:5000/uploads/${profileImage}`}
//                 alt="Profile"
//                 className="img-fluid rounded-circle"
//                 style={{ width: '150px', height: '150px' }}
//               />
//               <div className="ms-4 text-center">
//                 <h3>{user.name}</h3>
//                 <div className="d-flex justify-content-center">
//                   <p className="me-2">0 Followers</p>
//                   <p>0 Following</p>
//                 </div>
//               </div>
//             </div>

//             <div className="tab-content mt-3">
//               <ul className="nav nav-tabs justify-content-center">
//                 <li className="nav-item">
//                   <Link to="/settings-page/posts" className="nav-link active">Questions</Link>
//                 </li>
//                 <li className="nav-item">
//                   <a className="nav-link" href="#">Posts</a>
//                 </li>
//               </ul>
//               <p className="text-center mt-3">You haven't shared, answered, or posted anything yet.</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SettingsPage;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// // import { useParams } from 'react-router-dom';

// const ProfilePage = () => {
//   // const { id } = useParams(); // Get the user ID from the URL parameters
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/auth/profile/66ae2141960012e8532bc880");
//         setUser(response.data.user);
//         console.log(response.data.user);

//         setLoading(false);
//       } catch (err) {
//         setError('Failed to fetch user profile');
//         setLoading(false);
//       }
//     };

//     fetchUserProfile();
//   }, []);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className="container">
//       <h1>User Profile</h1>
//       {user ? (
//         <div className="card">
//           <div className="card-body">
//                <img
//                 src={profileImage}
//                 alt={`${user.name}'s profile`}
//                 className="img-thumbnail mb-3"
//                 style={{ width: '150px', height: '150px', objectFit: 'cover' }}
//               />
//              <h5 className="card-title">{user.name}</h5>
//             <p className="card-text">Email: {user.email}</p>
//             <p className="card-text">Phone: {user.phone}</p>
//             <p className="card-text">Username: {user.username}</p>
//             {/* Add more fields as needed */}
//           </div>
//         </div>
//       ) : (
//         <p>User not found</p>
//       )}
//     </div>
//   );
// };

// export default ProfilePage;
