import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import CourseStudentCard from '@/Components/Course/CourseStudentCard';
import { useEffect, useState } from 'react';

export default function IndexMyCourses({courses}) {

    const [courseCardList, setCourseCardList] = useState();

    function mapCourse() {
        setCourseCardList(courses.map((course) =>
            <CourseStudentCard key={course.id} course={course}></CourseStudentCard>
        ))
    }
    useEffect(() => {
        if (courses) {
            mapCourse()
        }
    }, [courses])

    return (
        <>
            <section className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                <div className='mb-6 text-black dark:text-white text-xl' > Find Courses</div>

                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-2 ' >

                    {courseCardList}

                </div>
            </section>

        </>
    );
}
