import { useEffect, useRef, useState } from 'react';

import QuestionItemStudent from '@/Pages/StudentExam/QuestionItemStudent'
import PrimaryButton from '@/Components/PrimaryButton';


export default function QuestionListStudent({ questions ,exam_id}) {

    const [selectedOptions, setSelectedOptions] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                route('exam.submit', { exam_id: exam_id }),
                { answers: selectedOptions }
            )
            console.log(response.data.message);
        } catch (error) {
            console.error(error);
        }
    };


    const handleOptionSelect = (questionId, optionId) => {
        setSelectedOptions(prevSelectedOptions => ({
            ...prevSelectedOptions,
            [questionId]: optionId,
        }));
    };


    console.log(selectedOptions)

    // const submit = (e) => {

    //     e.preventDefault();
    //     console.log("sent")
    //     // post(route('exam.update', { exam_id: CurrentExam.id }));
    // };

    return (

        <section className="max-full">
            <header>
                <h2 className="text-base text-gray-900 dark:text-gray-100">
                    Questions
                </h2>
            </header>

            <div className=" max-h-full mt-4 rounded-2xl overflow-auto ">
                <form className="mt-6 space-y-6 px-3">

                    {questions.map((question) =>
                        <QuestionItemStudent key={question.id}
                            question={question}
                            handleOptionSelect={handleOptionSelect}
                            selectedOptions={selectedOptions}
                        >
                        </QuestionItemStudent>)
                    }

                    <PrimaryButton onClick={handleSubmit} >Save</PrimaryButton>

                </form>

            </div>


        </section>
    );

}
