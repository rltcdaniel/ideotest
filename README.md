# Test Político

Test de ideología política en español (5 ejes) con matching de partido más afín, pensado como sitio de nicho monetizable con Google AdSense.

Sitio estático, sin build ni dependencias: HTML + CSS + JS vanilla. Compatible con GitHub Pages tal cual.

## Estructura

```
.
├── index.html                       Home — qué es el test, cómo funciona
├── test.html                        El test interactivo (48 preguntas, 5 ejes)
├── resultados.html                  Guía: cómo interpretar cada eje y el partido afín
├── articulos.html                   Listado de los 9 artículos (todos publicados)
├── articulo-*.html                  Los 9 artículos SEO
├── privacidad.html                  Política de privacidad (RGPD / LOPDGDD)
├── cookies.html                     Política de cookies
├── aviso-legal.html                 Aviso legal (LSSI-CE)
├── contacto.html                    Página de contacto
├── styles.css                       Hoja de estilos compartida por todas las páginas
├── cookie-consent.js                Banner de consentimiento de cookies + carga condicional de AdSense
├── ads.txt                          Placeholder — rellenar con tu ID de AdSense cuando lo tengas
├── favicon.svg / favicon.ico        Icono del sitio (pestaña del navegador y resultados de Google)
├── favicon-16.png / favicon-32.png / favicon-48.png / favicon-96.png
├── apple-touch-icon.png             Icono para iOS al añadir a pantalla de inicio
├── icon-192.png / icon-512.png      Iconos para PWA / manifest
├── site.webmanifest                 Manifest con metadatos e iconos
├── sitemap.xml                      Sitemap para Search Console
├── robots.txt                       Reglas para crawlers
└── CNAME                            (opcional) dominio propio para GitHub Pages
```

## Antes de publicar — checklist

Busca `[COMPLETAR` o `TODO` en los archivos para localizar todo lo pendiente, o usa:

```bash
grep -rn "COMPLETAR\|legal-placeholder\|testpolitico.example\|TODO" *.html *.js *.txt
```

Ya resuelto:

- [x] **Email de contacto real** (`rltc.daniel@gmail.com`) en `contacto.html`, `privacidad.html` y `aviso-legal.html`.
- [x] **Banner de consentimiento de cookies** funcional (`cookie-consent.js`), con opción de aceptar/rechazar y carga condicional de AdSense.
- [x] **`ads.txt`** creado como placeholder, listo para rellenar con tu ID de AdSense.

Pendiente:

- [ ] **Nombre y NIF** en `privacidad.html` y `aviso-legal.html` — obligatorios por la LSSI-CE en cuanto la web genere ingresos por publicidad (aunque seas particular, no empresa).
- [ ] **Domicilio** en `privacidad.html` y `aviso-legal.html` — también obligatorio por la LSSI-CE, y un apartado de correos NO es válido legalmente. Decisión pendiente: usar un domicilio fiscal de gestoría (si te das de alta como autónoma) o asumir el riesgo de no incluirlo (habitual en blogs pequeños, aunque no 100% conforme a la ley). Consulta con una gestoría para la vía definitiva.
- [ ] **Dominio real**: sustituir `https://testpolitico.example/` por tu dominio final en las etiquetas `canonical`, `og:url`, `sitemap.xml` y `robots.txt`. Con el dominio ya decidido, puedes hacerlo de golpe:
  ```bash
  sed -i '' 's#https://testpolitico.example#https://TU-DOMINIO-REAL#g' *.html sitemap.xml robots.txt
  ```
  (en Linux, quita el `''` después de `-i`).
- [ ] **ID de publisher de AdSense** (`ca-pub-XXXXXXXXXXXXXXXX`): edita la constante `ADSENSE_CLIENT_ID` al principio de `cookie-consent.js` — es el único sitio donde hace falta ponerlo, se aplica a todas las páginas automáticamente.
- [ ] **`ads.txt`**: descomenta y rellena la línea con tu ID real de publisher.
- [ ] **CMP certificado por Google** (Google Funding Choices): una vez aprobada la cuenta de AdSense, ve a "Privacy & messaging" para crear el mensaje de consentimiento GDPR oficial. El banner de `cookie-consent.js` cumple el RGPD general, pero Google exige además este CMP certificado para anuncios personalizados en la UE/Reino Unido. Instrucciones detalladas en los comentarios de `cookie-consent.js`.

## Desarrollo local

No requiere build. Basta con abrir `index.html` en el navegador, o servirlo con cualquier servidor estático:

```bash
python3 -m http.server 8000
# abrir http://localhost:8000
```

## Despliegue en GitHub Pages

1. Crea un repositorio nuevo en GitHub (o usa uno existente) y sube todo el contenido de esta carpeta a la raíz de la rama `main`.
2. En GitHub → **Settings → Pages**, selecciona:
   - **Source:** Deploy from a branch
   - **Branch:** `main` / `(root)`
3. Guarda. GitHub te dará una URL tipo `https://tu-usuario.github.io/tu-repo/`.
4. Si quieres dominio propio (como en tus otros proyectos): añade un archivo `CNAME` en la raíz con tu dominio, configura el DNS en Namecheap (registro `A` a las IPs de GitHub Pages o `CNAME` a `tu-usuario.github.io`), y marca "Enforce HTTPS" en la configuración de Pages una vez propague el DNS.

## Notas

- Todo el cálculo del test se ejecuta en el navegador del usuario; no hay backend ni base de datos.
- El CSS es un único archivo (`styles.css`) para mantener el sitio simple y evitar el problema de rutas con carpetas que ya tuviste en TransporteCarretera.com.
