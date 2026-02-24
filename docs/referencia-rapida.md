---
title: Referencia rápida de Rust
description: "Cheat sheet completo: sintaxis, ownership, tipos, traits, async y más"
---

# :bookmark_tabs: Referencia rápida de Rust

<div class="chapter-meta">
<span class="meta-icon">⏲️</span> Consulta permanente
<span class="meta-icon">🎯</span> Todos los niveles
</div>

> Referencia rápida que cubre los 20 capítulos del libro. Consulta esta página cada vez que necesites recordar sintaxis, reglas o patrones.

---

## 1. Cargo y herramientas

### Comandos esenciales

| Comando | Descripción |
|---------|-------------|
| `cargo new mi_proyecto` | Crea un proyecto binario nuevo |
| `cargo new mi_lib --lib` | Crea un proyecto de librería |
| `cargo build` | Compila en modo debug (`target/debug/`) |
| `cargo build --release` | Compila en modo release optimizado |
| `cargo run` | Compila y ejecuta |
| `cargo test` | Ejecuta todos los tests |
| `cargo clippy` | Linter oficial con sugerencias idiomáticas |
| `cargo fmt` | Formatea el código según el estilo estándar |
| `cargo doc --open` | Genera y abre la documentación |
| `cargo check` | Verifica que compila sin generar binario (más rápido) |
| `cargo add serde` | Agrega una dependencia al proyecto |
| `cargo update` | Actualiza dependencias según `Cargo.toml` |

### Estructura de `Cargo.toml`

```toml
[package]
name = "mi_proyecto"
version = "0.1.0"
edition = "2024"

[dependencies]
serde = { version = "1.0", features = ["derive"] }
tokio = { version = "1", features = ["full"] }

[dev-dependencies]
pretty_assertions = "1.4"

[[bin]]
name = "servidor"
path = "src/main.rs"
```

!!! tip "Consejo"
    Ejecuta `cargo clippy` antes de cada commit. Es tu mejor aliado para escribir Rust idiomático.

---

## 2. Variables y tipos

### Declaración de variables

```rust
let x = 5;              // Inmutable, tipo inferido (i32)
let mut y = 10;          // Mutable
let z: f64 = 3.14;      // Con anotación de tipo explícita
let (a, b) = (1, 2);    // Destructuring de tupla

const MAX: u32 = 100_000;     // Constante (SCREAMING_SNAKE_CASE)
static NOMBRE: &str = "Rust"; // Variable estática (vive todo el programa)
```

### Tipos escalares

| Tipo | Tamaño | Rango / Descripción |
|------|--------|---------------------|
| `i8` | 1 byte | -128 a 127 |
| `i16` | 2 bytes | -32 768 a 32 767 |
| `i32` | 4 bytes | Entero por defecto |
| `i64` | 8 bytes | -9.2 x 10^18 a 9.2 x 10^18 |
| `i128` | 16 bytes | Entero muy grande |
| `isize` | arch | Tamaño del puntero |
| `u8` | 1 byte | 0 a 255 |
| `u16` | 2 bytes | 0 a 65 535 |
| `u32` | 4 bytes | 0 a 4 294 967 295 |
| `u64` | 8 bytes | 0 a 18.4 x 10^18 |
| `u128` | 16 bytes | Entero sin signo muy grande |
| `usize` | arch | Índices y tamaños |
| `f32` | 4 bytes | Punto flotante simple |
| `f64` | 8 bytes | Punto flotante por defecto |
| `bool` | 1 byte | `true` o `false` |
| `char` | 4 bytes | Un carácter Unicode |

### Tipos compuestos

```rust
// Tupla — tipos heterogéneos, tamaño fijo
let mesa: (i32, &str, bool) = (5, "terraza", true);
let numero = mesa.0;  // Acceso por índice

// Array — mismo tipo, tamaño fijo (stack)
let precios: [f64; 3] = [12.5, 15.0, 18.0];
let ceros = [0; 10];  // 10 ceros

// String vs &str
let s1: String = String::from("hola");   // Owned, heap, mutable
let s2: &str = "hola";                   // Referencia, read-only, stack/estática
```

### Python vs Rust: tipos

| Python | Rust | Notas |
|--------|------|-------|
| `int` | `i32`, `i64`, `u32`... | Rust tiene tamaño fijo |
| `float` | `f64` | Python usa 64 bits también |
| `bool` | `bool` | Idéntico |
| `str` | `String` / `&str` | `String` = owned, `&str` = referencia |
| `list` | `Vec<T>` | Vector dinámico en heap |
| `tuple` | `(T1, T2, ...)` | Muy similar |
| `dict` | `HashMap<K, V>` | Necesita `use std::collections::HashMap` |
| `set` | `HashSet<T>` | Necesita `use std::collections::HashSet` |
| `None` | `Option::None` | Rust usa `Option<T>` en lugar de null |
| `bytes` | `Vec<u8>` / `&[u8]` | Slice de bytes |

---

## 3. Ownership y borrowing

### Las 3 reglas de ownership

