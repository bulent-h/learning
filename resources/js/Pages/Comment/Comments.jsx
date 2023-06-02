import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react'
import CommentForm from '@/Pages/Comment/CommentForm';

export default function Comments({ lessonId }) {

    const [comments, setComments] = useState([]);

    const fetchComments = () => {

        axios.get(route('comments.index', { lesson_id: lessonId }))
            .then((data) => {
                console.log(data.data)
                setComments(data.data);

            }).catch(err => {
                console.error(err);
            })

    };

    useEffect(() => {
        fetchComments();
    }, []);

    const handleCommentSubmit = (commentData) => {

        axios.post(route('comments.store'), commentData, {
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

    // const handleReplySubmit = (parentId, replyData) => {
    //     router.post(route('comments.storeReply', { parentId }), replyData, {
    //         onSuccess: () => {
    //             fetchComments();
    //         },
    //     });
    // };

    return (
        <div className='py-10'>
            <div className='mb-6 text-black dark:text-white text-xl font-bold' >Comments</div>
            <CommentForm onCommentSubmit={handleCommentSubmit} lessonId={lessonId} />

            <div className='bg-grey-100 px-4 py-4  mx-5  border-y-2 border-gray-300 dark:border-gray-700'>
                <div className="flex-1 overflow-auto h-96">
                    {comments.map((comment) => (

                        <div key={comment.id} className='grid grid-cols-12 gap-4 place-content-end font-semibold'>
                            <div className='col-span-1'>
                                <div
                                    id='profile-image'
                                    className=" bg-center bg-cover bg-no-repeat bg-gray-200 dark:bg-gray-400 bg-origin-padding w-12 h-12 rounded-full"
                                    style={(comment.user.avatar) && { backgroundImage: `url(/storage/${comment.user.avatar})` }}>

                                </div>
                            </div>
                            <div className="flex justify-start mb-2 mx-4 col-span-11">
                                <div className="rounded-xl py-2 px-3 bg-blue-50 dark:bg-gray-900 drop-shadow-lg" style={{ maxWidth: '100%', filter: 'dropShadow(0 7px 3px rgb(0 0 0 / 0.30))' }}>
                                    <div>
                                        <p className="text-sm m-2 text-gray-800 dark:text-gray-200">
                                            {comment.user.name}
                                        </p>
                                    </div>
                                    <div className="flex justify-between">

                                        <div>
                                            <p className=" m-2 text-gray-800 dark:text-gray-200">
                                                {comment.text_content}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* <CommentForm lessonId={lessonId}
                        onCommentSubmit={(replyData) => handleReplySubmit(comment.id, replyData)}
                        isReply
                    /> */}

                            {/* {comment.replies &&
                        comment.replies.map((reply) => (
                            <div key={reply.id}>
                                <p>{reply.content}</p>
                            </div>
                        ))} */}
                        </div>
                    ))}
                </div>
            </div >
        </div >
    );
};


