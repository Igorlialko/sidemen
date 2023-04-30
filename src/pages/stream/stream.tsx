import React, {useEffect, useState} from "react";
import s from "./stream.module.scss"

export const StreamPage = () => {
  const initData = localStorage.getItem("streamData")
  const [streamData, setStreamData] = useState<any>(JSON.parse(initData || "") || {
    players: []
  })

  useEffect(() => {
    const updateStream = () => {
      setStreamData((prev: any) => {
        const data = localStorage.getItem("streamData")
        if (data) {
          return JSON.parse(data)
        }
        return prev
      })
    }
    window.addEventListener("storage", updateStream)
    return () => window.removeEventListener("storage", updateStream)
  }, [])

  return (
    <main className={s.main}>
      <section className="_container">
        <div className={s.title}>
          <h2>
            Players
          </h2>
          <h2>
            Points
          </h2>
        </div>
        <div className={s.players}>
          {
            streamData.players.map(({id, name, points}: any) => (
              <div className={s.player} key={id}>
                <div className={s.name}>{name}</div>
                <div className={s.points}>{points}</div>
              </div>
            ))
          }
        </div>
      </section>
    </main>
  );
};
