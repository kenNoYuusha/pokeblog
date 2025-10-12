import { useState, useEffect } from "react"
import { getPokemonList } from "../services/getPokemonList"

export function usePokemonList(){

  const url = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=30"
 
  const [state, setState] = useState({
    error: { isError: false },
    loading: true,
    display: true,
    pokemonList: [],
  });

  useEffect(() => {

    getPokemonList(url)
      .then(result => {
        setState({
          ...state,
          loading: false,
          pokemonList: result,
        });
      })
      .catch(error => {
        setState({
          ...state,
          error: { isError: true, ...error },
        });
      })
      
  },[])

  return { state }
}


