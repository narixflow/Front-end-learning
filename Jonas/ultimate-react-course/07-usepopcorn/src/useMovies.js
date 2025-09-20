import { useEffect, useState } from "react";

const KEY = "535cce46";

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // if want to fetch data as soon as the application first loads / on mount:
  useEffect(
    function () {
      // Equals to:

      // if (typeof callback === "function") {
      //   callback();
      // }

      // If callback exists, call it
      // But an error about dependency array will occur, don't add callbac for now
      // callback?.();

      // A brower api, clean up data fetching to deal with race condition
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          // Always reset the error before start fetching for data
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );

          // Error handling
          if (!res.ok)
            throw new Error("Something went wrong with fetchin movies");

          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not found");
          setMovies(data.Search);
          setError("");
          // set state doesn't happen immediately, so cl output nothing
          // console.log(data.Search);
        } catch (err) {
          if (err.name !== "AbortError") {
            console.log(err.message);
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }
      // if short query length
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

      fetchMovies();

      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return { movies, isLoading, error };
}
