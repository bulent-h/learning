import { useEffect, useRef, useState } from 'react';

import QuestionItem from '@/Pages/Question/QuestionItem'


export default function QuestionList({ exam, questions, getQuestions, getSingleQuestion }) {

    // const [questions, setQuestions] = useState();
    const [list, setList] = useState();


    function handleDelete(id) {
        console.log(id)
        axios.post(route('question.destroy', { exam_id: exam.id }), { question_id: id })
            .then(response => {
                if (response.status >= 200 && 299 >= response.status) {
                    getQuestions();
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    function mapQuestions() {
        setList(questions.map((question) =>
            <QuestionItem key={question.id}
                question={question}
                handleDelete={() => handleDelete(question.id)}
                getSingleQuestion={() => getSingleQuestion(question.id)} >
            </QuestionItem>
        ))
    }


    useEffect(() => {
        if (questions) {
            mapQuestions();
        }
    }, [questions]);

    return (

        <section className="max-full">
            <header>
                <h2 className="text-base text-gray-900 dark:text-gray-100">
                    Questions
                </h2>
            </header>

            <div className=" max-h-full mt-4 rounded-lg overflow-auto ">

                {list}

            </div>


        </section>
    );

}
