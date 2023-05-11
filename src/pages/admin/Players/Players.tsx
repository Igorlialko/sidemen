import React, { useState } from 'react';

import { IPlayer, TActivatedGold } from '../../../types';
import s from '../admin.module.scss';

export const Players = ({
  initialPlayers,
  setPlayersValues,
  setPlayerName,
  playersValues,
  deletePlayersValues,
  activePlayerId,
  setActivePlayerId,
}: {
  playersValues: {
    [activePlayerId: string | number]: IPlayer;
  };
  activePlayerId: string | number;
  initialPlayers: any;
  setPlayersValues: ({
    playerId,
    playerObj,
  }: {
    playerId: number | string;
    playerObj: IPlayer;
  }) => void;
  setPlayerName: ({ playerId, name }: { playerId: number | string; name: string }) => void;
  deletePlayersValues: ({ playerId }: { playerId: number | string }) => void;
  setActivePlayerId: ({ playerId }: { playerId: number | string }) => void;
}) => {
  const [players, setPlayers] = useState<{ id: string | number }[]>(initialPlayers);
  const addPlayer = () => {
    const newId = Date.now();
    setPlayersValues({
      playerId: newId,
      playerObj: {
        id: newId,
        name: '',
        points: 0,
        expertPosition: 0,
        position: 3,
        gold: 0,
        startGold: 100,
        expertGoldPrev: 0,
        expertGoldNext: 0,
        activeGold: 'wait',
      },
    });
    setPlayers((prev) => [
      ...prev,
      {
        id: newId,
      },
    ]);
  };

  return (
    <>
      <p className={s.h1}>Create Players </p>
      <div className={s.title}>
        <p className={s.h2}>Name</p>
        <p className={s.h2}>Gold</p>
      </div>
      <div className={s.players}>
        {players.map(({ id }) => (
          <CreatePlayer
            key={id}
            name={playersValues[id]?.name || ''}
            setName={(newName) => {
              setPlayerName({ playerId: id, name: newName });
            }}
            setActive={() => setActivePlayerId({ playerId: id })}
            isActive={activePlayerId === id}
            points={
              playersValues[id].position === 7
                ? playersValues[id].points *
                  playersValues[id][playersValues[id].activeGold as TActivatedGold]
                : 0
            }
            onDelete={() => {
              setPlayers((prev) => prev.filter((el) => el.id !== id));
              deletePlayersValues({
                playerId: id,
              });
            }}
          />
        ))}
      </div>
      <button className={`button ${s.add}`} onClick={addPlayer}>
        Add player
      </button>
    </>
  );
};

const CreatePlayer = ({
  onDelete,
  setName,
  name,
  points,
  isActive,
  setActive,
}: {
  name: string;
  points: number;
  setName: (newName: string) => void;
  setActive: () => void;
  onDelete: () => void;
  isActive: boolean;
}) => {
  return (
    <div className={s.player}>
      <button className={`button ${isActive ? 'active' : ''}`} onClick={setActive}>
        Active
      </button>
      <input
        type='text'
        placeholder='Please enter name'
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
        className={s.input}
      />
      <input
        type='text'
        placeholder='Please enter points'
        value={points}
        disabled
        className={s.input}
      />
      <button className={`button ${s.delete}`} onClick={onDelete}>
        Delete
      </button>
    </div>
  );
};
