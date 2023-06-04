import { useEffect, useRef, useState } from 'react';

import PostItem from '@/Pages/Post/PostItem';


export default function PostList({ posts }) {

    return (

        <section >
            <header className='mb-4'>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Discuss Forums</h2>
            </header>

            {
                posts.map((post) =>
                    <PostItem key={post.id}
                        post={post}
                    >
                    </PostItem>)
            }
        </section >
    );

}
