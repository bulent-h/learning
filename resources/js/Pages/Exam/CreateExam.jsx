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

export default function CreateExam({ course, auth }) {
    let nextId = useRef(0);


    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        course_id: course.id,
        title: '',
        description: '',
    });
    const [currenQuestion, setCurrenQuestion] = useState('');


    const submit = (e) => {
        e.preventDefault();
        post(route('exam.store',{'course_id':course.id}));
    };
    function handleChange(e) {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    }
    return (

        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Exam</h2>}
        >
            <Head title="Profile" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">

                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">

                        <section className="max-w-xl">
                            <header>
                                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Create Exam</h2>

                            </header>
                            <form onSubmit={submit} className="mt-6 space-y-6">

                                <div>
                                    <InputLabel htmlFor="title" value="Exam Title" />

                                    <TextInput
                                        required
                                        id="title"
                                        name="title"
                                        value={data.title}
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
                                        value={data.description}
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


                        </section>


                    </div>
                </div>
            </div>
        </AuthenticatedLayout>


    );
}
