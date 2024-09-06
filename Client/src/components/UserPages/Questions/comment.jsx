/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import postData from '../postData.json';

const Post = () => {
    const { author, time, content, image, engagement } = postData;
    const [showCommentBox, setShowCommentBox] = useState(false);
    const [comment, setComment] = useState('');
    

    const containerStyle = {
        maxWidth: '500px',
        margin: '20px auto',
        padding: '15px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        backgroundColor: '#f9f9f9'
    };

    const imgStyle = {
        width: '100%',
        borderRadius: '5px',
        marginBottom: '15px'
    };

    const handleCommentIconClick = () => {
        setShowCommentBox(!showCommentBox);
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleCommentSubmit = () => {
        // alert(`Comment Submitted: ${comment}`);
        setComment(''); // Clear the comment box after submission
        setShowCommentBox(false); // Optionally hide the comment box
    };

    return (
        <div style={containerStyle}>
            <div className="d-flex justify-content-between align-items-center">
                <strong>{author}</strong>
                <small>{time}</small>
            </div>
            <p>{content.text}</p>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHQKhGFVlPZ5gdSNqRCKPpkDQUfdC29RngrqzSnpuCIGUzzazn6O6E9kRPMyb1m314eTc&usqp=CAU" alt="Suresh Raina" style={imgStyle} />
            <p>{content.details}</p>
            <div className="d-flex justify-content-between">
                <span>👍 {engagement.upvotes}</span>
                <span onClick={handleCommentIconClick} style={{ cursor: 'pointer' }}>💬 {engagement.comments}</span>
                <span>🔗 {engagement.shares}</span>
            </div>
            {showCommentBox && (
                <div className="mt-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Add a comment..."
                        value={comment}
                        onChange={handleCommentChange}
                    />
                    <button className="btn btn-primary mt-2" onClick={handleCommentSubmit}>Add comment</button>
                </div>
            )}
        </div>
    );
};

export default Post;
