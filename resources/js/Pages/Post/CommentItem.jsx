import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import DangerButton from '@/Components/DangerButton';
import OptionList from '@/Pages/Option/OptionList'
import SecondaryButton from '@/Components/SecondaryButton';
import { Link } from '@inertiajs/react';

import { useEffect, useRef, useState } from 'react';

export default function PosCommenttItem({ comment, setReplyComment }) {
    console.log(comment.replies.length)

    const [toggleShow, setToggleShow] = useState(false);

    return (
        <>
            <div key={comment.id} className='grid grid-cols-12 gap-4 place-content-end font-semibold'>
                <div className='col-span-1'>
                    <div
                        id='profile-image'
                        className=" bg-center bg-cover bg-no-repeat bg-gray-200 dark:bg-gray-400 bg-origin-padding w-10 h-10 rounded-full"
                        style={(comment.user?.avatar) && { backgroundImage: `url(/storage/${comment.user.avatar})` }}>
                    </div>
                </div>
                <div className="flex justify-start mb-2  col-span-10">
                    <div className="rounded-xl py-2 px-3 bg-blue-50 dark:bg-gray-900 drop-shadow-lg" style={{ maxWidth: '100%', minWidth: '20%', filter: 'dropShadow(0 7px 3px rgb(0 0 0 / 0.30))' }}>
                        <div>
                            <p className="text-xs m-1 text-gray-800 dark:text-gray-200">
                                {comment.user.name}
                            </p>
                        </div>
                        <div className="flex justify-between">
                            <div>
                                <p className=" m-1 ml-4 text-xs font-bold text-gray-800 dark:text-gray-200">
                                    {comment.text}
                                </p>
                            </div>
                        </div>
                        <div className="text-xs m-1 cursor-pointer hover:text-gray-900 text-gray-500 dark:text-gray-400"
                            onClick={() => setReplyComment(comment)}>
                            Reply
                        </div>
                    </div>
                </div>
            </div>

            {
                (comment.replies.length > 0) &&
                <>
                    <div onClick={() => setToggleShow(!toggleShow)} className="grid grid-cols-12 gap-4 place-content-end font-semibold">
                        <div className='col-start-2 mb-4 mx-4 col-span-4 text-blue-300 cursor-pointer text-xs'>
                            {(toggleShow) ? <>Hide</> : <>Show {comment.replies.length} replies</>}
                        </div>
                    </div>
                    <div className='mb-4'>
                        {(toggleShow) && comment.replies.map((comment) => (
                            <div key={comment.id} className='grid grid-cols-12 gap-4 place-content-end font-semibold'>
                                <div className='col-span-1'>
                                </div>

                                <div className="flex justify-start mb-2 col-span-9 w-full">
                                    <div
                                        id='profile-image'
                                        className="mr-4 bg-center bg-cover bg-no-repeat bg-gray-200 dark:bg-gray-400 bg-origin-padding w-10 h-10 rounded-full"
                                        style={(comment.user?.avatar) && { backgroundImage: `url(/storage/${comment.user.avatar})`,   minWidth: '2.5rem' }}>
                                    </div>
                                    <div className="rounded-xl py-2 px-3 bg-blue-50 dark:bg-gray-900 drop-shadow-lg" style={{ maxWidth: '90%', minWidth: '20%', filter: 'dropShadow(0 7px 3px rgb(0 0 0 / 0.30))' }}>
                                        <div>
                                            <p className="text-xs m-1 text-gray-800 dark:text-gray-200">
                                                {comment.user.name}
                                            </p>
                                        </div>
                                        <div className="flex justify-between">
                                            <div>
                                                <p className=" m-1 ml-4 text-xs font-bold text-gray-800 dark:text-gray-200">
                                                    {comment.text}
                                                </p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </>

            }
        </>
    )
}
{/* <div className='col-span-1 flex justify-center items-center'>
<svg
    className='fill-gray-500'
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    transform="rotate(180)"
    width="24px" height="24px"
>
    <g id="SVGRepo_bgCarrier" strokeWidth={0} />
    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
    <g id="SVGRepo_iconCarrier">
        {" "}
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.7071 3.29286C10.0976 3.68339 10.0976 4.31655 9.7071 4.70708L6.41421 7.99997H12C16.4183 7.99997 20 11.5817 20 16V20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20V16C18 12.6863 15.3137 9.99997 12 9.99997H6.41421L9.7071 13.2929C10.0976 13.6834 10.0976 14.3166 9.7071 14.7071C9.31658 15.0976 8.68342 15.0976 8.29289 14.7071L3.29289 9.70708C2.90237 9.31655 2.90237 8.68339 3.29289 8.29286L8.29289 3.29286C8.68342 2.90234 9.31658 2.90234 9.7071 3.29286Z"
        />{" "}
    </g>
</svg>
</div> */}
