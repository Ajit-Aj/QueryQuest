// import React from 'react';
// import { FaQuestion, FaRegEdit, FaUserPlus, FaBan } from 'react-icons/fa';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const CustomCard = () => {
//   return (
//     <div className="card mb-3 shadow-sm" style={{ borderRadius: '10px', padding: '10px' }}>
//       <div className="card-body">
//         <div className="d-flex justify-content-between align-items-center mb-3">
//           <div className='d-flex align-items-center'>
//             <FaQuestion className="icon" style={{ color: "#2E69FF", height: "24px" }} />
//             <h6 className='px-2 mb-0'>Questions for you</h6>
//           </div>
//           <button className="btn btn-sm btn-outline-secondary">X</button>
//         </div>
//         <div className="mb-2">
//           <p>Is “remove my daily reminder” correct in English grammar?</p>
//           <small className="text-muted">1 answer · Last followed Jul 12</small>
//         </div>
//         <div className="d-flex justify-content-center mt-3 align-items-center flex-wrap">
//           <div className="action-button mx-2 my-1" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
//             <FaUserPlus className="icon" style={{ marginRight: '5px' }} /> Follow
//           </div>
//           <span className="separator mx-2">|</span>
//           <div className="action-button mx-2 my-1" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
//             <FaRegEdit className="icon" style={{ marginRight: '5px' }} /> Answer
//           </div>
//           <span className="separator mx-2">|</span>
//           <div className="action-button mx-2 my-1" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
//             <FaBan className="icon" style={{ marginRight: '5px' }} /> Pass
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const App = () => {
//   return (
//     <div className="container">
//       {[...Array(5)].map((_, index) => (
//         <CustomCard key={index} />
//       ))}
//     </div>
//   );
// };

// export default App;

import React, { useState, useEffect } from "react";
import { FaQuestion, FaRegEdit, FaUserPlus, FaBan } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import useFetch from "../../Custom Hooks/UseFetch";
import Profile from "../../../assets/profile.jpg";

const CustomCard = () => {
  const [questions, setQuestions] = useState([]);
  const { data, loading, error } = useFetch("/api/questions/all");

  useEffect(() => {
    if (data) {
      setQuestions(data);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container">
      {questions.length > 0 ? (
        questions.map((question) => (
          <div
            key={question._id}
            className="card mb-3 shadow-sm mt-4"
            style={{ borderRadius: "10px" }}
          >
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex align-items-center">
                  <img
                    src={Profile}
                    // src={question.user.profilePicture}
                    alt={`${question.user.username}'s profile`}
                    className="rounded-circle"
                    style={{
                      width: "40px",
                      height: "40px",
                      objectFit: "cover",
                      marginRight: "10px",
                    }}
                  />
                  <h6 className="mb-0">{question.user.name}</h6>
                </div>
                <button className="btn btn-sm btn-outline-secondary">X</button>
              </div>
              <div className="mb-2">
                <h5>{question.title}</h5>
                <p>{question.content}</p>
                <small className="text-muted">
                  {question.answers.length} answer
                  {question.answers.length > 1 ? "s" : ""} · Last followed{" "}
                  {/* {new Date(question.createdAt).toLocaleDateString()} */}
                  {new Date(question.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </small>
              </div>
              <div className="d-flex justify-content-center mt-3 align-items-center flex-wrap">
                <div
                  className="action-button mx-2 my-1"
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <FaUserPlus className="icon" style={{ marginRight: "5px" }} />{" "}
                  Follow
                </div>
                <span className="separator mx-2">|</span>
                <div
                  className="action-button mx-2 my-1"
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <FaRegEdit className="icon" style={{ marginRight: "5px" }} />{" "}
                  Answer
                </div>
                <span className="separator mx-2">|</span>
                <div
                  className="action-button mx-2 my-1"
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <FaBan className="icon" style={{ marginRight: "5px" }} /> Pass
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No questions available.</p>
      )}
    </div>
  );
};

// const App = () => {
//   return (
//     <div className="container">
//       {[...Array(5)].map((_, index) => (
//         <CustomCard key={index} />
//       ))}
//     </div>
//   );
// };

export default CustomCard;
