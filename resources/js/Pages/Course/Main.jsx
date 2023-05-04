import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import CreateCourse from '@/Pages/Course/CreateCourse';
import ManageCourse from '@/Pages/Course/ManageCourse';


export default function Main({ auth }) {
    const [form, setForm] = useState({
        category_id: null,
        course_title: '',
        course_description: ''
    });
    const [allCategory, setAllCategory] = useState();
    const [options, setOptions] = useState();
    function mapOptions() {
        setOptions(allCategory.map((category) =>
            <option value={category.id} key={category.id}>{category.category_name}</option>
        ))
    }

    // const [allCategory,setAllCategory]=useState()
    const { data, setData, errors, post, reset, processing, recentlySuccessful } = useForm({
        category_name: '',
        // all_category: '',
    });
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

                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <CreateCourse></CreateCourse>
                    </div>

                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <ManageCourse></ManageCourse>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
