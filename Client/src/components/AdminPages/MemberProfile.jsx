/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
// MergedComponent.jsx
import React from 'react';

const MergedComponent = () => {
  return (
    <div className="container mt-4">
      <h2>Member Profile</h2>

      {/* Profile Section */}
      <div className="d-flex align-items-center" style={{ marginBottom: '20px', position: 'relative' }}>
        <img
          src="https://jaybabani.com/zestreact/appnew/images/social/socmembers/member-3.jpg"
          alt="Profile"
          style={{ width: '150px', height: '150px', borderRadius: '8px', marginRight: '20px' }}
        />
        <div>
          <h3>Eric Nelson</h3>
          <p>Web Developer</p>
          <p>
            Humans can evaluate these visual elements in several situations to find a sense of balance.
            <br />
            <span className="text-muted">
              New York, USA &nbsp;|&nbsp; 340 Contacts &nbsp;|&nbsp; Tech Lead, YIAM
            </span>
          </p>
        </div>

        {/* Merged Button Code */}
        <div className="ml-auto" style={{ position: 'absolute', top: '10px', right: '20px' }}>
          {/* Smaller Buttons Positioned Higher */}
          <button className="btn btn-primary btn-sm" style={{ marginRight: '10px' }}>Add As Friend</button>
          <button className="btn btn-secondary btn-sm">Send Message</button>
        </div>
      </div>

      {/* Biography Section */}
      <div style={{ marginBottom: '20px' }}>
        <h4>Biography:</h4>
        <p>
          Social is an art form, social activity or cultural activity whose medium is sound and silence.
          The common elements of social are pitch (which governs melody and harmony), rhythm (and its
          associated concepts tempo, meter, and articulation), dynamics (loudness and softness), and
          the sonic qualities of timbre and texture (which are sometimes termed the "color" of a social sound).
        </p>
      </div>

      {/* Create New Post Section */}
      <div style={{ marginBottom: '20px' }}>
        <h4>Create a new post</h4>
        <div className="form-group">
          <textarea className="form-control" rows="3" placeholder="Write something..."></textarea>
        </div>
        <button className="btn btn-primary">Post</button>
      </div>

      {/* Group Work Section */}
      <div className="card mt-5">
        <div className="card-body">
          <h5 className="card-title">John Smith posted in group work</h5>
          <p className="card-text">
            <strong>"Balance"</strong> is a concept based on human perception and the complex nature of the human senses of weight and proportion. Humans can evaluate these visual elements in several situations to find a sense of balance.
          </p>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <button className="btn btn-link text-muted">15 Minutes ago</button>
              <button className="btn btn-link text-muted">584 Comments</button>
              <button className="btn btn-link text-muted">12k Likes</button>
              <button className="btn btn-link text-muted">Reply</button>
              <button className="btn btn-link text-muted">Favourite</button>
              <button className="btn btn-link text-muted">More</button>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <strong>Fin</strong>: Perfect info for the project. Great work! 😊
            <div className="text-muted small">10 Minutes ago · Liked</div>
          </li>
          <li className="list-group-item">
            <strong>Arun</strong>: Keep it up. Much appreciated effort.
            <div className="text-muted small">8 Minutes ago · Liked</div>
          </li>
        </ul>

        {/* Post Comment */}
        <div className="card-footer">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Post Comment"
            />
            <button className="btn btn-outline-secondary" type="button">
              <i className="bi bi-rocket"></i>
            </button>
          </div>
        </div>
      </div>
      <div className="card mt-5">
        <div className="card-body">
          <h5 className="card-title">John Smith posted in group work</h5>
          <p className="card-text">
            <strong>"Balance"</strong> is a concept based on human perception and the complex nature of the human senses of weight and proportion. Humans can evaluate these visual elements in several situations to find a sense of balance.
          </p>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <button className="btn btn-link text-muted">15 Minutes ago</button>
              <button className="btn btn-link text-muted">584 Comments</button>
              <button className="btn btn-link text-muted">12k Likes</button>
              <button className="btn btn-link text-muted">Reply</button>
              <button className="btn btn-link text-muted">Favourite</button>
              <button className="btn btn-link text-muted">More</button>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <strong>Fin</strong>: Perfect info for the project. Great work! 😊
            <div className="text-muted small">10 Minutes ago · Liked</div>
          </li>
          <li className="list-group-item">
            <strong>Arun</strong>: Keep it up. Much appreciated effort.
            <div className="text-muted small">8 Minutes ago · Liked</div>
          </li>
        </ul>

        {/* Post Comment */}
        <div className="card-footer">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Post Comment"
            />
            <button className="btn btn-outline-secondary" type="button">
              <i className="bi bi-rocket"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MergedComponent;
