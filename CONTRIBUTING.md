# Contribuir a Aprende Rust

Gracias por tu interes en contribuir. Esta guia te ayudara a empezar.

## Como contribuir

### Reportar errores

Si encuentras un enlace roto, un error en el codigo, un problema de renderizado o contenido incorrecto, abre un [issue](https://github.com/dettriva/aprende-rust/issues/new/choose) con la plantilla de reporte de error.

### Sugerir mejoras

Para proponer nuevo contenido, ejercicios, mejoras de explicacion o funcionalidades, abre un [issue](https://github.com/dettriva/aprende-rust/issues/new/choose) con la plantilla de solicitud de mejora.

### Enviar un Pull Request

1. Haz fork del repositorio
2. Crea una rama descriptiva: `git checkout -b fix/enlace-cap05` o `git checkout -b feat/quiz-cap12`
3. Realiza tus cambios
4. Verifica que el build pasa: `mkdocs build --strict`
5. Envia tu PR con una descripcion clara

## Desarrollo local

```bash
# Clonar el repo
git clone https://github.com/dettriva/aprende-rust.git
cd aprende-rust

# Crear entorno virtual
python -m venv .venv
source .venv/bin/activate  # Linux/macOS
# .venv\Scripts\activate   # Windows

# Instalar dependencias
pip install -r requirements.txt

# Servir localmente (hot-reload)
mkdocs serve
# Abrir http://localhost:8000
```

## Guia de estilo

### Contenido

- Todo el texto debe estar en **espanol**
- Usa tuteo informal (tu, no usted)
- Las comparaciones Python vs Rust son obligatorias en cada seccion principal
- Manten el tono didactico y accesible

### Componentes pedagogicos

Cada capitulo debe incluir estos componentes en su estructura:

- `chapter-meta` — Tiempo estimado, nivel y semana
- `chapter-objective` — Objetivo del capitulo
- `chapter-map` — Mapa visual con Mermaid
- `comparison` — Bloques Python vs Rust
- `flashcard` — Flashcards de repaso
- `quiz` — Quizzes interactivos
- `ejercicio-guiado` — Ejercicio paso a paso
- `self-check` — Autoevaluacion con checkboxes

### Formato

- Archivos en `docs/capitulos/` con formato `XX-nombre.md`
- Admonitions con la sintaxis de MkDocs Material (`!!! tip`, `??? success`, etc.)
- Codigo con anotaciones usando `// (1)!`
- Diagramas con Mermaid

## Licencia

Al contribuir, aceptas que tus contribuciones se publiquen bajo la licencia [CC BY-SA 4.0](LICENSE).
