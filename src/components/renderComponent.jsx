import React from "react";

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
 * Función callback para manejar el evento en modo edición.
 *
 * @callback EditModeHandler
 * @param {React.MouseEvent} event - Evento de click.
 * @param {ComponentData} component - Componente sobre el que se hace click.
 */

/**
 * Renderiza de forma recursiva un componente y sus hijos.
 *
 * @param {ComponentData} component - Objeto que representa el componente a renderizar.
 * @param {boolean} [editMode=false] - Indica si estamos en modo edición.
 * @param {EditModeHandler} [editModeHandler] - Función callback para manejar eventos en modo edición.
 * @param {Object<string,function>} [functionMap] - Mapa opcional de funciones para atributos tipo `onClick`.
 * @returns {React.ReactNode} Nodo React renderizado.
 */
const renderComponent = (
  component,
  editMode = false,
  editModeHandler,
  functionMap = {}
) => {
  const {
    type,
    attributes = {},
    content,
    children = [],
    uniqueKey,
  } = component;

  if (!uniqueKey) {
    console.error(`El componente de tipo '${type}' no tiene 'uniqueKey'.`);
    throw new Error(`Todos los componentes deben tener un 'uniqueKey' único.`);
  }

  const { style = {}, ...restAttributes } = attributes;
  const eventHandlers = {};

  if (editMode) {
    restAttributes.className =
      (restAttributes.className || "") + " editable-component";
  } else {
    // Modo normal: asignar funciones desde functionMap
    Object.keys(attributes).forEach((attrKey) => {
      if (attrKey.startsWith("on")) {
        const eventName = attrKey;
        const handlerName = attributes[attrKey];
        const handlerFunction = functionMap[handlerName];

        if (typeof handlerFunction === "function") {
          eventHandlers[eventName] = handlerFunction;
        } else {
          console.warn(
            `La función '${handlerName}' no está definida en functionMap.`
          );
        }
      }
    });
  }

  const childElements = [];
  if (content) {
    childElements.push(content);
  }
  if (children && children.length > 0) {
    childElements.push(
      ...children.map((child) =>
        renderComponent(child, editMode, editModeHandler, functionMap)
      )
    );
  }

  return React.createElement(
    type,
    {
      key: uniqueKey,
      "data-unique-key": uniqueKey,
      ...restAttributes,
      style,
      ...eventHandlers,
    },
    ...childElements
  );
};

export default renderComponent;
