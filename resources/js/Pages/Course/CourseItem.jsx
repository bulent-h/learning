import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

import { useState } from 'react';

export default function CourseItem({ course }) {


    return (
        <>
            <div className="flex items-center border-b border-gray-200 bg-white dark:bg-gray-800 px-3 font-medium text-sm dark:border-gray-700 hover:bg-gray-100 cursor-pointer">
                <div className="w-full py-4 text-gray-700 dark:text-gray-300 ">

                    <div className="grid grid-cols-6 gap-4 content-center ">
                        <div className="col-span-4 w-80 justify-self-start self-center mt-1 text-sm truncate overflow-hidden">
                            {/* {course.course.id} */}fwef
                        </div>
                        {/* <TextInput /> */}
                        <PrimaryButton  className="col-span-1 justify-self-center  mt-1 text-sm truncate overflow-hidden">
                            Edit
                        </PrimaryButton>
                        <button className=
                            'col-span-1 justify-self-center  mt-1 text-sm truncate overflow-hidden inline-flex items-center px-4 py-2 bg-gray-800 dark:bg-red-500 border border-transparent rounded-md font-semibold text-xs text-white dark:text-gray-200 uppercase tracking-widest hover:bg-gray-700 dark:hover:bg-red-400 focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150'>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
