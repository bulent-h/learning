import { useEffect, useState } from "react";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export default function ChatItem({ user, handleSelectChat }) {
    const [lastMessage, setLastMessage] = useState(null);
    const [loading, setLoading] = useState(true);
    async function setup() {
        await axios.get(route('chat.getLastMessage', {
            id: user.id,
        }))
            .then((data) => {
                setLastMessage(data.data);
                setLoading(false);
            }).catch(err => {
                console.error(err);
            })
    }

    useEffect(() => {
        setup();
    }, [user, loading])
    // console.log(lastMessage);


    return (
        <>
            <div onClick={handleSelectChat} className="flex items-center border border-gray-200 bg-white dark:bg-gray-900 px-3 font-medium text-sm dark:border-gray-700 hover:bg-blue-100 cursor-pointer">
                <div>
                    <div className="bg-gray-200 dark:bg-gray-700 h-12 w-12 rounded-full"></div>

                    {/* <img className="h-12 w-12 rounded-full" />
                    <img className="h-12 w-12 rounded-full" /> */}

                </div>
                {/* <div className="ml-4 flex-1 w-1/12 py-4 text-gray-700 dark:text-gray-300 "> */}
                <div className="ml-4 w-full py-4 text-gray-700 dark:text-gray-300 ">

                    <div className="grid grid-cols-3 gap-4 place-content-end font-semibold">
                        <i className="col-span-2 truncate overflow-hidden" id="username">
                            {user.name}
                        </i>
                        {
                            lastMessage &&
                            <p className="justify-self-end text-xs text-gray-400 dark:text-gray-500">
                                {dayjs(lastMessage.updated_at).fromNow()}
                            </p>
                        }
                    </div>

                    {
                        (!loading) ?
                            <div className="grid grid-cols-4 gap-4">
                                {
                                    lastMessage ?
                                        <p className="col-span-3 mt-1 text-sm truncate overflow-hidden">
                                            {lastMessage.text_content}
                                        </p>
                                        :
                                        <p className="col-span-3 text-gray-400 dark:text-gray-500  italic mt-1 text-sm">
                                            Empty chat
                                        </p>
                                }
                            </div>
                            :
                            <div className="grid grid-cols-4 gap-4">
                                {/* <div className="mt-1 text-sm bg-gray-500 self-center rounded-full">
                                    &nbsp;
                                </div> */}
                                <p className="col-span-3 mt-1 text-sm text-blue-300 truncate overflow-hidden">
                                    Loading ...
                                </p>
                                {/* <div className="lds-ellipsis mt-1 rounded-full">
                                <div className="bg-gray-300" ></div>
                                <div className="bg-gray-300" ></div>
                                <div className="bg-gray-300" ></div>
                                <div className="bg-gray-300" ></div>

                            </div> */}

                            </div>
                    }
                </div>
            </div>
        </>
    )
}
