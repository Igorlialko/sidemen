import React from 'react';

import money from '../../assets/image/price.png';
import { TActivatedGold } from '../../types';
import { getGold, getScore } from '../../utils';
import s from './stream.module.scss';
import { useGetStreamData } from './useGetStreamData';
import { useTimer } from './useTimer';

export const StreamPage = () => {
  const streamData = useGetStreamData();
  const time = useTimer(streamData);

  return (
    <main className={s.main}>
      <section className='_container'>
        <div className={`${s.container} ${s[streamData.activeStep]}`}>
          <h1 className={s.title}>
            {'ПОГОНЯ'.split('').map((el, index) => (
              <span key={index}>{el}</span>
            ))}
          </h1>
          {streamData.activeStep === 'step1' && (
            <>
              <div className={s.player}>
                <p>{streamData.players[streamData.activePlayerId].name}</p>
                <p>{streamData.players[streamData.activePlayerId].points}</p>
              </div>
              <div className={s.timer}>
                <div className={s.minutes}>{time.mm}</div>
                <div className={s.points}>:</div>
                <div className={s.seconds}>{time.ss}</div>
              </div>
            </>
          )}
          {streamData.activeStep === 'step2' && (
            <div className={s.road}>
              {Array.from({ length: 7 }, (_, index) => {
                let isRed = false;
                let isPlayer = false;
                let isGameOver = false;
                let isWinner = false;
                let text = '';
                if (index === 0) {
                  text = '🥴';
                }
                if (index === 1) {
                  text = ' 🤪';
                }
                if (index === 2) {
                  text = ' 😋';
                }
                if (index === 3) {
                  text = '😜';
                }
                if (index === 4) {
                  text = '🥸';
                }
                if (index === 5) {
                  text = '🤩';
                }
                if (index === 6) {
                  text = '🥳';
                }
                if (streamData.players[streamData.activePlayerId].activeGold === 'wait') {
                  if (index === 1) {
                    text = `${streamData.players[streamData.activePlayerId].expertGoldPrev}`;
                  }
                  if (index === 2) {
                    text = `${
                      streamData.players[streamData.activePlayerId].startGold *
                      streamData.players[streamData.activePlayerId].points
                    }`;
                  }
                  if (index === 3) {
                    text = `${streamData.players[streamData.activePlayerId].expertGoldNext}`;
                  }
                } else {
                  if (index === streamData.players[streamData.activePlayerId].position - 1) {
                    text = `${getScore(streamData.players[streamData.activePlayerId])}`;
                    isPlayer = true;
                  }
                  if (index <= streamData.players[streamData.activePlayerId].expertPosition - 1) {
                    isRed = true;
                    text = '😎';
                  }
                  if (streamData.players[streamData.activePlayerId].position === 8) {
                    isRed = false;
                    isPlayer = false;
                    isWinner = true;
                    text = '🏆';
                  }
                  if (
                    streamData.players[streamData.activePlayerId].expertPosition ===
                    streamData.players[streamData.activePlayerId].position
                  ) {
                    isRed = false;
                    isPlayer = false;
                    isGameOver = true;
                    text = '😵';
                  }
                }

                return (
                  <div
                    className={`${isRed ? s.red : ''} ${isPlayer ? s.isPlayer : ''} ${
                      isWinner ? s.isWinner : ''
                    } ${isGameOver ? s.isGameOver : ''}`}
                    key={index}
                  >
                    {text}
                  </div>
                );
              })}
            </div>
          )}
          {streamData.activeStep === 'result' && (
            <div className={s.cards}>
              {Object.values(streamData.players)
                .sort((a, b) => {
                  a.gold = getGold(a);
                  b.gold = getGold(b);
                  return b.gold - a.gold;
                })
                .map((el) => (
                  <div key={el.id} className={s.card}>
                    <div className={s.name}>{el.name}</div>
                    <div className={s.price}>
                      <span>{formatPrice(el.gold)}</span>
                      <img src={money} alt='gold' />
                    </div>
                  </div>
                ))}
            </div>
          )}
          <p className={s.subtitle}>the Chase by Salvation Youth</p>
        </div>
      </section>
    </main>
  );
};

export const formatPrice = (value: number) => {
  const formatter = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
  });
  return formatter.format(value);
};
