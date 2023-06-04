import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import CourseMangeCard from '@/Components/Course/CourseMangeCard';
import { useEffect, useState } from 'react';

export default function Home({ auth }) {

    const [courseCardList, setCourseCardList] = useState();
    const [courses, setCourses] = useState();

    function mapCourse() {
        setCourseCardList(courses.map((course) =>
            <CourseMangeCard key={course.id} course={course} ></CourseMangeCard>
        ))
    }
    async function getCourse() {
        await axios.get(route('course.index'))
            .then((data) => {
                setCourses(data.data);
            }).catch(err => {
                console.error(err);
            })
    }

    useEffect(() => {
        if (courses == undefined) {
            getCourse()
        }
        if (courses) {
            mapCourse()
        }
    }, [courses])
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Profile</h2>}
        >
            <Head title="Profile" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div>
                        <div className=" p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg " >
                            <div className='mb-6 text-black dark:text-white text-xl' >Create a Course / Category</div>
                            <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  gap-2 ' >
                                <div className='flex flex-col  shrink-0 place-items-center w-48 rounded-3xl m-2 '
                                    style={{ backgroundImage: ' linear-gradient(to bottom right,#6C12CB,#ABF9F9)' }}
                                >
                                    <div className='flex flex-col h-full '>
                                        <div className='flex justify-center my-4'>
                                            <a href={route('category.create')}>Create Category</a>
                                        </div>
                                    </div>
                                </div>

                                <div className='flex flex-col  shrink-0 place-items-center  w-48 rounded-3xl m-2 '
                                    style={{ backgroundImage: ' linear-gradient(to bottom right,#6C12CB,#ABF9F9)' }}
                                >
                                    <div className='flex flex-col h-full '>
                                        <div className='flex justify-center my-4'>
                                            <a href={route('course.create')}>Create Course</a>
                                        </div>
                                        {/* <div className='flex h-full justify-center my-4 place-items-center '>
                                            <div className='flex justify-center items-center rounded-full bg-gray-200  w-12 h-12 '>
                                                <p>+</p>
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <div className='mb-6 text-black dark:text-white text-xl' > My Classes</div>

                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-2 ' >

                            {courseCardList}

                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
