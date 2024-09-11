/* eslint-disable no-unused-vars */
import React from 'react';

function AddMember() {
  return (
    <div className="container mt-4">
      <h2>Add Member</h2>

      {/* Basic Info Section */}
      <div style={{ marginBottom: '20px' }}>
        <h4>Basic Info</h4>
        <div className="form-group">
          <label>Full Name</label>
          <input type="text" className="form-control" placeholder="Full Name" />
        </div><br></br>
        <div className="form-group">
          <label>Date of Birth</label>
          <input type="date" className="form-control" />
        </div><br></br>
        <div className="form-group">
          <label>Gender</label>
          <select className="form-control">
            <option>Select</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div><br></br>
        <div className="form-group">
          <label>Profile Image</label>
          <input type="file" className="form-control" />
        </div><br></br>
        <div className="form-group">
          <label>Address</label>
          <input type="text" className="form-control" placeholder="Street Address" />
        </div><br></br>
        <div className="form-group">
          <label>City</label>
          <input type="text" className="form-control" placeholder="City" />
        </div><br></br>
        <div className="form-group">
          <label>State</label>
          <select className="form-control">
            <option>Select</option>
            {/* Add more states as needed */}
            <option>State 1</option>
            <option>State 2</option>
          </select>
        </div>
        <button className="btn btn-primary mt-3">Save</button>
      </div>

      {/* Account Info Section */}
      <div style={{ marginBottom: '20px' }}>
        <h4>Account Info</h4>
        <div className="form-group">
          <label>Email</label>
          <input type="email" className="form-control" placeholder="Email" />
        </div><br></br>
        <div className="form-group">
          <label>Phone</label>
          <input type="text" className="form-control" placeholder="Phone Number" />
        </div><br></br>
        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" placeholder="Password" />
        </div><br></br>
        <div className="form-group">
          <label>Confirm Password</label>
          <input type="password" className="form-control" placeholder="Confirm Password" />
        </div>
        <button className="btn btn-primary mt-3">Save</button>
      </div>

      {/* Social Media Info Section */}
      <div style={{ marginBottom: '20px' }}>
        <h4>Social Media Info</h4>
        <div className="form-group">
          <label>Facebook URL</label>
          <input type="text" className="form-control" placeholder="Facebook URL" />
        </div><br></br>
        <div className="form-group">
          <label>Twitter URL</label>
          <input type="text" className="form-control" placeholder="Twitter URL" />
        </div><br></br>
        <div className="form-group">
          <label>LinkedIn URL</label>
          <input type="text" className="form-control" placeholder="LinkedIn URL" />
        </div>
        <button className="btn btn-primary mt-3">Save</button>
      </div>
    </div>
  );
}

export default AddMember;
