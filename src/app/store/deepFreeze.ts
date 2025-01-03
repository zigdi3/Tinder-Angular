function deepFreeze(obj: any) {
  Object.freeze(obj);
  Object.getOwnPropertyNames(obj).forEach((prop) => {
    if (
      obj.hasOwnProperty(prop) &&
      obj[prop] !== null &&
      typeof obj[prop] === 'object' &&
      !Object.isFrozen(obj[prop])
    ) {
      deepFreeze(obj[prop]);
    }
  });
  return obj;
}
export default function freezeState(store: any) {
  return (next: any) => (action: any) => {
    const state = store.getState();
    deepFreeze(state);
    return next(action);
  };
}
