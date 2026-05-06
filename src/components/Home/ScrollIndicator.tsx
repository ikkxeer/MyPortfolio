import { useLanguage } from '../../context/LanguageContext';
import './ScrollIndicator.css';

export default function ScrollIndicator() {
    const { t } = useLanguage();

    return (
        <a href="#tecnologias" className='scroll-indicator-container'>
            <span className="scroll-text">{t('scroll', 'down')}</span>

            <div className="scroll-line">
                <div className="scroll-dot"></div>
            </div>
            <div className="scroll-end-dot"></div>
        </a>
    )
}