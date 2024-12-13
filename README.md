# ReactObjectsRenderer

ReactObjectsRenderer es una biblioteca para React que permite generar dinámicamente interfaces de usuario a partir de estructuras de datos definidas como objetos JavaScript, listas de objetos o archivos JSON. Esta herramienta es ideal para crear aplicaciones con configuraciones de interfaz predefinidas.

## Instalación

Para instalar este paquete, asegúrate de tener Node.js y npm configurados en tu entorno. Luego, ejecuta:

```bash
npm install react-objects-renderer
```

## Uso

### Importación

Primero, importa el módulo en tu archivo:

```jsx
import ReactObjectsRenderer from "react-objects-renderer";
```

### Estructura de Datos

El componente espera una estructura de datos con el siguiente formato:

```javascript
const data = [
  {
    type: "div", // Componente raíz
    attributes: { className: "container", style: { padding: "10px" } }, // Atributos del div
    children: [
      {
        type: "h1", // Subcomponente tipo h1
        attributes: { style: { color: "blue" } }, // Estilo aplicado
        content: "¡Hola, mundo!", // Contenido textual
      },
      {
        type: "button", // Subcomponente tipo botón
        attributes: {
          onClick: "handleClick", // Evento asociado al botón
          style: { marginTop: "10px" }, // Estilo del botón
        },
        content: "Haz clic aquí", // Texto del botón
      },
    ],
  },
];

const functionMap = {
  handleClick: () => alert("Botón clicado"),
};
```

### Renderización

Usa el componente en tu aplicación de esta forma:

```jsx
import React from "react";
import ReactObjectsRenderer from "react-objects-renderer";

const App = () => {
  const data = [
    /* estructura de objetos */
  ];
  const functionMap = {
    /* mapa de funciones */
  };

  return <ReactObjectsRenderer data={data} functionMap={functionMap} />;
};

export default App;
```

### Modo Edición

Para habilitar el modo edición, proporciona las propiedades `editMode` y `editModeHandler`:

```jsx
<ReactObjectsRenderer
  data={data}
  functionMap={functionMap}
  editMode={true}
  editModeHandler={(event, component) => {
    console.log("Editar componente:", component);
    alert(`Se editó el componente ${component.type}`);
  }}
/>
```

## API

### Props de `ReactObjectsRenderer`

| Propiedad         | Tipo                         | Descripción                                                       |
| ----------------- | ---------------------------- | ----------------------------------------------------------------- |
| `data`            | `Array<ComponentData>`       | Arreglo de objetos que define los componentes a renderizar.       |
| `editMode`        | `boolean`                    | (Opcional) Activa el modo edición. Por defecto: `false`.          |
| `editModeHandler` | `(event, component) => void` | (Opcional) Callback para manejar eventos en modo edición.         |
| `functionMap`     | `Object<string, function>`   | (Opcional) Mapa de funciones para manejar eventos como `onClick`. |

### Formato de `ComponentData`

| Campo        | Tipo                   | Descripción                                         |
| ------------ | ---------------------- | --------------------------------------------------- |
| `type`       | `string`               | Tipo de elemento HTML o nombre de componente React. |
| `attributes` | `ComponentAttribute`   | (Opcional) Atributos del componente.                |
| `content`    | `string`               | (Opcional) Contenido textual.                       |
| `children`   | `Array<ComponentData>` | (Opcional) Lista de componentes hijos.              |
| `uniqueKey`  | `string`               | Clave única generada automáticamente.              |

### Formato de `ComponentAttribute`

| Campo   | Tipo     | Descripción                              |
| ------- | -------- | ---------------------------------------- |
| `style` | `Object` | (Opcional) Estilos CSS.                  |
| Otros   | `Object` | Otros atributos estándar o eventos HTML. |

## Ejemplo Completo

```jsx
import React from "react";
import ReactObjectsRenderer from "react-objects-renderer";

const data = [
  {
    type: "div",
    attributes: { className: "box", style: { border: "1px solid #000" } },
    children: [
      {
        type: "p",
        content: "Este es un párrafo dentro de un div.",
      },
      {
        type: "button",
        attributes: { onClick: "handleButtonClick" },
        content: "Haz clic aquí",
      },
    ],
  },
];

const functionMap = {
  handleButtonClick: () => alert("Botón presionado"),
};

const App = () => (
  <ReactObjectsRenderer data={data} functionMap={functionMap} />
);

export default App;
```

## Contribuciones

Si deseas contribuir a este proyecto, por favor abre un issue o envía un pull request en el repositorio oficial.

## Licencia

Este proyecto está bajo la licencia Apache Version 2.0. Consulta el archivo [LICENSE](./LICENSE) para más detalles.

