import { getMultipleResourcesConcurrency } from "../utilities/getMultipleResources"
export async function getPokemonList(url) {
  
  try {
    const response = await fetch(url);
    if(!response.ok){
      throw new Error(`HTTP: ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
    const urls = data.results.map(obj => obj.url);

    const superData = await getMultipleResourcesConcurrency(urls, 5);
    const mappedData = superData.exitosas.map(obj => {
      const newObj = {
        id: obj.data.id,
        name: obj.data.name,
        stats: obj.data.stats,
        type: obj.data.types,
        height: obj.data.height,
        weight: obj.data.weight,
        img: obj.data.sprites.other["official-artwork"].front_default,
        imgShiny: obj.data.sprites.other["official-artwork"].front_shiny
      }
      return newObj
    })
    return { pokemon: mappedData, nextUrl: data.next }

  } catch(error) {
    throw error
  }
}



