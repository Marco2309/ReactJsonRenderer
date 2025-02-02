import React from "react";
import renderComponent from "./renderComponent";
import generateUniqueKeys from "../utilities/generateUniqueKeys.js";
import getComponentByKey from "../utilities/getComponentsByKey.js";

/**
 * @typedef {Object} ComponentAttribute
 * @property {Object} [style] - Objeto de estilo CSS (opcional).
 *
 * Además de `style`, `attributes` puede contener:
 * - Atributos HTML estándar (`className`, `id`, etc.).
 * - Propiedades que comiencen con `on` (ej: `onClick`) cuyo valor es una
 *   cadena que mapea a una función en `functionMap`.
 */

/**
 * @typedef {Object} ComponentData
 * @property {string} type - Tipo de elemento HTML o nombre de un componente React.
 * @property {ComponentAttribute} [attributes] - Atributos del componente.
 * @property {string} [content] - Contenido textual.
 * @property {Array<ComponentData>} [children] - Lista de componentes hijos.
 * @property {string} [uniqueKey] - Clave única generada internamente.
 */

/**
 * Renderizador genérico de una jerarquía de componentes React a partir de una estructura JSON.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {Array<ComponentData>} props.data - Estructura de datos con los componentes.
 * @param {boolean} [props.editMode=false] - Indica si se renderiza en modo edición.
 * @param {EditModeHandler} [props.editModeHandler] - Función opcional para manejar el evento en modo edición.
 * @param {Object<string,function>} [props.functionMap={}] - Mapa de funciones para los eventos.
 */
const ReactObjectsRenderer = ({
  data,
  editMode = false,
  editModeHandler,
  functionMap = {},
}) => {
  const componentsWithKeys = generateUniqueKeys(data);
  // Handler global para clicks en modo edición
  const handleGlobalClick = (event) => {
    if (!editMode) return; // Solo actúa en modo edición
    const clickedElement = event.target.closest("[data-unique-key]");
    if (clickedElement) {
      const uniqueKey = clickedElement.getAttribute("data-unique-key");
      const componentData = getComponentByKey(data, uniqueKey);
      if (typeof editModeHandler === "function") {
        editModeHandler(event, componentData || { uniqueKey });
      }
    }
  };
  return (
    <div onClick={handleGlobalClick}>
      {componentsWithKeys.map((component) => (
        <React.Fragment key={component.uniqueKey}>
          {renderComponent(component, editMode, editModeHandler, functionMap)}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ReactObjectsRenderer;
