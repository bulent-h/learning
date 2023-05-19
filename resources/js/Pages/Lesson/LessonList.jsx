
import { useEffect, useState } from 'react';
import CourseItem from '@/Pages/Course/CourseItem';
import LessonItem from '@/Pages/Lesson/LessonItem';
import LessonCard from '@/Pages/Lesson/LessonCard';

export default function LessonList({ course, lessons }) {

    const [list, setList] = useState();

    function mapCourse() {
        setList(lessons.map((lesson) =>
            <LessonCard key={lesson.id} lesson={lesson}  ></LessonCard>
        ))
    }
    useEffect(() => {
        mapCourse()
    }, [])

    return (
        <section className="max-w-full">
            {/* <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">All Lessons</h2>
            </header>
            <LessonCard lesson={lessons[0]}></LessonCard>
            <div className="max-h-full border-2 border-gray-300 dark:border-gray-600 mt-8 rounded-lg bg-gray-200 dark:bg-gray-800 overflow-auto ">

                {list}
            </div> */}
                <div className='mb-6 text-black dark:text-white text-xl'>Lessons</div>

                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-2 ' >
                    {list}
                </div>

        </section >
    );
}
