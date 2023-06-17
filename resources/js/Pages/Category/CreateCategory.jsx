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


export default function CreateCategory() {
    const categoryName = useRef();


    const { data, setData, errors, post, reset, processing, recentlySuccessful } = useForm({
        category_name: '',
    });

    const CreateCategory = (e) => {
        e.preventDefault();
        post(route('category.store'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.category_name) {
                    reset('category_name');
                    categoryName.current.focus();
                }
            },
        });
    };

    return (

        <section className="max-w-2xl">
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Create Category</h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Create a Category
                </p>
            </header>

            <form onSubmit={CreateCategory} className="mt-6 space-y-6">

                <div>
                    <InputLabel htmlFor="category_name" value="Category Name" />

                    <TextInput
                        id="category_name"
                        ref={categoryName}
                        value={data.category_name}
                        onChange={(e) => setData('category_name', e.target.value)}
                        type="text"
                        className="mt-1 block w-full"
                        autoComplete="category-name"
                    />

                    <InputError message={errors.category_name} className="mt-2" />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Create</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enterFrom="opacity-0"
                        leaveTo="opacity-0"
                        className="transition ease-in-out"
                    >
                        <p className="text-sm text-gray-600 dark:text-gray-400">Created.</p>
                    </Transition>
                </div>
            </form>
        </section>

    );
}
