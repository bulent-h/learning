import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';

import TextInput from '@/Components/TextInput';
import DangerButton from '@/Components/DangerButton';

import { useState } from 'react';

export default function OptionItemStudent({ option, question, handleOptionSelect, selectedOptions }) {


    return (
        <>

            <div className="flex items-center border-b border-gray-300  dark:border-gray-700  bg-white dark:bg-gray-800 px-3 font-medium text-sm d hover:bg-gray-100">
                <div className="w-full py-4 text-gray-700 dark:text-gray-300 ">
                    <div className="grid grid-cols-12 gap-4 content-center  ">
                        <div className='col-span-1'>
                            <input
                                type="radio"
                                name={`question_${question.id}`}
                                value={option.id}
                                // checked={selectedOptions[question.id] === option.id}
                                onChange={() => handleOptionSelect(question.id, option.id)}
                            />
                        </div>
                        <div className="col-span-11  justify-self-start self-center   text-sm  overflow-hidden">
                            {option.option_text}
                        </div>
                    </div>

                </div>
            </div>
        </>

    );
}
