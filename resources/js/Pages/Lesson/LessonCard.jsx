import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import DangerButton from '@/Components/DangerButton';
import { useState } from 'react';
import { Link } from '@inertiajs/react';


export default function LessonCard({ lesson }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };
    const closeModal = () => {
        setConfirmingUserDeletion(false);
    };

    function handleDelete() {
        axios.post(route('lesson.destroy'), { id: lesson.id })
            .then(response => {
                if (response.status >= 200 && 299 >= response.status) {
                    setConfirmingUserDeletion(false);
                    window.location.reload(false);

                }
            })
            .catch(error => {
                console.log(error);
            })

    }
    function handleEdit() {
        axios.get()
    }

    return (
        <>
            <div className='flex flex-col shrink-0 h-80 w-64 rounded-3xl m-2 '
                style={{ backgroundImage: ' linear-gradient(to bottom right,#3aba5c,#3aba90)' }}
            >
                <div className="basis-2/12 flex items-center text-lg mx-5 truncate overflow-hidden text-gray-900 dark:text-gray-100" >
                    {lesson.lesson_title}
                </div>
                {/* <div className="basis-1/12 flex items-center mx-5 text-sm text-blue-900 dark:text-blue-100">
                    lesson__fjeio
                </div> */}
                <div className="basis-7/12 text-ellipsis overflow-auto mx-5  text-sm text-gray-100 dark:text-gray-900" >
                    {lesson.lesson_description}
                </div>
                <div className="basis-2/12 flex flex-rox justify-between items-center mx-5 my-3 text-gray-900 dark:text-gray-200" >
                    <PrimaryButton className="mt-1 mr-4 text-sm truncate overflow-hidden">
                        <Link href={route('lesson.edit',{ lesson_id: lesson.id, course_id: lesson.course_id})} >
                            Edit
                        </Link>
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
        </>
    )

}
