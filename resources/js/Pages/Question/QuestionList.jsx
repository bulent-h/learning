import { useEffect, useRef, useState } from 'react';

import QuestionItem from '@/Pages/Question/QuestionItem'


export default function QuestionList({ exam, questions ,getQuestions}) {

    // const [questions, setQuestions] = useState();
    const [list, setList] = useState();


    function handleDelete(id) {
        console.log(id)
        axios.post(route('question.destroy',{exam_id:exam.id}), { question_id: id })
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
            <QuestionItem key={question.id} question={question} handleDelete={() => handleDelete(question.id)} ></QuestionItem>
        ))
    }

    useEffect(() => {
        if(questions){
            mapQuestions();
            console.log(questions)
        }
    }, [questions]);

    return (

        <section className="max-w-xl">
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100"> All Questions
                </h2>

            </header>

            <div className="max-h-full mt-8 rounded-lg bg-gray-200 dark:bg-gray-800 overflow-auto ">

                {list}

            </div>


        </section>
    );

}
