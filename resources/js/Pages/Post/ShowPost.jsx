import SecondaryButton from '@/Components/SecondaryButton';
import { Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import PostComments from '@/Pages/Post/PostComments'

import { useEffect, useRef, useState } from 'react';

export default function Show({ post, auth }) {


    return (
        <>
            <AuthenticatedLayout
                user={auth.user}
                header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Profile</h2>}
            >
                <Head title="Profile" />

                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                        <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                            <section >
                                <header className='mb-4'>
                                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">{post.title}</h2>
                                </header>
                                <div className='  border-gray-300  dark:border-gray-700 rounded-lg mb-2'>
                                    <div className="w-full m-4 text-gray-700 dark:text-gray-300  ">
                                        {/* <div className="text-lg font-medium text-gray-900 dark:text-gray-100">
                                        </div> */}
                                        <div className="col-span-10 justify-self-start self-center mt-1 ">
                                            {post.content}
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <PostComments postId={post.id}></PostComments>
                                </div>

                            </section>
                        </div>
                    </div>

                </div>
            </AuthenticatedLayout>

        </>

    );
}
