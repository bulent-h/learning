import PrimaryButton from '@/Components/PrimaryButton';
import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function CourseMangeCard({ course }) {

    const [rating, setRating] = useState(0);
    const [existingRating, setExistingRating] = useState(null);
    const [countRating, setCountRating] = useState(null);

    useEffect(() => {
        const fetchExistingRating = async () => {
            try {
                const response = await axios.get(route('rate.average', { course_id: course.id }));
                setExistingRating(response.data.rating);
                setCountRating(response.data.count);


            } catch (error) {
                console.error(error);
            }
        };

        fetchExistingRating();
    }, [course])

    useEffect(() => {
        if (existingRating) {
            setRating(existingRating);
        }
    }, [existingRating]);


    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {

            stars.push(
                <div key={i} >
                    <label >
                        <svg
                            className="star"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="25px"
                            height="25px"
                        >
                            <path
                                fill={rating >= i ? '#ffc107' : '#e4e5e9'}
                                d="M12 17.27l-5.06 2.49L8.5 13.85 4.93 10.3l5.99-.82L12 4l2.08 5.48 5.99.82-3.57 3.55 1.56 5.41L12 17.27z"
                            />
                        </svg>
                    </label>

                </div>
            );
        }
        return stars;
    };

    return (
        <>
             <div className='flex flex-col shrink-0 w-64 rounded-3xl m-2 bg-gradient-to-br from-[#6C62CB] to-[#CBFFFF] dark:from-[#4C42AB] dark:to-[#BBCFCF]'
                style={{  height: '22rem' }}
            >
                      <div className="basis-1/12 mt-3 flex items-center text-lg mx-5 truncate overflow-hidden text-gray-900 dark:text-gray-100" >
                    {course.course_title}
                </div>
                <div className="basis-1/12 flex items-center mx-5 text-sm text-blue-900 dark:text-blue-100">
                    {course?.category?.category_name}
                </div>
                <div className='basis-1/12  items-center mx-4 my-1'>
                    <div className="flex items-center ">
                        {renderStars()}
                        <span className='text-gray-900 text-xs'>({existingRating})</span>
                        <span className='text-gray-900 text-xs'>&nbsp; {countRating} rating</span>
                    </div>
                </div>

                <div className="basis-8/12 px-4 mx-1 text-ellipsis break-words overflow-y-auto  text-sm text-gray-100 dark:text-gray-900" >
                    {course.course_description}
                </div>
                <div className="basis-2/12 flex flex-rox justify-between items-center mx-5 my-3 text-gray-900 dark:text-gray-200" >
                    {/* <PrimaryButton onClick={handleEdit} className='mx-1'>
                        Edit
                    </PrimaryButton> */}
                    <Link href={route('course.manage', { id: course.id })} >

                        <PrimaryButton className='mx-1'>
                            Manage
                        </PrimaryButton>
                    </Link>

                </div>
            </div>
        </>
    )

}
