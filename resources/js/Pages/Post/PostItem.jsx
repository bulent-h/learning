import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import DangerButton from '@/Components/DangerButton';
import OptionList from '@/Pages/Option/OptionList'
import SecondaryButton from '@/Components/SecondaryButton';
import { Link } from '@inertiajs/react';

import { useEffect, useRef, useState } from 'react';

export default function PostItem({ post }) {

    return (
        <>
            <div className=' border border-gray-300  dark:border-gray-700 rounded-2xl mb-2'>
                <div className="w-full m-4 text-gray-700 dark:text-gray-300  ">
                    <div className='flex '>
                        <div
                            id='profile-image'
                            className=" bg-center bg-cover bg-no-repeat bg-gray-200 dark:bg-gray-400 bg-origin-padding w-12 h-12 rounded-full"
                            style={(post.user.avatar) && { backgroundImage: `url(/storage/${post.user.avatar})` }}>

                        </div>
                        <div>
                            <p className="text-sm m-2 text-gray-800 dark:text-gray-200">
                                {post.user.name}
                            </p>
                        </div>
                    </div>
                    <div className="text-lg font-medium text-gray-900 dark:text-gray-100">

                        {post.title}
                    </div>

                    <div className="col-span-10 justify-self-start self-center mt-1 ">
                        {post.content}
                    </div>
                    <Link href={route('post.show', { post_id: post.id })} >
                        <SecondaryButton className='mt-4'>Show</SecondaryButton>
                    </Link >

                </div>
            </div>
        </>

    );
}
