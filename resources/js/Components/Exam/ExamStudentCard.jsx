import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import DangerButton from '@/Components/DangerButton';
import { useState } from 'react';
import { Link } from '@inertiajs/react';
import dayjs from 'dayjs';

export default function ExamStudentCard({ exam }) {


    function handleDelete() {

    }

    return (
        <>
            <Link href={route('exam.show', { exam_id: exam.id, course_id: exam.course_id })} >

                <div className='flex flex-col shrink-0 h-36 w-64 rounded-3xl'
                    style={{ backgroundImage: ' linear-gradient(to bottom right,#3aba5c,#3aba90)' }}
                >
                    <div className='flex justify-center items-center h-full overflow-auto text-gray-900 dark:text-gray-100'>
                        <div className="basis-12/12 text-ellipsis  overflow-auto" >
                            {exam.title}
                        </div>


                    </div>
                    <div className="flex  flex-col items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300">
                        <div className='text-sm' >Starts At: {dayjs(exam.start_time).format('YYYY-MM-DD HH:mm:ss')}</div>
                        <div className='text-sm'>Ends At: {dayjs(exam.end_time).format('YYYY-MM-DD HH:mm:ss')}</div>
                    </div>

                </div>
            </Link >
        </>
    )

}
