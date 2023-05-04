import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import CourseItem from '@/Pages/Course/CourseItem';

export default function ManageCourse() {

    const [allCourse, setAllCourse] = useState();
    const [list, setList] = useState();


    function mapCourse() {
        setList(allCourse.map((course) =>
            <CourseItem key={course.id} course={course} ></CourseItem>
        ))
    }

    async function getCourse() {
        await axios.get(route('course.index'))
            .then((data) => {
                setAllCourse(data.data);
                console.log(data.data);
            }).catch(err => {
                console.error(err);
            })
    }

    useEffect(()=>{
        if (allCourse == undefined) {
            getCourse()
        }
        if (allCourse) {
            mapCourse()
        }
    },[allCourse])
    return (
        <section className="max-w-xl">
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Profile Information</h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Category
                </p>
            </header>

            <div className="max-h-full border-2 mt-8 rounded-lg bg-gray-200 dark:bg-gray-800 overflow-auto ">
                {list}
            </div>

        </section>
    );
}
