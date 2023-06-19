import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import DangerButton from '@/Components/DangerButton';
import OptionList from '@/Pages/Option/OptionList'
import SecondaryButton from '@/Components/SecondaryButton';
import { Link } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

export default function MyPostItem({ post }) {

    function handleDelete() {
        router.post(route('post.destroy', { post }))
    }
    console.log(post)
    return (
        <>
            <div className=' border-t border-gray-300  dark:border-gray-700  my-3'>
                <div className="w-full mx-2 my-2  text-gray-700 dark:text-gray-300  ">
                    <div className='flex items-center justify-center'>
                        <div className="flex items-center text-gray-900 dark:text-gray-100">
                            <div className='text-lg font-medium '>
                                {post.title}

                            </div>
                            <div className="text-sm ml-6 flex items-center justify-center">
                                {post.course.course_title}

                            </div>
                        </div>
                        <div className='ml-auto flex items-center mr-4 justify-center '>
                            <Link
                                href={route('post.show', { post_id: post.id })} >
                                <SecondaryButton className='mt-4'>Show</SecondaryButton>
                            </Link >
                            <DangerButton onClick={handleDelete} className='ml-4 mt-4'>Delete</DangerButton>

                        </div>

                    </div>
                    <div className='ml-2 '>
                        <div className="col-span-10 text-sm justify-self-start self-center my-1 ">
                            {post.content}
                        </div>
                        {(post.media_url) &&
                            <div className=" my-4 bottom-20 right-2 w-fit  rounded-xl overflow-hidden">
                                <div
                                    className=" w-36 h-36   bg-cover"
                                    style={{ backgroundImage: `url(/storage/${post.media_url})` }}
                                >
                                </div>
                            </div>
                        }

                    </div>
                    <div className='flex'>
                        <div>
                            <a href={route('chat', { selectedUser: post.user.id })}
                                className="text-xs my-2 mr-3 text-gray-800 dark:text-gray-200">
                                Published by <b>{post.user.name}</b>
                            </a>
                        </div>
                        <div
                            id='profile-image'
                            className="bg-center bg-cover bg-no-repeat bg-gray-200 dark:bg-gray-400 bg-origin-padding w-8 h-8 rounded-full"
                            style={(post.user.avatar) && { backgroundImage: `url(/storage/${post.user.avatar})` }}>
                        </div>
                    </div>


                </div>
            </div>
        </>

    );
}
