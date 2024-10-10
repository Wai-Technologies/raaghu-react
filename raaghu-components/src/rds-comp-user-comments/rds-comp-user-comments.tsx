/* eslint-disable quotes */
import React, { useState } from "react";
import './rds-comp-user-comments.scss';
import { RdsIcon, RdsInput, RdsButton } from "../rds-elements";

interface Comment {
    firstName: string;
    lastName: string;
    profilePic: string;
    date: Date;
    comment: string;
}

interface RdsCompUserCommentsProps {
    comments: Comment[];
    currentUser: {
        firstName: string;
        lastName: string;
        profilePic: string;
    };
    allowDelete?: boolean; // Optional prop to control delete functionality
    width?: "small" | "medium" | "large"; // Width options
}

const RdsCompUserComments: React.FC<RdsCompUserCommentsProps> = ({ 
    comments, 
    currentUser, 
    allowDelete = false,
    width = "medium" // Default width
}) => {
    const [commentText, setCommentText] = useState('');
    const [commentList, setCommentList] = useState<Comment[]>(comments);
    const [lastUserCommentIndex, setLastUserCommentIndex] = useState<number | null>(null); // Track last comment index

    const handleAddComment = () => {
        if (commentText.trim() === '') return;

        const newComment: Comment = {
            firstName: currentUser.firstName,
            lastName: currentUser.lastName,
            profilePic: currentUser.profilePic,
            date: new Date(),
            comment: commentText,
        };

        setCommentList([...commentList, newComment]);
        setCommentText('');
        setLastUserCommentIndex(commentList.length); // Update the index of the last user comment
    };

    const handleDeleteComment = (index: number) => {
        if (allowDelete) {
            const updatedComments = commentList.filter((_, i) => i !== index);
            setCommentList(updatedComments);

            // Reset lastUserCommentIndex if the deleted comment was the last one
            if (lastUserCommentIndex === index) {
                setLastUserCommentIndex(null);
            } else if (lastUserCommentIndex !== null && index < lastUserCommentIndex) {
                setLastUserCommentIndex(prevIndex => (prevIndex !== null ? prevIndex - 1 : null));
            }
        }
    };

    return (
        <div className={`comments-container ${width}`}>
            {commentList.map((comment, index) => {
                const isCurrentUser = comment.firstName === currentUser.firstName && comment.lastName === currentUser.lastName; // Check if the comment is from the current user
                const isLastCurrentUserComment = isCurrentUser && lastUserCommentIndex === index;

                return (
                    <div key={index} className={`comment-box ${isCurrentUser ? 'current-user' : 'other-user'}`}>
                        {/* Current user image on the left */}
                        <div className={`d-flex ${isCurrentUser ? '' : 'flex-row-reverse'}`}  >
                        {isCurrentUser && (
                            <div className="profile-initials">
                                {comment.profilePic && comment.profilePic.trim() !== "" ? (
                                    <img 
                                        src={comment.profilePic} 
                                        alt={`${comment.firstName}'s profile`} 
                                        className="profile-pic" 
                                    />
                                ) : (
                                    <div className="initials">
                                        {`${comment.firstName.charAt(0)}${comment.lastName.charAt(0)}`}
                                    </div>
                                )}
                            </div>
                        )}
                        {!isCurrentUser && (
                            <div className="profile-initials" >
                                {comment.profilePic && comment.profilePic.trim() !== "" ? (
                                    <img
                                        src={comment.profilePic}
                                        alt={`${comment.firstName}'s profile`}
                                        className="profile-pic"
                                    />
                                ) : (
                                    <div className="initials">
                                        {`${comment.firstName.charAt(0)}${comment.lastName.charAt(0)}`}
                                    </div>
                                )}
                            </div>
                        )}
                            {/* Comment content */}

                        <div className="comment-content">
                            <div className="comment-text">
                                {comment.comment}
                                {/* Show delete icon only for the last comment of the current user */}
                               
                            </div>
                                
                            </div>
                            <span className="d-flex align-items-center ms-1">
                            {allowDelete && isLastCurrentUserComment && (
                                <RdsIcon
                                    name="delete"
                                    fill={false}
                                    stroke={true}
                                    colorVariant="danger"
                                    isCursorPointer={true}
                                    width="18px"
                                    height="18px"
                                    onClick={() => handleDeleteComment(index)}
                                />
                                )}
                            </span>
                       </div>

                        <div className={`comment-footer d-flex ${isCurrentUser ? 'justify-content-start' : 'justify-content-end'}`}>
                            <div className="username">{comment.firstName} {comment.lastName}</div>
                            <div className="date text-muted ms-2">{comment.date.toLocaleString()}</div>
                        </div>
                        {/* Other user image on the right */}
                      
                    </div>
                );
            })}

            <div className="comment-input mt-4">
                <span className="me-2"><RdsButton
                    colorVariant="primary"
                    icon="plus"
                    size="medium"
                /></span>
                <span className="me-2"><RdsIcon
                    name="smileys"
                    fill={false}
                    stroke={true}
                    colorVariant="neutral"
                    isCursorPointer={true}
                    width="30px"
                    height="30px"
                /></span>
                <span className="w-100 d-flex input-box border p-1">
                    <span className="w-100">
                <RdsInput
                    value={commentText}
                    inputType="text"                                 
                    placeholder="Type comment..."
                    name="comment"                                   
                    onChange={(e) => setCommentText(e.target.value)}                                  
                    showIcon={true}
                        />
                    </span>
                    <span className="d-flex align-items-center mx-2">
                <RdsIcon
                    name="send_email"
                    fill={false}
                    stroke={true}
                    colorVariant="neutral"
                    isCursorPointer={true}
                    width="30px"
                    height="30px"
                    onClick={handleAddComment}
                        /></span></span>
            </div>
        </div>
    );
};

export default RdsCompUserComments;
