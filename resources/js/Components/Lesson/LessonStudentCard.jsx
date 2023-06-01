import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import DangerButton from '@/Components/DangerButton';
import { useState } from 'react';
import { Link } from '@inertiajs/react';


export default function LessonStudentCard({ lesson }) {



    function handleDelete() {

    }
    function handleEdit() {
    }

    return (
        <>
            <Link href={route('lesson.show', { lesson_id: lesson.id, course_id: lesson.course_id })} >

                <div className='flex flex-col shrink-0 h-24 w-64 rounded-3xl'
                    style={{ backgroundImage: ' linear-gradient(to bottom right,#3aba5c,#3aba90)' }}
                >
                    <div className='flex justify-center items-center h-full overflow-auto m-3'>

                        <div className="basis-12/12 text-ellipsis  overflow-auto  text-lg text-gray-900 dark:text-gray-100" >
                                {lesson.lesson_title}
                        </div>
                    </div>
                    {/* <div className="basis-12/12 flex items-center text-lg mx-5 truncate overflow-hidden text-gray-900 dark:text-gray-100" >
                        {lesson.lesson_title}
                    </div>
                    <div className="basis-9/12 text-ellipsis overflow-auto mx-5 mb-6  text-sm text-gray-100 dark:text-gray-900" >
                        {lesson.lesson_description}
                    </div> */}

                </div>
            </Link >
        </>
    )

}
