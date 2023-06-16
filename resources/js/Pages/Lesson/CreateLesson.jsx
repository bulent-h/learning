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

export default function CreateLesson({ course, auth }) {

    const [form, setForm] = useState({
        course_id: course.id,
        lesson_title: '',
        lesson_description: '',
        video_path: '',
    });

    function submit(e) {
        e.preventDefault();
        console.log(form);

        axios.post(route('lesson.store', { course_id: course.id }), form, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
            .then(response => {
                if (response.status >= 200 && 299 >= response.status) {
                    setForm({
                        lesson_title: '',
                        lesson_description: '',
                        video_path: '',
                    })
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }




    return (

        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Lesson</h2>}
        >
            <Head title="Profile" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">

                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-2xl">

                        <section className="max-w-xl">
                            <header>
                                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Create Lesson</h2>

                                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                    Create a Lesson
                                </p>
                            </header>
                            <form onSubmit={submit} className="mt-6 space-y-6">

                                <div>
                                    <InputLabel htmlFor="lesson_title" value="Lesson Title" />

                                    <TextInput
                                        required
                                        id="lesson_title"
                                        name="lesson_title"
                                        value={form.lesson_title}
                                        onChange={handleChange}
                                        type="text"
                                        className="mt-1 block w-full"
                                    />
                                </div>
                                <div>
                                    <InputLabel htmlFor="lesson_description" value="Lesson Description" />

                                    <TextInput
                                        id="lesson_description"
                                        name="lesson_description"
                                        value={form.lesson_description}
                                        onChange={handleChange}
                                        type="text"
                                        className="mt-1 block w-full"
                                    />
                                </div>
                                <div>
                                    <InputLabel htmlFor="video_path" value="Youtube Video URL" />

                                    <TextInput
                                        id="video_path"
                                        name="video_path"
                                        value={form.video_path}
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
                                        {/* <p className="text-sm text-gray-600 dark:text-gray-400">Saved.</p> */}
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
