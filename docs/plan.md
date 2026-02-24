---
title: "Plan de estudio — 10 semanas"
description: "Plan intensivo para dominar Rust en 10 semanas, de cero a nivel experto"
---

# :calendar: Plan de estudio: 10 semanas

!!! abstract "Objetivo"
    Llevar tu Rust de **cero a nivel experto** en 10 semanas, dedicando **1-2 horas diarias**. Cada semana tiene objetivos claros, capítulos asociados, un **reto de mitad de semana** y un checkpoint de verificación.

<div class="learning-objectives" markdown>

#### 🎯 Lo que conseguirás al completar este plan

- Dominar ownership, borrowing y lifetimes a nivel profesional
- Construir un proyecto REST API (RustMenu) con Axum y tipado seguro
- Entender y aplicar traits, genéricos y trait bounds en código real
- Programar con async/await usando Tokio de forma idiomática
- Manejar errores con `Result`, `?`, `thiserror` y `anyhow`
- Usar smart pointers (Box, Rc, Arc, RefCell) y concurrencia segura
- Escribir macros declarativas y procedurales
- Crear, testear y publicar tu propio crate en crates.io

</div>

```mermaid
gantt
    title Plan de 10 semanas
    dateFormat  YYYY-MM-DD
    axisFormat  %d/%m

    section Parte I
    Setup y ownership (Cap 1-2)     :a1, 2026-02-24, 7d
    Referencias y control (Cap 3-4) :a2, after a1, 7d

    section Parte II
    Tipos compuestos (Cap 5-6)      :b1, after a2, 7d
    Traits y errores (Cap 7-8)      :b2, after b1, 7d

    section Parte III
    Colecciones y módulos (Cap 9-10):c1, after b2, 7d
    Lifetimes y punteros (Cap 11-12):c2, after c1, 7d

    section Parte IV
    Concurrencia (Cap 13 + review)  :d1, after c2, 7d
    Async + Axum + proyecto (Cap 14-16) :d2, after d1, 7d

    section Parte V
    Unsafe, FFI y macros (Cap 17-18):e1, after d2, 7d
    Rendimiento y publicación (Cap 19-20) :e2, after e1, 7d
```

---

## :brain: Taxonomía de Bloom — Tu progresión cognitiva

