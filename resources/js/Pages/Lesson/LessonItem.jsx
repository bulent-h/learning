import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import DangerButton from '@/Components/DangerButton';

import { useState } from 'react';

export default function LessonItem({ lesson }) {

    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };
    const closeModal = () => {
        setConfirmingUserDeletion(false);

        // reset();
    };


    function handleDelete() {
        // console.log(id)
        axios.post(route('lesson.destroy'), { id: lesson.id })
            .then(response => {
                if (response.status >= 200 && 299 >= response.status) {
                    closeModal
                }
            })
            .catch(error => {
                // validationErrors = error.response.data.errors;
                console.log(error);
            })

    }
    const ReadMore = ({ children, className }) => {
        const text = children;
        const [isReadMore, setIsReadMore] = useState(true);
        const toggleReadMore = () => {
            setIsReadMore(!isReadMore);
        };
        return (
            <>
                <div onClick={toggleReadMore} className={className}>
                    {isReadMore ? text.slice(0, 100) : text}
                    {(text.length > 100)
                        &&
                        <>
                            {isReadMore ?
                                <p className='text-blue-400'>
                                    ...read more
                                </p>
                                :
                                <p className='text-blue-400'>
                                    show less
                                </p>
                            }
                        </>
                    }

                </div>
            </>
        );
    };
    return (
        <>
            <div className="flex items-center border-b border-gray-200 bg-white dark:bg-gray-800 px-3 font-medium text-sm dark:border-gray-700 hover:bg-gray-100 cursor-pointer">
                <div className="w-full py-4 text-gray-700 dark:text-gray-300 ">

                    <div className="grid grid-cols-12 gap-4 content-center ">
                        <div className="col-span-3 w-80 justify-self-start self-center mt-1 text-sm truncate overflow-hidden">
                            <div>
                                {lesson.lesson_title}
                            </div>
                        </div>
                        <ReadMore className="col-span-7 justify-self-start self-center mt-1 text-sm">
                            {lesson.lesson_description}
                        </ReadMore>

                        <div className='col-span-2 '>
                            <PrimaryButton className="mt-1 mr-4 text-sm truncate overflow-hidden">
                                Edit
                            </PrimaryButton>
                            <DangerButton
                                onClick={confirmUserDeletion}
                            >
                                Delete
                            </DangerButton>
                            <Modal show={confirmingUserDeletion} onClose={closeModal}>

                                <div className="p-6">
                                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                                        Are you sure you want to delete this Lesson?
                                    </h2>
                                    {/* <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                        Once your account is deleted, all of its resources and data will be permanently deleted. Please
                                        enter your password to confirm you would like to permanently delete your account.
                                    </p> */}

                                    <div className="mt-6 flex justify-end">
                                        <SecondaryButton onClick={closeModal}>
                                            Cancel
                                        </SecondaryButton>

                                        <DangerButton
                                            className="ml-3"
                                            onClick={handleDelete}
                                        >
                                            Delete
                                        </DangerButton>
                                    </div>
                                </div>
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
