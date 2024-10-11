import React, { useEffect, useState } from "react";
import './rds-comp-chat.scss';
import { RdsIcon, RdsInput, RdsButton } from "../rds-elements";
import EmojiPicker from 'emoji-picker-react';

interface Comment {
    firstName: string;
    lastName: string;
    profilePic: string;
    date: string;
    comment: string;
    image?: string; // Optional image field for comments with images
}

interface RdsCompUserCommentsProps {
    comments: Comment[];
    currentUser: {
        firstName: string;
        lastName: string;
        profilePic: string;
    };
    allowDelete?: boolean; // Optional prop to control delete functionality
    width?: "small" | "medium" | "large"; // Width options,
    isEmojiPicker?: boolean;
    isFilepload?: boolean;
    dateFormat ?: string;
    onCommentCountChange?: (count: number) => void; // New callback prop
}

const RdsCompUserComments: React.FC<RdsCompUserCommentsProps> = ({
    comments,
    currentUser,
    allowDelete = false,
    width = "medium",// Default width
    isEmojiPicker = false,
    isFilepload = false,
    dateFormat = 'mm/dd/yyyy',
    onCommentCountChange // Callback prop
}) => {
    const [commentText, setCommentText] = useState<string>('');
    const [commentList, setCommentList] = useState<Comment[]>(comments);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false); // Toggle emoji picker

      // Use useEffect to notify the parent component when the comment list changes
      useEffect(() => {
        if (onCommentCountChange) {
            onCommentCountChange(commentList.length); // Notify parent with the updated count
        }
    }, [commentList, onCommentCountChange]);

    const handleAddComment = () => {
        if (commentText.trim() === '') return;

        const newComment: Comment = {
            firstName: currentUser.firstName,
            lastName: currentUser.lastName,
            profilePic: currentUser.profilePic,
            date: new Date().toLocaleDateString('en-US'),
            comment: commentText, // Emoji and text will be added here
        };

        setCommentList([...commentList, newComment]);
        setCommentText(''); // Clear input after adding the comment
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const newComment: Comment = {
                    firstName: currentUser.firstName,
                    lastName: currentUser.lastName,
                    profilePic: currentUser.profilePic,
                    date: new Date().toLocaleDateString('en-US'),
                    comment: '', // No text for image-only comments
                    image: reader.result as string, // Base64 image data
                };

                setCommentList([...commentList, newComment]); // Add the new image comment
            };
            reader.readAsDataURL(file); // Convert image to Base64
        }
    };

    const onEmojiClick = (event: any, emojiObject: any) => {
        setCommentText(prevText => prevText + emojiObject.emoji); // Append the selected emoji
        setShowEmojiPicker(false); // Close the emoji picker
    };

    const handleDeleteComment = (index: number) => {
        if (allowDelete) {
            const updatedComments = commentList.filter((_, i) => i !== index);
            setCommentList(updatedComments);
        }
    };
    const formatDate = (date: Date, dateFormat: string) => {
        debugger
        switch (dateFormat) {
            case 'mm/dd/yyyy':
                return date.toLocaleDateString('en-US'); // mm/dd/yyyy format
            case 'dd/mm/yyyy':
                return date.toLocaleDateString('en-GB'); // dd/mm/yyyy format
            case 'Default-with-time':
                return date.toLocaleString('en-US'); // mm/dd/yyyy with time
            default:
                return date.toLocaleDateString(); // Default format if none is provided
        }
    };

    return (
        <div className={`comments-container ${width}`}>
            {commentList.map((comment, index) => {
                const isCurrentUser = comment.firstName === currentUser.firstName && comment.lastName === currentUser.lastName;

                return (
                    <div key={index} className={`comment-box ${isCurrentUser ? 'current-user' : 'other-user'}`}>
                        <div className={`d-flex ${isCurrentUser ? '' : 'flex-row-reverse'}`}>
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
                            <div className="comment-content">
                                <div className="comment-text">
                                    {comment.comment}
                                    {comment.image && <img src={comment.image} alt="uploaded" className="comment-image" />}

                                </div>
                            </div>

                            {/* Show delete icon for current user comments */}
                            {allowDelete && isCurrentUser && (
                                <span className="d-flex align-items-center ms-1">
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
                                </span>
                            )}
                        </div>

                        <div className={`comment-footer d-flex ${isCurrentUser ? 'justify-content-start' : 'justify-content-end'}`}>
                            <div className="username">{comment.firstName} {comment.lastName}</div>
                            <div className="date text-muted ms-2">
                                <div className="date text-muted ms-2">
                                {formatDate(new Date(comment.date), dateFormat)}
                                </div>                             
                                
                                </div>
                        </div>
                    </div>
                );
            })}

            <div className="comment-input mt-4">
                {/* Emoji Picker */}
                {showEmojiPicker && (
                    <div className="emoji-popup">
                        <EmojiPicker onEmojiClick={onEmojiClick} />
                    </div>
                )}
                {isFilepload && (

                    <span className="me-2">
                        <RdsButton colorVariant="primary" icon="plus" size="medium" onClick={() => document.getElementById('fileUpload')?.click()} />
                        <input
                            id="fileUpload"
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleImageUpload}
                        />
                    </span>
                )}

                {isEmojiPicker && (
                    <span className="me-2">
                        <RdsIcon
                            name="smileys"
                            fill={false}
                            stroke={true}
                            colorVariant="neutral"
                            isCursorPointer={true}
                            width="30px"
                            height="30px"
                            onClick={() => setShowEmojiPicker(!showEmojiPicker)} // Toggle emoji picker
                        />
                    </span>


                )

                }



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
                        />
                    </span>
                </span>
            </div>
        </div>
    );
};

export default RdsCompUserComments;
