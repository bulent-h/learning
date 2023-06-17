import PrimaryButton from '@/Components/PrimaryButton';
import DangerButton from '@/Components/DangerButton';
import { Link } from '@inertiajs/react';

export default function CourseMangeCard({ getCourse,course }) {

    function handleUnregister() {
         axios.post(route('course.unregister'), { id: course.id })
            .then(response => {
                if (response.status >= 200 && 299 >= response.status) {
                    console.log('unregistered')
                    getCourse()
                }
            })
            .catch(error => {
                // validationErrors = error.response.data.errors;
                console.log(error);
            })
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
                    <DangerButton onClick={handleUnregister} className='mx-1'>
                        Unregister
                    </DangerButton>
                    <PrimaryButton className='mx-1'>
                        <Link href={route('course.show', { course_id: course.id })} >
                            View
                        </Link>
                    </PrimaryButton>

                </div>
            </div>
        </>
    )

}
