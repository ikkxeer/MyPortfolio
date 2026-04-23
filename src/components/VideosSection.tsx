import './VideosSection.css';

const videos = [
    {
        id: 1,
        title: 'Video 1',
        ruta: '/video2.mp4'
    },
    {
        id: 2,
        title: 'Video 2',
        ruta: '/video1.mp4'
    }
]

export default function VideosSection() {
    return (
        <section className='videos-section' id='videos'>
            <h2 className='section-title'>Videos</h2>

            <div className="video-container">
                {videos.map((video) => (
                    <div key={video.id} className="video">
                        <iframe
                            width="560"
                            height="315"
                            src={video.ruta}
                            title={video.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>
                    </div>
                ))}
            </div>

        </section>

    )
}