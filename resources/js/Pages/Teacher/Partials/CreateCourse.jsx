import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputSelector from '@/Components/InputSelector';
import { Transition } from '@headlessui/react';


import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function CreateCourse({ auth }) {
    const [form, setForm] = useState({
        category_id: null,
        course_title: '',
        course_description: ''
    });

    // const { data, setData, errors, post, reset, processing, recentlySuccessful } = useForm({
    //     category_name: '',
    //     // all_category: '',
    // });

    function submit(e) {
        e.preventDefault();
        console.log(form);
        axios.post(route('course.store'), form, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
            .then(response => {
                if (response.status >= 200 && 299 >= response.status) {
                    // fetchMessages(currentUserChat);
                    console.log('ok');
                    // addToMessageContainer(response.data);
                    // clearInput();
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
        console.log("change")
    }

    return (
        <section className="max-w-xl">
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Profile Information</h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Category
                </p>
            </header>

            <InputSelector>
                <InputSelector.Trigger>
                    <select
                        className=
                        'border-gray-300 mt-1 block w-full dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm '

                    >
                        <option value="">Choose a Category</option>

                    </select>
                </InputSelector.Trigger>
                <InputSelector.Content align='left' >
                    <InputSelector.Link >Profile1</InputSelector.Link>
                    <InputSelector.Link >Profile2</InputSelector.Link>
                    <InputSelector.Link >Profile3</InputSelector.Link>
                    <InputSelector.Link >Profile3</InputSelector.Link>
                    <InputSelector.Link >Profile3</InputSelector.Link>
                    <InputSelector.Link >Profile3</InputSelector.Link>
                    <InputSelector.Link >Profile3</InputSelector.Link>
                    <InputSelector.Link >Profile3</InputSelector.Link>
                    <InputSelector.Link >Profile3</InputSelector.Link>
                    <InputSelector.Link >Profile3</InputSelector.Link>
                    <InputSelector.Link >Profile3</InputSelector.Link>
                    <InputSelector.Link >Profile3</InputSelector.Link>
                    <InputSelector.Link >Profile3</InputSelector.Link>
                    <InputSelector.Link >Profile3</InputSelector.Link>
                    <InputSelector.Link >Profile3</InputSelector.Link>

                </InputSelector.Content>
            </InputSelector>

            <form onSubmit={submit} className="mt-6 space-y-6">
                {/* <div>
                <InputSelector>
                    <InputSelector.Trigger>
                        <span className="inline-flex rounded-md w-full">
                                <div className="mt-1 block w-full h-12  border-2">
                                        Select a Category
                                </div>
                        </span>
                    </InputSelector.Trigger>

                    <InputSelector.Content>
                        <InputSelector.Link href={route('profile.edit')}>Profile</InputSelector.Link>
                        <InputSelector.Link href={route('logout')} method="post" as="button">
                            Log Out
                        </InputSelector.Link>
                    </InputSelector.Content>
                </InputSelector>

            </div> */}
                {/* <div>
                <InputLabel htmlFor="category_id" value="Category" />

                <TextInput
                    id="category_id"
                    name="category_id"
                    // ref={currentPasswordInput}
                    value={form.categorty_id}
                    onChange={handleChange}
                    type="number"
                    className="mt-1 block w-full"
                />
            </div> */}
                {/* <InputError message={errors.current_password} className="mt-2" /> */}

                <div>
                    <InputLabel htmlFor="course_title" value="Course Title" />

                    <TextInput
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
