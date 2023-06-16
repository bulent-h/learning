import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import CourseItem from '@/Pages/Course/CourseItem';

export default function ManageCourse({getCourse ,allCourse}) {

    // const [allCourse, setAllCourse] = useState();
    const [list, setList] = useState();


    function mapCourse() {
        setList(allCourse.map((course) =>
            <CourseItem key={course.id} course={course} getCourse={getCourse} ></CourseItem>
        ))
    }


    useEffect(()=>{
        if (allCourse) {
            mapCourse()
        }
    },[allCourse])
    return (
        <section className="max-w-full">
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">All Courses</h2>
            </header>

            <div className="max-h-full border-2 border-gray-300 dark:border-gray-600 mt-8 rounded-2xl bg-gray-200 dark:bg-gray-800 overflow-auto ">
                {list}
            </div>

        </section>
    );
}
