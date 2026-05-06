import './VideosSection.css';
// 👇 CAMBIAMOS ESTA LÍNEA (Le quitamos el /youtube) 👇
import ReactPlayer from 'react-player';
import { useLanguage } from '../../context/LanguageContext';

const getVideos = (t: any) => [
    {
        id: 1,
        title: t('videos', 'v1'),
        url: 'https://www.youtube.com/watch?v=X5QCpFAddFM'
    },
    {
        id: 2,
        title: t('videos', 'v2'),
        url: 'https://www.youtube.com/watch?v=X5QCpFAddFM'
    }
]

export default function VideosSection() {
    const { t } = useLanguage();
    const videos = getVideos(t);

    return (
        <section className='videos-section' id='videos'>
            <h2 className='section-title'>{t('videos', 'title')}</h2>

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