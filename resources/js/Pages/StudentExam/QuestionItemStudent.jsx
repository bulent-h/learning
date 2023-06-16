import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import DangerButton from '@/Components/DangerButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { useEffect, useRef, useState } from 'react';
import OptionListStudent from '@/Pages/StudentExam/OptionListStudent';


export default function QuestionItemStudent({ question,handleOptionSelect,selectedOptions }) {


    return (
        <>
            <div className="flex  border border-gray-300 dark:border-gray-700 items-center  drop-shadow-xl border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 px-3 font-medium text-sm  m-3 rounded-2xl "
            // style={{ backgroundImage: ' linear-gradient(to bottom right,#a0a3a3,#cccccc)' }}
            >
                <div className="w-full py-4 text-gray-700 dark:text-gray-300 ">
                    <div className="grid grid-cols-12 gap-4 content-center  border-gray-300 dark:border-gray-700  pb-5">
                        <>
                            <div className="col-span-10 justify-self-start self-center mt-1   overflow-hidden">
                                {question.question_text}
                            </div>
                            <div className='col-span-2'>
                            </div>
                        </>
                    </div>

                    <div className=''>

                        <OptionListStudent
                            options={question.options}
                            question={question}
                            handleOptionSelect={handleOptionSelect}
                            selectedOptions={selectedOptions}

                        />
                    </div>


                </div>
            </div>
        </>

    );
}
