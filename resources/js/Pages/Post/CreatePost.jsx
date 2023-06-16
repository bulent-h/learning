import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { useState } from 'react';

export default function CreatePost({ mustVerifyEmail, status, className = '' }) {
    const user = usePage().props.auth.user;

    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        title: '',
        content: '',
        file: null
    });
    const [fileUrl, setFileUrl] = useState();

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

    function handleRemoveAvatar() {

        setData('file', null);
        setData('avatar', null);

        console.log(data);

        setFileUrl();


    }

    const submit = (e) => {
        e.preventDefault();
        post(route('post.store'));
    };

    return (
        <section >
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Create Post</h2>

                {/* <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Update your account's profile information and email address.
                </p> */}
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6 grid grid-cols-2 gap-4">
                <div className='col-span-1'>
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
                        <textarea
                            id="content"
                            value={data.content}
                            onChange={(e) => setData('content', e.target.value)}
                            required
                            className=" mt-1 block w-full block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-2xl border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here...">
                        </textarea>

                        <InputError className="mt-2" message={errors.content} />
                    </div>
                    <div className='mt-2'>
                        <InputLabel htmlFor="file" value="Upload"
                            className='mt-2 inline-flex items-center px-4 py-2 bg-gray-800 dark:bg-gray-200 border border-transparent rounded-2xl font-semibold text-xs text-white dark:text-gray-800 uppercase tracking-widest hover:bg-gray-700 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150'
                        />
                        <input id="file" type="file" className="sr-only"
                            onChange={handleFileChange} />

                        <InputError className="mt-2" message={errors.file} />
                    </div>
                    <div className="flex items-center gap-4 mt-2">
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
                                <div className=" p-4 m-2 bg-center bg-cover bg-no-repeat bg-gray-200  dark:bg-gray-400  bg-origin-padding  border-4 border-dashed w-32 h-32 rounded-2xl" style={{ backgroundImage: 'url(' + fileUrl + ')' }}>
                                </div>
                                <div className='w-32 h-32' >
                                    <button id="removeBtn" type='button' onClick={handleRemoveFile} className=" text-red-500 dark:text-red-500 text-sm hover:bg-gray-400 rounded-xl " >X</button>
                                </div>
                                {/* <img id="preview" className="w-20 h-20 border-none opacity-75 " src={fileUrl} /> */}
                            </div>
                        }
                    </div>
                </div>
            </form>
        </section>
    );
}
