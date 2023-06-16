import { useEffect, useRef, useState } from 'react';

import OptionItemStudent from '@/Pages/StudentExam/OptionItemStudent'


export default function OptionListStudent({ options, question,handleOptionSelect ,selectedOptions}) {

    const [list, setList] = useState();


    function mapOptions() {
        setList(options.map((option) =>
            <OptionItemStudent key={option.id}
                option={option}
                question={question}
                handleOptionSelect={handleOptionSelect}
                selectedOptions={selectedOptions}

            >
            </OptionItemStudent>
        ))
    }

    useEffect(() => {
        if (options) {
            mapOptions();
        }
    }, [options]);

    return (

        <section className="max-full">


            <div className="border border-gray-300 dark:border-gray-700 max-h-full mt-2  rounded-2xl bg-gray-500 dark:bg-gray-800  overflow-auto ">

                {list}

            </div>


        </section>
    );

}
