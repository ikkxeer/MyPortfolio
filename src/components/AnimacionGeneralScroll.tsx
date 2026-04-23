import { useEffect, useRef, useState } from 'react';
import './AnimacionGeneralScroll.css';

// Este componente recibe 'children' (los elementos que metas dentro de él)
export default function AnimacionGeneralScroll({ children }: { children: React.ReactNode }) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Creamos el observador
        const observer = new IntersectionObserver(
            ([entry]) => {
                // Si el elemento entra en la pantalla entonces es visible
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    // Dejamos de observarlo para que la animación solo ocurra una vez
                    observer.unobserve(entry.target);
                }
            },
            {
                // Se activa cuando el 15% del elemento es visible
                threshold: 0.15,
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        // Limpieza al desmontar
        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    return (
        <div ref={ref} className={`reveal-wrapper ${isVisible ? 'is-visible' : ''}`}>
            {children}
        </div>
    );
}