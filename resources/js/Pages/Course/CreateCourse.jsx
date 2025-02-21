import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function CreateCourse({ getCourse }) {
    const [form, setForm] = useState({
        category_id: '',
        course_title: '',
        course_description: ''
    });
    const [allCategory, setAllCategory] = useState();
    const [options, setOptions] = useState();
    function mapOptions() {
        setOptions(allCategory.map((category) =>
            <option key={category.id}
                value={category.id}
            >{category.category_name}</option>
        ))
    }

    async function getCategory() {
        await axios.get(route('category.index'))
            .then((data) => {
                setAllCategory(data.data)
            }).catch(err => {
                console.error(err);
            })
    }
    function submit(e) {
        e.preventDefault();
        axios.post(route('course.store'), form, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
            .then(response => {
                if (response.status >= 200 && 299 >= response.status) {
                    getCourse()
                    setForm({
                        category_id: '',
                        course_title: '',
                        course_description: ''
                    })
                }
            })
            .catch(error => {
                // validationErrors = error.response.data.errors;
                console.log(error);

            })
    }
    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }
    useEffect(() => {
        if (allCategory == undefined) {
            getCategory()
        }
        if (allCategory) {
            mapOptions()
        }
    }, [allCategory])


    return (
        <section className="max-w-2xl">
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Create Course
                </h2>
            </header>


            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="category_id" value="Course Category" />
                    <select
                        required
                        id='category_id'
                        name='category_id'
                        value={form.category_id}
                        onChange={handleChange}
                        className='mt-1 border-gray-300 block w-full dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-2xl shadow-sm '
                    >
                        <option
                            // selected={category.id === form.category_id}

                            value=""> </option>
                        {options}
                    </select>
                </div>

                <div>
                    <InputLabel htmlFor="course_title" value="Course Title" />

                    <TextInput
                        required
                        id="course_title"
                        name="course_title"

                        // ref={currentPasswordInput}
                        // value={data.current_password}
                        value={form.course_title}
                        onChange={handleChange}
                        type="text"
                        className="mt-1 block w-full"
                    />
                    {/* <InputError message={errors.current_password} className="mt-2" /> */}
                </div>
                <div>
                    <InputLabel htmlFor="course_description" value="Course Description" />


                    <textarea
                        id="course_description"
                        name="course_description"
                        value={form.course_description}
                        onChange={handleChange}
                        required
                        className="mt-1 block p-3 h-48 w-full text-sm text-gray-900 bg-white rounded-2xl border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="">
                    </textarea>
                    {/* <TextInput
                        required
                        id="course_description"
                        name="course_description"
                        // ref={currentPasswordInput}
                        value={form.course_description}
                        onChange={handleChange}
                        type="text"
                        className="mt-1 block w-full"
                    /> */}
                    {/* <InputError message={errors.current_password} className="mt-2" /> */}
                </div>
                <div className="flex items-center gap-4">
                    <PrimaryButton >Create</PrimaryButton>

                    <Transition
                        // show={recentlySuccessful}
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
    );
}
