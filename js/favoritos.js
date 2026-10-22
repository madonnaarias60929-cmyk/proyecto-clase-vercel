// js/favoritos.js · El ÚNICO archivo que toca localStorage. Ni una línea de DOM.
// localStorage solo guarda TEXTO: los objetos entran con JSON.stringify y salen con JSON.parse.
const CLAVE = 'multiverso:favoritos';   // el nombre del "cajón" (míralo en DevTools → Application)
// Lee la lista guardada. Siempre devuelve un array, pase lo que pase.
export const leerFavoritos = () => {
  try {
    // getItem devuelve null la primera vez (la clave no existe): ?? '[]' lo cambia por un array vacío
    const lista = JSON.parse(localStorage.getItem(CLAVE) ?? '[]');
    return Array.isArray(lista) ? lista : [];   // por si alguien guardó algo que no es un array
  } catch {
    // JSON.parse lanza un error si el texto está corrupto: empezamos de cero en vez de romper la app
    return [];
  }
};
// Guarda la lista completa. Sin stringify se guardaría el texto "[object Object]".
export const guardarFavoritos = (lista) => {
  localStorage.setItem(CLAVE, JSON.stringify(lista));
};
// some: ¿ALGUNO cumple? Devuelve true o false
export const esFavorito = (lista, id) => lista.some((f) => f.id === id);
// Si ya estaba, lo quita (filter); si no, lo agrega al final (spread). Siempre un array NUEVO.
// Guardamos el personaje COMPLETO, no solo el id: así la vista de favoritos funciona sin red.
export const alternarFavorito = (lista, personaje) =>
  esFavorito(lista, personaje.id)
    ? lista.filter((f) => f.id !== personaje.id)
    : [...lista, personaje];