| # | Regla |
|---|-------|
| 1 | Cada valor tiene exactamente **un owner** |
| 2 | Solo puede haber **un owner a la vez** |
| 3 | Cuando el owner sale del scope, el valor se **libera** (drop) |

### Move semantics

```rust
let s1 = String::from("hola");
let s2 = s1;          // s1 se MUEVE a s2
// println!("{s1}");   // ERROR: s1 ya no es válido

let n1 = 42;
let n2 = n1;          // los enteros implementan Copy, se COPIA
println!("{n1}");      // OK: n1 sigue válido
```

### Referencias y borrowing

```rust
fn longitud(s: &String) -> usize {  // referencia compartida (read-only)
    s.len()
}

fn agregar(s: &mut String) {         // referencia mutable (read-write)
    s.push_str(" mundo");
}

let mut texto = String::from("hola");
let len = longitud(&texto);       // préstamo compartido
agregar(&mut texto);               // préstamo mutable
```

### Reglas de borrowing

| Regla | Descripción |
|-------|-------------|
| **N lectores O 1 escritor** | Puedes tener muchas `&T` o una sola `&mut T`, nunca ambas |
| **Referencias siempre válidas** | Una referencia nunca puede vivir más que su dato |
| **No aliasing + mutabilidad** | No puedes tener un alias mutable y otro inmutable al mismo tiempo |

### Copy vs Clone

```rust
// Copy: copia implícita bit a bit (tipos simples del stack)
let a: i32 = 5;
let b = a;  // Copy — a sigue válido

// Clone: copia explícita (puede ser costosa, implica heap)
let s1 = String::from("hola");
let s2 = s1.clone();  // Clone — ambos válidos
```

### Python (GC) vs Rust (ownership)

| Aspecto | Python | Rust |
|---------|--------|------|
| Gestión de memoria | Garbage Collector (ref counting + GC) | Ownership + borrowing |
| Null / None | `None` es un valor válido | No existe null: usa `Option<T>` |
| Compartir datos | Múltiples refs al mismo objeto | Una `&mut` o muchas `&` |
| Liberación | Automática por GC (no determinista) | Determinista al salir del scope |
| Data races | Posibles en threads | Imposibles (compilador lo previene) |
| Coste en runtime | Overhead del GC | Zero-cost (todo en compilación) |

---

## 4. Funciones y closures

### Funciones

```rust
// Función básica con tipos explícitos
fn sumar(a: i32, b: i32) -> i32 {
    a + b  // Última expresión = valor de retorno (sin ;)
}

// Sin valor de retorno (retorna unit `()`)
fn saludar(nombre: &str) {
    println!("Hola, {nombre}");
}

// Retorno temprano con return
fn dividir(a: f64, b: f64) -> Result<f64, String> {
    if b == 0.0 {
        return Err("División por cero".into());
    }
    Ok(a / b)
}
```

!!! warning "Expresión vs sentencia"
    `a + b` (sin `;`) es una **expresión** que retorna valor. `a + b;` (con `;`) es una **sentencia** que retorna `()`.

### Closures

```rust
// Closure básico
let suma = |a, b| a + b;
let resultado = suma(3, 4);  // 7

// Con anotación de tipo
let cuadrado = |x: i32| -> i32 { x * x };

// Captura del entorno
let factor = 3;
let multiplicar = |x| x * factor;  // captura `factor` por referencia

// Closure como parámetro
fn aplicar<F: Fn(i32) -> i32>(f: F, valor: i32) -> i32 {
    f(valor)
}
```

### Traits de closures

| Trait | Captura | Uso |
|-------|---------|-----|
| `Fn` | `&self` (referencia compartida) | Puede llamarse múltiples veces |
| `FnMut` | `&mut self` (referencia mutable) | Puede mutar lo capturado |
| `FnOnce` | `self` (toma ownership) | Solo se puede llamar una vez |

### Python vs Rust: funciones

| Python | Rust |
|--------|------|
| `def f(x):` | `fn f(x: i32) -> i32 {` |
| `lambda x: x + 1` | `\|x\| x + 1` |
| Tipos opcionales (hints) | Tipos obligatorios en `fn` |
| `*args, **kwargs` | No existe — usa genéricos o macros |
| Decoradores `@` | Macros de atributo `#[...]` |

---

## 5. Flujo de control

### Condicionales

```rust
// if/else es una EXPRESIÓN (retorna valor)
let estado = if precio > 20.0 { "caro" } else { "barato" };

// match — pattern matching exhaustivo
match plato {
    "pizza" => println!("Italiana"),
    "sushi" => println!("Japonesa"),
    "tacos" | "burritos" => println!("Mexicana"),  // OR pattern
    _ => println!("Otra"),                          // wildcard
}

// if let — match simplificado para un solo patrón
if let Some(valor) = opcional {
    println!("Tiene valor: {valor}");
}
```

### Bucles