Cada semana te lleva a un nivel más alto de pensamiento. Los ejercicios están clasificados según la [Taxonomía de Bloom](https://es.wikipedia.org/wiki/Taxonom%C3%ADa_de_Bloom):

```mermaid
graph BT
    A["<b>1. Recordar</b><br/>Definir tipos, sintaxis básica"] --> B["<b>2. Comprender</b><br/>Explicar por qué, comparar Python↔Rust"]
    B --> C["<b>3. Aplicar</b><br/>Implementar features en RustMenu"]
    C --> D["<b>4. Analizar</b><br/>Depurar, refactorizar Python→Rust"]
    D --> E["<b>5. Evaluar</b><br/>Elegir patrones, code review"]
    E --> F["<b>6. Crear</b><br/>Diseñar APIs, arquitectura async"]

    style A fill:#dcfce7,stroke:#22c55e
    style B fill:#dbeafe,stroke:#3b82f6
    style C fill:#ede9fe,stroke:#8b5cf6
    style D fill:#fef3c7,stroke:#f59e0b
    style E fill:#fee2e2,stroke:#ef4444
    style F fill:#fce7f3,stroke:#ec4899
```

| Semana | Nivel Bloom dominante | Tipo de ejercicios |
|--------|:---------------------:|---------------------|
| 1-2 | <span class="bloom-badge remember">Recordar</span> <span class="bloom-badge understand">Comprender</span> | Definir ownership, explicar diferencias Python vs Rust |
| 3-4 | <span class="bloom-badge understand">Comprender</span> <span class="bloom-badge apply">Aplicar</span> | Implementar structs con traits, manejar errores |
| 5-6 | <span class="bloom-badge apply">Aplicar</span> <span class="bloom-badge analyze">Analizar</span> | Diseñar módulos, analizar lifetimes |
| 7 | <span class="bloom-badge analyze">Analizar</span> <span class="bloom-badge evaluate">Evaluar</span> | Elegir patrones de concurrencia, comparar enfoques |
| 8 | <span class="bloom-badge evaluate">Evaluar</span> <span class="bloom-badge create">Crear</span> | Diseñar arquitectura REST, crear proyecto completo |
| 9 | <span class="bloom-badge create">Crear</span> <span class="bloom-badge evaluate">Evaluar</span> | Diseñar macros, interoperar con Python (PyO3) |
| 10 | <span class="bloom-badge create">Crear</span> <span class="bloom-badge evaluate">Evaluar</span> | Optimizar rendimiento, publicar crate |

---

## Semana 1: Setup y ownership — Capítulos 1-2

<div class="week-card" markdown>

<div class="part-header part-i" markdown>

### :blue_book: Parte I — Semana 1 de 2

</div>

| Día | Contenido | Nivel Bloom | Tiempo |
|-----|-----------|:-----------:|--------|
| **Lun** | Instalar Rust, `rustup`, `cargo new`, estructura de proyecto | <span class="bloom-badge remember">Recordar</span> | 1.5h |
| **Mar** | Variables, mutabilidad, shadowing, tipos escalares (`i32`, `f64`, `bool`, `char`) | <span class="bloom-badge remember">Recordar</span> | 1.5h |
| **Mié** | Tipos compuestos básicos: tuplas, arrays, `String` vs `&str` | <span class="bloom-badge understand">Comprender</span> | 1.5h |
| **Jue** | Ownership, moves, `Copy` vs `Clone`, stack vs heap | <span class="bloom-badge understand">Comprender</span> | 1.5h |
| **Vie** | :zap: **RETO MITAD DE SEMANA**: Escribir un programa que modele un `Plato` de RustMenu con ownership correcto — sin mirar docs | <span class="bloom-badge apply">Aplicar</span> | 1h |
| **Sáb** | 5 ejercicios de los capítulos 1-2 | <span class="bloom-badge apply">Aplicar</span> | 2h |
| **Dom** | Revisar flashcards + explicar ownership en voz alta (Feynman) | <span class="bloom-badge understand">Comprender</span> | 1h |

!!! success "Checkpoint semanal"
    Has completado la semana. Verifica tu progreso:

<div class="self-check" markdown>
<h4>✅ Autoevaluación</h4>
<label><input type="checkbox"> Puedo crear un proyecto con `cargo new` y compilarlo sin errores</label>
<label><input type="checkbox"> Sé la diferencia entre `String` y `&str`</label>
<label><input type="checkbox"> Puedo explicar ownership y moves a un compañero</label>
<label><input type="checkbox"> Entiendo cuándo un tipo implementa `Copy` vs cuándo necesita `Clone`</label>
</div>

</div>

## Semana 2: Referencias y control de flujo — Capítulos 3-4

<div class="week-card" markdown>

<div class="part-header part-i" markdown>

### :blue_book: Parte I — Semana 2 de 2

</div>

| Día | Contenido | Nivel Bloom | Tiempo |
|-----|-----------|:-----------:|--------|
| **Lun** | Referencias `&T` y `&mut T`, reglas de borrowing | <span class="bloom-badge remember">Recordar</span> | 1.5h |
| **Mar** | Slices: `&[T]`, `&str`, iteración sobre slices | <span class="bloom-badge understand">Comprender</span> | 1.5h |
| **Mié** | Funciones, closures `|x| x + 1`, `Fn`/`FnMut`/`FnOnce` | <span class="bloom-badge apply">Aplicar</span> | 1.5h |
| **Jue** | `match`, `if let`, `while let`, `loop`, `for` | <span class="bloom-badge apply">Aplicar</span> | 1.5h |
| **Vie** | :zap: **RETO**: Modelar el menú de RustMenu con funciones que filtran platos por categoría usando closures y slices | <span class="bloom-badge create">Crear</span> | 1.5h |
| **Sáb** | [Rustlings](https://github.com/rust-lang/rustlings) — completar secciones `variables`, `move_semantics`, `primitive_types` | <span class="bloom-badge understand">Comprender</span> | 3h |
| **Dom** | Revisar flashcards semanas 1-2 + quiz de autoevaluación | <span class="bloom-badge evaluate">Evaluar</span> | 1h |

!!! success "Checkpoint semanal"
    Has completado la semana. Verifica tu progreso:

<div class="self-check" markdown>
<h4>✅ Autoevaluación</h4>
<label><input type="checkbox"> Puedo explicar las reglas de borrowing sin dudar</label>
<label><input type="checkbox"> Sé escribir closures y entiendo `Fn` vs `FnMut` vs `FnOnce`</label>
<label><input type="checkbox"> Puedo usar `match` con pattern matching exhaustivo</label>
<label><input type="checkbox"> He completado las secciones de Rustlings correspondientes</label>
</div>

</div>

## Semana 3: Tipos compuestos — Capítulos 5-6

<div class="week-card" markdown>

<div class="part-header part-ii" markdown>

### :purple_circle: Parte II — Semana 1 de 2

</div>

| Día | Contenido | Nivel Bloom | Tiempo |
|-----|-----------|:-----------:|--------|
| **Lun** | Structs: definición, métodos `impl`, `self` vs `&self` vs `&mut self` | <span class="bloom-badge understand">Comprender</span> | 1.5h |
| **Mar** | Enums con datos, `Option<T>`, `Result<T, E>` | <span class="bloom-badge understand">Comprender</span> | 1.5h |
| **Mié** | Pattern matching avanzado: guards, `@` bindings, nested patterns | <span class="bloom-badge apply">Aplicar</span> | 1.5h |
| **Jue** | `if let`, destructuring de structs y enums, `let-else` | <span class="bloom-badge apply">Aplicar</span> | 1.5h |
| **Vie** | :zap: **RETO**: Implementar `Pedido` de RustMenu con enum de estados (`Pendiente`, `EnPreparacion`, `Listo`, `Entregado`) y transiciones válidas | <span class="bloom-badge create">Crear</span> | 1.5h |
| **Sáb** | Rustlings — completar secciones `structs`, `enums`, `options` | <span class="bloom-badge analyze">Analizar</span> | 2h |
| **Dom** | Revisar flashcards semanas 1-3 (spaced repetition día 7) | <span class="bloom-badge remember">Recordar</span> | 1h |

!!! success "Checkpoint semanal"
    Has completado la semana. Verifica tu progreso:

<div class="self-check" markdown>
<h4>✅ Autoevaluación</h4>
<label><input type="checkbox"> He implementado el enum `EstadoPedido` con transiciones en RustMenu</label>
<label><input type="checkbox"> Sé usar `Option<T>` y `Result<T, E>` idiomáticamente</label>
<label><input type="checkbox"> Puedo hacer pattern matching con guards y bindings</label>
<label><input type="checkbox"> He completado las secciones de Rustlings correspondientes</label>
</div>

</div>

## Semana 4: Traits y manejo de errores — Capítulos 7-8

<div class="week-card" markdown>

<div class="part-header part-ii" markdown>

### :purple_circle: Parte II — Semana 2 de 2

</div>

| Día | Contenido | Nivel Bloom | Tiempo |
|-----|-----------|:-----------:|--------|
| **Lun** | Traits: definición, implementación, traits estándar (`Display`, `Debug`, `Clone`) | <span class="bloom-badge understand">Comprender</span> | 1.5h |
| **Mar** | Genéricos `<T>`, trait bounds `T: Display + Clone`, `where` clauses | <span class="bloom-badge apply">Aplicar</span> | 1.5h |
| **Mié** | Manejo de errores: `Result`, operador `?`, propagación | <span class="bloom-badge apply">Aplicar</span> | 1.5h |
| **Jue** | `thiserror` para errores de librería, `anyhow` para aplicaciones | <span class="bloom-badge analyze">Analizar</span> | 1.5h |
| **Vie** | :zap: **RETO**: Crear trait `Validable` para RustMenu y errores personalizados con `thiserror` para cada entidad | <span class="bloom-badge analyze">Analizar</span> | 1.5h |
| **Sáb** | Rustlings — completar secciones `traits`, `generics`, `error_handling` | <span class="bloom-badge analyze">Analizar</span> | 2.5h |
| **Dom** | Revisar flashcards semanas 1-4 (día 14 para sem 1) + quiz Parte II | <span class="bloom-badge evaluate">Evaluar</span> | 1h |

!!! success "Checkpoint semanal"
    Has completado la semana. Verifica tu progreso:

<div class="self-check" markdown>
<h4>✅ Autoevaluación</h4>
<label><input type="checkbox"> Todo el código de RustMenu usa errores personalizados con `thiserror`</label>
<label><input type="checkbox"> He implementado traits genéricos con bounds</label>
<label><input type="checkbox"> Sé cuándo usar `thiserror` vs `anyhow`</label>
<label><input type="checkbox"> He completado las secciones de Rustlings correspondientes</label>
</div>

</div>

---

!!! example "Punto de control: Mitad del camino"
    Si has llegado aquí, ya tienes un nivel **intermedio sólido** de Rust. Tómate un día para:

    1. :recycle: Revisar todo el código de RustMenu escrito hasta ahora
    2. :brain: Hacer una sesión de flashcards completa (semanas 1-4)
    3. :writing_hand: Escribir un resumen de 1 página de todo lo aprendido (Teach-Back)

---

## Semana 5: Colecciones e iteradores — Capítulos 9-10

<div class="week-card" markdown>

<div class="part-header part-iii" markdown>

### :large_blue_diamond: Parte III — Semana 1 de 2

</div>

| Día | Contenido | Nivel Bloom | Tiempo |
|-----|-----------|:-----------:|--------|
| **Lun** | `Vec<T>`, `HashMap<K, V>`, `HashSet<T>`, `BTreeMap` | <span class="bloom-badge understand">Comprender</span> | 1.5h |
| **Mar** | Iteradores: `iter()`, `into_iter()`, `iter_mut()`, adaptadores `map`/`filter`/`fold` | <span class="bloom-badge apply">Aplicar</span> | 1.5h |
| **Mié** | Módulos: `mod`, `pub`, `use`, visibilidad, `pub(crate)` | <span class="bloom-badge apply">Aplicar</span> | 1.5h |
| **Jue** | Crates, workspaces, `Cargo.toml`, dependencias, features | <span class="bloom-badge apply">Aplicar</span> | 1.5h |
| **Vie** | :zap: **RETO**: Reorganizar RustMenu como workspace con crates `core`, `api` y `cli` + iteradores para estadísticas del menú | <span class="bloom-badge create">Crear</span> | 1.5h |
| **Sáb** | Leer código fuente de un crate popular (e.g., `serde` o `clap`) | <span class="bloom-badge analyze">Analizar</span> | 2h |
| **Dom** | Flashcards semanas 3-5 + explicar iteradores a un compañero | <span class="bloom-badge evaluate">Evaluar</span> | 1h |

!!! success "Checkpoint semanal"
    Has completado la semana. Verifica tu progreso:

<div class="self-check" markdown>
<h4>✅ Autoevaluación</h4>
<label><input type="checkbox"> RustMenu es un workspace con múltiples crates</label>
<label><input type="checkbox"> Puedo encadenar iteradores con `map`, `filter`, `fold`</label>
<label><input type="checkbox"> Sé la diferencia entre `iter()`, `into_iter()` e `iter_mut()`</label>
<label><input type="checkbox"> He leído y entendido código de un crate de crates.io</label>
</div>

</div>

## Semana 6: Lifetimes y smart pointers — Capítulos 11-12

<div class="week-card" markdown>

<div class="part-header part-iii" markdown>

### :large_blue_diamond: Parte III — Semana 2 de 2

</div>

| Día | Contenido | Nivel Bloom | Tiempo |
|-----|-----------|:-----------:|--------|
| **Lun** | Lifetimes explícitos `'a`, lifetime elision rules, `'static` | <span class="bloom-badge understand">Comprender</span> | 1.5h |
| **Mar** | Lifetimes en structs, bounds de lifetime, lifetime subtyping | <span class="bloom-badge analyze">Analizar</span> | 1.5h |
| **Mié** | `Box<T>`: heap allocation, trait objects `Box<dyn Trait>` | <span class="bloom-badge apply">Aplicar</span> | 1.5h |
| **Jue** | `Rc<T>`, `Arc<T>`, `RefCell<T>`, interior mutability | <span class="bloom-badge apply">Aplicar</span> | 1.5h |
| **Vie** | :zap: **RETO**: Implementar un sistema de caché compartido para RustMenu usando `Arc<Mutex<HashMap>>` | <span class="bloom-badge create">Crear</span> | 1.5h |
| **Sáb** | Rustlings — completar secciones `lifetimes`, `smart_pointers` | <span class="bloom-badge analyze">Analizar</span> | 3h |
| **Dom** | Flashcards + quiz de autoevaluación Parte III | <span class="bloom-badge evaluate">Evaluar</span> | 1h |

!!! success "Checkpoint semanal"
    Has completado la semana. Verifica tu progreso:

<div class="self-check" markdown>
<h4>✅ Autoevaluación</h4>
<label><input type="checkbox"> Puedo anotar lifetimes correctamente en funciones y structs</label>
<label><input type="checkbox"> Entiendo las 3 reglas de lifetime elision</label>
<label><input type="checkbox"> Sé cuándo usar `Box`, `Rc`, `Arc` y `RefCell`</label>
<label><input type="checkbox"> He implementado el caché compartido con `Arc<Mutex<_>>`</label>
</div>

</div>

## Semana 7: Concurrencia — Capítulo 13 + revisión

<div class="week-card" markdown>

<div class="part-header part-iv" markdown>

### :green_book: Parte IV — Semana 1 de 2

</div>

| Día | Contenido | Nivel Bloom | Tiempo |
|-----|-----------|:-----------:|--------|
| **Lun** | Threads: `std::thread::spawn`, `JoinHandle`, `move` closures | <span class="bloom-badge understand">Comprender</span> | 1.5h |
| **Mar** | Channels: `mpsc::channel`, `mpsc::sync_channel`, comunicación entre hilos | <span class="bloom-badge apply">Aplicar</span> | 1.5h |
| **Mié** | `Mutex<T>`, `RwLock<T>`, deadlocks, patrones de sincronización | <span class="bloom-badge apply">Aplicar</span> | 1.5h |
| **Jue** | `Send` y `Sync` traits, `Rayon` para paralelismo de datos | <span class="bloom-badge analyze">Analizar</span> | 1.5h |
| **Vie** | :zap: **RETO**: Implementar procesamiento paralelo de pedidos en RustMenu con `Rayon` y channels para notificaciones | <span class="bloom-badge create">Crear</span> | 2h |
| **Sáb** | Revisión completa de Parte I-III + refactorización de RustMenu | <span class="bloom-badge evaluate">Evaluar</span> | 3h |
| **Dom** | Flashcards completas (todas las semanas) | <span class="bloom-badge remember">Recordar</span> | 1h |

!!! success "Checkpoint semanal"
    Has completado la semana. Verifica tu progreso:

<div class="self-check" markdown>
<h4>✅ Autoevaluación</h4>
<label><input type="checkbox"> Puedo crear threads y comunicarlos con channels</label>
<label><input type="checkbox"> Sé usar `Mutex` y `RwLock` sin deadlocks</label>
<label><input type="checkbox"> Entiendo por qué `Send` y `Sync` son importantes</label>
<label><input type="checkbox"> He paralelizado operaciones de RustMenu con Rayon</label>
</div>

</div>

## Semana 8: Async, Axum y proyecto final — Capítulos 14-16

<div class="week-card" markdown>

<div class="part-header part-iv" markdown>

### :green_book: Parte IV — Semana 2 de 2

</div>

| Día | Contenido | Nivel Bloom | Tiempo |
|-----|-----------|:-----------:|--------|
| **Lun** | Async/await, `Future` trait, runtime Tokio, `#[tokio::main]` | <span class="bloom-badge apply">Aplicar</span> | 1.5h |
| **Mar** | Axum: router, handlers, extractors, `State`, `Json` | <span class="bloom-badge apply">Aplicar</span> | 1.5h |
| **Mié** | Middleware, capas, `tower::Service`, manejo de errores en Axum | <span class="bloom-badge create">Crear</span> | 2h |
| **Jue** | Conectar RustMenu: rutas CRUD, SQLx/SeaORM, migraciones | <span class="bloom-badge create">Crear</span> | 1.5h |
| **Vie** | :zap: **RETO FINAL**: Deploy completo de RustMenu REST API + documentar arquitectura | <span class="bloom-badge create">Crear</span> | 2h |
| **Sáb** | Revisión final del proyecto + code review personal + testing con `cargo test` | <span class="bloom-badge evaluate">Evaluar</span> | 3h |
| **Dom** | 🏆 Retrospectiva: escribir qué aprendiste y qué repetirías diferente | <span class="bloom-badge evaluate">Evaluar</span> | 1h |

!!! success "Checkpoint semanal"
    Has completado la semana. Verifica tu progreso:

<div class="self-check" markdown>
<h4>✅ Autoevaluación</h4>
<label><input type="checkbox"> RustMenu API REST completa con Axum + base de datos</label>
<label><input type="checkbox"> Tests pasando con `cargo test`</label>
<label><input type="checkbox"> Proyecto documentado y deployable</label>
<label><input type="checkbox"> Puedo escribir handlers async con Axum idiomáticamente</label>
<label><input type="checkbox"> Puedo explicar async/await en Rust a un compañero</label>
</div>

</div>

---

!!! example "Punto de control: Proyecto completo"
    Si has llegado aquí, tu proyecto **RustMenu** está funcionando como REST API. Ahora vamos a llevarte al **nivel experto**:

    1. :brain: Revisa todo el código que has escrito — ¿dónde podrías mejorar el diseño?
    2. :fire: Prepárate para pensar como un **systems programmer**, no solo un desarrollador de aplicaciones
    3. 🏆 Las próximas 2 semanas te separan de un nivel junior/mid a un nivel **senior/staff**

---

## Semana 9: Unsafe, FFI y macros — Capítulos 17-18

<div class="week-card" markdown>

<div class="part-header part-v" markdown>

### :fire: Parte V — Semana 1 de 2

</div>

| Día | Contenido | Nivel Bloom | Tiempo |
|-----|-----------|:-----------:|--------|
| **Lun** | `unsafe` Rust: raw pointers, `unsafe fn`, `unsafe impl`, cuándo usarlo | <span class="bloom-badge analyze">Analizar</span> | 1.5h |
| **Mar** | FFI: `extern "C"`, `#[no_mangle]`, llamar C desde Rust y viceversa | <span class="bloom-badge apply">Aplicar</span> | 1.5h |
| **Mié** | PyO3: escribir extensiones de Python en Rust, `#[pyfunction]`, `#[pyclass]` | <span class="bloom-badge create">Crear</span> | 1.5h |
| **Jue** | Macros declarativas: `macro_rules!`, repeticiones, patterns | <span class="bloom-badge create">Crear</span> | 2h |
| **Vie** | :zap: **RETO**: Crear macro `rustmenu_route!` que genere handlers CRUD + exponer funciones de RustMenu a Python con PyO3 | <span class="bloom-badge create">Crear</span> | 2h |
| **Sáb** | Macros procedurales: derive macros, attribute macros, `syn`/`quote` | <span class="bloom-badge evaluate">Evaluar</span> | 3h |
| **Dom** | Flashcards semanas 7-9 + ejercicios de macros | <span class="bloom-badge evaluate">Evaluar</span> | 1.5h |

!!! success "Checkpoint semanal"
    Has completado la semana. Verifica tu progreso:

<div class="self-check" markdown>
<h4>✅ Autoevaluación</h4>
<label><input type="checkbox"> Puedo explicar cuándo `unsafe` es necesario y cuándo evitarlo</label>
<label><input type="checkbox"> He creado una extensión Python funcional con PyO3</label>
<label><input type="checkbox"> Sé escribir macros declarativas con `macro_rules!`</label>
<label><input type="checkbox"> Puedo crear derive macros básicas con `syn` y `quote`</label>
</div>

</div>

## Semana 10: Rendimiento, testing avanzado y publicación — Capítulos 19-20

<div class="week-card" markdown>

<div class="part-header part-v" markdown>

### :fire: Parte V — Semana 2 de 2

</div>

| Día | Contenido | Nivel Bloom | Tiempo |
|-----|-----------|:-----------:|--------|
| **Lun** | Benchmarking con `criterion`, perfilado con `flamegraph`, `cargo bench` | <span class="bloom-badge analyze">Analizar</span> | 1.5h |
| **Mar** | Optimizaciones: `#[inline]`, SIMD, allocator-aware, zero-copy patterns | <span class="bloom-badge analyze">Analizar</span> | 1.5h |
| **Mié** | Testing avanzado: `proptest`, `cargo-mutants`, integration tests, doc tests | <span class="bloom-badge evaluate">Evaluar</span> | 1.5h |
| **Jue** | `cargo publish`: `Cargo.toml` metadata, docs.rs, semver, CI/CD con GitHub Actions | <span class="bloom-badge apply">Aplicar</span> | 2h |
| **Vie** | :zap: **RETO FINAL**: Crear crate `rustmenu-core` — extraer lógica reutilizable con benchmarks y tests completos | <span class="bloom-badge create">Crear</span> | 2.5h |
| **Sáb** | Publicación: documentación con `///`, examples, README, checklist de crate | <span class="bloom-badge create">Crear</span> | 3h |
| **Dom** | 🏆 Retrospectiva final: portfolio, logros, plan de crecimiento continuo | <span class="bloom-badge evaluate">Evaluar</span> | 1h |

!!! success "Checkpoint final"
    Has completado el plan. Verifica tu progreso final:

<div class="self-check" markdown>
<h4>🏆 Autoevaluación final</h4>
<label><input type="checkbox"> He creado `rustmenu-core` con API pública bien documentada</label>
<label><input type="checkbox"> Los benchmarks con `criterion` muestran rendimiento aceptable</label>
<label><input type="checkbox"> Sé optimizar Rust con flamegraphs y profiling</label>
<label><input type="checkbox"> Puedo publicar un crate con `cargo publish` y metadata correcto</label>
<label><input type="checkbox"> Tests avanzados con `proptest` y doc tests completos</label>
<label><input type="checkbox"> Me siento preparado para un rol senior en Rust</label>
</div>

</div>

---

## 🎯 Dificultad por capítulo

| Capítulo | Dificultad | Ejercicios | Flashcards | Bloom máximo | Concepto clave |
|----------|:----------:|:----------:|:----------:|:------------:|----------------|
| 01 Bienvenido a Rust | <span class="diff-badge easy">Fácil</span> | 5 | 5 | <span class="bloom-badge understand">Comprender</span> | Setup, cargo, variables |
| 02 Ownership y moves | <span class="diff-badge easy">Fácil</span> | 5 | 5 | <span class="bloom-badge apply">Aplicar</span> | Ownership, Copy, Clone |
| 03 Referencias y borrowing | <span class="diff-badge easy">Fácil</span> | 5 | 5 | <span class="bloom-badge apply">Aplicar</span> | &T, &mut T, slices |
| 04 Control de flujo | <span class="diff-badge medium">Medio</span> | 5 | 5 | <span class="bloom-badge apply">Aplicar</span> | Closures, match, loops |
| 05 Structs y métodos | <span class="diff-badge medium">Medio</span> | 5 | 5 | <span class="bloom-badge analyze">Analizar</span> | Structs, impl, self |
| 06 Enums y pattern matching | <span class="diff-badge medium">Medio</span> | 5 | 5 | <span class="bloom-badge analyze">Analizar</span> | Option, Result, if let |
| 07 Traits y genéricos | <span class="diff-badge medium">Medio</span> | 5 | 5 | <span class="bloom-badge analyze">Analizar</span> | Traits, bounds, where |
| 08 Manejo de errores | <span class="diff-badge medium">Medio</span> | 5 | 5 | <span class="bloom-badge analyze">Analizar</span> | ?, thiserror, anyhow |
| 09 Colecciones e iteradores | <span class="diff-badge hard">Avanzado</span> | 5 | 5 | <span class="bloom-badge evaluate">Evaluar</span> | Vec, HashMap, map/filter |
| 10 Módulos y crates | <span class="diff-badge hard">Avanzado</span> | 5 | 5 | <span class="bloom-badge evaluate">Evaluar</span> | mod, pub, workspaces |
| 11 Lifetimes | <span class="diff-badge hard">Avanzado</span> | 5 | 7 | <span class="bloom-badge evaluate">Evaluar</span> | 'a, elision, 'static |
| 12 Smart pointers | <span class="diff-badge hard">Avanzado</span> | 5 | 7 | <span class="bloom-badge evaluate">Evaluar</span> | Box, Rc, Arc, RefCell |
| 13 Concurrencia | <span class="diff-badge expert">Experto</span> | 5 | 7 | <span class="bloom-badge create">Crear</span> | Threads, Mutex, Send/Sync |
| 14 Async y Tokio | <span class="diff-badge expert">Experto</span> | 5 | 7 | <span class="bloom-badge create">Crear</span> | async/await, Future, Tokio |
| 15 Axum web | <span class="diff-badge hard">Avanzado</span> | 5 | 5 | <span class="bloom-badge create">Crear</span> | Router, handlers, middleware |
| 16 Proyecto RustMenu | <span class="diff-badge expert">Experto</span> | 5 | 5 | <span class="bloom-badge create">Crear</span> | REST API end-to-end |
| 17 Unsafe y FFI | <span class="diff-badge expert">Experto</span> | 5 | 7 | <span class="bloom-badge create">Crear</span> | Raw pointers, extern, PyO3 |
| 18 Macros | <span class="diff-badge expert">Experto</span> | 5 | 7 | <span class="bloom-badge create">Crear</span> | macro_rules!, derive, syn |
| 19 Rendimiento | <span class="diff-badge expert">Experto</span> | 5 | 7 | <span class="bloom-badge create">Crear</span> | criterion, flamegraph, SIMD |
| 20 Testing y publicación | <span class="diff-badge expert">Experto</span> | 5 | 6 | <span class="bloom-badge create">Crear</span> | proptest, cargo publish |
| **TOTAL** | | **100** | **121** | | |

---

## :brain: Técnicas de aprendizaje basadas en evidencia

### 1. Spaced Repetition (Repetición espaciada)

!!! info "La ciencia"
    La curva del olvido de Ebbinghaus muestra que olvidamos ~70% en 24h sin repaso. La repetición espaciada combate esto revisando en intervalos crecientes.

```mermaid
graph LR
    A["Aprender<br/>Día 0"] --> B["1er repaso<br/>Día 1"]
    B --> C["2do repaso<br/>Día 3"]
    C --> D["3er repaso<br/>Día 7"]
    D --> E["4to repaso<br/>Día 14"]
    E --> F["5to repaso<br/>Día 30"]
    F --> G["✅ Memoria<br/>a largo plazo"]

    style A fill:#fee2e2,stroke:#ef4444
    style B fill:#fef3c7,stroke:#f59e0b
    style C fill:#fef9c3,stroke:#eab308
    style D fill:#dcfce7,stroke:#22c55e
    style E fill:#d1fae5,stroke:#10b981
    style F fill:#ccfbf1,stroke:#14b8a6
    style G fill:#dbeafe,stroke:#3b82f6
```

**Cómo implementarlo con este libro:**

1. Cada capítulo tiene **5-7 flashcards interactivas** al final
2. Usa las flashcards del libro (haz click para revelar la respuesta)
3. También puedes exportarlas a [Anki](https://apps.ankiweb.net/) con este formato:

| Frente | Reverso |
|--------|---------|
| ¿Qué es ownership en Rust? | Cada valor tiene un único dueño; cuando el dueño sale del scope, el valor se libera |
| ¿Diferencia entre `&T` y `&mut T`? | `&T` es referencia compartida (muchas a la vez). `&mut T` es referencia exclusiva (solo una) |
| ¿Qué hace el operador `?`? | Propaga el error: si `Result` es `Err`, retorna el error; si es `Ok`, extrae el valor |

### 2. Active Recall (Recuerdo activo)

!!! info "La ciencia"
    Roediger & Karpicke (2006) demostraron que el esfuerzo de *recordar* fortalece la memoria mucho más que *releer*. Por eso los ejercicios te piden escribir antes de ver la solución.

**Protocolo de cada sesión de estudio:**

1. :clock1: **5 min** — Escribe de memoria los conceptos clave de la sesión anterior
2. :book: **40 min** — Lee el contenido nuevo del capítulo
3. :pencil: **30 min** — Haz los ejercicios SIN mirar el capítulo
4. :mag: **10 min** — Compara tus respuestas con las soluciones
5. :brain: **5 min** — Flashcards de repaso

### 3. Elaborative Interrogation (Interrogación elaborativa)

!!! info "La ciencia"
    Pressley et al. (1987) demostraron que preguntarse *"¿por qué funciona así?"* mejora la comprensión profunda.

**Cómo usar las comparaciones Python → Rust:**

Cada vez que veas una comparación Python → Rust en el libro, hazte estas preguntas:

- ¿Por qué Rust necesita ownership y Python no?
- ¿Qué garantía de seguridad da esto en tiempo de compilación?
- ¿Qué bugs previene que Python solo detectaría en runtime?

### 4. Interleaving (Entrelazado)

!!! info "La ciencia"
    Rohrer & Taylor (2007) demostraron que mezclar tipos de problemas mejora la transferencia de conocimiento.

Los ejercicios de cada capítulo incluyen deliberadamente problemas que requieren conceptos de capítulos anteriores. Esto no es un error — es diseño intencional.

### 5. Proyecto-Driven Learning

**No aprendas en abstracto.** Cada capítulo debe resultar en código real para RustMenu. La regla es:

> Si aprendes un concepto, lo aplicas al proyecto **ese mismo día**.

### 6. Teach-Back Method (Método Feynman)

Explica cada concepto en voz alta como si enseñaras a alguien. Si no puedes explicarlo de forma sencilla, no lo has entendido.

!!! quote "Richard Feynman"
    *"Si no puedes explicarlo de forma sencilla, no lo entiendes lo suficiente."*

**Ejercicio semanal**: Cada domingo, elige 3 conceptos de la semana y explícalos en voz alta durante 2 minutos cada uno, sin mirar notas.

---

## ⌨️ Atajos de teclado

| Atajo | Acción |
|-------|--------|
| ++alt+f++ | Saltar a la siguiente flashcard |
| ++alt+r++ | Revelar/ocultar todas las flashcards |

---

## 🏆 Sistema de logros

Marca tus logros a medida que avanzas:

<div class="self-check" markdown>
<h4>🏅 Logros desbloqueados</h4>
<label><input type="checkbox"> **Primer compile** — Has compilado tu primer programa Rust sin errores</label>
<label><input type="checkbox"> **Ownership master** — Puedes explicar ownership, moves y borrowing sin dudar</label>
<label><input type="checkbox"> **Pattern matcher** — Has implementado máquinas de estado con enums en RustMenu</label>
<label><input type="checkbox"> **Trait designer** — Has creado traits genéricos con bounds complejos</label>
<label><input type="checkbox"> **Error wrangler** — Errores personalizados con `thiserror` en todo RustMenu</label>
<label><input type="checkbox"> **Iterator ninja** — Puedes encadenar 5+ adaptadores de iteradores sin pestañear</label>
<label><input type="checkbox"> **Lifetime whisperer** — Anotas lifetimes correctamente a la primera</label>
<label><input type="checkbox"> **Concurrency hero** — Has paralelizado código con threads, channels y Rayon</label>
<label><input type="checkbox"> **Async architect** — RustMenu REST API completa con Axum y Tokio</label>
<label><input type="checkbox"> **Unsafe surgeon** — Sabes cuándo usar `unsafe` y lo haces con precisión quirúrgica</label>
<label><input type="checkbox"> **Macro wizard** — Has creado macros declarativas y procedurales funcionales</label>
<label><input type="checkbox"> **Performance guru** — Has optimizado con `criterion` y `flamegraph`</label>
<label><input type="checkbox"> **Crate author** — Has publicado `rustmenu-core` en crates.io</label>
</div>
