import PrimaryButton from '@/Components/PrimaryButton';
import { Link } from '@inertiajs/react';

export default function CourseMangeCard({ course }) {

    function handleEdit() {
        console.log(course.id);
    }

    function handleManage() {

    }

    return (
        <>
            <div className='flex flex-col shrink-0 h-80 w-64 rounded-3xl m-2 '
                style={{ backgroundImage: ' linear-gradient(to bottom right,#6C62CB,#CBFFFF)' }}
            >

                <div className="basis-2/12 flex items-center text-lg mx-5 truncate overflow-hidden text-gray-900 dark:text-gray-100" >
                    {course.course_title}
                </div>
                <div className="basis-1/12 flex items-center mx-5 text-sm text-blue-900 dark:text-blue-100">
                    {course?.category?.category_name}
                </div>
                <div className="basis-7/12 text-ellipsis overflow-auto mx-5  text-sm text-gray-100 dark:text-gray-900" >
                    {course.course_description}
                </div>
                <div className="basis-2/12 flex flex-rox justify-between items-center mx-5 my-3 text-gray-900 dark:text-gray-200" >
                    {/* <PrimaryButton onClick={handleEdit} className='mx-1'>
                        Edit
                    </PrimaryButton> */}
                    <Link href={route('course.edit', { id: course.id })} >

                        <PrimaryButton className='mx-1'>
                            Manage
                        </PrimaryButton>
                    </Link>

                </div>
            </div>
        </>
    )

}