```rust
// loop — bucle infinito (puede retornar valor con break)
let resultado = loop {
    contador += 1;
    if contador == 10 {
        break contador * 2;  // retorna 20
    }
};

// while
while condicion {
    // ...
}

// while let — combina while + pattern matching
while let Some(tope) = pila.pop() {
    println!("{tope}");
}

// for..in — itera sobre cualquier Iterator
for i in 0..5 { }          // Rango exclusivo: 0,1,2,3,4
for i in 0..=5 { }         // Rango inclusivo: 0,1,2,3,4,5
for item in &vector { }    // Referencia compartida
for item in &mut vector { } // Referencia mutable
for item in vector { }     // Consume el vector (move)
```

### Cheat sheet de pattern matching

```rust
match valor {
    1 => { },                       // Literal
    2 | 3 => { },                   // OR
    4..=10 => { },                  // Rango inclusivo
    x if x > 100 => { },           // Guard
    (a, b) => { },                  // Destructuring tupla
    Punto { x, y } => { },         // Destructuring struct
    Some(inner) => { },             // Destructuring enum
    Err(e) => { },                  // Enum con dato
    [primero, .., ultimo] => { },   // Slice pattern
    _ => { },                       // Wildcard (catch-all)
}
```

---

## 6. Structs y enums

### Tipos de struct

```rust
// Named struct
struct Plato {
    nombre: String,
    precio: f64,
    disponible: bool,
}

// Tuple struct
struct Punto(f64, f64);
struct Id(u64);            // Newtype pattern

// Unit struct (sin datos, útil como marcador)
struct Marcador;
```

### Bloques `impl`

```rust
impl Plato {
    // Función asociada (como un constructor, sin &self)
    fn nuevo(nombre: &str, precio: f64) -> Self {
        Self {
            nombre: nombre.to_string(),
            precio,
            disponible: true,
        }
    }

    // Método (recibe &self)
    fn descripcion(&self) -> String {
        format!("{} — ${:.2}", self.nombre, self.precio)
    }

    // Método que muta (&mut self)
    fn aplicar_descuento(&mut self, porcentaje: f64) {
        self.precio *= 1.0 - porcentaje / 100.0;
    }
}
```

### Enums con datos

```rust
enum Pedido {
    EnEspera,                         // Variante sin datos
    EnPreparacion { minutos: u32 },   // Variante con struct
    Listo(String),                    // Variante con tupla
    Cancelado { razon: String },
}

// Uso con match
fn estado(p: &Pedido) -> &str {
    match p {
        Pedido::EnEspera => "Esperando",
        Pedido::EnPreparacion { minutos } => "Cocinando",
        Pedido::Listo(_) => "Listo",
        Pedido::Cancelado { .. } => "Cancelado",
    }
}
```

### `Option<T>` y `Result<T, E>`

```rust
// Option<T> — valor que puede existir o no
let encontrado: Option<&str> = Some("pizza");
let nada: Option<&str> = None;

// Métodos útiles de Option
encontrado.unwrap();              // Panics si es None
encontrado.unwrap_or("default");  // Valor por defecto
encontrado.map(|v| v.len());     // Transforma el interior
encontrado.is_some();             // true
encontrado.is_none();             // false

// Result<T, E> — operación que puede fallar
let ok: Result<i32, String> = Ok(42);
let err: Result<i32, String> = Err("fallo".into());

// Métodos útiles de Result
ok.unwrap();                      // Panics si es Err
ok.unwrap_or(0);                  // Valor por defecto
ok.map(|v| v * 2);               // Transforma el Ok
ok.map_err(|e| format!("Error: {e}")); // Transforma el Err
ok.is_ok();                       // true
```

!!! warning "Evita `unwrap()` en producción"
    Usa `?`, `unwrap_or`, `unwrap_or_else` o `match` en lugar de `.unwrap()`.

---

## 7. Traits y genéricos

### Definir e implementar traits

```rust
trait Describible {
    fn descripcion(&self) -> String;

    // Método con implementación por defecto
    fn resumen(&self) -> String {
        format!("{}...", &self.descripcion()[..30])
    }
}

impl Describible for Plato {
    fn descripcion(&self) -> String {
        format!("{}: ${:.2}", self.nombre, self.precio)
    }
}
```

### Traits estándar comunes

| Trait | Propósito | Derivable |
|-------|-----------|-----------|
| `Debug` | Formateo con `{:?}` para depuración | `#[derive(Debug)]` |
| `Display` | Formateo con `{}` para usuarios | Manual |
| `Clone` | Copia explícita profunda | `#[derive(Clone)]` |
| `Copy` | Copia implícita (stack, bit a bit) | `#[derive(Copy, Clone)]` |
| `PartialEq` / `Eq` | Comparación con `==` | `#[derive(PartialEq, Eq)]` |
| `PartialOrd` / `Ord` | Comparación con `<`, `>` | `#[derive(PartialOrd, Ord)]` |
| `Hash` | Para usar en `HashMap` / `HashSet` | `#[derive(Hash)]` |
| `Default` | Valor por defecto | `#[derive(Default)]` |
| `From` / `Into` | Conversión entre tipos | Manual |
| `Iterator` | Protocolo de iteración | Manual |
| `Drop` | Destructor personalizado | Manual |
| `Deref` / `DerefMut` | Desreferenciación automática | Manual |
| `Send` | Se puede enviar entre threads | Automático |
| `Sync` | Se puede compartir entre threads | Automático |

