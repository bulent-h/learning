
import { useEffect, useState } from 'react';
import ExamCard from '@/Pages/Exam/ExamCard';

export default function ExamList({ exams}) {

    const [list, setList] = useState();

    function mapCourse() {
        setList(exams.map((exam) =>
            <ExamCard key={exam.id} exam={exam}  ></ExamCard>
        ))
    }
    console.log(exams)
    useEffect(() => {
        mapCourse()
    }, [])

    return (
        <section className="max-w-full">

                <div className='mb-6 text-black dark:text-white text-xl'>Exams</div>

                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-2 ' >
                    {list}
                </div>

        </section >
    );
}
