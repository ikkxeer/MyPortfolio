import './ScrollIndicator.css';

export default function ScrollIndicator() {
    return (
        <a href="#tecnologias" className='scroll-indicator-container'>
            <span className="scroll-text">Desliza hacia abajo</span>

            <div className="scroll-line">
                <div className="scroll-dot"></div>
            </div>
        </a>
    )
}