/* eslint-disable no-unused-vars */
import React from 'react';

function EditMembers() {
  return (
    <div className="container mt-4">
      <h2>Edit Member</h2>
      <br></br>
      {/* Basic Info Section */}
      <div style={{ marginBottom: '20px' }}>
        <h4>Basic Info</h4>
        <div className="form-group">
          <label>Full Name</label>
          <input type="text" className="form-control" placeholder="Full Name" defaultValue="John Doe" />
        </div><br></br>
        <div className="form-group">
          <label>Date of Birth</label>
          <input type="date" className="form-control" defaultValue="1990-01-01" />
        </div><br></br>
        <div className="form-group">
          <label>Gender</label>
          <select className="form-control">
            <option>Select</option>
            <option selected>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div><br></br>
        <div className="form-group">
          <label>Bio</label>
          <textarea className="form-control" rows="3" placeholder="A short bio">Lorem ipsum dolor sit amet...</textarea>
        </div><br></br>
        <div className="form-group">
          <label>Profile Image</label>
          <input type="file" className="form-control" />
        </div><br></br>
        <div className="form-group">
          <label>Phone</label>
          <input type="text" className="form-control" placeholder="Phone Number" defaultValue="+123456789" />
        </div><br></br>
        <div className="form-group">
          <label>Address</label>
          <input type="text" className="form-control" placeholder="Street Address" defaultValue="1234 Main St" />
        </div><br></br>
        <div className="form-group">
          <input type="text" className="form-control mt-2" placeholder="Apartment, suite, etc." />
        </div><br></br>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label>City</label>
            <input type="text" className="form-control" placeholder="City" defaultValue="Chennai" />
          </div><br></br>
          <div className="form-group col-md-4">
            <label>State</label>
            <select className="form-control">
              <option>Select</option>
              <option selected>Maharashtra</option>
              <option>Chennai</option>
              <option>Bengalore</option>
            </select>
          </div><br></br>
          <div className="form-group col-md-2">
            <label>Zip</label>
            <input type="text" className="form-control" placeholder="Zip Code" defaultValue="10001" />
          </div><br></br>
        </div>
        <button className="btn btn-primary mt-3">Save</button>
      </div>

      {/* Account Info Section */}
      <div style={{ marginBottom: '20px' }}>
        <h4>Account Info</h4>
        <div className="form-group">
          <label>Email</label>
          <input type="email" className="form-control" placeholder="Email" defaultValue="john@example.com" />
        </div><br></br>
        <div className="form-group">
          <label>Phone</label>
          <input type="text" className="form-control" placeholder="Phone Number" defaultValue="+123456789" />
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
          <input type="text" className="form-control" placeholder="Facebook URL" defaultValue="https://facebook.com/johndoe" />
        </div><br></br>
        <div className="form-group">
          <label>Twitter URL</label>
          <input type="text" className="form-control" placeholder="Twitter URL" defaultValue="https://twitter.com/johndoe" />
        </div><br></br>
        <div className="form-group">
          <label>LinkedIn URL</label>
          <input type="text" className="form-control" placeholder="LinkedIn URL" defaultValue="https://linkedin.com/in/johndoe" />
        </div>
        <button className="btn btn-primary mt-3">Save</button>
      </div>
    </div>
  );
}

export default EditMembers;
