[![License: CC BY-SA 4.0](https://img.shields.io/badge/License-CC%20BY--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-sa/4.0/)
[![Built with MkDocs Material](https://img.shields.io/badge/Built%20with-Material%20for%20MkDocs-526CFE.svg)](https://squidfunk.github.io/mkdocs-material/)
[![Deploy](https://github.com/dettriva/aprende-rust/actions/workflows/deploy.yml/badge.svg)](https://github.com/dettriva/aprende-rust/actions/workflows/deploy.yml)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

# Aprende Rust si ya sabes Python

**Guia interactiva completa — De Python a Rust profesional**

Una guia de 23 capitulos con 17 componentes pedagogicos interactivos, disenada para desarrolladores con nivel intermedio en Python que quieran dominar Rust y la programacion de sistemas.

<!-- TODO: Anadir screenshot del sitio desplegado -->

---

## Para quien es esta guia

- Desarrolladores con nivel intermedio en Python que quieran aprender programacion de sistemas
- Programadores que quieran entender ownership, borrowing y memoria sin garbage collector
- Pythonistas que quieran rendimiento nativo con seguridad garantizada

**Prerequisitos:** Saber programar en Python (funciones, clases, modulos, tipos basicos). No necesitas experiencia en C/C++ — las Bases cubren los conceptos de sistemas.

---

## Que incluye

| Parte | Capitulos | Contenido |
|-------|-----------|-----------|
| **Parte 0 — Bases de Sistemas** | 3 caps | Pensamiento de sistemas, compilado vs interpretado, herramientas |
| **Parte I — Fundamentos** | 5 caps | Bienvenido, variables/tipos/propiedad, referencias, funciones, structs/enums |
| **Parte II — Intermedio** | 5 caps | Pattern matching, traits/genericos, errores, colecciones, modulos/crates |
| **Parte III — Avanzado** | 5 caps | Lifetimes, smart pointers, concurrencia, async/Tokio, web/Axum |
| **Parte IV — Maestria** | 5 caps | Proyecto final, unsafe/FFI, macros, rendimiento, testing/publicar |

**Total:** 23 capitulos · 264 elementos interactivos · Proyecto integrador RustMenu

---

## Metodologia

La guia aplica 6 tecnicas de aprendizaje basadas en evidencia:

| Tecnica | Componente |
|---------|------------|
| Repeticion espaciada | Flashcards con sistema de repaso |
| Recuerdo activo | Quizzes interactivos, preguntas conceptuales |
| Interrogacion elaborativa | Preguntas "por que" antes de cada seccion |
| Entrelazado | Conexiones entre capitulos, proyecto progresivo |
| Ejemplos concretos | Comparaciones Python vs Rust lado a lado |
| Doble codificacion | Diagramas Mermaid + codigo + explicacion textual |

---

## Componentes interactivos

Cada capitulo incluye hasta 17 componentes pedagogicos:

| Componente | Descripcion |
|------------|-------------|
| Flashcards | Tarjetas de repaso con flip interactivo |
| Quizzes | Preguntas con feedback inmediato |
| Ejercicios guiados | Paso a paso con solucion completa |
| Mini-proyectos | Aplicacion practica en 3 pasos |
| Comparaciones | Bloques Python vs Rust lado a lado |
| Preguntas conceptuales | Reflexion antes de cada tema |
| Micro-ejercicios | Retos de 2-5 minutos |
| Evolucion del codigo | De novato a profesional en 3 versiones |
| Errores reales | Mensajes de error del compilador explicados |
| Misconception boxes | Mitos desmentidos con la realidad |
| Pro Tips | Consejos de nivel profesional |
| Connection boxes | Conexiones con capitulos anteriores y siguientes |
| Self-checks | Autoevaluacion con checkboxes |
| Checkpoints | Verificacion de comprension por seccion |
| Chapter objectives | Objetivo claro al inicio de cada capitulo |
| Chapter maps | Mapa visual del capitulo con Mermaid |
| Chapter meta | Tiempo estimado, nivel y semana |

---

## Quick Start

```bash
# Clonar el repositorio
git clone https://github.com/dettriva/aprende-rust.git
cd aprende-rust

# Crear entorno virtual (recomendado)
python -m venv .venv
source .venv/bin/activate

# Instalar dependencias
pip install -r requirements.txt

# Servir localmente con hot-reload
mkdocs serve
```

Abre [http://localhost:8000](http://localhost:8000) en tu navegador.

---

## Estructura del proyecto

```
aprende-rust/
├── mkdocs.yml                 # Configuracion MkDocs Material
├── requirements.txt           # Dependencias Python
├── docs/
│   ├── index.md               # Pagina de inicio
│   ├── plan.md                # Plan de estudio 10 semanas
│   ├── referencia-rapida.md   # Cheatsheet
│   ├── recursos.md            # Enlaces y herramientas
│   ├── assets/
│   │   ├── extra.css          # Sistema de diseno (17 componentes)
│   │   └── extra.js           # Logica interactiva (flashcards, quizzes, progreso)
│   └── capitulos/
│       ├── bases-1-sistemas.md
│       ├── bases-2-compilado.md
│       ├── bases-3-herramientas.md
│       ├── 01-bienvenido.md ... 20-testing-publicar.md
└── .github/
    ├── workflows/deploy.yml   # CI/CD GitHub Pages
    └── ISSUE_TEMPLATE/        # Templates de issues
```

---

## Contribuir

Las contribuciones son bienvenidas. Consulta [CONTRIBUTING.md](CONTRIBUTING.md) para la guia de contribucion.

## Licencia

Este proyecto esta licenciado bajo [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) — puedes compartir y adaptar el contenido con atribucion.

---

Hecho con amor por [dettriva](https://github.com/dettriva) · Construido con [MkDocs Material](https://squidfunk.github.io/mkdocs-material/)
