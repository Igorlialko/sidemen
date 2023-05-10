import React from 'react';

import money from '../../assets/image/price.png';
import s from './stream.module.scss';
import { useGetStreamData } from './useGetStreamData';

export const StreamPage = () => {
  const streamData = useGetStreamData();
  /*---step1*/
  const name = 'Melnichenko';
  const count = '10';
  const time = '01:00';
  /*---*/

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
                <p>{name}</p>
                <p>{count}</p>
              </div>
              <div className={s.timer}>{time}</div>
            </>
          )}
          {streamData.activeStep === 'step2' && (
            <div className={s.road}>
              {Array.from({ length: 7 }, (_, index) => {
                const isRed = false;
                const isPlayer = false;
                return (
                  <div
                    className={`${isRed ? s.red : ''} ${isPlayer ? s.isPlayer : ''}`}
                    key={index}
                  >
                    sdc
                  </div>
                );
              })}
            </div>
          )}
          {streamData.activeStep === 'result' && (
            <div className={s.cards}>
              {Array.from({ length: 7 }, (_, index) => {
                return (
                  <div key={index} className={s.card}>
                    <div className={s.name}>NameName NameNameNameName</div>
                    <div className={s.price}>
                      <span>{formatPrice(20000)}</span>
                      <img src={money} alt='gold' />
                    </div>
                  </div>
                );
              })}
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
