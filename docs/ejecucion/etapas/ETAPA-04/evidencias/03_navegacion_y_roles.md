# Etapa 04 — Estructura de Navegación y Roles
**Plataforma Educativa ALSIZ para Ekballo Church**

---

## 1. Definición de Roles en el Sistema

Se formalizaron 4 perfiles de usuario en `src/types/index.ts` y en el contexto global:

1. **`student` (Estudiante)**:
   - Destinado a los alumnos en formación (Avril, Gael y perfiles demo Karen / Mauricio).
   - Acceso principal: `space` (Mi Espacio de Estudio).
   - Vistas accesibles: `space`, `subjects`, `subject-detail`, `classes`, `schedule`, `progress`.
2. **`representative` (Representante / Padres de Familia)**:
   - Destinado a los padres educadores en el esquema de Homeschooling.
   - Acceso principal: `parent` (Bitácora de Homeschooling y Acompañamiento Ministerial).
   - Vistas accesibles: `parent`, `space` (supervisión de tareas), `schedule`, `progress`.
3. **`teacher` (Docente / Tutor Socrático)**:
   - Destinado a tutores y supervisores curriculares.
   - Acceso principal: `classes` (Aula de lección y personalización de guías).
4. **`admin` (Administrador Institucional)**:
   - Destinado a la dirección pedagógica y gobierno de TI de Ekballo Church.
   - Acceso principal: `admin` (Shell Administrativo).
   - Vistas accesibles: Programas, Nómina, Salud del Sistema y Pistas de Auditoría LOPDP.

---

## 2. Mapa de Rutas de la SPA (`NavigationTab`)

```typescript
export type NavigationTab = 
  | 'home'           // Landing institucional y acceso público
  | 'access'         // Pasarela unificada de selección de rol
  | 'space'          // Panel del estudiante
  | 'subjects'       // Malla curricular de asignaturas
  | 'subject-detail' // Vista de detalle de curso y sílabo
  | 'schedule'       // Horario escolar estructurado
  | 'classes'        // Aula interactiva del día
  | 'progress'       // Progreso global y portafolio
  | 'parent'         // Portal parental y bitácora homeschooling
  | 'admin';         // Shell administrativo y gobierno TI
```

---

## 3. Comportamiento Adaptativo
- **Móvil (`<640px`)**: Navegación inferior ergonómica (`MobileBottomNav`) para las acciones frecuentes del estudiante (`space`, `subjects`, `schedule`, `progress`).
- **Escritorio y Tableta (`>=768px`)**: Barra lateral fija (`Sidebar`) con secciones separadas para el "Espacio de Estudio" y la "Gestión & Roles" (`parent` y `admin`).
- **Encabezado Global (`Navbar`)**: Presente en todas las vistas con botón de "Acceso / Roles", selector de cuenta autenticada y marca ALSIZ • Ekballo.

