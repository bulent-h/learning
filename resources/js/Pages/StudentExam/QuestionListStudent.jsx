import { useEffect, useRef, useState } from 'react';
import { router } from '@inertiajs/react';
import QuestionItemStudent from '@/Pages/StudentExam/QuestionItemStudent'
import PrimaryButton from '@/Components/PrimaryButton';


export default function QuestionListStudent({ questions, exam_id, exam }) {

    const [selectedOptions, setSelectedOptions] = useState({});
    const [remainingTime, setRemainingTime] = useState(null);
    const [timerExpired, setTimerExpired] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
         router.post(route('exam.submit', { exam_id: exam_id }),
            { answers: selectedOptions }
        )
        // try {
        //     const response = await axios.post(route('exam.submit', { exam_id: exam_id }),
        //         { answers: selectedOptions }
        //     )
        //     console.log(response.data.message);
        // } catch (error) {
        //     console.error(error);
        // }
    };


    const handleOptionSelect = (questionId, optionId) => {
        setSelectedOptions(prevSelectedOptions => ({
            ...prevSelectedOptions,
            [questionId]: optionId,
        }));
    };


    useEffect(() => {
        const endTime = new Date(exam.end_time).getTime();
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = endTime - now;

            if (distance <= 0) {
                clearInterval(interval);
                setRemainingTime('Time Expired');
                setTimerExpired(true);
            } else {
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor(
                    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
                );
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                setRemainingTime(`${days}d ${hours}h ${minutes}m ${seconds}s`);
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);


    useEffect(() => {
        if (timerExpired) {
            handleSubmit(new Event('submit'));
        }
    }, [timerExpired]);

    // const submit = (e) => {

    //     e.preventDefault();
    //     console.log("sent")
    //     // post(route('exam.update', { exam_id: CurrentExam.id }));
    // };

    return (
        <>


            <section className="max-full">

                <header>
                    <h2 className="text-base text-gray-900 dark:text-gray-100">
                        Questions
                    </h2>
                </header>
                <div className="z-10 bg-white dark:bg-gray-800 sticky top-0 left-0 flex  justify-center">
                    {remainingTime !== null && (
                        <p className="text-red-400 dark:text-red-700 text-2xl">{remainingTime}</p>
                    )}
                </div>



                <div className=" max-h-full mt-4 rounded-2xl ">
                    <form className="mt-6 space-y-6 px-3">

                        {questions.map((question) =>
                            <QuestionItemStudent key={question.id}
                                question={question}
                                handleOptionSelect={handleOptionSelect}
                                selectedOptions={selectedOptions}
                            >
                            </QuestionItemStudent>)
                        }


                    </form>

                </div>
                <PrimaryButton className='mt-6 ml-6' onClick={handleSubmit} >Save</PrimaryButton>



            </section>
        </>
    );

}
