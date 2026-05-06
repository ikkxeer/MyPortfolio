import './VideosSection.css';
// 👇 CAMBIAMOS ESTA LÍNEA (Le quitamos el /youtube) 👇
import ReactPlayer from 'react-player';

const videos = [
    {
        id: 1,
        title: 'Vídeo 1',
        url: 'https://www.youtube.com/watch?v=X5QCpFAddFM'
    },
    {
        id: 2,
        title: 'Vídeo 2',
        url: 'https://www.youtube.com/watch?v=X5QCpFAddFM'
    }
]

export default function VideosSection() {
    return (
        <section className='videos-section' id='videos'>
            <h2 className='section-title'>Vídeos</h2>

            <div className="video-container">
                {videos.map((video) => (
                    <div key={video.id} className="video">

                        <ReactPlayer
                            url={video.url}
                            width="100%"
                            height="315px"
                            controls={true}
                            light={false}
                        />

                    </div>
                ))}
            </div>

        </section>
    )
}