### Genéricos y trait bounds

```rust
// Función genérica con trait bound
fn imprimir<T: Display>(valor: T) {
    println!("{valor}");
}

// Múltiples bounds
fn procesar<T: Display + Clone>(valor: T) { }

// Cláusula where (más legible con muchos bounds)
fn procesar<T, U>(t: T, u: U) -> String
where
    T: Display + Clone,
    U: Debug + Default,
{
    format!("{t}")
}

// impl Trait (azúcar sintáctico en parámetros y retorno)
fn imprimir(valor: impl Display) { }
fn crear_iter() -> impl Iterator<Item = i32> { 0..10 }
```

### `dyn Trait` vs `impl Trait`

| | `impl Trait` | `dyn Trait` |
|---|---|---|
| Dispatch | Estático (monomorphization) | Dinámico (vtable) |
| Rendimiento | Sin overhead | Pequeño overhead |
| Tamaño conocido | Sí (en compilación) | No (`dyn` necesita `Box` o `&`) |
| Uso típico | Parámetros y retornos simples | Colecciones heterogéneas |

```rust
// Dispatch estático
fn dibujar(forma: impl Forma) { }

// Dispatch dinámico
fn dibujar(forma: &dyn Forma) { }
let formas: Vec<Box<dyn Forma>> = vec![Box::new(circulo), Box::new(rect)];
```

---

## 8. Manejo de errores

### `panic!` vs `Result`

| | `panic!` | `Result<T, E>` |
|---|---|---|
| Cuándo | Error irrecuperable / bug | Error esperado y recuperable |
| Efecto | Aborta el thread (unwind o abort) | Retorna `Err` al caller |
| Producción | Solo para invariantes rotos | Para toda lógica de errores |

### El operador `?`

```rust
// Sin ? — verbose
fn leer_config(path: &str) -> Result<String, io::Error> {
    let contenido = match fs::read_to_string(path) {
        Ok(c) => c,
        Err(e) => return Err(e),
    };
    Ok(contenido)
}

// Con ? — idiomático
fn leer_config(path: &str) -> Result<String, io::Error> {
    let contenido = fs::read_to_string(path)?;  // propaga el error
    Ok(contenido)
}
```

### Errores personalizados con `thiserror`

```rust
use thiserror::Error;

#[derive(Error, Debug)]
enum AppError {
    #[error("No se encontró el plato: {0}")]
    PlatoNoEncontrado(String),

    #[error("Error de base de datos")]
    Database(#[from] sqlx::Error),

    #[error("Error de IO")]
    Io(#[from] std::io::Error),
}
```

### Patrones de manejo de errores

| Patrón | Cuándo usarlo |
|--------|---------------|
| `?` | Propagar errores al caller |
| `match` en `Result` | Manejar cada caso específico |
| `.unwrap_or(default)` | Proporcionar valor por defecto |
| `.unwrap_or_else(\|\| ...)` | Default con lógica costosa |
| `.map_err(...)` | Convertir tipo de error |
| `anyhow::Result` | Prototipos y aplicaciones (no librerías) |
| `thiserror` | Librerías con errores tipados |

---

## 9. Colecciones

### Operaciones comunes

=== "Vec\<T>"

    ```rust
    let mut v: Vec<i32> = Vec::new();
    let v2 = vec![1, 2, 3];

    v.push(10);             // Agregar al final
    v.pop();                // Quitar del final -> Option<T>
    v.len();                // Cantidad de elementos
    v.is_empty();           // ¿Está vacío?
    v.contains(&10);        // ¿Contiene el valor?
    v.sort();               // Ordenar in-place
    v.dedup();              // Eliminar duplicados consecutivos
    v.retain(|x| *x > 5);  // Filtrar in-place
    &v[1..3];               // Slice
    ```

=== "HashMap\<K, V>"

    ```rust
    use std::collections::HashMap;

    let mut mapa: HashMap<String, f64> = HashMap::new();

    mapa.insert("pizza".into(), 12.5);
    mapa.get("pizza");                    // Option<&f64>
    mapa.contains_key("pizza");           // bool
    mapa.remove("pizza");                 // Option<f64>
    mapa.entry("sushi".into()).or_insert(15.0); // Insertar si no existe
    mapa.len();

    for (clave, valor) in &mapa { }       // Iterar
    ```

=== "HashSet\<T>"

    ```rust
    use std::collections::HashSet;

    let mut set: HashSet<i32> = HashSet::new();

    set.insert(1);
    set.contains(&1);       // bool
    set.remove(&1);         // bool

    // Operaciones de conjuntos
    let union = &set_a | &set_b;
    let interseccion = &set_a & &set_b;
    let diferencia = &set_a - &set_b;
    ```

### Otras colecciones

| Colección | Uso |
|-----------|-----|
| `VecDeque<T>` | Cola doble (push/pop eficiente en ambos extremos) |
| `BTreeMap<K, V>` | Mapa ordenado por clave |
| `BTreeSet<T>` | Set ordenado |
| `LinkedList<T>` | Lista enlazada (rara vez necesaria) |
| `BinaryHeap<T>` | Cola de prioridad (max-heap) |

