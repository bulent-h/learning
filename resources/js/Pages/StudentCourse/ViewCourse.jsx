import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import LessonStudentCard from '@/Components/Lesson/LessonStudentCard';
import ExamStudentCard from '@/Components/Exam/ExamStudentCard';

export default function ViewCourse({ auth, course, lessons, exams }) {

    const [lessonList, setLessonList] = useState();
    const [examList, setExamList] = useState();

    function mapLesson() {
        setLessonList(lessons.map((lesson) =>
            <LessonStudentCard key={lesson.id} lesson={lesson}></LessonStudentCard>
        ))
    }
    function mapExam() {
        setExamList(exams.map((exam) =>
            <ExamStudentCard key={exam.id} exam={exam}></ExamStudentCard>
        ))
    }
    useEffect(() => {

        if (course) {
            mapLesson()
            mapExam()
            console.log(exams)
        }
    }, [course])

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Course</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">

                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <section className="max-w-full">
                            <div className='mb-6 text-black dark:text-white text-xl' >All Lessons</div>
                            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-2 ' >
                                {lessonList}
                            </div>
                        </section >
                    </div>

                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <section className="max-w-full">
                            <div className='mb-6 text-black dark:text-white text-xl' >All Lessons</div>

                            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-2 ' >
                                {examList}
                            </div>

                        </section >
                    </div>
                </div>

            </div>
        </AuthenticatedLayout >
    );
}
