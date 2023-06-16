import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import CreateCourse from '@/Pages/Course/CreateCourse';
import ListCourse from '@/Pages/Course/ListCourse';


export default function Main({ auth }) {
    const [form, setForm] = useState({
        category_id: null,
        course_title: '',
        course_description: ''
    });
    const [allCourse, setAllCourse] = useState();
    const [list, setList] = useState();



    async function getCourse() {
        await axios.get(route('course.index'))
            .then((data) => {
                setAllCourse(data.data.reverse());
            }).catch(err => {
                console.error(err);
            })
    }
    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }
    useEffect(() => {
        if (allCourse == undefined) {
            getCourse()
        }
        // if (allCourse) {
        //     mapCourse()
        // }
    }, [allCourse])
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Profile</h2>}
        >
            <Head title="Profile" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">

                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-2xl">
                        <CreateCourse getCourse={getCourse}></CreateCourse>
                    </div>

                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-2xl">
                        <ListCourse getCourse={getCourse} allCourse={allCourse} ></ListCourse>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