---

## 10. Iteradores

### Tipos de iterador

```rust
let v = vec![1, 2, 3];

v.iter()       // Itera sobre &T (no consume)
v.iter_mut()   // Itera sobre &mut T (no consume, permite mutar)
v.into_iter()  // Itera sobre T (consume el vector)
```

### Adaptadores principales

| Adaptador | Descripción | Ejemplo |
|-----------|-------------|---------|
| `map` | Transforma cada elemento | `.map(\|x\| x * 2)` |
| `filter` | Filtra por predicado | `.filter(\|x\| *x > 5)` |
| `fold` | Reduce a un valor | `.fold(0, \|acc, x\| acc + x)` |
| `zip` | Combina dos iteradores | `.zip(otro.iter())` |
| `enumerate` | Agrega índice | `.enumerate()` -> `(i, val)` |
| `flat_map` | Map + flatten | `.flat_map(\|x\| x.chars())` |
| `chain` | Concatena iteradores | `.chain(otro.iter())` |
| `take` | Toma N primeros | `.take(5)` |
| `skip` | Salta N primeros | `.skip(2)` |
| `peekable` | Permite ver siguiente sin consumir | `.peekable()` |
| `collect` | Convierte a colección | `.collect::<Vec<_>>()` |
| `sum` | Suma todos | `.sum::<i32>()` |
| `any` | Alguno cumple predicado | `.any(\|x\| *x > 10)` |
| `all` | Todos cumplen predicado | `.all(\|x\| *x > 0)` |
| `find` | Primer match | `.find(\|x\| *x == 3)` |
| `count` | Cantidad de elementos | `.count()` |

### Turbofish `::<>`

```rust
// Cuando Rust no puede inferir el tipo de collect
let numeros: Vec<i32> = "1,2,3".split(',').map(|s| s.parse().unwrap()).collect();

// Equivalente con turbofish
let numeros = "1,2,3".split(',').map(|s| s.parse::<i32>().unwrap()).collect::<Vec<_>>();
```

### Python vs Rust: iteradores

| Python | Rust |
|--------|------|
| `[x*2 for x in lista]` | `lista.iter().map(\|x\| x * 2).collect()` |
| `[x for x in lista if x > 5]` | `lista.iter().filter(\|x\| **x > 5).collect()` |
| `sum(lista)` | `lista.iter().sum::<i32>()` |
| `enumerate(lista)` | `lista.iter().enumerate()` |
| `zip(a, b)` | `a.iter().zip(b.iter())` |
| `any(f(x) for x in l)` | `l.iter().any(\|x\| f(x))` |

---

## 11. Lifetimes

### Sintaxis de anotación

```rust
// Lifetime explícito en función
fn mas_largo<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() { x } else { y }
}

// Lifetime en struct (el struct no puede vivir más que la referencia)
struct Extracto<'a> {
    texto: &'a str,
}
```

### Las 3 reglas de elisión

El compilador aplica estas reglas automáticamente para evitar que escribas lifetimes en la mayoría de casos:

| # | Regla |
|---|-------|
| 1 | Cada parámetro referencia recibe su propio lifetime |
| 2 | Si hay exactamente un lifetime de entrada, se asigna a todas las salidas |
| 3 | Si uno de los parámetros es `&self` o `&mut self`, su lifetime se asigna a la salida |

### Lifetime `'static`

```rust
// Vive todo el programa — string literals son siempre 'static
let s: &'static str = "vivo para siempre";

// T: 'static significa que T no contiene referencias no-'static
fn enviar<T: Send + 'static>(dato: T) { }
```

!!! tip "Consejo"
    Si el compilador pide lifetimes, pregúntate: "Cuánto necesita vivir esta referencia?" La respuesta suele ser clara.

---

## 12. Smart pointers

### Cuándo usar cada uno

| Smart Pointer | Uso principal | Thread-safe |
|---------------|--------------|-------------|
| `Box<T>` | Heap allocation, tipos recursivos, trait objects | No (single-owner) |
| `Rc<T>` | Múltiples owners (single-thread) | No |
| `Arc<T>` | Múltiples owners (multi-thread) | Sí |
| `RefCell<T>` | Mutabilidad interior (borrow check en runtime) | No |
| `Mutex<T>` | Mutabilidad interior thread-safe | Sí |
| `Cow<'a, T>` | Clone-on-write (evita clones innecesarios) | Depende de T |

### Ejemplos

```rust
// Box — tipo recursivo
enum Lista {
    Cons(i32, Box<Lista>),
    Nil,
}

// Rc — múltiples owners
use std::rc::Rc;
let a = Rc::new(5);
let b = Rc::clone(&a);  // No clona el dato, incrementa el contador
println!("refs: {}", Rc::strong_count(&a)); // 2

// RefCell — mutabilidad interior
use std::cell::RefCell;
let data = RefCell::new(vec![1, 2, 3]);
data.borrow_mut().push(4);     // Mutable borrow en runtime
let lectura = data.borrow();   // Shared borrow en runtime

// Arc + Mutex — compartir entre threads
use std::sync::{Arc, Mutex};
let contador = Arc::new(Mutex::new(0));
let c = Arc::clone(&contador);
```

