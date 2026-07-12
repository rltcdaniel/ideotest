# IdeoTest

Test de ideología política en español (5 ejes) con matching de partido más afín, pensado como sitio de nicho monetizable con Google AdSense.

Sitio estático, sin build ni dependencias: HTML + CSS + JS vanilla. Compatible con GitHub Pages tal cual.

## Estructura

```
.
├── index.html          Home — qué es el test, cómo funciona
├── test.html            El test interactivo (48 preguntas, 5 ejes)
├── resultados.html       Guía: cómo interpretar cada eje y el partido afín
├── articulos.html        Listado de artículos (placeholders "Próximamente")
├── privacidad.html        Política de privacidad (RGPD / LOPDGDD)
├── cookies.html           Política de cookies
├── aviso-legal.html       Aviso legal (LSSI-CE)
├── contacto.html          Página de contacto
├── styles.css             Hoja de estilos compartida por todas las páginas
├── sitemap.xml            Sitemap para Search Console
├── robots.txt             Reglas para crawlers
└── CNAME                  (opcional) dominio propio para GitHub Pages
```

## Antes de publicar — checklist

Busca `[COMPLETAR` en los archivos `.html` para localizar todo lo pendiente, o usa:

```bash
grep -rn "COMPLETAR\|legal-placeholder\|ideotest.example\|tudominio.com\|ca-pub-XXXX" *.html
```

Pendiente de rellenar:

- [ ] **Datos identificativos** (nombre/razón social, NIF, dirección) en `privacidad.html` y `aviso-legal.html` — obligatorios por la LSSI-CE.
- [ ] **Email de contacto real** en `contacto.html`, `privacidad.html` y `aviso-legal.html`.
- [ ] **Dominio real**: sustituir `https://ideotest.example/` por tu dominio final en las etiquetas `canonical`, `og:url`, `sitemap.xml` y `robots.txt`. Con el dominio ya decidido, puedes hacerlo de golpe:
  ```bash
  sed -i '' 's#https://ideotest.example#https://TU-DOMINIO-REAL#g' *.html sitemap.xml robots.txt
  ```
  (en Linux, quita el `''` después de `-i`).
- [ ] **ID de publisher de AdSense** (`ca-pub-XXXXXXXXXXXXXXXX`): descomenta el `<script>` de AdSense en el `<head>` de cada página una vez tengas la cuenta aprobada.
- [ ] **Plataforma de gestión de consentimiento (CMP)** tipo Google Funding Choices, obligatoria si sirves anuncios a usuarios de la UE/EEE. Está anotado como pendiente en `cookies.html`.
- [ ] Los 9 artículos de `articulos.html` están como "Próximamente" — cuando los redactemos, habrá que crear su HTML y enlazarlos desde ahí.

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
