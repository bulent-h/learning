import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react'
import PostCommentForm from '@/Pages/Post/PostCommentForm'
import { createContext } from "react";
import CommentItem from '@/Pages/Post/CommentItem'
export default function Comments({ postId }) {

    const [comments, setComments] = useState([]);
    const [replyComment, setReplyComment] = useState();

    const fetchComments = () => {

        axios.get(route('postcomments.index', { post_id: postId }))
            .then((data) => {
                setComments(data.data);
                console.log(data.data)
            }).catch(err => {
                console.error(err);
            })

    };

    useEffect(() => {
        fetchComments();
    }, []);

    const handleCommentSubmit = (commentData) => {

        axios.post(route('postcomments.store'), commentData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
            .then(response => {
                if (response.status >= 200 && 299 >= response.status) {
                    fetchComments();
                    // clearInput();
                }
            })
            .catch(error => {
                console.log(error);
            })
        // router.post(route('comments.store'), commentData, {
        //     onSuccess: () => {
        //     },
        // });
    };

    const handleDelete = (commentData) => {

        axios.post(route('postcomments.destroy'), commentData)
            .then(response => {
                if (response.status >= 200 && 299 >= response.status) {
                    fetchComments();
                    // clearInput();
                }
            })
            .catch(error => {
                console.log(error);
            })
        // router.post(route('comments.store'), commentData, {
        //     onSuccess: () => {
        //     },
        // });
    };

    return (
        <div className='py-10'>
            <div className='mb-6 text-black dark:text-white' >Comments</div>
            <PostCommentForm onCommentSubmit={handleCommentSubmit} postId={postId} replyComment={replyComment} setReplyComment={setReplyComment} />

            <div className='bg-grey-100 px-4 py-4 mx-5 border-y-2 border-gray-300 dark:border-gray-700'>
                <div className="flex-1 overflow-auto h-screen">
                    {comments.map((comment) => (
                        <CommentItem comment={comment} setReplyComment={setReplyComment} key={comment.id}></CommentItem>
                    ))}
                </div>
            </div >
        </div >
    );
};


