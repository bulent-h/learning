import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function CreateCourse({ auth, course }) {
    const [form, setForm] = useState({
        category_id: course.category_id,
        course_title: course.course_title,
        course_description: course.course_description
    });
    const [allCategory, setAllCategory] = useState();
    const [options, setOptions] = useState();
    function mapOptions() {
        setOptions(allCategory.map((category) =>
            <option
                key={category.id}
                value={category.id}
            >{category.category_name}</option>
        ))
    }

    // const [allCategory,setAllCategory]=useState()

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
        axios.post(route('course.update'), form, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
            .then(response => {
                if (response.status >= 200 && 299 >= response.status) {
                    setForm({
                        category_id: null,
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
                                        onChange={handleChange}
                                        value={form.category_id}
                                        className='mt-1 border-gray-300 block w-full dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-2xl shadow-sm '
                                    >
                                        <option value=""> </option>
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

                                    <TextInput
                                        required
                                        id="course_description"
                                        name="course_description"
                                        // ref={currentPasswordInput}
                                        value={form.course_description}
                                        onChange={handleChange}
                                        type="text"
                                        className="mt-1 block w-full"
                                    />
                                    {/* <InputError message={errors.current_password} className="mt-2" /> */}
                                </div>
                                <div className="flex items-center gap-4">
                                    <PrimaryButton >Update</PrimaryButton>

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
                    </div>


                </div>
            </div>
        </AuthenticatedLayout>

    );
}
