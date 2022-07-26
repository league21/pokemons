import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Pokemon } from "./interface";
import { PokemonColection } from "./components/PokemonCollection";

interface Pokemons {
  name: string;
  url: string;
}

export interface Detail {
  id: number;
  isOpened: boolean;
}

const url = "https://pokeapi.co/api/v2/pokemon";


const App: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [nextUrl, setNextUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [viewDetail, setDetail] = useState<Detail>({
    id: 0,
    isOpened: false,
  });
  useEffect(() => {
    const getPokemon = async () => {
      const res = await axios.get(
        `${url}?limit=20&offset=20`
      );
      setNextUrl(res.data.next);
      res.data.results.forEach(async (pokemon: Pokemons) => {
        const poke = await axios.get(
          `${url}/${pokemon.name}`
        );
        setPokemons((p) => [...p, poke.data]);
        setLoading(false);
      });
    };
    getPokemon();
  }, []);

  const nextPage = async () => {
    setLoading(true);
    let res = await axios.get(nextUrl);
    setNextUrl(res.data.next);
    res.data.results.forEach(async (pokemon: Pokemons) => {
      const poke = await axios.get(
        `${url}/${pokemon.name}`
      );
      setPokemons((p) => [...p, poke.data]);
      setLoading(false);
    });
  };

  return (
    <div className="App">
      <div className="container">
        <header className="pokemon-header">Pokemons</header>
        <PokemonColection
          pokemons={pokemons}
          viewDetail={viewDetail}
          setDetail={setDetail}
        />
        {!viewDetail.isOpened && (
          <div className="btn">
            <button onClick={nextPage}>
              {loading ? "Loading..." : "Load more"}{" "}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
