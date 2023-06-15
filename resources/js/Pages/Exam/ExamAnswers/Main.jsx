import { useEffect, useRef, useState } from 'react';

import QuestionItemStudent from '@/Pages/StudentExam/QuestionItemStudent'
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';


export default function MainAnswers({ usersWithAnswers ,exam,auth}) {

    // const [selectedOptions, setSelectedOptions] = useState({});

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     try {
    //         const response = await axios.post(
    //             route('exam.submit', { exam_id: exam_id }),
    //             { answers: selectedOptions }
    //         )
    //         console.log(response.data.message);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };


    // const handleOptionSelect = (questionId, optionId) => {
    //     setSelectedOptions(prevSelectedOptions => ({
    //         ...prevSelectedOptions,
    //         [questionId]: optionId,
    //     }));
    // };





    // const submit = (e) => {

    //     e.preventDefault();
    //     console.log("sent")
    //     // post(route('exam.update', { exam_id: CurrentExam.id }));
    // };

    return (

        <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Course</h2>}
    >
        <Head title="Dashboard" />

        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
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

                        {/* <div>
                            <QuestionListStudent questions={exam.questions}  exam_id={exam.id} />
                        </div> */}
                    </section >

                </div>

            </div>
        </div>
    </AuthenticatedLayout >
    );

}
