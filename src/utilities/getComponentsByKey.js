const getComponentByKey = (components, uniqueKey) => {
  for (const component of components) {
    if (component.uniqueKey === uniqueKey) {
      return component;
    }
    if (component.children && component.children.length > 0) {
      const result = getComponentByKey(component.children, uniqueKey);
      if (result) return result;
    }
  }
  return null;
};

export default getComponentByKey;
