# Wisdom Academy · Guía de marca

## 1. El símbolo
Una **W** de trazo continuo y terminaciones redondeadas, coronada por un **punto de luz**.
- La W es la inicial de *Wisdom* y, a la vez, dos picos que recuerdan las páginas de un libro abierto o dos montes: el camino de ascenso del aprendizaje.
- El punto es la **luz** que guía: la Palabra que ilumina (Salmo 119:105) y el conocimiento que orienta. Es el único elemento de color, por eso funciona como firma de la marca.
- Es discreto: comunica fe sin cruces ni elementos religiosos explícitos, así que es cálido para familias creyentes y respetuoso con cualquier estudiante de cursos abiertos.
- Monolineal y geométrico: se reduce bien hasta 16 px y se anima fácilmente (el punto puede "encenderse").

## 2. Tipografía del logotipo: Poppins
**Wisdom** en Poppins Medium y **Academy** en Poppins Light.
- Sans-serif geométrica y redondeada que repite las curvas del símbolo.
- El contraste de pesos (firme / ligero) da jerarquía: la sabiduría al frente, la academia como respaldo.
- Muy legible en pantalla pequeña, con tildes y ñ completas, y licencia libre (OFL) en Google Fonts.
- En los SVG el texto está convertido a trazos: no necesita instalar la fuente.

## 3. Paleta
| Nombre | HEX | Uso |
|---|---|---|
| Tinta | #0A0A0A | Texto principal, botones primarios, fondos oscuros |
| Grafito | #18181B | Superficies en modo oscuro |
| Pizarra | #52525B | Texto secundario |
| Niebla | #E4E4E7 | Bordes y divisores |
| Papel | #F4F4F5 | Fondos alternos, tarjetas |
| Blanco | #FFFFFF | Fondo base |
| **Luz** | **#E0A82E** | Acento sobre fondos oscuros, el punto del logo |
| Luz 600 | #B77D06 | Acento sobre fondos claros (gráficos, iconos, el punto del logo) |
| Luz 800 | #8A5A00 | Enlaces y texto de acento sobre fondos claros |
| Éxito / Alerta / Error / Info | #1B7F4B / #B45309 / #B42318 / #1D4ED8 | Estados de la interfaz |

Regla: 90% neutros, 10% Luz. El dorado se usa para destacar, nunca como fondo grande.

### Contraste (WCAG)
| Par | Ratio |
|---|---|
| Tinta sobre Blanco | 19.8:1 |
| Pizarra #52525B sobre Blanco | 7.7:1 |
| Luz-800 sobre Blanco | 5.9:1 |
| Luz-800 sobre Papel | 5.4:1 |
| Luz-600 sobre Blanco (solo gráficos) | 3.5:1 |
| Luz #E0A82E sobre Tinta | 9.2:1 |
| Blanco sobre Tinta | 19.8:1 |
| Éxito #1B7F4B sobre Blanco | 5.0:1 |
| Alerta #B45309 sobre Blanco | 5.0:1 |
| Error #B42318 sobre Blanco | 6.6:1 |
| Info #1D4ED8 sobre Blanco | 6.7:1 |

Texto normal requiere 4.5:1; gráficos e iconos, 3:1.

## 4. Tipografías de la plataforma
- **Títulos y navegación:** Poppins Medium/SemiBold, interletrado −2%.
- **Texto y formularios:** Figtree Regular/Medium, 16 px / 26 px.
- **Versículos y citas:** Lora Italic, 20 px / 32 px, como contrapunto editorial.
- Todas en Google Fonts, gratuitas. Las variables CSS están en `tokens.css`.

## 5. Uso del logotipo
- **Espacio libre:** como mínimo la mitad de la altura del símbolo alrededor del logo.
- **Tamaño mínimo:** logo horizontal 120 px de ancho (30 mm en impresión); símbolo solo 16 px (usar `favicon`).
- **Versiones:** `color` sobre fondos blancos/claros · `on-dark` sobre Tinta o fotos oscuras · `black` y `white` para una tinta o sellos.
- **Evitar:** deformar, rotar, cambiar la tipografía, recolorear el punto, poner el logo sobre fondos con poco contraste o con efectos de sombra/brillo.

## 6. Archivos incluidos
- `svg/` logos horizontal, vertical, wordmark e iconos (color, on-dark, black, white) + íconos en tile.
- `png/` los mismos con fondo transparente (para Word, PowerPoint, correo).
- `favicon/` favicon.ico (16/32/48), favicon.svg, apple-touch-icon, iconos 192/512, maskable, site.webmanifest y `head-snippet.html`.
- `social/` perfil 1080 (claro y oscuro), portadas de Facebook, LinkedIn, X y YouTube, imagen para compartir enlaces (OG 1200×630) y posts/historias de Instagram.
