import { useEffect, useRef, useState } from 'react';
import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import EditCategory from '@/Pages/Category/ManageCategory';
import CreateCategory from '@/Pages/Category/CreateCategory';

export default function Main({ auth,  }) {

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Profile</h2>}
        >
            <Head title="Profile" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-2xl">
                        <CreateCategory ></CreateCategory>
                    </div>

                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-2xl">

                        <EditCategory getCategory={getCategory} ></EditCategory>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
