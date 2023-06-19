import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import CreatePost from '@/Pages/Post/CreatePost';
import PostList from '@/Pages/Post/PostList';
import MyPostList from '@/Pages/Post/MyPostList';
import { useEffect, useRef, useState } from 'react';
import MyPostItem from '@/Pages/Post/MyPostItem';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import { Link } from '@inertiajs/react';
export default function IndexPosts({ auth, posts, courses }) {
    const [selectedCourse, setSelectedCourse] = useState('');

    function mapCourses() {
        setList(courses.map((course) =>
            <option key={course.id}
                value={course.id}
            >{course.course_title}</option>
        ))
    }
    const [list, setList] = useState();
    const handleSelectCourse = (e) => {
        setSelectedCourse(e.target.value);
    }

    useEffect(() => {
        if (courses) {
            mapCourses()
        }

    }, [courses])
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
                        <section>
                            <div className='flex w-full my-3'>

                                <Link
                                    href={route('posts.index')} >
                                    <PrimaryButton className=''>Back</PrimaryButton>
                                </Link >

                            </div>
                            <header className='mb-4 flex '>

                                <div className='flex justify-center items-center'>
                                    <p className="text-lg font-medium text-gray-900 dark:text-gray-100">Discuss Forums</p>

                                </div>
                                <div className='w-1/4 ml-auto flex'>
                                    <select
                                        required
                                        name='course_id'
                                        value={selectedCourse.course_id}
                                        onChange={handleSelectCourse}
                                        className='mt-1 border-gray-300 block w-full dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-2xl shadow-sm '
                                    >
                                        <option
                                            value="">All</option>
                                        {list}
                                    </select>
                                </div>
                            </header>
                            {
                                posts.map((post) => {
                                    if (selectedCourse === '' || selectedCourse == post.course.id) {
                                        return (
                                            <MyPostItem key={post.id} post={post}></MyPostItem>
                                        );
                                    }
                                    return null;
                                })
                            }
                        </section>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout >
    );
}
