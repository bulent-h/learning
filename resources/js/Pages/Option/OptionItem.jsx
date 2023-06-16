import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';

import TextInput from '@/Components/TextInput';
import DangerButton from '@/Components/DangerButton';

import { useState } from 'react';

export default function CategoryItem({ option, handleDelete, getSingleOption }) {

    const [toggleEdit, setToggleEdit] = useState(true);
    const [optionTmp, setOptionTmp] = useState();
    const [isCorrectTmp, setIsCorrectTmp] = useState(option.is_correct);

    function handleEdit() {
        setToggleEdit(!toggleEdit);
        setOptionTmp(option.option_text);
    }

    function handleSave() {
        axios.post(route('option.update'), {
            option_id: option.id,
            option_text: optionTmp,
            is_correct: isCorrectTmp,
        })
            .then(response => {
                if (response.status >= 200 && 299 >= response.status) {

                    setToggleEdit(!toggleEdit);
                    getSingleOption();
                }
            })
            .catch(error => {
                console.log(error);

            })
    }

    return (
        <>
            <div className={`flex items-center border-b border-gray-300  dark:border-gray-700  bg-white dark:bg-gray-800 px-3 font-medium text-sm d hover:bg-gray-100
            ${option.is_correct && 'bg-green-100 hover:bg-green-200  dark:bg-green-900'}`}

            >
                <div className="w-full py-4 text-gray-700 dark:text-gray-300 ">

                    <div className="grid grid-cols-12 gap-4 content-center  ">
                        {(toggleEdit) ?
                            <>
                                <div className="col-span-10  justify-self-start self-center mt-1  text-sm  overflow-hidden">
                                    {option.option_text}
                                </div>
                                {/* <TextInput /> */}
                                <div className='col-span-2'>
                                    <SecondaryButton onClick={handleEdit} className=" justify-self-center mr-2 mt-1  text-sm truncate overflow-hidden">
                                        &#9998;
                                    </SecondaryButton>
                                    <SecondaryButton onClick={handleDelete}
                                        className='justify-self-center mt-1'
                                    >
                                        &#10060;
                                    </SecondaryButton>
                                </div>

                            </>
                            :
                            <>


                                <textarea
                                    id="optionTmp"
                                    name="optionTmp"
                                    defaultValue={option.option_text}
                                    onChange={(e) => setOptionTmp(e.target.value)}
                                    required
                                    className="col-span-10 mt-1 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-2xl border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write a question here...">
                                </textarea>

                                <div className='col-span-2 '>
                                    <SecondaryButton onClick={handleSave} className="justify-self-center mr-2 mt-1 text-sm truncate overflow-hidden">
                                        &#10004;
                                    </SecondaryButton>


                                    <SecondaryButton onClick={() => setToggleEdit(!toggleEdit)}
                                        className='justify-self-center mt-1'
                                    >
                                        {/* &#10006; */}
                                        &#10134;
                                    </SecondaryButton>

                                    <div className='mt-4'>
                                        <label className=" text-sm font-medium text-gray-900 dark:text-gray-300">Is the correct answer?</label>
                                    </div>
                                    <div className="flex items-center mt-4 ">
                                        <div>
                                            <input
                                                type="radio"
                                                checked={isCorrectTmp === 1}
                                                onChange={() => setIsCorrectTmp(1)}
                                            />
                                            <label className='mx-2 '>
                                                Yes
                                            </label>
                                        </div>
                                        <div>
                                            <input
                                                type="radio"
                                                checked={isCorrectTmp === 0}
                                                onChange={() => setIsCorrectTmp(0)}
                                            />
                                            <label className='mx-2 '>
                                                No
                                            </label>
                                        </div>
                                    </div>

                                </div>

                            </>
                        }
                    </div>

                </div>
            </div>
        </>

    );
}
