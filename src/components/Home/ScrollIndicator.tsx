import './ScrollIndicator.css';

export default function ScrollIndicator() {
    return (
        <a href="#tecnologias" className='scroll-indicator-container'>
            <span className="scroll-text">Llisca cap avall</span>

            <div className="scroll-line">
                <div className="scroll-dot"></div>
            </div>
            <div className="scroll-end-dot"></div>
        </a>
    )
}