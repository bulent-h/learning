import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import LessonStudentCard from '@/Components/Lesson/LessonStudentCard';
import ExamStudentCard from '@/Components/Exam/ExamStudentCard';
import SecondaryButton from '@/Components/SecondaryButton';
import DangerButton from '@/Components/DangerButton';
import Modal from '@/Components/Modal';
import { router } from '@inertiajs/react'
import { Transition } from '@headlessui/react';

export default function ViewCourse({ auth, course, lessons, exams }) {

    const [toggle, setToggle] = useState(false);
    const [confirmingUnregister, setConfirmingUnregister] = useState(false);
    const [rating, setRating] = useState(0);
    const [existingRating, setExistingRating] = useState(null);
    const [recentlySuccessful, setRecentlySuccessful] = useState(false);

    const handleRatingChange = (event) => {
        setRating(event.target.value);
        console.log(event.target.value)
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(route('rate.store', { course_id: course.id }), { rating: rating });
            setRecentlySuccessful(true);

        } catch (error) {
            console.error(error.response.data);
        }
    };
    const confirmCourseUnregister = () => {
        setConfirmingUnregister(true);
    };

    const closeModal = () => {
        setConfirmingUnregister(false);
    };

    const handleUnregister = (e) => {
        e.preventDefault();
        router.post(route('course.unregister'), { id: course.id })
    }
    useEffect(() => {
        // console.log(exams.length == 0)
        // console.log(lessons.length)

        const fetchExistingRating = async () => {
            try {
                const response = await axios.get(route('rate.me', { course_id: course.id }));
                setExistingRating(response.data.rating);

            } catch (error) {
                console.error(error);
            }
        };

        fetchExistingRating();
    }, [lessons, exams])

    useEffect(() => {
        if (existingRating) {
            setRating(existingRating);
        }
        if (recentlySuccessful) {

            const timeoutId = setTimeout(() => setRecentlySuccessful(false), 3000);
            return () => clearTimeout(timeoutId);
        }
    }, [existingRating, recentlySuccessful]);


    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            const starId = `star-${i}`;

            stars.push(
                <div key={i} >
                    <label htmlFor={starId}>
                        <svg
                            className="star"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="25px"
                            height="25px"
                        >
                            <path
                                fill={rating >= i ? '#ffc107' : '#e4e5e9'}
                                d="M12 17.27l-5.06 2.49L8.5 13.85 4.93 10.3l5.99-.82L12 4l2.08 5.48 5.99.82-3.57 3.55 1.56 5.41L12 17.27z"
                            />
                        </svg>
                    </label>
                    <input
                        id={starId}
                        type="radio"
                        name="rating"
                        className='sr-only'
                        value={i}
                        checked={rating === i}
                        onChange={handleRatingChange}
                    />
                </div>
            );
        }
        return stars;
    };
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
                                <div>
                                    <form onSubmit={handleSubmit}>
                                        <div className='text-black dark:text-white'></div>
                                        <div className="flex items-center justify-center">
                                            Rate this course :
                                            {renderStars()}
                                            <SecondaryButton type="submit" className='ml-5'>
                                                {existingRating ? 'Update Rating' : 'Submit'}
                                            </SecondaryButton>

                                            <Transition
                                                show={recentlySuccessful}
                                                enterFrom="opacity-0"
                                                leaveTo="opacity-0"
                                                className="transition ease-in-out ml-4"
                                            >
                                                <p className="text-xs text-gray-600 dark:text-gray-400">Updated.</p>
                                            </Transition>
                                        </div>

                                    </form>
                                </div>
                                <DangerButton onClick={confirmCourseUnregister} className='ml-auto'>
                                    Unregister
                                </DangerButton>
                            </div>

                            {
                                (toggle) &&
                                <>
                                    <div className='text-black dark:text-white' >
                                        {course.course_description}
                                    </div>

                                </>
                            }

                        </section >



                        {
                            (exams.length != 0) ?
                                <section className="max-w-full my-6">
                                    <div className='mb-6 text-black dark:text-white font-bold'>Exams</div>

                                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-2 ' >
                                        {exams.map((exam) =>
                                            <ExamStudentCard key={exam.id} exam={exam}></ExamStudentCard>
                                        )}
                                    </div>

                                </section >
                                :
                                <>
                                    <section className="max-w-full my-6">
                                        <div className='mb-6 text-black dark:text-white font-bold'>Exams</div>
                                        No Exams Yet
                                    </section >
                                </>
                        }

                        {
                            (lessons.length != 0) ?
                                <section className="max-w-full my-6">
                                    <div className='mb-6 text-black dark:text-white font-bold' >Lessons</div>
                                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-2 ' >
                                        {lessons.map((lesson) =>
                                            <LessonStudentCard key={lesson.id} lesson={lesson}></LessonStudentCard>
                                        )}
                                    </div>
                                </section >
                                :

                                <>
                                    <section className="max-w-full my-6">
                                        <div className='mb-6 text-black dark:text-white font-bold'>Lessons</div>
                                        No Lessons Yet
                                    </section >
                                </>
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
