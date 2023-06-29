import React, { useState } from 'react';

export default function CommentForm({ onCommentSubmit, isReply = false, user, postId }) {

    // const [user, setUser] = useState('');

    const [comment, setComment] = useState({
        post_id: postId,
        text: '',
        file: '',

    });

    const handleSubmit = (e) => {

        if (isReply) {
            onCommentSubmit(comment);
        } else {
            onCommentSubmit(comment);
        }
        setComment({
            ...comment,
            text: '',
        })
        console.log('OKKK')

    };

    return (
        <>
            <div className="bg-grey-100 px-4 py-4 flex items-center rounded-2xl m-5 ">

                <div className='flex-1'>
                    <textarea
                        id="texttext"
                        value={comment.text}
                        onChange={(e) => setComment({
                            ...comment,
                            text: e.target.value,
                        })}
                        required
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-2xl border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here...">
                    </textarea>
                </div>


                <div className="mx-3 text-gray-900 dark:text-gray-400 ">
                    <label htmlFor="media">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                            <path fill="currentColor"
                                d="M1.816 15.556v.002c0 1.502.584 2.912 1.646 3.972s2.472 1.647 3.974 1.647a5.58 5.58 0 0 0 3.972-1.645l9.547-9.548c.769-.768 1.147-1.767 1.058-2.817-.079-.968-.548-1.927-1.319-2.698-1.594-1.592-4.068-1.711-5.517-.262l-7.916 7.915c-.881.881-.792 2.25.214 3.261.959.958 2.423 1.053 3.263.215l5.511-5.512c.28-.28.267-.722.053-.936l-.244-.244c-.191-.191-.567-.349-.957.04l-5.506 5.506c-.18.18-.635.127-.976-.214-.098-.097-.576-.613-.213-.973l7.915-7.917c.818-.817 2.267-.699 3.23.262.5.501.802 1.1.849 1.685.051.573-.156 1.111-.589 1.543l-9.547 9.549a3.97 3.97 0 0 1-2.829 1.171 3.975 3.975 0 0 1-2.83-1.173 3.973 3.973 0 0 1-1.172-2.828c0-1.071.415-2.076 1.172-2.83l7.209-7.211c.157-.157.264-.579.028-.814L11.5 4.36a.572.572 0 0 0-.834.018l-7.205 7.207a5.577 5.577 0 0 0-1.645 3.971z">
                            </path>
                        </svg>
                        <input type="file" id="media" className="sr-only"
                            onChange={(e) => setComment({
                                ...comment,
                                file: e.target.files[0],
                            })}
                        />
                    </label>
                </div>
                <div className=" px-2" >
                    <button type="submit" onClick={handleSubmit} className="place-self-end text-gray-900 dark:text-gray-400 ">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" role="img"
                            aria-labelledby="sendIconTitle" strokeWidth="1" strokeLinecap="square"
                            strokeLinejoin="miter" fill="currentColor" >
                            <title id="sendIconTitle">Send</title>
                            <polygon points="21.368 12.001 3 21.609 3 14 11 12 3 9.794 3 2.394" />
                        </svg>
                    </button>
                </div>
                {/* <button onClick={handleSubmit}>{isReply ? 'Reply' : 'Comment'}</button> */}
            </div>

        </>
    );
};

