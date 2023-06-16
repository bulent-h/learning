import { useEffect, useRef, useState } from 'react';

import QuestionItemStudent from '@/Pages/StudentExam/QuestionItemStudent'
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import UserItem from '@/Pages/Exam/ExamAnswers/UserItem';

export default function MainAnswers({ usersWithAnswers, exam, auth }) {


    const [correctOptions, setCorrectOptions] = useState([]);
    const [questions, setQuestions] = useState([]);

    function getCorrectOptions() {
        const tmpcorrectOptions = exam.questions.reduce((acc, question) => {
            const correctOptions = question.options
                .filter((option) => option.is_correct)
                .map((option) => option);
            if (correctOptions.length > 0) {
                acc[question.id] = correctOptions;
            }
            return acc;
        }, {});
        const newArray = [];

        for (const key in tmpcorrectOptions) {
            tmpcorrectOptions[key].forEach((item, index) => {
                newArray.push(item);
            });
        }
        setCorrectOptions(newArray);
    }

    useEffect(() => {
        getCorrectOptions()
        // console.log(correctOptions.map((correctOption)=>{

        // }))
        // console.log(usersWithAnswers)


    }, [])


    // console.log(exam.questions.map((question)=>question));

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
                                    <div className='ml-4 mb-6 text-black dark:text-white '>
                                        {exam.description}
                                    </div>
                                </div>
                            </div>

                            {/* <div>
                            <QuestionListStudent questions={exam.questions}  exam_id={exam.id} />
                        </div> */}

                            {(usersWithAnswers.length) ?
                                <div>
                                    <div className='mb-6 text-black dark:text-white font-bold'>
                                        Results:
                                    </div>
                                    {usersWithAnswers.map((usersWithAnswer) =>
                                        <UserItem key={usersWithAnswer.user.id}

                                            answers={usersWithAnswer.answers.map((answer) => answer.option)}
                                            user={usersWithAnswer.user}
                                            questionsWithOptions={exam.questions.map((question) => question)}
                                            correctOptions={correctOptions}
                                        >
                                        </UserItem>)
                                    }
                                </div>
                                :
                                <div className='mb-6 text-black dark:text-white font-bold'>
                                    No results to show
                                </div>
                            }
                        </section >

                    </div>

                </div>
            </div>
        </AuthenticatedLayout >
    );

}
