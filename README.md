# INFONET E.I.R.L. — Landing web

Página web de una sola página (landing) de INFONET E.I.R.L.: alquiler de polvorines, almacenamiento de explosivos y accesorios de voladura, transporte de materiales peligrosos y carga a nivel nacional.

Es un sitio estático: HTML, CSS y JavaScript, sin dependencias ni proceso de compilación.

## Estructura

```
index.html      Página principal
css/styles.css  Estilos (responsive: laptop, tablet y celular)
js/main.js      Slider de portada, menú móvil, pestañas, visor de polvorines, contadores, animaciones y galería
img/            Fotos, logo e íconos
```

## Publicar con GitHub Pages

1. Crea un repositorio nuevo en GitHub (por ejemplo `infonet-web`).
2. Sube todo el contenido de esta carpeta a la raíz del repositorio (`index.html` debe quedar en la raíz).
3. En el repositorio entra a **Settings → Pages**.
4. En **Build and deployment**, elige **Deploy from a branch**, rama `main` y carpeta `/ (root)`. Guarda.
5. En uno o dos minutos la web estará en `https://TU-USUARIO.github.io/infonet-web/`.

Para usar un dominio propio (por ejemplo `www.infoneteirl.com`), escríbelo en **Settings → Pages → Custom domain** y apunta el DNS del dominio a GitHub Pages.

## Editar contenido

- Textos: directamente en `index.html`.
- Números de WhatsApp: busca `wa.me/51967239913` en `index.html`.
- Polvorines del visor: lista `data` en `js/main.js`.
- Colores: variables al inicio de `css/styles.css` (`--navy`, `--red`).
