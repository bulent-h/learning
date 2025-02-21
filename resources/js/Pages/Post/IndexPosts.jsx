import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import CreatePost from '@/Pages/Post/CreatePost';
import PostList from '@/Pages/Post/PostList';
import MyPostList from '@/Pages/Post/MyPostList';

import { useState } from 'react';
import DangerButton from '@/Components/DangerButton';

export default function IndexPosts({ auth, posts, courses }) {

    // console.log(posts)

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Profile</h2>}
        >
            <Head title="Profile" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">

                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-2xl">
                        <CreatePost courses={courses} />
                    </div>
                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-2xl">

                        <PostList auth={auth} posts={posts} courses={courses} ></PostList>

                    </div>

                </div>
            </div>
        </AuthenticatedLayout >
    );
}
