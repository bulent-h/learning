import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function YoutubeEmbed({ video_path }) {
    const [videoId, setVideoId] = useState();

    const containerStyle = {
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        paddingTop: '80vh',
    };

    const iframeStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        width: '100%',
        height: '80vh',
        border: 'none',
    };

    function handleVideoPath(url) {
        function getId(url) {
            const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
            const match = url.match(regExp);

            return (match && match[2].length === 11)
                ? match[2]
                : null;
        }

        setVideoId ('https://www.youtube.com/embed/' + getId(url))

    }
    useEffect(() => {
        if (video_path) {
            handleVideoPath(video_path)
        }
    }, [video_path])

    return (
        <div style={containerStyle} className='rounded-xl'>
            <iframe
                style={iframeStyle}
                src={videoId}
                title="Automate with Python – Full Course for Beginners"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen>
            </iframe>
        </div>
    );
};

