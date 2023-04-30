import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

import s from "./admin.module.scss";

const initialId = Date.now();

export const AdminPage = () => {
  const navigate = useNavigate();
  const initStreamData = JSON.parse(localStorage.getItem("streamData") || "null")

  const [playersValues, setPlayersValues] = useState<any>(initStreamData ?
    initStreamData.players.reduce((acc: any, el: any) => ({
      ...acc,
      [el.id]: {
        name: el.name,
        points: el.points
      }
    }), {})
    : {
      [initialId]: {
        name: "",
        points: "0"
      }
    });
  const [players, setPlayers] = useState<{ id: string | number }[]>(initStreamData
    ? initStreamData.players.map((el: any) => ({id: el.id}))
    : [{id: initialId}]);
  const addPlayer = () => {
    const newId = Date.now();
    setPlayersValues((prev: any) => ({
      ...prev,
      [newId]: {
        name: "",
        points: "0"
      }
    }));
    setPlayers(prev => [...prev, {
      id: newId,
    }]);
  };
  const updateValues = async () => {
    const playersData = players.map(el => ({
      ...el,
      ...playersValues[el.id]
    }))
    localStorage.setItem("streamData", JSON.stringify({
      players: playersData
    }))
    setPlayersValues(
      playersData.reduce((acc: any, el: any) => ({
        ...acc,
        [el.id]: {
          name: el.name,
          points: el.points
        }
      }), {})
    )
  }
  const updatePlayerValue = (id: string | number) => {
  }
  const isDisableSave = initStreamData ? (() => {
    return JSON.stringify(initStreamData.players.reduce((acc: any, el: any) => ({
      ...acc,
      [el.id]: {
        name: el.name,
        points: el.points
      }
    }), {})) === JSON.stringify(playersValues)
  })() : false

  return (
    <>
      <header className="_container">
        <nav className={s.header}>
          <a className="button" href="/" onClick={(e) => {
            e.preventDefault();
            navigate("/");
          }}>Back</a>
        </nav>
      </header>
      <main>
        <section className="_container">
          <h1>Create Players </h1>
          <div className={s.title}>
            <h2>Name</h2>
            <h2>Points</h2>
          </div>
          <div className={s.players}>
            {
              players.map(({id}) => (
                <CreatePlayer
                  key={id}
                  name={playersValues[id].name}
                  setName={(newName) => {
                    setPlayersValues(((prev: any) => ({
                      ...prev,
                      [id]: {
                        ...prev[id],
                        name: newName,
                      }
                    })));
                  }}
                  points={playersValues[id].points}
                  setPoints={(newPoints) => {
                    setPlayersValues(((prev: any) => ({
                      ...prev,
                      [id]: {
                        ...prev[id],
                        points: newPoints,
                      }
                    })));
                  }}
                  onDelete={() => {
                    setPlayers(prev => prev.filter(el => el.id !== id));
                    setPlayersValues((prev: any) => ({...prev, [id]: undefined}))
                  }}
                  onUpdate={() => updatePlayerValue(id)}
                />
              ))
            }
          </div>
          <button className={`button ${s.add}`} onClick={addPlayer}>Add player</button>
          <button className={`button ${isDisableSave ? s.disable : ""}`} onClick={updateValues}>Save changes to game
          </button>
        </section>

      </main>
    </>
  );
};

const CreatePlayer = ({onDelete, setName, name, points, setPoints, onUpdate}: {
  name: string
  points: string
  setName: (newName: string) => void
  setPoints: (newName: string) => void
  onDelete: () => void
  onUpdate: () => void
}) => {
  return (
    <div className={s.player}>
      <input type="text" placeholder="Please enter name" value={name} onChange={(e) => setName(e.currentTarget.value)}
             className={s.input}/>
      <input type="text" placeholder="Please enter points" value={points}
             onChange={(e) => setPoints(e.currentTarget.value)}
             className={s.input}/>
      <button className={`button ${s.delete}`} onClick={onDelete}>Delete</button>
      {/*<button className="button" style={{minWidth: 200}} onClick={onUpdate}>Update in game</button>*/}
    </div>
  );
};