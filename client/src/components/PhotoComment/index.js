import React from 'react';
import { Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import dayjs from 'dayjs';

function PhotoComment(comment) {
  // foreach in comments, create a comment component
  // return the array of comment components

  return (
    <div className="comment">
      <div className="commentOrientation">
        <img
          src={comment.comment.createdBy.profilePicture}
          className="avatarCommentor"
          alt="avatarCommentor"
        />
        <div className="commentContent">
          <div className="nameRating">
            <p className="commentAuthor">
              <Link style={{ color: '#2e3547', fontWeight: 'bold' }}>
                {comment.comment.createdBy.username}
              </Link>
            </p>
            <Rating name="read-only" value={0} readOnly />
          </div>
          {/* <div className="imageDescription">
           <p>Insert the comment</p>
         </div> */}
        </div>
      </div>
      <div className="commentText">
        <p style={{ marginBottom: '0.3rem' }}>{comment.comment.text}</p>
      </div>
      <div className="commentDate">
        <p>
          Posted:{' '}
          <span>
            {dayjs
              .unix(comment.comment.createdAt / 1000)
              .format('MMM DD YYYY h:mm A')}
          </span>
        </p>
      </div>
    </div>
  );
}

export default PhotoComment;
