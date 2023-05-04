import { useEffect, useRef, useState } from 'react';
import { useForm } from '@inertiajs/react';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import EditCategory from '@/Pages/Category/ManageCategory';
import CreateCategory from '@/Pages/Category/CreateCategory';

export default function Main({ auth,  }) {
    const categoryName = useRef();
    const { data, setData, errors, post, reset, processing, recentlySuccessful } = useForm({
        category_name: '',
    });


    async function getCategory() {
        await axios.get(route('category.index'))
            .then((data) => {
                setAllCategory(data.data);
                console.log(data.data);
            }).catch(err => {
                console.error(err);
            })
    }
    // async function getCategory() {
    //     await axios.get(route('category.index'))
    //         .then((data) => {
    //             setAllCategory(data.data)
    //         }).catch(err => {
    //             console.error(err);
    //         })
    // }

    // const CreateCategory = (e) => {
    //     e.preventDefault();

    //     post(route('category.store'), {
    //         preserveScroll: true,
    //         onSuccess: () => reset(),
    //         onError: (errors) => {
    //             if (errors.category_name) {
    //                 reset('category_name');
    //                 categoryName.current.focus();
    //             }
    //         },
    //     });
    // };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Profile</h2>}
        >
            <Head title="Profile" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <CreateCategory ></CreateCategory>
                    </div>

                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">

                        <EditCategory getCategory={getCategory} ></EditCategory>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
