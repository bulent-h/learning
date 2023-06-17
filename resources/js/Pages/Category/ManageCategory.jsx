import { useEffect, useRef, useState } from 'react';

import CategoryItem  from '@/Pages/Category/CategoryItem'


export default function EditCategory( ) {

    const [allCategory, setAllCategory] = useState();
    const [list, setList] = useState();


    function handleDelete(id) {
        console.log(id)
        axios.post(route('category.destroy'), { id: id })
            .then(response => {
                if (response.status >= 200 && 299 >= response.status) {
                    // console.log(response.data);
                    getCategory()
                }
            })
            .catch(error => {
                // validationErrors = error.response.data.errors;
                console.log(error);

            })

    }

    function mapCategory() {
        setList(allCategory.map((category) =>
            <CategoryItem key={category.id} category={category} getCategory={getCategory} handleDelete={()=>handleDelete(category.id)} ></CategoryItem>
        ))
    }

    async function getCategory() {
        await axios.get(route('category.index'))
            .then((data) => {
                setAllCategory(data.data);
                console.log(data.data);
            }).catch(err => {
                console.error(err);
            })
    }

    useEffect(() => {
        if (allCategory == undefined) {
            getCategory()
        }
        if (allCategory) {
            mapCategory()
        }
    }, [allCategory])

    return (

        <section className="max-w-2xl">
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100"> All Categories
                </h2>

            </header>

            <div className=" max-h-full border-2 border-gray-100 dark:border-gray-700  mt-8 rounded-2xl bg-gray-200 dark:bg-gray-800 overflow-auto ">

                {list}

            </div>


        </section>
    );

}
