import PrimaryButton from '@/Components/PrimaryButton';

export default function CourseMangeCard( ) {

    return (
        <>
            <div className='flex flex-col shrink-0 h-80 w-64 rounded-3xl m-2 '
                style={{ backgroundImage: ' linear-gradient(to bottom right,#6C62CB,#CBFFFF)' }}
            >

                <div className="basis-2/12 flex items-center text-lg mx-5 truncate overflow-hidden text-gray-900 dark:text-gray-200" >
                    Course title fmekwmfklwemkflew krekgrlgklrejglkrej
                </div>
                <div className="basis-1/12 flex items-center mx-5 text-sm text-gray-600 dark:text-gray-300">
                    category
                </div>
                <div className="basis-7/12 text-ellipsis overflow-auto mx-5  text-gray-900 dark:text-gray-200" >
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </div>
                <div className="basis-2/12 flex flex-rox justify-between items-center mx-5 my-3 text-gray-900 dark:text-gray-200" >
                    <PrimaryButton className='mx-1'>
                        Edit
                    </PrimaryButton>
                    <PrimaryButton className='mx-1'>
                        Mange
                    </PrimaryButton>
                </div>
            </div>
        </>
    )

}
