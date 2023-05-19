import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import DangerButton from '@/Components/DangerButton';
import { useState } from 'react';
import { Link } from '@inertiajs/react';


export default function ExamCard({ exam }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };
    const closeModal = () => {
        setConfirmingUserDeletion(false);
    };
    console.log(exam)
    function handleDelete() {
        axios.post(route('exam.destroy'), { exam_id: exam.id })
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


    return (
        <>
            <div className='flex flex-col shrink-0 h-60 w-64 rounded-3xl m-2 '
                style={{ backgroundImage: ' linear-gradient(to bottom right,#9999cc,#333355)' }}
            >
                <div className="basis-3/12 flex items-center text-lg mx-5 truncate overflow-hidden text-gray-900 dark:text-gray-100" >
                    {exam.title}
                </div>
                <div className="basis-5/12 text-ellipsis overflow-auto mx-5  text-sm text-gray-100 dark:text-gray-900" >
                    {exam.description}
                </div>
                <div className="basis-4/12 flex flex-rox justify-between items-center mx-5 my-3 text-gray-900 dark:text-gray-200" >
                    <PrimaryButton className="mt-1 mr-4 text-sm truncate overflow-hidden">
                        <Link href={route('exam.edit',{ exam_id: exam.id, course_id: exam.course_id})} >
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
                                Are you sure you want to delete this exam?
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
