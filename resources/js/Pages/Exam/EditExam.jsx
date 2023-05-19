import { useEffect, useRef, useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import Dropdown from '@/Components/Dropdown';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function CreateExam({ CurrentExam, course, auth }) {
    let nextId = useRef(0);

    const [exam, setExam] = useState({
        title: CurrentExam.title,
        description: CurrentExam.description,
    });

    const [currenQuestion, setCurrenQuestion] = useState('');

    const [question, setQuestion] = useState([]);

    function handleAddQuestion() {
        const nextArtists = [
            ...question,
            {
                id: nextId.current++,
                text: currenQuestion,
            }
        ]
        setQuestion(
            nextArtists
        );
        console.log(question)
    }


    function submit(e) {
        e.preventDefault();
        console.log(exam);

        axios.post(route('exam.update', { exam_id: exam.id }), exam, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
            .then(response => {
                if (response.status >= 200 && 299 >= response.status) {

                }
            })
            .catch(error => {
                console.log(error);
            })
    }
    function handleChange(e) {
        setExam({
            ...exam,
            [e.target.name]: e.target.value
        });
    }

    return (

        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Exam </h2>}
        >
            <Head title="Profile" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">

                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">

                        <section className="max-w-xl">
                            <header>
                                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Exam for {course.course_title}</h2>
                            </header>
                            <form onSubmit={submit} className="mt-6 space-y-6">

                                <div>
                                    <InputLabel htmlFor="title" value="Exam Title" />

                                    <TextInput
                                        required
                                        id="title"
                                        name="title"
                                        value={exam.title}
                                        onChange={handleChange}
                                        type="text"
                                        className="mt-1 block w-full"
                                    />
                                </div>
                                <div>
                                    <InputLabel htmlFor="description" value="Lesson Description" />

                                    <TextInput
                                        id="description"
                                        name="description"
                                        value={exam.description}
                                        onChange={handleChange}
                                        type="text"
                                        className="mt-1 block w-full"
                                    />
                                </div>

                                <div className="flex items-center gap-4">
                                    <PrimaryButton >Create</PrimaryButton>

                                    <Transition
                                        show={true}
                                        enterFrom="opacity-0"
                                        leaveTo="opacity-0"
                                        className="transition ease-in-out"
                                    >
                                    </Transition>
                                </div>

                            </form>

                            <button onClick={handleAddQuestion}>
                                <div className='flex flex-col  shrink-0 place-items-center  w-48 rounded-3xl m-2 '

                                    style={{ backgroundImage: ' linear-gradient(to bottom right,#6C12CB,#ABF9F9)' }}
                                >
                                    <div className='flex flex-col h-full '>
                                        <div className='flex justify-center my-4'>
                                            <p>Add Question</p>
                                        </div>
                                    </div>
                                </div>
                            </button>
                            <InputLabel htmlFor="currenQuestion" value="Write Question" />

                            <TextInput
                                id="currenQuestion"
                                name="currenQuestion"
                                value={currenQuestion}
                                onChange={e => setCurrenQuestion(e.target.value)}
                                type="text"
                                className="mt-1 block w-full"
                            />

                        </section>


                    </div>
                </div>
            </div>
        </AuthenticatedLayout>


    );
}
