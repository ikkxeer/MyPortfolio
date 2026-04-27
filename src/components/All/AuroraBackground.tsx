// src/components/AuroraBackground.tsx
import './AuroraBackground.css';

export default function AuroraBackground() {
    return (
        // Este contenedor abarcará toda la pantalla y se quedará fijo al fondo
        <div className="aurora-bg">
            {/* Manchas */}
            <div className="aurora-blob blob-1"></div>
            <div className="aurora-blob blob-2"></div>
            <div className="aurora-blob blob-3"></div>
        </div>
    );
}