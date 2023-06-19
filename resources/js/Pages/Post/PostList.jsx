import { useEffect, useRef, useState } from 'react';
import PostItem from '@/Pages/Post/PostItem';
import InputLabel from '@/Components/InputLabel';

export default function PostList({ posts, courses }) {

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
    return (

        <section >
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
            {/*
            {
                posts.map((post) =>

                    <PostItem key={post.id}
                        post={post}
                    >
                    </PostItem>)
            } */}

            {
                posts.map((post) => {
                    if (selectedCourse === '' || selectedCourse == post.course.id) {
                        return (
                            <PostItem key={post.id} post={post}></PostItem>
                        );
                    }
                    return null;
                })
            }
        </section>
    );

}
