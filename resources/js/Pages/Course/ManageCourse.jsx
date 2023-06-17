import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import CourseItem from '@/Pages/Course/CourseItem';
import LessonList from '@/Pages/Lesson/LessonList';
import ExamList from '@/Pages/Exam/ExamList';
import { router } from '@inertiajs/react'
import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';

export default function ManageCourse({ auth, course, lessons, exams }) {
    const [confirmingCourseDeletion, setConfirmingCourseDeletion] = useState(false);

    const confirmCourseDeletion = () => {
        setConfirmingCourseDeletion(true);
    };
    const deleteCourse = (e) => {
        e.preventDefault();
        router.post(route('course.destroy', { course: course }))
    };
    const closeModal = () => {
        setConfirmingCourseDeletion(false);

    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Profile</h2>}
        >
            <Head title="Profile" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {/*
                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-2xl">
                        <section className="max-w-full">
                            <header>
                                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">All Courses</h2>
                            </header>
                            <div className="max-h-full border-2 border-gray-300 dark:border-gray-600 mt-8 rounded-2xl bg-gray-200 dark:bg-gray-800 overflow-auto ">
                                {course.course_title}
                            </div>
                        </section>
                    </div> */}

                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-2xl">
                        <section className="max-w-full ">
                            {/* <header>
                                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100"></h2>
                            </header> */}

                            <div className='flex flex-row w-full'>
                                <div className='flex flex-col  shrink-0 place-items-center  w-36 rounded-3xl m-1 '
                                    style={{ backgroundImage: ' linear-gradient(to bottom right,#6C12CB,#ABF9F9)' }}
                                >
                                    <div className='flex flex-col h-full '>
                                        <a href={route('lesson.create', { course_id: course })}>
                                            <div className='flex justify-center my-3'>
                                                <p >Create Lesson</p>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div className='flex flex-col  shrink-0 place-items-center  w-36 rounded-3xl m-1 '
                                    style={{ backgroundImage: ' linear-gradient(to bottom right,#6C12CB,#ABF9F9)' }}
                                >
                                    <div className='flex flex-col h-full '>
                                        <a href={route('exam.create', { course_id: course })}>
                                            <div className='flex justify-center my-3'>
                                                <p >Create Exam</p>
                                            </div>
                                        </a>
                                    </div>
                                </div>

                                <div onClick={()=>router.get(route('course.edit',{ id: course.id }))} className='flex flex-col bg-gradient-to-br from-purple-600 to-cyan-200 dark:from-indigo-500 dark:to-teal-600  ml-auto justify-self-end shrink-0 place-items-center cursor-pointer  w-40 rounded-3xl m-1 '
                                    // style={{ backgroundImage: ' linear-gradient(to bottom right,#aa4444,#ff1111)' }}
                                >
                                    <div className='flex flex-col h-full  '>
                                        <div className='flex justify-center my-3'>
                                            <p >Edit this course</p>
                                        </div>
                                    </div>
                                </div>
                                <div onClick={confirmCourseDeletion} className='flex flex-col  justify-self-end shrink-0 place-items-center cursor-pointer  w-40 rounded-3xl m-1 '
                                    style={{ backgroundImage: ' linear-gradient(to bottom right,#aa4444,#ff1111)' }}
                                >
                                    <div className='flex flex-col h-full  '>
                                        <div className='flex justify-center my-3'>
                                            <p >Delete this course</p>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </section>
                    </div>

                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-2xl">
                        <LessonList lessons={lessons}></LessonList>
                    </div>
                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-2xl">
                        <ExamList exams={exams}></ExamList>
                    </div>

                </div>
            </div>


            <Modal show={confirmingCourseDeletion} onClose={closeModal}>
                <form onSubmit={deleteCourse} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        Are you sure you want to delete this course?
                    </h2>


                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

                        <DangerButton className="ml-3" >
                            Delete Account
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>

    );
}
