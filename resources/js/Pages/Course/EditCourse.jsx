import { Head, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import InputError from '@/Components/InputError';

export default function CreateCourse({ auth, course }) {
    const { data, setData, post, errors } = useForm({
        category_id: course.category_id,
        course_title: course.course_title,
        course_description: course.course_description,
    });
    const [allCategory, setAllCategory] = useState();
    const [options, setOptions] = useState();

    function mapOptions() {
        setOptions(
            allCategory.map((category) => (
                <option key={category.id} value={category.id}>
                    {category.category_name}
                </option>
            ))
        );
    }

    async function getCategory() {
        try {
            const response = await axios.get(route('category.index'));
            setAllCategory(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    function submit(e) {
        e.preventDefault();
        post(route('course.update', { course_id: course.id }), {
            onSuccess: () => {
                // Handle success
            },
            onError: (error) => {
                console.log(error.response.data.errors);
            },
            headers: {
                'Content-Type': 'multipart/form-data',
            },



        });
        e.preventDefault();
        post(route('course.update', { course_id: course.id }), {
            onError: (error) => {
                if (error.response && error.response.data && error.response.data.errors) {
                    const validationErrors = error.response.data.errors;
                    // Display the validation errors to the user
                    // You can update your state or show an error message accordingly
                    console.log(validationErrors);
                }
            },
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }

    function handleChange(e) {
        setData(e.target.name, e.target.value);
    }

    useEffect(() => {
        if (allCategory === undefined) {
            getCategory();
        }
        if (allCategory) {
            mapOptions();
        }
    }, [allCategory]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Profile</h2>}
        >
            <Head title="Profile" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-2xl">
                        <section className="max-w-2xl">
                            <header>
                                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Edit Course</h2>
                            </header>

                            <form onSubmit={submit} className="mt-6 space-y-6">
                                <div>
                                    <InputLabel htmlFor="category_id" value="Course Category" />
                                    <select
                                        required
                                        id="category_id"
                                        name="category_id"
                                        onChange={handleChange}
                                        value={data.category_id}
                                        className="mt-1 border-gray-300 block w-full dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-2xl shadow-sm"
                                    >
                                        <option value=""> </option>
                                        {options}
                                    </select>
                                    <InputError className="mt-2" message={errors.category_id} />

                                </div>

                                <div>
                                    <InputLabel htmlFor="course_title" value="Course Title" />

                                    <TextInput
                                        required
                                        id="course_title"
                                        name="course_title"
                                        value={data.course_title}
                                        onChange={handleChange}
                                        type="text"
                                        className="mt-1 block w-full"
                                    />
                                    <InputError className="mt-2" message={errors.course_title} />

                                </div>

                                <div>
                                    <InputLabel htmlFor="course_description" value="Course Description" />

                                    <textarea
                                        id="course_description"
                                        name="course_description"
                                        value={data.course_description}
                                        onChange={handleChange}
                                        required
                                        className="mt-1 block p-3 h-48 w-full text-sm text-gray-900 bg-white rounded-2xl border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder=""
                                    ></textarea>
                                    <InputError className="mt-2" message={errors.course_description} />

                                </div>

                                <div className="flex items-center gap-4">
                                    <PrimaryButton>Update</PrimaryButton>

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
