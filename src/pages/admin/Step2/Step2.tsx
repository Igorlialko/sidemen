import React from 'react';

import money from '../../../assets/image/price.png';
import { IPlayer, TActiveGold } from '../../../types';
import s from '../admin.module.scss';

export const Step2 = ({
  activePlayer,
  setPrevExpertPosition,
  setNextExpertPosition,
  setPrevActivePlayerPosition,
  setNextActivePlayerPosition,
  setExpertGoldPrev,
  setExpertGoldNext,
  setStartGold,
  setActiveGold,
}: {
  activePlayer: IPlayer;
  setPrevExpertPosition: () => void;
  setNextExpertPosition: () => void;
  setPrevActivePlayerPosition: () => void;
  setNextActivePlayerPosition: () => void;
  setExpertGoldPrev: ({ expertGoldPrev }: { expertGoldPrev: number }) => void;
  setExpertGoldNext: ({ expertGoldNext }: { expertGoldNext: number }) => void;
  setStartGold: ({ startGold }: { startGold: number }) => void;
  setActiveGold: ({ activeGold, position }: { activeGold: TActiveGold; position: number }) => void;
}) => {
  return (
    <div className={s.step1}>
      <div className={s.step1_timer}>
        <div className={s.activePlayer}>
          Кількість монет , яка помножиться на число відповідей кроку 1 =
          <strong>{activePlayer.points}</strong>
        </div>
        <div className={s.step2_input}>
          <input
            type='number'
            placeholder='Кількість монет ближча до експерта'
            value={activePlayer.expertGoldPrev}
            onChange={(e) =>
              setExpertGoldPrev({
                expertGoldPrev: +e.currentTarget.value,
              })
            }
            className={s.input}
          />
          <div className={s.counter}>
            <div className={s.activeCount}>{`Результат: ${
              activePlayer.expertGoldPrev * activePlayer.points
            }`}</div>
            <img src={money} alt='gold' />
            <button
              className={`button ${activePlayer.activeGold === 'expertGoldPrev' ? 'active' : ''}`}
              onClick={() => {
                setActiveGold({ activeGold: 'expertGoldPrev', position: 2 });
              }}
            >
              Active
            </button>
          </div>
        </div>
        <div className={s.step2_input}>
          <input
            type='number'
            placeholder='Кількість монет гравця'
            value={activePlayer.startGold}
            onChange={(e) =>
              setStartGold({
                startGold: +e.currentTarget.value,
              })
            }
            className={s.input}
          />
          <div className={s.counter}>
            <div className={s.activeCount}>{`Результат: ${
              activePlayer.startGold * activePlayer.points
            }`}</div>
            <img src={money} alt='gold' />
            <button
              className={`button ${activePlayer.activeGold === 'startGold' ? 'active' : ''}`}
              onClick={() => {
                setActiveGold({ activeGold: 'startGold', position: 3 });
              }}
            >
              Active
            </button>
          </div>
        </div>
        <div className={s.step2_input}>
          <input
            type='number'
            placeholder='Кількість монет далі від експерта'
            value={activePlayer.expertGoldNext}
            onChange={(e) =>
              setExpertGoldNext({
                expertGoldNext: +e.currentTarget.value,
              })
            }
            className={s.input}
          />
          <div className={s.counter}>
            <div className={s.activeCount}>{`Результат: ${
              activePlayer.expertGoldNext * activePlayer.points
            }`}</div>
            <img src={money} alt='gold' />
            <button
              className={`button ${activePlayer.activeGold === 'expertGoldNext' ? 'active' : ''}`}
              onClick={() => {
                setActiveGold({ activeGold: 'expertGoldNext', position: 4 });
              }}
            >
              Active
            </button>
          </div>
        </div>
      </div>
      <div className={s.step1_title}>Expert</div>
      <div className={s.step1_player}>
        <div className={s.activePlayer}>Position:</div>
        <div className={s.counter}>
          <button
            className={`button ${activePlayer.expertPosition <= 0 ? 'disabled' : ''}`}
            onClick={setPrevExpertPosition}
          >
            -
          </button>
          <div className={s.activeCount}>{activePlayer.expertPosition}</div>
          <button
            className={`button ${activePlayer.expertPosition >= 7 ? 'disabled' : ''}`}
            onClick={setNextExpertPosition}
          >
            +
          </button>
        </div>
      </div>
      <p className={s.step1_title}>{`Player : ${activePlayer.name}`}</p>
      <div className={s.step1_player}>
        <div className={s.activePlayer}>Position:</div>
        <div className={s.counter}>
          <button
            className={`button ${activePlayer.position <= 1 ? 'disabled' : ''}`}
            onClick={setPrevActivePlayerPosition}
          >
            -
          </button>
          <div className={s.activeCount}>{activePlayer.position}</div>
          <button
            className={`button ${activePlayer.position >= 7 ? 'disabled' : ''}`}
            onClick={setNextActivePlayerPosition}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};
