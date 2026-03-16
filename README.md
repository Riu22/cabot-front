# 🧾 Cabot Invoice Auditor — Frontend

Aplicación web para auditar facturas de Cabot. Permite subir un PDF de factura y detectar automáticamente errores en los descuentos aplicados, comparándolos contra un conjunto de reglas configuradas.

## ✨ Funcionalidades

- **Analizador de Facturas** — Sube un PDF y obtén en segundos el código de producto, la marca detectada, el descuento aplicado vs. el esperado, y si la factura es correcta o tiene errores.
- **Gestión de Reglas** — Panel de administración para crear y consultar las reglas de descuento por prefijo de producto y marca.

## 🛠️ Stack tecnológico

| Tecnología | Versión |
|---|---|
| React | 19 |
| React Router DOM | 7 |
| Vite | 8 |
| Tailwind CSS | 4 |

## 🚀 Instalación y uso

### Prerrequisitos

- Node.js ≥ 18
- Backend corriendo en `http://localhost:8080` (ver repositorio `cabot-back`)

### Instalar dependencias

```bash
npm install
```

### Iniciar en modo desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`.

### Build de producción

```bash
npm run build
```

## 📁 Estructura del proyecto

```
cabot-front/
├── public/
├── src/
│   ├── pages/
│   │   ├── FileUpload.jsx   # Página principal: subida y análisis de facturas
│   │   └── AdminRules.jsx   # Panel de administración de reglas de descuento
│   ├── App.jsx              # Enrutamiento y layout principal
│   ├── main.jsx             # Punto de entrada
│   └── index.css            # Estilos globales y tokens de diseño
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

## 🔌 API del backend

El frontend consume los siguientes endpoints del backend en `http://localhost:8080`:

| Método | Endpoint | Descripción |
|---|---|---|
| `POST` | `/upload` | Sube un PDF y devuelve el resultado del análisis |
| `GET` | `/admin/reglas` | Lista todas las reglas de descuento |
| `POST` | `/admin/reglas/guardar` | Crea una nueva regla de descuento |

### Respuesta de `/upload`

```json
{
  "factura": "12345",
  "codigo": "PPX-001",
  "marca": "MARCA",
  "descuentoAplicado": 35,
  "descuentoEsperado": 40,
  "esCorrecto": false,
  "mensaje": "El descuento aplicado no coincide con el esperado."
}
```

### Cuerpo de `/admin/reglas/guardar`

```json
{
  "prefijo": "PPX",
  "marca": "MARCA",
  "descuento_esperado": 40.00,
  "descripcion": "Notas opcionales"
}
```

---

Cabot Invoice Auditor © 2026
