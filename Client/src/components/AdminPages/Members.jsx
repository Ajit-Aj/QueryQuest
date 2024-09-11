/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';

const members = [
  {
    name: 'Grace Turner',
    role: 'Editor',
    age: 26,
    imgSrc: "https://jaybabani.com/zestreact/appnew/images/social/socmembers/member-4.jpg", // Replace with the correct image path
  },
  {
    name: 'Inane Smith',
    role: 'Painter',
    age: 31,
    imgSrc: "https://jaybabani.com/zestreact/appnew/images/social/socmembers/member-5.jpg", // Replace with the correct image path
  },
  {
    name: 'Colin Taylor',
    role: 'Developer',
    age: 35,
    imgSrc: "https://jaybabani.com/zestreact/appnew/images/social/socmembers/member-12.jpg", // Replace with the correct image path
  },
  {
    name: 'Fiona Vance',
    role: 'Journalist',
    age: 42,
    imgSrc: "https://jaybabani.com/zestreact/appnew/images/social/socmembers/member-14.jpg", // Replace with the correct image path
  },
  {
    name: 'Lily White',
    role: 'Designer',
    age: 33,
    imgSrc: "https://jaybabani.com/zestreact/appnew/images/social/socmembers/member-1.jpg", // Replace with the correct image path
  },
  {
    name: 'Leah Young',
    role: 'Photographer',
    age: 25,
    imgSrc: "https://jaybabani.com/zestreact/appnew/images/social/socmembers/member-15.jpg", // Replace with the correct image path
  },
  {
    name: 'Julia Vasar',
    role: 'Housewife',
    age: 32,
    imgSrc: "https://jaybabani.com/zestreact/appnew/images/social/socmembers/member-16.jpg", // Replace with the correct image path
  },
  {
    name: 'Evan Short',
    role: 'Web Developer',
    age: 37,
    imgSrc: "https://jaybabani.com/zestreact/appnew/images/social/socmembers/member-3.jpg", // Replace with the correct image path
  },
];

const MemberCard = ({ member }) => {
  return (
    <div className="col-md-3 mb-4">
      <div className="card">
        <img
          src={member.imgSrc}
          alt={member.name}
          style={{ height: '250px', objectFit: 'cover' }}
          className="card-img-top"
        />
        <div className="card-body text-center">
          <h5 className="card-title">{member.name}</h5>
          <p className="card-text">
            {member.role} ({member.age} years old)
          </p>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div className="container mt-4">
      <h4>Members</h4>
      <div className="row">
        {members.map((member, index) => (
          <MemberCard key={index} member={member} />
        ))}
      </div>
    </div>
  );
};

export default App;
