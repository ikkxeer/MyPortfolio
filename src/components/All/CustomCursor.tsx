import { useEffect, useRef, useState } from 'react';
import './CustomCursor.css';

const USER_NAME = "Tú";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  // Guardamos las posiciones deseadas (ratón) y actuales (renderizado)
  const mousePosition = useRef({ x: 0, y: 0 });
  const currentPosition = useRef({ x: 0, y: 0 });

  const animationFrameId = useRef<number>();

  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Actualiza la posición de destino cuando el ratón se mueve
    const updateMousePosition = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
    };

    // Bucle de animación para el suavizado (Interpolación Lineal)
    const animateCursor = () => {
      // Factor de suavizado
      const smoothingFactor = 0.17;

      // Calculamos la nueva posición acercándonos un porcentaje a la del ratón
      currentPosition.current.x += (mousePosition.current.x - currentPosition.current.x) * smoothingFactor;
      currentPosition.current.y += (mousePosition.current.y - currentPosition.current.y) * smoothingFactor;

      // Aplicamos la transformación directamente al DOM
      if (cursorRef.current) {
        // translate3d activa la aceleración por hardware
        cursorRef.current.style.transform = `translate3d(${currentPosition.current.x}px, ${currentPosition.current.y}px, 0)`;
      }

      // Solicitamos el siguiente frame
      animationFrameId.current = requestAnimationFrame(animateCursor);
    };

    // Detecta si pasamos por encima de algo clicable
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'input' ||
        target.tagName.toLowerCase() === 'textarea' ||
        target.closest('a') ||
        target.closest('button')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    // Event Listeners
    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    // Inicia el bucle de animación
    animateCursor();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`figma-cursor-container ${isHovering ? 'hovering' : ''}`}
      style={{ transform: 'translate3d(-100px, -100px, 0)' }}
    >
      <div className="cursor-arrow"></div>
      <div className="cursor-label">{USER_NAME}</div>
    </div>
  );
}