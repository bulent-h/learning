import React, { useState,useEffect } from 'react';

// export default function CommentForm({ onCommentSubmit, isReply = false, user, lessonId }) {

export default function CommentForm({ onCommentSubmit, user, lessonId, replyComment, setReplyComment }) {

    const [comment, setComment] = useState({
        lesson_id: lessonId,
        text: '',
        file: '',
        fileUrl: '',
        parent_id: replyComment?.id
    });

    const handleSubmit = (e) => {

        onCommentSubmit(comment);
        clearInput();

    };

    useEffect(() => {
        setComment({
            ...comment,
            parent_id: replyComment?.id
        });
        console.log(replyComment)

    }, [replyComment])

    function handleTextChange(e) {
        setComment({
            ...comment,
            text: e.target.value
        });
    }
    function handleFileChange(e) {
        var tmp = e.target.files[0];
        setComment({
            ...comment,
            file: tmp,
            fileUrl: URL.createObjectURL(tmp)
        });
    }
    function handleRemoveFile() {
        setComment({
            ...comment,
            file: '',
            fileUrl: ''
        });
    }
    function handleRemoveReply() {
        setComment({
            ...comment,
            parent_id: ''
        });
        setReplyComment('');
    }
    function clearInput() {
        setComment({
            ...comment,
            text: '',
            file: '',
            parent_id: '',
            fileUrl: ''
        })
        setReplyComment(null);
        // document.getElementById("file").value = null;

    }
    function handleEnter(e) {
        if (e.key == 'Enter') {
            send();
        }
    }

    return (
        <>
            <div className="bg-grey-100 px-4 py-2 flex items-center rounded-2xl m-5  ">

                <div className='flex-1'>
                    <textarea
                        id="texttext"
                        value={comment.text}
                        onChange={handleTextChange}

                        // onChange={(e) => setComment({
                        //     ...comment,
                        //     text: e.target.value,
                        // })}
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
                            onChange={handleFileChange}
                        // onChange={(e) => setComment({
                        //     ...comment,
                        //     file: e.target.files[0],
                        // })}
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
            <div>
                {
                    comment.fileUrl
                    &&
                    <div className="" >
                        <div className="bg-gray-400/50 p-2  bottom-20 right-2 w-1/6 rounded-xl flex flex-col justify-center">
                            <button id="removeBtn" onClick={handleRemoveFile} className=" text-red-500 dark:text-red-500 text-sm hover:bg-gray-400 rounded-xl p-1 mb-1" >Remove</button>
                            <img id="preview" className="w-36 opacity-75 rounded-2xl" src={comment.fileUrl} />
                        </div>
                    </div>
                }
                {
                    comment.parent_id
                    &&
                    <div className="opacity-50 bg-gray-400/50  bottom-20 w-full flex rounded-2xl">
                        <button id="removeBtn" onClick={handleRemoveReply}
                            className="text-red-900 dark:text-red-500 text-sm  rounded-xl p-1 mb-1" >
                            <div className='font-bold' >
                                &#10005;
                            </div>
                        </button>
                        <div className="w-4/6 border-none m-2 p-3 rounded-xl bg-gray-50 dark:bg-gray-800 drop-shadow-xl border-gray-200 dark:border-gray-700 m-2">
                            {/* {
                                    (auth.auth.user.id == replyComment.id) ?
                                        <p className="text-sm text-blue-300 mt-1   truncate w-40">
                                            {auth.auth.user.name}
                                        </p>
                                        :
                                        <p className="text-sm text-blue-300 mt-1   truncate w-40">
                                            {currentUserChat.name}
                                        </p>

                                } */}
                            <p className="text-sm mt-1  text-gray-800 dark:text-gray-200">
                                {replyComment.text}
                            </p>
                        </div>
                    </div>
                }
            </div>
        </>
    );
};
