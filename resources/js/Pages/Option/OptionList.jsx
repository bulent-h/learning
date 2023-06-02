import { useEffect, useRef, useState } from 'react';

import OptionItem from '@/Pages/Option/OptionItem'


export default function OptionList({ question, options, getOptions, getSingleOption }) {

    const [list, setList] = useState();


    function handleDelete(id) {
        console.log(id)
        axios.post(route('option.destroy', { question_id: question.id }), { option_id: id })
            .then(response => {
                if (response.status >= 200 && 299 >= response.status) {
                    getOptions();
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    function mapOptions() {
        setList(options.map((option) =>
            <OptionItem key={option.id}
                option={option}
                handleDelete={() => handleDelete(option.id)}
                getSingleOption={() => getSingleOption(option.id)} >
            </OptionItem>
        ))
    }

    useEffect(() => {
        if (options) {
            mapOptions();
        }
    }, [options]);

    return (

        <section className="max-full">


            <div className="border border-gray-300 dark:border-gray-700 max-h-full mt-2 ml-10 rounded-lg bg-gray-500 dark:bg-gray-800  overflow-auto ">

                {list}

            </div>


        </section>
    );

}
