import { useEffect, useState } from "react";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export default function ChatItem({ user, handleSelectChat }) {
    const [lastMessage, setLastMessage] = useState(null);


    async function setup() {
        await axios.get(route('chat.getLastMessage', {
            id: user.id,
        }))
            .then((data) => {
                setLastMessage(data.data);
            }).catch(err => {
                console.error(err);
            })
    }

    useEffect(() => {
        setup();
    }, [user])
    // console.log(lastMessage);

    return (
        <>
            <div onClick={handleSelectChat} className="bg-white dark:bg-gray-900 px-3 flex  font-medium text-sm  items-center border border-gray-200 dark:border-gray-700 hover:bg-blue-100 cursor-pointer">
                <div>
                    <div className="bg-gray-200 dark:bg-gray-700 h-12 w-12 rounded-full"></div>

                    {/* <img className="h-12 w-12 rounded-full" />
                    <img className="h-12 w-12 rounded-full" /> */}

                </div>
                <div className="ml-4 flex-1 py-4 text-gray-700 dark:text-gray-300 ">
                    <div className="flex items-bottom justify-between font-semibold">
                        <i className="" id="username">
                            {user.name}
                        </i>
                        {
                            lastMessage &&
                            <p className="text-xs text-gray-400 dark:text-gray-500">
                                {dayjs(lastMessage.updated_at).fromNow()}
                            </p>


                        }
                    </div>
                    {
                        lastMessage ?
                            <p className="mt-1 text-sm  w-64 truncate overflow-hidden">
                                {lastMessage.text_content}
                            </p>
                            :
                            <p className="text-gray-400 dark:text-gray-500  italic mt-1 text-sm">
                                Empty chat
                            </p>
                    }
                </div>
            </div>
        </>
    )
}
