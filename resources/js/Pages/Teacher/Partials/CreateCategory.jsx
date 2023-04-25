import { useEffect, useRef, useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import Dropdown from '@/Components/Dropdown';


export default function CreateCategory({ className = '' }) {
    const categoryName = useRef();
    // const [allCategory,setAllCategory] = useState();

    useEffect(()=>{
        // getCategory();
    },[])

    async function getCategory(){
        await axios.get(route('teacher.getCategory'))
        .then((data) => {
            setAllCategory(data.data);
            console.log(data.data);
        }).catch(err => {
            console.error(err);
        })
    }
    function editCategory(){

    }

    const { data, setData, errors, post, reset, processing, recentlySuccessful } = useForm({
        category_name: '',
        // all_category: '',
    });

    const CreateCategory = (e) => {
        e.preventDefault();

        post(route('category.create'), {
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
        <section className={className}>
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
                <div>
                    <InputLabel htmlFor="all_category" value="All Category" />

                    <Dropdown>
                        <Dropdown.Trigger>
                            <span className="inline-flex rounded-md">
                                <button
                                    type="button"
                                    className="inline-flex items-center border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none "
                                >
                                    <div className='ml-4 rounded-full bg-gray-200  dark:bg-gray-400 h-12 w-12 overflow-hidden '>
                                        <img className="bg-gray-200  rounded-full " />
                                    </div>
                                </button>
                            </span>
                        </Dropdown.Trigger>
                        <Dropdown.Content align = 'left' >
                            <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                        </Dropdown.Content>
                    </Dropdown>

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