### `Deref` y `Drop`

```rust
// Deref — permite usar * y coercion automática
use std::ops::Deref;
impl<T> Deref for MiBox<T> {
    type Target = T;
    fn deref(&self) -> &T { &self.0 }
}

// Drop — destructor personalizado
impl Drop for MiRecurso {
    fn drop(&mut self) {
        println!("Liberando recurso");
    }
}
// Forzar drop temprano:
drop(recurso);
```

---

## 13. Concurrencia

### Threads

```rust
use std::thread;

// Spawn + join
let handle = thread::spawn(|| {
    println!("Desde otro thread");
    42
});
let resultado = handle.join().unwrap();  // 42

// Mover datos al thread con move
let datos = vec![1, 2, 3];
let handle = thread::spawn(move || {
    println!("{datos:?}");  // datos se movió al thread
});
```

### `Arc<Mutex<T>>` — Patrón compartir estado

```rust
use std::sync::{Arc, Mutex};
use std::thread;

let contador = Arc::new(Mutex::new(0));
let mut handles = vec![];

for _ in 0..10 {
    let c = Arc::clone(&contador);
    handles.push(thread::spawn(move || {
        let mut num = c.lock().unwrap();
        *num += 1;
    }));
}
for h in handles { h.join().unwrap(); }
println!("Total: {}", *contador.lock().unwrap()); // 10
```

### Canales

```rust
use std::sync::mpsc;

let (tx, rx) = mpsc::channel();

// Múltiples productores
let tx2 = tx.clone();
thread::spawn(move || { tx.send("hola").unwrap(); });
thread::spawn(move || { tx2.send("mundo").unwrap(); });

// Consumidor
for msg in rx {
    println!("{msg}");
}
```

### `Send` y `Sync`

| Trait | Significado |
|-------|-------------|
| `Send` | El tipo se puede **enviar** a otro thread (transfer ownership) |
| `Sync` | El tipo se puede **compartir** entre threads via referencia (`&T` es `Send`) |
| `Rc<T>` | No es `Send` ni `Sync` (usar `Arc` en su lugar) |
| `RefCell<T>` | Es `Send` pero no `Sync` (usar `Mutex` en su lugar) |

---

## 14. Async / Await

### Fundamentos

```rust
// Función async — retorna un Future
async fn obtener_datos(url: &str) -> Result<String, reqwest::Error> {
    let respuesta = reqwest::get(url).await?;
    let texto = respuesta.text().await?;
    Ok(texto)
}

// main async con Tokio
#[tokio::main]
async fn main() {
    let datos = obtener_datos("https://api.ejemplo.com").await.unwrap();
    println!("{datos}");
}
```

### Tokio: herramientas principales

```rust
// Spawn — ejecutar tarea en paralelo
let handle = tokio::spawn(async {
    hacer_algo().await
});
let resultado = handle.await.unwrap();

// join! — ejecutar múltiples futures concurrentemente
let (a, b, c) = tokio::join!(
    obtener_usuarios(),
    obtener_pedidos(),
    obtener_platos(),
);

// select! — esperar al primero que termine
tokio::select! {
    val = future_a => println!("A terminó: {val:?}"),
    val = future_b => println!("B terminó: {val:?}"),
}

// Sleep y timeout
tokio::time::sleep(Duration::from_secs(1)).await;
tokio::time::timeout(Duration::from_secs(5), future_lento).await;
```

### Python vs Rust: async

| Python | Rust |
|--------|------|
| `async def f():` | `async fn f() {` |
| `await f()` | `f().await` |
| `asyncio.run(main())` | `#[tokio::main]` |
| `asyncio.gather(a, b)` | `tokio::join!(a, b)` |
| `asyncio.create_task(f())` | `tokio::spawn(f())` |
| `asyncio.wait_for(f, timeout=5)` | `tokio::time::timeout(dur, f)` |

---

## 15. Axum web

### Router y handlers básicos

```rust
use axum::{Router, routing::get, Json, extract::{Path, Query, State}};

async fn hola() -> &'static str {
    "Hola mundo"
}

async fn obtener_plato(Path(id): Path<u32>) -> Json<Plato> {
    Json(buscar_plato(id))
}

#[tokio::main]
async fn main() {
    let app = Router::new()
        .route("/", get(hola))
        .route("/platos/{id}", get(obtener_plato))
        .route("/platos", get(listar).post(crear));

    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}
```

### Extractores principales

| Extractor | Fuente | Ejemplo |
|-----------|--------|---------|
| `Path(id)` | URL path `/platos/{id}` | `Path(id): Path<u32>` |
| `Query(params)` | Query string `?page=1` | `Query(p): Query<Paginacion>` |
| `Json(body)` | Body JSON | `Json(plato): Json<CrearPlato>` |
| `State(db)` | Estado compartido | `State(db): State<AppState>` |
| `Extension(val)` | Extensiones del request | `Extension(user): Extension<User>` |
| `HeaderMap` | Headers HTTP | `headers: HeaderMap` |

### Estado compartido con Axum

