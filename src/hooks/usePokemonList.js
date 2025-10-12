import { useState, useEffect, useCallback, useRef } from "react";
import { getPokemonList } from "../services/getPokemonList";

export function usePokemonList() {
  const [state, setState] = useState({
    error: { isError: false },
    loading: true,
    loadingNextPage: false,
    pokemonList: [],
    nextUrl: "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=30",
    hasMore: true,
  });
  const isLoadingRef = useRef(false);

  const loadNextPage = useCallback(async () => {
    if (isLoadingRef.current || !state.nextUrl) return;

    isLoadingRef.current = true;
    setState(prevState => ({ ...prevState, loadingNextPage: true }));

    try {
      const { pokemon, nextUrl } = await getPokemonList(state.nextUrl);
      setState(prevState => ({
        ...prevState,
        loading: false,
        loadingNextPage: false,
        pokemonList: [...prevState.pokemonList, ...pokemon],
        nextUrl: nextUrl,
        hasMore: nextUrl !== null,
      }));
    } catch (error) {
      setState(prevState => ({
        ...prevState,
        loading: false,
        loadingNextPage: false,
        error: { isError: true, ...error },
      }));
    } finally {
      isLoadingRef.current = false;
    }
  }, [state.nextUrl]);

  useEffect(() => {
    loadNextPage();
  }, []);

  return { state, loadNextPage };
}
