import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import CourseViewCard from '@/Components/Course/CourseViewCard';
import { useEffect, useState } from 'react';

export default function Home({ auth }) {

    const [courseCardList, setCourseCardList] = useState();
    const [courses, setCourses] = useState();

    const [searchedCourses, setSearchedCourses] = useState([]);
    const [query, setQuery] = useState('');

    function mapCourse(C) {
        setCourseCardList(C.map((course) =>
            <CourseViewCard key={course.id} course={course} getCourse={getCourse}></CourseViewCard>
        ))
    }
    async function getCourse() {
        await axios.get(route('course.coursesToRegister'))
            .then((data) => {
                setCourses(data.data);
            }).catch(err => {
                console.error(err);
            })
    }
    const handleSearch = async (e) => {
        const term = e.target.value;
        setQuery(e.target.value)
        // console.log(query)
        // const response = await axios.get(route('search.courses',{query}));
        // setSearchedCourses(response.data);
        // mapCourse(response.data)
        // console.log(response.data)

        const filteredCourses = courses.filter((course) => {
            // Filter based on course properties you want to search, e.g., course.title
            return course.course_title.toLowerCase().includes(term.toLowerCase());

        });
        mapCourse(filteredCourses);

    }

    useEffect(() => {
        if (courses == undefined) {
            getCourse()
        }
        if (courses) {
            mapCourse(courses)
        }
    }, [courses])
    return (
        <>
            <section className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-2xl">

                <div className='flex border-b-2 border-gray-300 dark:border-gray-700  mb-3 p-4  '>
                    <div className='text-black dark:text-white text-xl ' > Find Courses </div>

                    <div className="flex flex-row  px-4 py-1 items-center h-10 ml-auto  w-2/4 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-900 dark:text-gray-400 ">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                            <path
                                d="M15.9 14.3H15l-.3-.3c1-1.1 1.6-2.7 1.6-4.3 0-3.7-3-6.7-6.7-6.7S3 6 3 9.7s3 6.7 6.7 6.7c1.6 0 3.2-.6 4.3-1.6l.3.3v.8l5.1 5.1 1.5-1.5-5-5.2zm-6.2 0c-2.6 0-4.6-2.1-4.6-4.6s2.1-4.6 4.6-4.6 4.6 2.1 4.6 4.6-2 4.6-4.6 4.6z">
                            </path>
                        </svg>

                        <input
                            type="text"
                            value={query} onChange={(e) => handleSearch(e)}
                            className="w-full bg-gray-100 dark:bg-gray-700 dark:text-gray-300 focus:border-gray-100 focus:ring-gray-100 text-sm focus:ring-0 border-0"
                            placeholder="Search" />
                        <button onClick={handleSearch} >Search</button>

                    </div></div>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-2 '
                    style={{ minHeight: '50vh', }}
                >

                    {courseCardList}

                </div>
            </section>

        </>
    );
}