```rust
#[derive(Clone)]
struct AppState {
    db: sqlx::PgPool,
}

let state = AppState { db: pool };
let app = Router::new()
    .route("/platos", get(listar_platos))
    .with_state(state);

async fn listar_platos(State(state): State<AppState>) -> Json<Vec<Plato>> {
    let platos = sqlx::query_as!(Plato, "SELECT * FROM platos")
        .fetch_all(&state.db).await.unwrap();
    Json(platos)
}
```

---

## 16. Módulos

### Sintaxis y visibilidad

```rust
// Declarar un módulo (busca modelos.rs o modelos/mod.rs)
mod modelos;

// Módulo inline
mod utils {
    pub fn formatear(s: &str) -> String {
        s.to_uppercase()
    }

    fn privada() { } // Solo visible dentro de utils
}

// Usar items de un módulo
use crate::modelos::Plato;
use std::collections::HashMap;
use std::io::{self, Read, Write};  // Importar múltiples items
```

### Visibilidad

| Palabra clave | Visibilidad |
|---------------|-------------|
| (nada) | Privado al módulo actual |
| `pub` | Público (visible desde fuera) |
| `pub(crate)` | Visible en todo el crate pero no fuera |
| `pub(super)` | Visible en el módulo padre |
| `pub(in path)` | Visible en un path específico |

### Estructura de archivos convencional

```
mi_proyecto/
├── Cargo.toml
└── src/
    ├── main.rs          // Punto de entrada
    ├── lib.rs           // Raíz del crate de librería
    ├── modelos/         // Módulo con subdirectorio
    │   ├── mod.rs       // Declaraciones del módulo
    │   ├── plato.rs
    │   └── pedido.rs
    ├── rutas.rs         // Módulo como archivo
    └── utils.rs
```

### Re-exports

```rust
// En lib.rs — exponer items internos de forma limpia
pub use modelos::Plato;
pub use modelos::Pedido;

// Los usuarios del crate importan directamente:
// use mi_crate::Plato;
```

---

## 17. Unsafe

### Los 5 superpoderes de `unsafe`

| # | Superpoder |
|---|-----------|
| 1 | Desreferenciar raw pointers (`*const T`, `*mut T`) |
| 2 | Llamar funciones `unsafe` |
| 3 | Acceder o modificar variables `static mut` |
| 4 | Implementar traits `unsafe` |
| 5 | Acceder a campos de `union` |

### Sintaxis

```rust
// Bloque unsafe
let mut num = 5;
let r1 = &num as *const i32;     // Crear raw pointer (seguro)
let r2 = &mut num as *mut i32;

unsafe {
    println!("r1: {}", *r1);     // Desreferenciar (unsafe)
    *r2 = 10;                     // Escribir via raw pointer
}

// Función unsafe
unsafe fn peligroso() { }
unsafe { peligroso(); }
```

### FFI básico

```rust
// Llamar a funciones de C
extern "C" {
    fn abs(input: i32) -> i32;
    fn strlen(s: *const u8) -> usize;
}

let resultado = unsafe { abs(-5) };  // 5

// Exponer funciones de Rust a C
#[no_mangle]
pub extern "C" fn sumar(a: i32, b: i32) -> i32 {
    a + b
}
```

!!! warning "Regla de oro"
    Minimiza el código dentro de bloques `unsafe`. Envuelve las operaciones unsafe en abstracciones seguras con interfaces públicas seguras.

---

## 18. Macros

### `macro_rules!`

```rust
// Macro declarativa básica
macro_rules! decir {
    ($msg:expr) => {
        println!("{}", $msg);
    };
}
decir!("hola");

// Con múltiples patrones
macro_rules! crear_vec {
    () => { Vec::new() };
    ($($elem:expr),+ $(,)?) => {
        {
            let mut v = Vec::new();
            $(v.push($elem);)+
            v
        }
    };
}
```

### Especificadores de fragmento

| Especificador | Captura |
|---------------|---------|
| `$x:expr` | Cualquier expresión |
| `$x:ident` | Identificador (`foo`, `bar`) |
| `$x:ty` | Tipo (`i32`, `Vec<T>`) |
| `$x:tt` | Token tree (cualquier token) |
| `$x:block` | Bloque `{ ... }` |
| `$x:stmt` | Sentencia |
| `$x:pat` | Patrón (para match) |
| `$x:item` | Item (fn, struct, impl...) |
| `$x:path` | Path (`std::io::Error`) |
| `$x:literal` | Literal (`42`, `"hola"`) |

### Derives comunes

```rust
#[derive(Debug, Clone, PartialEq, Eq, Hash, Default)]
struct Plato {
    nombre: String,
    precio: u32,
}

// Derives de crates externos
#[derive(Serialize, Deserialize)]  // serde
#[derive(Error)]                   // thiserror
#[derive(sqlx::FromRow)]           // sqlx
```

### Tipos de macros procedurales

| Tipo | Sintaxis | Uso |
|------|----------|-----|
| Derive | `#[derive(MiMacro)]` | Genera impl automáticamente |
| Atributo | `#[mi_atributo]` | Modifica el item anotado |
| Function-like | `mi_macro!(...)` | Genera código arbitrario |

