import { useEffect, useRef, useState } from 'react';

import QuestionItemStudent from '@/Pages/StudentExam/QuestionItemStudent'
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import SecondaryButton from '@/Components/SecondaryButton';


export default function UserAnswerItem({ answers, user, questionsWithOptions, correctOptions }) {
    const [score, setScore] = useState(0);
    const [wrongAnswers, setWrongAnswers] = useState(0);
    const [answeredQuestions, setAnsweredQuestions] = useState(0);

    function calculateScore() {
        let newScore = 0;

        answers.forEach((answer) => {
            correctOptions.forEach((correctOption) => {

                if (answer.id == correctOption.id) {
                    // console.log(correctOption);
                    newScore += 1;
                }
            });
        })
        setScore(newScore);
        console.log(answers)
        let newAnsweredQuestions = 0;

        questionsWithOptions.forEach((question) => {
            // question.options.forEach((option) => {
            answers.forEach((answer) => {
                if (answer.question_id == question.id) {
                    newAnsweredQuestions++
                }
            })
            // });
        })
        setAnsweredQuestions(newAnsweredQuestions);
        setWrongAnswers(newAnsweredQuestions - newScore)


    };
    useEffect(() => {
        if (correctOptions.length) {
            calculateScore()
        }
    }, [correctOptions])


    return (
        <>
            <div className={` my-1 flex items-center border rounded-2xl  border-gray-300  dark:border-gray-700  bg-white dark:bg-gray-800 px-3 font-medium text-sm `}

            >
                <div className="w-full py-4 text-gray-700 dark:text-gray-300 ">

                    <div className="grid grid-cols-12 gap-4 content-center  ">
                        <>
                            <div className="col-span-3  justify-self-start self-center mt-1  text-sm  overflow-hidden">
                                {user.name}
                            </div>
                            <div className="col-span-1  justify-self-start self-center mt-1  text-sm  overflow-hidden">
                                <p>
                                    Score: {score}/{questionsWithOptions.length}
                                </p>

                            </div>
                            {/* <div className="col-span-2  justify-self-start self-center mt-1  text-sm  overflow-hidden">


                            </div> */}
                            <div className="col-span-6   flex items-center justify-center mt-1  text-sm  overflow-hidden">
                                <div>
                                    <p>
                                        Answered Questions: {answeredQuestions}/{questionsWithOptions.length}
                                    </p>
                                    <p>
                                        Null Questions: {questionsWithOptions.length - answeredQuestions}/{questionsWithOptions.length}
                                    </p>
                                    <p>
                                        Wrong Answers: {wrongAnswers}/{questionsWithOptions.length}
                                    </p>
                                </div>

                            </div>
                            {/* <div className="col-span-2  justify-self-start self-center mt-1  text-sm  overflow-hidden">

                            </div> */}

                            {/* <TextInput /> */}
                            <div className='col-span-2 flex items-center justify-center'>
                                <SecondaryButton className=" justify-self-center mr-2 mt-1  text-sm truncate overflow-hidden">
                                    Show
                                </SecondaryButton>

                            </div>

                        </>

                    </div>

                </div>
            </div>
        </>

    );

}
