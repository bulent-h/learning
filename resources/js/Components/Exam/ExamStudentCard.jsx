import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import DangerButton from '@/Components/DangerButton';
import { useState } from 'react';
import { Link } from '@inertiajs/react';


export default function ExamStudentCard({ exam }) {


    function handleDelete() {

    }

    return (
        <>
            <Link href={route('exam.show', { exam_id: exam.id, course_id: exam.course_id })} >

                <div className='flex flex-col shrink-0 h-24 w-64 rounded-3xl'
                    style={{ backgroundImage: ' linear-gradient(to bottom right,#3aba5c,#3aba90)' }}
                >
                    <div className='flex justify-center items-center h-full overflow-auto m-3'>
                        <div className="basis-12/12 text-ellipsis  overflow-auto text-gray-900 dark:text-gray-100" >
                            {exam.title}
                        </div>
                    </div>

                </div>
            </Link >
        </>
    )

}
