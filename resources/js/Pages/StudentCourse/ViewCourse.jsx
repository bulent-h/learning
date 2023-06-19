import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import LessonStudentCard from '@/Components/Lesson/LessonStudentCard';
import ExamStudentCard from '@/Components/Exam/ExamStudentCard';
import SecondaryButton from '@/Components/SecondaryButton';
import DangerButton from '@/Components/DangerButton';
import Modal from '@/Components/Modal';
import { router } from '@inertiajs/react'

export default function ViewCourse({ auth, course, lessons, exams }) {


    const [toggle, setToggle] = useState(false);

    // function mapLesson() {
    //     setLessonList(lessons.map((lesson) =>
    //         <LessonStudentCard key={lesson.id} lesson={lesson}></LessonStudentCard>
    //     ))
    // }
    // function mapExam() {
    //     setExamList(exams.map((exam) =>
    //         <ExamStudentCard key={exam.id} exam={exam}></ExamStudentCard>
    //     ))
    // }
    const [confirmingUnregister, setConfirmingUnregister] = useState(false);

    const confirmCourseUnregister = () => {
        setConfirmingUnregister(true);
    };

    const closeModal = () => {
        setConfirmingUnregister(false);
    };

    const handleUnregister = (e) => {
        e.preventDefault();
         router.post(route('course.unregister'), { id: course.id })

        // axios.post(route('course.unregister'), { id: course.id })
        //     .then(response => {
        //         if (response.status >= 200 && 299 >= response.status) {
        //             console.log('unregistered')
        //             // getCourse()
        //         }
        //     })
        //     .catch(error => {
        //         // validationErrors = error.response.data.errors;
        //         console.log(error);
        //     })
    }
    useEffect(() => {


        console.log(exams.length == 0)
        console.log(lessons.length)


    }, [lessons, exams])

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Course</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-2xl">
                        <section className="mb-6">

                            <div className='flex mb-4'>
                                <div className='text-black dark:text-white text-xl ' >
                                    {course.course_title}

                                </div>
                                <div onClick={() => setToggle(!toggle)} className="flex items-center justify-self-center mx-6 text-sm truncate overflow-hidden">
                                    {(toggle) ? <>&#10134;</> : <>&#10133;</>}
                                </div>
                                <DangerButton onClick={confirmCourseUnregister} className='ml-auto'>
                                    Unregister
                                </DangerButton>
                            </div>

                            {
                                (toggle) &&
                                <div className='' >
                                    {course.course_description}


                                </div>
                            }


                        </section >

                        {
                            (exams.length != 0) && <section className="max-w-full my-6">
                                <div className='mb-6 text-black dark:text-white font-bold'>Exams</div>

                                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-2 ' >
                                    {exams.map((exam) =>
                                        <ExamStudentCard key={exam.id} exam={exam}></ExamStudentCard>
                                    )}
                                </div>

                            </section >
                        }

                        {
                            (lessons.length != 0) && <section className="max-w-full my-6">
                                <div className='mb-6 text-black dark:text-white font-bold' >Lessons</div>
                                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-2 ' >
                                    {lessons.map((lesson) =>
                                        <LessonStudentCard key={lesson.id} lesson={lesson}></LessonStudentCard>
                                    )}
                                </div>
                            </section >
                        }
                    </div>


                </div>

            </div>

            <Modal show={confirmingUnregister} onClose={closeModal}>
                <form onSubmit={handleUnregister} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        Are you sure you want to unregister this course?
                    </h2>


                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

                        <DangerButton className="ml-3" >
                            Unregister
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout >
    );
}
