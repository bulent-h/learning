import PrimaryButton from '@/Components/PrimaryButton';

export default function CategoryItem({ category, handleEdit, handleDelete }) {

    return (
        <>
            <div className="flex items-center border-b border-gray-200 bg-white dark:bg-gray-800 px-3 font-medium text-sm dark:border-gray-700 hover:bg-gray-100 cursor-pointer">
                <div className="w-full py-4 text-gray-700 dark:text-gray-300 ">
                    <div className="grid grid-cols-6 gap-4 content-center ">
                        <div className="col-span-4 w-80 justify-self-start self-center mt-1 text-sm truncate overflow-hidden">
                            {category.category_name}
                        </div>
                        {/* <TextInput /> */}
                        <PrimaryButton onClick={handleEdit} className="col-span-1 justify-self-center  mt-1 text-sm truncate overflow-hidden">
                            Edit
                        </PrimaryButton>
                        <PrimaryButton onClick={handleDelete} className="col-span-1 justify-self-center mt-1 bg-red-600 dark:bg-red-600 dark:text-white hover:bg-red-400 dark:hover:bg-red-400 text-sm truncate overflow-hidden">
                            Delete
                        </PrimaryButton>
                    </div>
                </div>
            </div>
        </>
    );
}
