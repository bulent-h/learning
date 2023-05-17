import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import CourseItem from '@/Pages/Course/CourseItem';

export default function Manage({ auth, course }) {


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Profile</h2>}
        >
            <Head title="Profile" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
{/*
                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <section className="max-w-full">
                            <header>
                                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">All Courses</h2>
                            </header>
                            <div className="max-h-full border-2 border-gray-300 dark:border-gray-600 mt-8 rounded-lg bg-gray-200 dark:bg-gray-800 overflow-auto ">
                                {course.course_title}
                            </div>
                        </section>
                    </div> */}

                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <section className="max-w-full">
                            <header>
                                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">All Lessons</h2>
                            </header>
                            <div className='flex flex-col  shrink-0 place-items-center h-72 w-48 rounded-3xl m-2 '
                                style={{ backgroundImage: ' linear-gradient(to bottom right,#6C12CB,#ABF9F9)' }}
                            >
                                <div className='flex flex-col h-full '>
                                    <div className='flex justify-center my-4'>
                                        <a href={route('lesson.create',{course_id:course})}>Create Lesson</a>
                                    </div>
                                    <div className='flex h-full justify-center my-4 place-items-center '>
                                        <div className='flex justify-center items-center rounded-full bg-gray-200  w-12 h-12 '>
                                            <p>+</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </section>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>

    );
}
