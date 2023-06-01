import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import DangerButton from '@/Components/DangerButton';

import { useState } from 'react';

export default function CategoryItem({ question, handleDelete}) {

    const [toggleEdit, setToggleEdit] = useState(true);

    const [questionTmp, setQuestionTmp] = useState();

    function handleEdit() {
        setToggleEdit(!toggleEdit);
        setQuestionTmp(question.question_text);

    }
    function handleSave() {
        axios.post(route('question.update'), {
            question_id: question.id,
            question_text:questionTmp
        })
        .then(response => {
            if (response.status >= 200 && 299 >= response.status) {

                setToggleEdit(!toggleEdit);
            }
        })
        .catch(error => {
            console.log(error);

        })

    }

    return (
        <>
            <div className="flex items-center border-b border-gray-200 bg-white dark:bg-gray-800 px-3 font-medium text-sm dark:border-gray-700 hover:bg-gray-100 cursor-pointer">
                <div className="w-full py-4 text-gray-700 dark:text-gray-300 ">

                    <div className="grid grid-cols-6 gap-4 content-center ">
                        {(toggleEdit) ?
                            <>
                                <div className="col-span-4 w-80 justify-self-start self-center mt-1 text-sm truncate overflow-hidden">
                                    {question.question_text}
                                </div>
                                {/* <TextInput /> */}
                                <PrimaryButton onClick={handleEdit}  className="col-span-1 justify-self-center  mt-1 text-sm truncate overflow-hidden">
                                    Edit
                                </PrimaryButton>
                                <DangerButton onClick={handleDelete}
                                className='justify-self-center '
                                    // 'col-span-1 justify-self-center  mt-1 text-sm truncate overflow-hidden inline-flex items-center px-4 py-2 bg-gray-800 dark:bg-red-500 border border-transparent rounded-md font-semibold text-xs text-white dark:text-gray-200 uppercase tracking-widest hover:bg-gray-700 dark:hover:bg-red-400 focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150'
                                    >
                                    Delete
                                </DangerButton>
                            </>
                            :
                            <>
                                <TextInput
                                    defaultValue={question.question_text}
                                    className='col-span-4'
                                    onChange={(e) => setQuestionTmp(e.target.value)} />
                                <PrimaryButton onClick={handleSave} className="col-span-1 justify-self-center  mt-1 text-sm truncate overflow-hidden">
                                    Save
                                </PrimaryButton>
                                <button onClick={() => setToggleEdit(!toggleEdit)}
                                className=
                                'col-span-1 justify-self-center  mt-1 text-sm truncate overflow-hidden inline-flex items-center px-4 py-2 bg-gray-800 dark:bg-red-500 border border-transparent rounded-md font-semibold text-xs text-white dark:text-gray-200 uppercase tracking-widest hover:bg-gray-700 dark:hover:bg-red-400 focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150'
                                >
                                    Cancel
                                </button>
                            </>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}
