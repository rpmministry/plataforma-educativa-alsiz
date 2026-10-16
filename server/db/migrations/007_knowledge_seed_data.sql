-- ==============================================================================
-- Migración 007: Semilla de Datos del Centro de Conocimiento
-- Plataforma Educativa ALSIZ para Ekballo Church (ETAPA-07)
-- ==============================================================================

-- 1. Fuente Doctrinal Canónica: Fundamentos y Visión de Ekballo Church (Clase 1)
INSERT OR IGNORE INTO knowledge_sources (
    id, code, title, description, source_type, format_type, uri_or_url, content_text,
    checksum_sha256, subject_id, level_id, competency_id, language, target_agent_family,
    status, version_number, parent_source_id, trust_level, license_type, author_or_publisher,
    incorporation_date, verification_date, reviewed_by_user_id, created_by_user_id
) VALUES (
    'src-ekb-fundamentos-01',
    'EKB-DOC-CLASE-01',
    'Clase 1: Historia, Visión y Misión de Ekballo Church',
    'Documento canónico formativo sobre el envío apostólico, la Gran Comisión y los fundamentos doctrinales de la iglesia.',
    'DOCTRINAL_EKBALLO',
    'DOCUMENT_MD',
    'canonical://ekballo/doctrina/clase_01_historia_y_mision.md',
    'Ekballo Church nace como un movimiento de fe cristocéntrico enfocado en la Gran Comisión y el envío misionero activo. El término griego "Ekballo" aparece en Mateo 9:38 cuando Jesús instruye a orar para que el Señor envíe obreros a su mies. La misión de la iglesia y su academia ALSIZ es formar líderes con cosmovisión bíblica sólida, excelencia académica y discernimiento espiritual integral.',
    'c20c02931a7c36a4459fbe937b2d5d8e7b30df4598ac89f64921bbf2252a1290',
    'subj-rel-801',
    'lvl-sup-8',
    'comp-rel-801-01',
    'es',
    'SOCRATIC_TUTOR',
    'APROBADO',
    1,
    NULL,
    'CANONICAL_ALTO',
    'PROPIETARIO_EKBALLO',
    'Pastorado Principal Ekballo Church',
    '2026-09-01',
    '2026-09-02',
    'usr-admin-01',
    'usr-teacher-01'
);

-- Fragmentos de la Fuente Doctrinal 1
INSERT OR IGNORE INTO knowledge_chunks (
    id, source_id, chunk_index, citation_tag, section_title, content_text, token_count, metadata_json
) VALUES (
    'chk-ekb-01-01',
    'src-ekb-fundamentos-01',
    1,
    '[EKB-CLASE1#C1]',
    'Etimología y Significado del Término Ekballo',
    'El término bíblico "Ekballo" se traduce frecuentemente como "enviar", pero en el griego del Nuevo Testamento connota una acción de impulso dinámico, con fuerza y autoridad divina (Mateo 9:38). Representa la movilización intencional de hombres y mujeres para servir a Dios en la sociedad y la cultura.',
    70,
    '{"subject": "Relación con Dios", "topic": "Misión y Envío", "source_standard": "EKBALLO_DOCTRINA"}'
),
(
    'chk-ekb-01-02',
    'src-ekb-fundamentos-01',
    2,
    '[EKB-CLASE1#C2]',
    'Los Pilares de la Academia ALSIZ',
    'La Academia ALSIZ integra tres pilares inquebrantables: devoción viva a Cristo, rigor pedagógico de orden superior (pensamiento socrático) y preparación práctica para los desafíos de la sociedad moderna, protegiendo la identidad de los menores y fortaleciendo el hogar.',
    65,
    '{"subject": "Relación con Dios", "topic": "Pilares ALSIZ", "source_standard": "EKBALLO_DOCTRINA"}'
);

-- Historial Editorial de la Fuente Doctrinal 1
INSERT OR IGNORE INTO knowledge_source_history (
    id, source_id, action, performed_by_user_id, justification, details_json
) VALUES (
    'ksh-ekb-01-init',
    'src-ekb-fundamentos-01',
    'APPROVED',
    'usr-admin-01',
    'Aprobación formal del documento canónico tras revisión del pastorado docente.',
    '{"version": 1, "approved_status": "APROBADO", "source_type": "DOCTRINAL_EKBALLO"}'
);

-- 2. Fuente Oficial Curricular MINEDUC: Guía de Cinemática y Mecánica Clásica
INSERT OR IGNORE INTO knowledge_sources (
    id, code, title, description, source_type, format_type, uri_or_url, content_text,
    checksum_sha256, subject_id, level_id, competency_id, language, target_agent_family,
    status, version_number, parent_source_id, trust_level, license_type, author_or_publisher,
    incorporation_date, verification_date, reviewed_by_user_id, created_by_user_id
) VALUES (
    'src-mineduc-fisica-01',
    'MINEDUC-FIS-BGU-01',
    'Currículo Nacional de Física: Mecánica y Movimiento Rectilíneo',
    'Estándar oficial del Ministerio de Educación de Ecuador para la enseñanza de cinemática, leyes de Newton y modelación vectorial.',
    'OFICIAL_MINEDUC',
    'DOCUMENT_MD',
    'https://educacion.gob.ec/curriculo-nacional-ciencias-fisica.pdf',
    'El currículo nacional de Física promueve la comprensión de las leyes fundamentales que gobiernan el movimiento en el universo observable. El estudiante debe determinar la posición, velocidad y aceleración de un cuerpo en movimiento rectilíneo uniforme (MRU) y uniformemente variado (MRUV), aplicando las leyes del movimiento formuladas por Isaac Newton.',
    '5d41402abc4b2a76b9719d911017c592b0e6dfcf3dd72b9a717b07297e584f27',
    'subj-mat-801',
    'lvl-sup-8',
    'comp-mat-801-01',
    'es',
    'SOCRATIC_TUTOR',
    'APROBADO',
    1,
    NULL,
    'CANONICAL_ALTO',
    'DOMINIO_PUBLICO_MINEDUC',
    'Ministerio de Educación del Ecuador',
    '2026-09-01',
    '2026-09-03',
    'usr-admin-01',
    'usr-teacher-01'
);

-- Fragmentos de la Fuente Oficial MINEDUC
INSERT OR IGNORE INTO knowledge_chunks (
    id, source_id, chunk_index, citation_tag, section_title, content_text, token_count, metadata_json
) VALUES (
    'chk-mineduc-01-01',
    'src-mineduc-fisica-01',
    1,
    '[MINEDUC-FIS#C1]',
    'Primera Ley de Newton y Principio de Inercia',
    'Todo cuerpo persevera en su estado de reposo o de movimiento rectilíneo y uniforme a menos que sea compelido a cambiar su estado por fuerzas impresas sobre él. En un sistema inercial de referencia, si la sumatoria de fuerzas netas es igual a cero, la aceleración del sistema es nula.',
    68,
    '{"subject": "Física", "standard": "CN.F.5.1.1", "source_standard": "MINEDUC_2023"}'
);

INSERT OR IGNORE INTO knowledge_source_history (
    id, source_id, action, performed_by_user_id, justification, details_json
) VALUES (
    'ksh-min-01-init',
    'src-mineduc-fisica-01',
    'APPROVED',
    'usr-admin-01',
    'Verificación contra documento oficial ministerial 2023.',
    '{"version": 1, "approved_status": "APROBADO", "source_type": "OFICIAL_MINEDUC"}'
);

