import { useEffect, useRef, useState } from 'react';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import QuestionList from '@/Pages/Question/QuestionList'
import { Transition } from '@headlessui/react';
import InputError from '@/Components/InputError';
import ColorfulButton from '@/Components/ColorfulButton';

export default function CreateExam({ CurrentExam, course, auth }) {


    let nextId = useRef(0);
    const [currenQuestion, setCurrenQuestion] = useState('');
    const [questions, setQuestions] = useState();
    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({

        title: CurrentExam.title,
        description: CurrentExam.description,
        is_open: CurrentExam.is_open,
        start_time: CurrentExam.start_time,
        end_time: CurrentExam.end_time,
    });
    // function submit(e) {
    //     e.preventDefault();
    //     // console.log(exam);

    //     axios.post(route('exam.update', { exam_id: CurrentExam.id }), data, {
    //         headers: {
    //             "Content-Type": "multipart/form-data",
    //         }
    //     })
    //         .then(response => {
    //             if (response.status >= 200 && 299 >= response.status) {

    //             }
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         })
    // }


    const submit = (e) => {
        e.preventDefault();
        post(route('exam.update', { exam_id: CurrentExam.id }));
    };
    function handleChange(e) {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    }
    function handleCheckbox() {
        if (data.is_open === 0) {
            setData('is_open', 1)
        }
        else {
            setData('is_open', 0)
        }
    }
    async function handleCreateQuestion() {
        await axios.post(route('question.store'), { exam_id: CurrentExam.id, question_text: currenQuestion })
            .then((data) => {
                setCurrenQuestion('')
                getQuestions();

            }).catch(err => {

                console.error(err);
            })
    }
    async function getQuestions() {
        await axios.get(route('question.index', { exam_id: CurrentExam.id }))
            .then((data) => {
                setQuestions(data.data.reverse());

            }).catch(err => {
                console.error(err);
            })
    }
    function getSingleQuestion(id) {

        const nextArr = [...questions]
        var targetObj = nextArr.findIndex(obj => obj.id === id);

        axios.get(route('question.show', { question_id: id }))
            .then((data) => {
                nextArr[targetObj] = data.data;
                // targetObj = data.data;

                setQuestions(nextArr);

            }).catch(err => {
                console.error(err);
            })
    }
    useEffect(() => {
        if (questions == undefined) {
            getQuestions();
        }

    }, [questions]);

    return (

        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Exam </h2>}
        >
            <Head title="Profile" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {/* <button onClick={() => getSingleQuestion(49)} > vklejkl</button> */}
                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-2xl">

                        <section className="max-w-2xl">
                            <header>
                                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Exam for {course.course_title}</h2>
                            </header>
                            <form onSubmit={submit} className="mt-6 space-y-6 ml-4">
                                <div>
                                    <InputLabel htmlFor="title" value="Exam Title" />

                                    <TextInput
                                        // required
                                        id="title"
                                        name="title"
                                        value={data.title}
                                        onChange={handleChange}
                                        type="text"
                                        className="mt-1 block w-full"
                                    />
                                    <InputError className="mt-2" message={errors.title} />

                                </div>
                                <div>
                                    <InputLabel htmlFor="description" value="Lesson Description" />

                                    <TextInput
                                        id="description"
                                        name="description"
                                        value={data.description}
                                        onChange={handleChange}
                                        type="text"
                                        className="mt-1 block w-full"
                                    />
                                </div>

                                <div className="flex items-center gap-4 ">
                                    <TextInput
                                        // className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        id="is_open" type="checkbox" value=""
                                        name="is_open"
                                        checked={data.is_open === 1}
                                        onChange={handleCheckbox}
                                    />
                                    <InputLabel htmlFor="is_open" value="Publish the Exam" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="start_time" value="Start Time" />
                                    <TextInput
                                        required
                                        id="start_time"
                                        name="start_time"
                                        value={data.start_time}
                                        onChange={handleChange}
                                        type="datetime-local"
                                        className="mt-1 block w-full"
                                    />
                                </div>
                                <div>
                                    <InputLabel htmlFor="end_time" value="End Time" />
                                    <TextInput
                                        required
                                        id="end_time"
                                        name="end_time"
                                        value={data.end_time}
                                        onChange={handleChange}
                                        type="datetime-local"
                                        className="mt-1 block w-full"
                                    />
                                </div>


                                <div className="flex items-center gap-4">
                                    <PrimaryButton >Save</PrimaryButton>
                                    {/*
                                    <Transition
                                        show={true}
                                        enterFrom="opacity-0"
                                        leaveTo="opacity-0"
                                        className="transition ease-in-out"
                                    >
                                    </Transition> */}
                                </div>
                            </form>
                        </section>
                    </div>


                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-2xl">

                        <section className="max-full">
                            <header>
                                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Exam for {course.course_title}</h2>
                            </header>
                            {/* <InputLabel htmlFor="currenQuestion" value="Write Question" /> */}
                            <div className="bg-grey-100 py-4 flex items-center rounded-2xl">

                                <textarea
                                    id="currenQuestion"
                                    name="currenQuestion"
                                    value={currenQuestion}
                                    onChange={e => setCurrenQuestion(e.target.value)}
                                    required
                                    className="mt-1 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-2xl border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write a question here...">
                                </textarea>

                                <button onClick={handleCreateQuestion}>
                                    <div
                                        className='flex flex-col  bg-gradient-to-br from-purple-600 to-cyan-200 dark:from-indigo-800 dark:to-teal-900  shrink-0 place-items-center px-3 w-full rounded-3xl m-2 '

                                    // style={{ backgroundImage: ' linear-gradient(to bottom right,#6C12CB,#ABF9F9)' }}
                                    >
                                        <div className='flex flex-col h-full '>
                                            <div className='flex justify-center my-2 text-gray-900 dark:text-white'>
                                                <p>Add Question</p>
                                            </div>
                                        </div>
                                    </div>
                                </button>

                            </div>


                            <div className="max-h-full  mt-8 rounded-2xl bg-white dark:bg-gray-800 overflow-auto ">
                                <QuestionList CurrentExam={CurrentExam}
                                    questions={questions}
                                    exam={CurrentExam}
                                    getQuestions={getQuestions}
                                    getSingleQuestion={getSingleQuestion}>
                                </QuestionList>
                            </div>

                        </section>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>


    );
}
