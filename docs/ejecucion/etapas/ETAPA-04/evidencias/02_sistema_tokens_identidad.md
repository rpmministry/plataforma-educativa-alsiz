# Etapa 04 — Tokens de Diseño e Identidad Institucional
**Plataforma Educativa ALSIZ para Ekballo Church**

---

## 1. Implementación Técnica en Código

El sistema de tokens se encuentra formalmente implementado en:
- `src/styles/tokens.ts` (exportación tipada con TypeScript `as const`).
- `docs/diseno/sistema_de_diseno.md` (especificación de arquitectura visual).
- `index.html` (metadatos, favicons, fuentes y tema `#0A0D11`).
- `src/components/common/SchoolLogo.tsx` (vectores SVG de monograma y wordmark).

---

## 2. Definición de Tokens Principales

### 2.1 Colores y Superficies
```typescript
colors: {
  brand: {
    background: '#0A0D11',
    surface: '#121820',
    surfaceRaised: '#18202A',
    card: '#1F2937',
    border: '#283545',
    silver: '#BCBEBE',
    silverLight: '#ECEFF1',
    gold: '#E59000',
    goldHover: '#F59E0B',
  }
}
```

### 2.2 Semántica de Estados Educativos
```typescript
state: {
  success: { text: '#34D399', bg: 'rgba(16, 185, 129, 0.12)', border: 'rgba(16, 185, 129, 0.35)', solid: '#10B981' },
  warning: { text: '#FBBF24', bg: 'rgba(245, 158, 11, 0.12)', border: 'rgba(245, 158, 11, 0.35)', solid: '#F59E0B' },
  error:   { text: '#FB7185', bg: 'rgba(244, 63, 94, 0.12)',  border: 'rgba(244, 63, 94, 0.35)',  solid: '#F43F5E' },
  info:    { text: '#60A5FA', bg: 'rgba(59, 130, 246, 0.12)', border: 'rgba(59, 130, 246, 0.35)', solid: '#3B82F6' },
  development: { text: '#A78BFA', bg: 'rgba(139, 92, 246, 0.15)', border: 'rgba(139, 92, 246, 0.40)', solid: '#8B5CF6' },
}
```

### 2.3 Tipografía
- Headings: `'Outfit', sans-serif`
- Body: `'Plus Jakarta Sans', sans-serif`
- Mono: `'Fira Code', monospace`

