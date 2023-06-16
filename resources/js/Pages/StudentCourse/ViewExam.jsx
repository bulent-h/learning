import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import LessonStudentCard from '@/Components/Lesson/LessonStudentCard';
import ExamStudentCard from '@/Components/Exam/ExamStudentCard';
import YoutubeEmbed from '@/Components/YoutubeEmbed';
import Comments from '@/Pages/Comment/Comments';
import QuestionListStudent from '@/Pages/StudentExam/QuestionListStudent';

export default function ViewExam({ auth, exam }) {



    useEffect(() => {
        if (exam) {
            console.log(exam)
        }
    }, [exam])
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Course</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-2xl">
                        <section className="max-w-full">
                            <div className='mb-6 text-black dark:text-white text-2xl font-bold'>
                                {exam.title}
                            </div>
                            <div className='flex flex-col'>
                                <div className='py-4'>
                                    <div className='mb-6 text-black dark:text-white font-bold'>
                                        {exam.description}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <QuestionListStudent questions={exam.questions}  exam_id={exam.id} />
                            </div>
                        </section >

                    </div>

                </div>
            </div>
        </AuthenticatedLayout >
    );
}
