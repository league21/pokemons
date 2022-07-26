import { Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Detail } from "../../App";
import styles from './style.module.scss';

interface PokemonListProps {
  viewDetail: Detail;
  setDetail: React.Dispatch<React.SetStateAction<Detail>>;
  abilities:
    | {
        name: string;
        ability: string;
      }[]
    | undefined;
  name: string;
  id: number;
  image: string;
}

const PokemonList: React.FC<PokemonListProps> = ({name, id, image, abilities, viewDetail, setDetail}) => {
  const [isSelected, setSelected] = useState<boolean>(false);
  useEffect(() => {
    setSelected(id === viewDetail?.id);
  }, [viewDetail]);

  const closeDetail = () => {
    setDetail({
      id: 0,
      isOpened: false,
    });
  };

  return (
    <>
      {isSelected ? (
        <Modal open={true}>
                <section className={styles['pokemon-list__detailed']}>
                  <div className={styles['pokemon-list__detailed-container']}>
                    <p className={styles['pokemon-list__close']} onClick={closeDetail}>
                      X
                    </p>
                    <div className={styles['pokemon-list__info']}>
                      <img src={image} alt="pokemon" />
                      <p className={styles['pokemon-list__name']}> {name}</p>
                    </div>
                    <div className={styles['pokemon-list__skill']}>
                      <p className={styles['pokemon-list__abillity']}> Ablities: </p>
                      {abilities?.map((ab: any) => {
                        return <div className=""> {ab.ability.name}</div>;
                      })}
                    </div>
                  </div>
                </section>
      </Modal>
      ) : (
        <section className={styles['pokemon-list__container']}>
          <p className={styles['pokemon-list__name']}> {name} </p>
          <img src={image} alt="pokemon" />
        </section>
      )}
    </>
  );
};

export {PokemonList};
