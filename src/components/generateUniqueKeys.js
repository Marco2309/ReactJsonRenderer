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
 * Genera claves únicas (`uniqueKey`) para todos los componentes en la jerarquía.
 *
 * @param {Array<ComponentData>} components - Lista de componentes.
 * @param {string} [prefix='component'] - Prefijo para las claves únicas.
 * @returns {Array<ComponentData>} Componentes con `uniqueKey` generados.
 */
const generateUniqueKeys = (components, prefix = "component") => {
  return components.map((component, index) => {
    const uniqueKey = `${prefix}_${index + 1}`;
    return {
      ...component,
      uniqueKey,
      children: component.children
        ? generateUniqueKeys(component.children, uniqueKey)
        : [],
    };
  });
};

export default generateUniqueKeys;
