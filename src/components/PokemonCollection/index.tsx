import React from "react";
import cn from 'classnames';
import { PokemonDetail } from "../../interface";
import { Detail } from "../../App";
import styles from './style.module.scss';
import { PokemonList } from "../PokemonList";

interface PokemonColectionProps {
  pokemons: PokemonDetail[];
  viewDetail: Detail;
  setDetail: React.Dispatch<React.SetStateAction<Detail>>;
}

const PokemonColection: React.FC<PokemonColectionProps> = ({pokemons, viewDetail, setDetail}) => {

  const selectPokemon = (id: number): void => {
    if (!viewDetail.isOpened) {
      setDetail({
        id: id,
        isOpened: true,
      });
    }
  };

  return (
      <section
        className={
          cn(
            styles['pokemon-collection__container'],
            {[styles['pokemon-collection__container-active']]: viewDetail.isOpened}
          )
        }
      >
        {pokemons.map((pokemon) => (
            <div onClick={() => selectPokemon(pokemon.id)}>
              <PokemonList
                viewDetail={viewDetail}
                setDetail={setDetail}
                key={pokemon.id}
                name={pokemon.name}
                id={pokemon.id}
                abilities={pokemon.abilities}
                image={pokemon.sprites.front_default}
              />
          </div>
        ))}
      </section>
  );
};

export {PokemonColection};
