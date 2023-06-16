import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import DangerButton from '@/Components/DangerButton';
import OptionList from '@/Pages/Option/OptionList'
import SecondaryButton from '@/Components/SecondaryButton';

import { useEffect, useRef, useState } from 'react';

export default function QuestionItem({ question, handleDelete, getSingleQuestion }) {

    const [toggleEdit, setToggleEdit] = useState(true);
    const [questionTmp, setQuestionTmp] = useState();
    const [isCorrect, setIsCorrect] = useState(false);
    const [currentOption, setCurrentOption] = useState();
    const [toggleOptionInput, setToggleOptionInput] = useState(false);

    const [options, setOptions] = useState();

    function handleEdit() {
        setToggleEdit(!toggleEdit);
        setQuestionTmp(question.question_text);
    }
    function handleSave() {
        axios.post(route('question.update'), {
            question_id: question.id,
            question_text: questionTmp
        })
            .then(response => {
                if (response.status >= 200 && 299 >= response.status) {

                    setToggleEdit(!toggleEdit);
                    getSingleQuestion();
                }
            })
            .catch(error => {
                console.log(error);

            })
    }
    function handleCreateOption() {
        axios.post(route('option.store'), {
            question_id: question.id,
            option_text: currentOption,
            is_correct: isCorrect
        })
            .then((data) => {
                setCurrentOption('')
                setIsCorrect(false)
                getOptions();

            }).catch(err => {
                console.error(err);
            })
    }
    function getSingleOption(id) {

        const nextArr = [...options]
        var targetObj = nextArr.findIndex(obj => obj.id === id);

        axios.get(route('option.show', { option_id: id }))
            .then((data) => {
                nextArr[targetObj] = data.data;
                // targetObj = data.data;
                console.log(nextArr);

                setOptions(nextArr);

            }).catch(err => {
                console.error(err);
            })
    }
    function getOptions() {
        axios.get(route('option.index', { question_id: question.id }))
            .then((data) => {
                setOptions(data.data.reverse());
            }).catch(err => {
                console.error(err);
            })
    }
    useEffect(() => {
        if (options == undefined) {
            getOptions();
        }
    }, [options]);

    return (
        <>
            <div className="flex  border border-gray-300 dark:border-gray-700 items-center border-b drop-shadow-xl border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 px-3 font-medium text-sm  hover:bg-gray-200 m-3 rounded-2xl "
            // style={{ backgroundImage: ' linear-gradient(to bottom right,#a0a3a3,#cccccc)' }}

            >
                <div className="w-full py-4 text-gray-700 dark:text-gray-300 ">

                    <div className="grid grid-cols-12 gap-4 content-center border-b border-gray-300 dark:border-gray-700  pb-10">
                        {(toggleEdit) ?
                            <>
                                <div className="col-span-10 justify-self-start self-center mt-1   overflow-hidden">
                                    {question.question_text}
                                </div>
                                {/* <TextInput /> */}
                                <div className='col-span-2'>
                                    <PrimaryButton onClick={handleEdit} className="justify-self-center mr-2 mt-1 text-sm truncate overflow-hidden">
                                        Edit
                                    </PrimaryButton>
                                    <DangerButton onClick={handleDelete}
                                        className='justify-self-center mt-1'
                                    >
                                        Delete
                                    </DangerButton>
                                </div>

                            </>
                            :
                            <>
                                <textarea
                                    id="questionTmp"
                                    name="questionTmp"
                                    defaultValue={question.question_text}
                                    onChange={(e) => setQuestionTmp(e.target.value)}
                                    required
                                    className="col-span-10 mt-1 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-2xl border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write a question here...">
                                </textarea>

                                {/* <TextInput
                                    defaultValue={question.question_text}
                                    className='col-span-10'
                                    onChange={(e) => setQuestionTmp(e.target.value)}
                                /> */}
                                <div className='col-span-2 '>
                                    <PrimaryButton onClick={handleSave} className="justify-self-center mr-2 mt-1 text-sm truncate overflow-hidden">
                                        Save
                                    </PrimaryButton>


                                    <DangerButton onClick={() => setToggleEdit(!toggleEdit)}
                                        className='justify-self-center mt-1'
                                    >
                                        Cancel
                                    </DangerButton>
                                    {/* <button onClick={() => setToggleEdit(!toggleEdit)}
                                        className=
                                        'col-span-1 justify-self-center mt-1 text-sm truncate overflow-hidden inline-flex items-center px-4 py-2 bg-gray-800 dark:bg-red-500 border border-transparent rounded-2xl font-semibold text-xs text-white dark:text-gray-200 uppercase tracking-widest hover:bg-gray-700 dark:hover:bg-red-400 focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150'
                                    >
                                        Cancel
                                    </button> */}
                                </div>

                            </>
                        }
                    </div>

                    <div className=''>
                        <div className='flex justify-between m-2'>
                            <div className="text-base text-gray-900 dark:text-gray-100 flex items-center">Options
                            </div>
                            <SecondaryButton onClick={() => setToggleOptionInput(!toggleOptionInput)} className="justify-self-center mr-2 mt-1 text-sm truncate overflow-hidden">
                                {(toggleOptionInput) ? <>&#10134;</> : <>&#10133;</>}
                            </SecondaryButton>
                        </div>
                        <>
                            {
                                (toggleOptionInput) &&
                                <div className="grid grid-cols-12 gap-4 content-center mt-4 mb-6  pt-4">
                                    <textarea
                                        name="currentOption"
                                        value={currentOption}
                                        onChange={(e) => setCurrentOption(e.target.value)}
                                        required
                                        className="col-span-10 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-2xl border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write an option here...">
                                    </textarea>

                                    <div className='col-span-2 '>

                                        <button onClick={handleCreateOption}>
                                            <div className='flex flex-col hover:scale-105 shrink-0 place-items-center px-3 w-full rounded-3xl  '

                                                style={{ backgroundImage: ' linear-gradient(to bottom right,#6C12CB,#ABF9F9)' }}
                                            >
                                                <div className='flex flex-col h-full '>
                                                    <div className='flex justify-center my-2 text-gray-900 dark:text-white'>
                                                        <p>Add Option</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </button>
                                        <div className='mt-4'>
                                            <label className=" text-sm font-medium text-gray-900 dark:text-gray-300">Is the correct answer?</label>
                                        </div>
                                        <div className="flex items-center mt-4 ">

                                            <div>
                                                <div>
                                                    <input
                                                        type="radio"
                                                        value="true"
                                                        checked={isCorrect === true}
                                                        onChange={() => setIsCorrect(true)}
                                                    />
                                                    <label className='mx-2 '>
                                                        Yes
                                                    </label>
                                                </div>
                                                <div>
                                                    <input
                                                        type="radio"
                                                        value="false"
                                                        checked={isCorrect === false}
                                                        onChange={() => setIsCorrect(false)}
                                                    />
                                                    <label className='mx-2 '>
                                                        No
                                                    </label>
                                                </div>
                                            </div>
                                        </div>



                                    </div>
                                </div>
                            }
                        </>
                        <OptionList
                            question={question}
                            options={options}
                            getOptions={getOptions}
                            getSingleOption={getSingleOption}
                        />
                    </div>


                </div>
            </div>
        </>

    );
}
