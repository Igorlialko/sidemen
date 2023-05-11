import React from 'react';

import { IPlayer, TTimerAction } from '../../../types';
import s from '../admin.module.scss';

export const Step1 = ({
  activePlayer,
  setPrevCount,
  setNextCount,
  seconds,
  setSeconds,
  setStart,
  setReset,
  setStop,
  timerAction,
}: {
  seconds: number;
  activePlayer: IPlayer;
  setPrevCount: () => void;
  setNextCount: () => void;
  setSeconds: ({ seconds }: { seconds: number }) => void;
  setStart: () => void;
  setReset: () => void;
  setStop: () => void;
  timerAction: TTimerAction;
}) => {
  return (
    <div className={s.step1}>
      <div className={s.step1_title}>Player</div>
      <div className={s.step1_player}>
        <div className={s.activePlayer}>{activePlayer.name}</div>
        <div className={s.counter}>
          <button
            className={`button ${activePlayer.points <= 0 ? 'disabled' : ''}`}
            onClick={setPrevCount}
          >
            -
          </button>
          <div className={s.activeCount}>{activePlayer.points}</div>
          <button className='button' onClick={setNextCount}>
            +
          </button>
        </div>
      </div>
      <div className={s.step1_timer}>
        <div className={s.step1_title}>Timer</div>
        <div className={s.timer}>
          <input
            type='number'
            placeholder='Час в секундах'
            value={seconds}
            onChange={(e) =>
              setSeconds({
                seconds: +e.currentTarget.value,
              })
            }
            className={s.input}
          />
          <div className={s.controls_timer}>
            <button
              className={`button ${timerAction === 'start' ? 'active' : ''}`}
              onClick={setStart}
            >
              Старт
            </button>
            <button
              className={`button ${timerAction === 'reset' ? 'active' : ''}`}
              onClick={setReset}
            >
              Перезапустити
            </button>
            <button
              className={`button ${timerAction === 'stop' ? 'active' : ''}`}
              onClick={setStop}
            >
              Стоп
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