---

## 19. Testing

### Tests unitarios

```rust
// En el mismo archivo que el código
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_sumar() {
        assert_eq!(sumar(2, 3), 5);
    }

    #[test]
    fn test_crear_plato() {
        let p = Plato::nuevo("Pizza", 12.5);
        assert_eq!(p.nombre, "Pizza");
        assert!(p.disponible);
        assert_ne!(p.precio, 0.0);
    }

    #[test]
    #[should_panic(expected = "División por cero")]
    fn test_division_cero() {
        dividir(10.0, 0.0).unwrap();
    }

    #[test]
    fn test_resultado() -> Result<(), String> {
        let r = dividir(10.0, 2.0).map_err(|e| e.to_string())?;
        assert_eq!(r, 5.0);
        Ok(())
    }
}
```

### Macros de aserción

| Macro | Propósito |
|-------|-----------|
| `assert!(expr)` | Verifica que la expresión sea true |
| `assert_eq!(a, b)` | Verifica igualdad (`a == b`) |
| `assert_ne!(a, b)` | Verifica desigualdad (`a != b`) |
| `debug_assert!(expr)` | Solo en modo debug |
| `assert!(expr, "msg {}", val)` | Con mensaje personalizado |

### Tests de integración

```
mi_proyecto/
├── src/
│   └── lib.rs
└── tests/                    # Directorio de tests de integración
    ├── api_tests.rs          # Cada archivo es un crate separado
    └── common/
        └── mod.rs            # Código compartido entre tests
```

```rust
// tests/api_tests.rs
use mi_proyecto::Plato;

#[test]
fn test_integracion_plato() {
    let p = Plato::nuevo("Sushi", 18.0);
    assert_eq!(p.descripcion(), "Sushi — $18.00");
}
```

### Flags de `cargo test`

| Comando | Efecto |
|---------|--------|
| `cargo test` | Ejecuta todos los tests |
| `cargo test nombre_test` | Filtra tests por nombre |
| `cargo test -- --nocapture` | Muestra `println!` durante tests |
| `cargo test -- --test-threads=1` | Ejecuta tests secuencialmente |
| `cargo test --lib` | Solo tests unitarios |
| `cargo test --test api_tests` | Solo un archivo de integración |
| `cargo test --doc` | Solo doc tests |

---

## 20. Operadores y símbolos útiles

| Operador | Nombre | Descripción |
|----------|--------|-------------|
| `?` | Try | Propaga error / None al caller |
| `..` | Rango exclusivo | `0..5` genera 0,1,2,3,4 |
| `..=` | Rango inclusivo | `0..=5` genera 0,1,2,3,4,5 |
| `..` | Struct update | `Plato { precio: 15.0, ..otro }` |
| `::` | Path | Acceso a módulo/tipo: `Vec::new()` |
| `->` | Retorno | Tipo de retorno de función |
| `=>` | Match arm | Rama de match |
| `&` | Referencia | Préstamo compartido |
| `&mut` | Ref mutable | Préstamo mutable |
| `*` | Desref | Desreferenciar puntero/ref |
| `\|x\|` | Closure | Parámetros de closure |
| `_` | Wildcard | Ignorar valor/patrón |
| `'a` | Lifetime | Anotación de lifetime |
| `::<>` | Turbofish | Especificar tipos genéricos en expresiones |
| `#[...]` | Atributo externo | Aplica al item siguiente |
| `#![...]` | Atributo interno | Aplica al item que lo contiene |
| `@` | Binding | `x @ 1..=5` captura y hace match |
| `ref` | Ref en pattern | Crea referencia en destructuring |
| `as` | Cast | Conversión de tipo: `x as f64` |

---

## Recursos

| Recurso | Enlace |
|---------|--------|
| The Rust Programming Language | [doc.rust-lang.org/book](https://doc.rust-lang.org/book/) |
| Rust by Example | [doc.rust-lang.org/rust-by-example](https://doc.rust-lang.org/rust-by-example/) |
| Rust Reference | [doc.rust-lang.org/reference](https://doc.rust-lang.org/reference/) |
| Standard Library Docs | [doc.rust-lang.org/std](https://doc.rust-lang.org/std/) |
| Rustlings (ejercicios) | [github.com/rust-lang/rustlings](https://github.com/rust-lang/rustlings) |
| Exercism Rust Track | [exercism.org/tracks/rust](https://exercism.org/tracks/rust) |
| Rust Playground | [play.rust-lang.org](https://play.rust-lang.org/) |
| Tokio Tutorial | [tokio.rs/tokio/tutorial](https://tokio.rs/tokio/tutorial) |
| Axum Docs | [docs.rs/axum](https://docs.rs/axum/latest/axum/) |
| Crates.io (registro de paquetes) | [crates.io](https://crates.io/) |
| This Week in Rust | [this-week-in-rust.org](https://this-week-in-rust.org/) |

---

<div class="site-footer" markdown>

*Referencia rápida del libro [Aprende Rust](index.md). Consulta los capítulos individuales para explicaciones detalladas y ejercicios.*

</div>
