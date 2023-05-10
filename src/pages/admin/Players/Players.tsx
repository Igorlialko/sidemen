import React, { useState } from 'react';

import { IPlayer } from '../../../types';
import s from '../admin.module.scss';

export const Players = ({
  initialPlayers,
  setPlayersValues,
  setPlayerName,
  playersValues,
  setPlayerPoints,
  deletePlayersValues,
}: {
  playersValues: {
    [activePlayerId: string | number]: IPlayer;
  };
  initialPlayers: any;
  setPlayersValues: ({
    playerId,
    playerObj,
  }: {
    playerId: number | string;
    playerObj: IPlayer;
  }) => void;
  setPlayerName: ({ playerId, name }: { playerId: number | string; name: string }) => void;
  setPlayerPoints: ({ playerId, points }: { playerId: number | string; points: string }) => void;
  deletePlayersValues: ({ playerId }: { playerId: number | string }) => void;
}) => {
  const [players, setPlayers] = useState<{ id: string | number }[]>(initialPlayers);
  const addPlayer = () => {
    const newId = Date.now();
    setPlayersValues({
      playerId: newId,
      playerObj: {
        id: newId,
        name: '',
        points: '0',
        gold: '0',
      },
    });
    setPlayers((prev) => [
      ...prev,
      {
        id: newId,
      },
    ]);
  };
  const updatePlayerValue = (id: string | number) => {
    //===
  };
  return (
    <>
      <p className={s.h1}>Create Players </p>
      <div className={s.title}>
        <p className={s.h2}>Name</p>
        <p className={s.h2}>Points</p>
      </div>
      <div className={s.players}>
        {players.map(({ id }) => (
          <CreatePlayer
            key={id}
            name={playersValues[id]?.name || ''}
            setName={(newName) => {
              setPlayerName({ playerId: id, name: newName });
            }}
            points={playersValues[id]?.points || '0'}
            setPoints={(newPoints) => {
              setPlayerPoints({ playerId: id, points: newPoints });
            }}
            onDelete={() => {
              setPlayers((prev) => prev.filter((el) => el.id !== id));
              deletePlayersValues({
                playerId: id,
              });
            }}
            onUpdate={() => updatePlayerValue(id)}
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
  setPoints,
  onUpdate,
}: {
  name: string;
  points: string;
  setName: (newName: string) => void;
  setPoints: (newName: string) => void;
  onDelete: () => void;
  onUpdate: () => void;
}) => {
  return (
    <div className={s.player}>
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
        onChange={(e) => setPoints(e.currentTarget.value)}
        className={s.input}
      />
      <button className={`button ${s.delete}`} onClick={onDelete}>
        Delete
      </button>
      {/*<button className="button" style={{minWidth: 200}} onClick={onUpdate}>Update in game</button>*/}
    </div>
  );
};
