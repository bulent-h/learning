import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';

import TextInput from '@/Components/TextInput';
import { Link, useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { useState, useEffect } from 'react';

export default function CreatePost({ courses }) {
    // const user = usePage().props.auth.user;

    const { data, setData, post, reset, errors, processing, recentlySuccessful } = useForm({
        title: '',
        content: '',
        course_id: '',
        file: null
    });
    const [fileUrl, setFileUrl] = useState();
    const [list, setList] = useState();
    function mapCourses() {
        setList(courses.map((course) =>
            <option key={course.id}
                value={course.id}
            >{course.course_title}</option>
        ))
    }

    function handleFileChange(e) {

        setData('file', e.target.files[0])
        var tmp = e.target.files[0];
        setFileUrl(
            URL.createObjectURL(tmp)
        );
    }
    function handleRemoveFile() {

        setFileUrl();
        setData('file', null);
        document.getElementById("file").value = null;

    }



    const submit = (e) => {
        e.preventDefault();
        post(route('posts.index'));
        handleRemoveFile()
        reset();

    };
    useEffect(() => {
        if (courses != undefined) {
            mapCourses()

        }
        // console.log(courses)

    }, [courses])

    return (
        <section >
            <header className='flex justify-between'>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Create Discuss</h2>
                <div className=''>

                    <Link className='ml-auto'
                        href={route('myposts.index')} >
                        <SecondaryButton className=''>My Forums</SecondaryButton>
                    </Link >

                </div>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6 grid grid-cols-12 gap-4">
                <div className='col-span-7'>
                    <div>
                        <InputLabel htmlFor="course_id" value="Choose a Course to Publish on" />
                        <select
                            required
                            id='course_id'
                            name='course_id'
                            value={data.course_id}
                            onChange={(e) => setData('course_id', e.target.value)}
                            className='mt-1 border-gray-300 block w-full dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-2xl shadow-sm '
                        >
                            <option
                                value=""> </option>
                            {list}
                        </select>
                    </div>
                    <div className='mt-2'>
                        <InputLabel htmlFor="title" value="Title" />

                        <TextInput
                            id="title"
                            className="mt-1 block w-full"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            required
                            isFocused
                            autoComplete="title"
                        />

                        <InputError className="mt-2" message={errors.title} />
                    </div>
                    <div className='mt-2'>
                        <InputLabel htmlFor="content" value="Content" />

                        {/* <TextInput
                        id="content"
                        type="text"
                        className="mt-1 block w-full"
                        value={data.content}
                        onChange={(e) => setData('content', e.target.value)}
                        required
                    /> */}


                        <div className='flex '>
                            <div className='mt-2 w-full'>
                                <textarea
                                    id="content"
                                    value={data.content}
                                    onChange={(e) => setData('content', e.target.value)}
                                    required
                                    className=" mt-1 block w-full block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-2xl border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here...">
                                </textarea>

                                <InputError className="mt-2" message={errors.content} />
                            </div>

                            <div className='mt-2 ml-4'>
                                <InputLabel htmlFor="file" value="Upload"
                                    className='mt-2 inline-flex items-center px-4 py-2 bg-white  dark:bg-gray-800 border border-gray-300 dark:border-gray-500 rounded-2xl font-semibold text-xs dark:text-white text-gray-800 uppercase tracking-widest hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-700 dark:focus:bg-blue-500 active:bg-gray-300 dark:active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150'
                                />
                                <input id="file" type="file" className="sr-only"
                                    onChange={handleFileChange} />

                                <InputError className="mt-2" message={errors.file} />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 mt-6">
                        <PrimaryButton disabled={processing}>Save</PrimaryButton>
                        <Transition
                            show={recentlySuccessful}
                            enterFrom="opacity-0"
                            leaveTo="opacity-0"
                            className="transition ease-in-out"
                        >
                            <p className="text-sm text-gray-600 dark:text-gray-400">Saved.</p>
                        </Transition>
                    </div>

                </div>
                <div className='col-span-1'>

                    <div>
                        {
                            (fileUrl)
                            &&
                            <div className='flex items-center'>
                                <div className='relative'>
                                    <div className='flex items-center justify-center'>
                                        <div className="p-4 m-2 bg-center bg-cover bg-no-repeat bg-gray-200 dark:bg-gray-400 bg-origin-padding border-4 border-none w-32 h-32 rounded-xl" style={{ backgroundImage: 'url(' + fileUrl + ')' }}></div>
                                        <div className='absolute -top-2 -right-2'>
                                            <button id="removeBtn" type='button' onClick={handleRemoveFile} className="text-red-500 dark:text-red-500 text-sm ">&#10005;</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>



                </div>

            </form >

        </section >
    );
}
