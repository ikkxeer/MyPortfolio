# Iker’s World

Un portfolio jugable de Iker Aramburu Muñoz. El muelle da acceso a una isla 3D con una casa, un laboratorio, seis expositores de proyectos, una estación, una cafetería y un buzón.

## Desarrollo local

Usa Node.js 22.12 o posterior. Desde la raíz del repositorio ejecuta los siguientes comandos.

```sh
npm ci
npm run dev
```

Abre la URL que muestra Vite. Para comprobar el código y probar la compilación de producción, ejecuta lo siguiente.

```sh
npm run lint
npm run build
npm run preview
```

## Jugar

Camina con WASD, las flechas, los botones táctiles o un toque en el terreno. La tecla E abre el lugar cercano. También puedes pulsar directamente sobre un edificio o expositor. Usa M para viajar por el mapa y la rueda del ratón o los botones + y − para ajustar la cámara. Escape cierra la ventana activa.

El reloj y la iluminación siguen la hora local del navegador. El sonido se activa desde el altavoz. El juego recuerda el idioma y respeta la preferencia de movimiento reducido. La guía de controles da acceso a la versión ligera con mapa, que también se abre cuando WebGL no está disponible.

## Editar el portfolio

- `src/data/portfolio.ts` contiene el perfil, los seis proyectos, las tecnologías, la trayectoria, las asignaturas, las habilidades y los enlaces de contacto en los tres idiomas.
- `src/data/village.ts` contiene los nombres de los lugares, los textos de la interfaz y los destinos del mapa.
- `src/world/` contiene los modelos procedurales, el personaje, el movimiento y las interacciones. El motor Three.js se carga al entrar al pueblo.
- `src/environment/` contiene los horarios de las fases de luz y la atmósfera de la isla.
- `public/art/` contiene la portada original y las versiones optimizadas de la fotografía y del logo.

El buzón incluye los enlaces de GitHub y LinkedIn del portfolio. Para habilitar el envío desde el juego, configura un formulario de Formspree que entregue mensajes a tu correo, define su identificador público en `VITE_FORMSPREE_ID` dentro de `.env.local` o del entorno de compilación y vuelve a compilar. Los secretos del proveedor deben permanecer fuera de las variables públicas de Vite.

Las rutas anteriores `/sobre-mi` y `/asignaturas` abren sus fichas dentro del juego. Al alojar `dist/` en un servidor estático, configura el retorno a `index.html` para las rutas de la aplicación.
