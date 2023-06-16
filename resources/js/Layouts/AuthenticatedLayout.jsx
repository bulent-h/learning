import { useEffect, useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import DarkModeButton from '@/Components/DarkModeButton'

export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <nav className="   border-gray-100 dark:border-gray-700">
                <div className="max-w-7xl  rounded-b-lg  mx-auto px-4 sm:px-6 lg:px-8 ">
                    <div>
                        <div className="flex justify-between h-16 p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-b-2xl">

                            <div className="shrink-0 flex items-center">

                                <DarkModeButton />
                            </div>

                            <div className="flex place-self-center">


                                <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                    <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                        Home
                                    </NavLink>
                                    <NavLink href={route('course.mycourse')} active={route().current('course.mycourse')}>
                                        My Courses
                                    </NavLink>
                                    <NavLink href={route('posts.index')} active={route().current('posts.index')}>
                                        Discuss
                                    </NavLink>
                                    <NavLink href={route('teacher.dashboard')} active={route().current('teacher.dashboard')}>
                                        Teacher Dashboard
                                    </NavLink>
                                </div>

                            </div>

                            {/* search bar */}
                            {/* <div className="flex flex-row  items-center w-3/12 px-4 my-4 rounded-full bg-gray-200 border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300  border-none overflow-hidden">

    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22">
        <path fill="#263238" fillOpacity=".5"
            d="M15.9 14.3H15l-.3-.3c1-1.1 1.6-2.7 1.6-4.3 0-3.7-3-6.7-6.7-6.7S3 6 3 9.7s3 6.7 6.7 6.7c1.6 0 3.2-.6 4.3-1.6l.3.3v.8l5.1 5.1 1.5-1.5-5-5.2zm-6.2 0c-2.6 0-4.6-2.1-4.6-4.6s2.1-4.6 4.6-4.6 4.6 2.1 4.6 4.6-2 4.6-4.6 4.6z">
        </path>
    </svg>
    <div>
        <input type="text"
            className='bg-gray-200 text-center border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300  focus:ring-0  dark:focus:ring-0 rounded-2xl  border-none'
            placeholder="Search" />
    </div>
</div> */}
                            {/*End search bar */}


                            <div className="hidden sm:flex sm:items-center sm:ml-6 ">
                                <div>
                                    <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                        <a
                                            href={route('chat')}
                                            type="button"
                                            className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-full text-sm p-2.5"                                    >
                                            <svg fill="currentColor" viewBox="0 0 19.00 19.00" xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 " stroke="#7a7a7a" strokeWidth="0.00019">
                                                <g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"><path d="M5.57 7.532v3.356l-2.248 1.403c-.222.138-.403.038-.403-.223V10.68H1.852a.476.476 0 0 1-.475-.475V3.643a.476.476 0 0 1 .475-.475h9.39a.476.476 0 0 1 .475.475v2.305H7.154A1.585 1.585 0 0 0 5.57 7.532zm11.449 0v6.563a.476.476 0 0 1-.475.475h-1.049v1.436c0 .261-.18.362-.403.224l-2.605-1.626a.54.54 0 0 1-.048-.034H7.154a.476.476 0 0 1-.475-.475V7.532a.477.477 0 0 1 .475-.475h9.39a.476.476 0 0 1 .475.475z" /></g></svg>
                                        </a>

                                    </div>
                                </div>

                                <div className="ml-3 relative">

                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            {/* <span className="inline-flex rounded-2xl"> */}
                                            {/* <button
                        type="button"
                        className="inline-flex items-center border border-transparent text-sm leading-4 font-medium rounded-2xl text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none "
                    > */}
                                            {/* {user.name} */}

                                            {/* <svg
                            className="ml-2 -mr-0.5 h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg> */}

                                            {/* <div className='ml-4 rounded-full bg-gray-200 dark:bg-gray-400 h-12 w-12 overflow-hidden '>
                        </div> */}



                                            <div
                                                id='profile-image'
                                                className=" bg-center bg-cover bg-no-repeat bg-gray-200 dark:bg-gray-400 bg-origin-padding w-12 h-12 rounded-full"
                                                style={(user.avatar) && { backgroundImage: `url(/storage/${user.avatar})` }}>

                                            </div>

                                            {/* :
                    <img className="bg-center bg-cover bg-no-repeat bg-gray-200 dark:bg-gray-400 bg-origin-padding w-12 h-12 rounded-full" /> */}




                                            {/* </button> */}
                                            {/* </span> */}
                                        </Dropdown.Trigger>

                                        <Dropdown.Content>
                                            <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                            <Dropdown.Link id='logout' href={route('logout')} method="post" as="button">
                                                Log Out
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </div>
                            </div>


                            <div className="-mr-2 flex items-center sm:hidden">
                                <button
                                    onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                    className="inline-flex items-center justify-center p-2 rounded-2xl text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-900 focus:text-gray-500 dark:focus:text-gray-400 transition duration-150 ease-in-out"
                                >
                                    <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                        <path
                                            className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                        <path
                                            className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                            Dashboard
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('chat')} active={route().current('chat')}>
                            Chat
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('course.mycourse')} active={route().current('course.mycourse')}>
                            My Courses
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('posts.index')} active={route().current('posts.index')}>
                            Chirps
                        </ResponsiveNavLink>

                    </div>

                    <div className="pt-4 pb-1 border-t border-gray-200 dark:border-gray-600">
                        <div className="px-4">
                            <div className="font-medium text-base text-gray-800 dark:text-gray-200">
                                {user.name}
                            </div>
                            <div className="font-medium text-sm text-gray-500">{user.email}</div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {/* {header && (
                <header className="bg-white dark:bg-gray-800 shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )} */}

            <main>{children}</main>

        </div>
    );
}
