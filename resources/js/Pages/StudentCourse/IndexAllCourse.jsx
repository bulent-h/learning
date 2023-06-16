import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import CourseViewCard from '@/Components/Course/CourseViewCard';
import { useEffect, useState } from 'react';

export default function Home({ auth }) {

    const [courseCardList, setCourseCardList] = useState();
    const [courses, setCourses] = useState();

    function mapCourse() {
        setCourseCardList(courses.map((course) =>
            <CourseViewCard key={course.id} course={course} getCourse={getCourse}></CourseViewCard>
        ))
    }
    async function getCourse() {
        await axios.get(route('course.coursesToRegister'))
            .then((data) => {
                setCourses(data.data);
                console.log(data.data)
            }).catch(err => {
                console.error(err);
            })
    }

    useEffect(() => {
        if (courses == undefined) {
            getCourse()
        }
        if (courses) {
            mapCourse()
        }
    }, [courses])
    return (
        <>
            <section className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-2xl">
                <div className='mb-6 text-black dark:text-white text-xl' > Find Courses</div>

                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-2 ' >

                    {courseCardList}

                </div>
            </section>

        </>
    );
}
