import React, { useEffect, useState } from 'react';

import { IStreamData } from '../../types';
import s from './stream.module.scss';

export const StreamPage = () => {
  const [streamData, setStreamData] = useState<IStreamData>(
    JSON.parse(localStorage.getItem('streamData') || 'null') || {
      activeStep: 'step2',
    }
  );

  useEffect(() => {
    const updateStream = () => {
      setStreamData((prev: any) => {
        const data = localStorage.getItem('streamData');
        if (data) {
          return JSON.parse(data);
        }
        return prev;
      });
    };
    window.addEventListener('storage', updateStream);
    return () => window.removeEventListener('storage', updateStream);
  }, []);

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
          {streamData.activeStep === 'result' && <></>}
          <p className={s.subtitle}>the Chase by Salvation Youth</p>
        </div>
      </section>
    </main>
  );
};
