import { useEffect, useMemo, useRef, useState } from 'react';

import { IStreamData } from '../../types';

export const useTimer = (streamData: IStreamData) => {
  const [seconds, setSeconds] = useState(streamData.seconds);
  const timer = useRef<any>();

  useEffect(() => {
    setSeconds(streamData.seconds);
  }, [streamData.seconds]);

  useEffect(
    () => () => {
      if (timer.current) {
        clearInterval(timer.current);
      }
    },
    []
  );

  useEffect(() => {
    if (streamData.timerAction === 'start') {
      timer.current = setInterval(() => {
        setSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(timer.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    if (streamData.timerAction === 'reset') {
      if (timer.current) {
        clearInterval(timer.current);
        timer.current = null;
      }
      setSeconds(streamData.seconds);
    }
    if (streamData.timerAction === 'stop') {
      if (timer.current) {
        clearInterval(timer.current);
        timer.current = null;
      }
    }
  }, [streamData.timerAction]);

  return useMemo(() => {
    if (seconds < 60) {
      const nowSec = seconds < 10 ? `0${seconds}` : seconds;
      return {
        mm: '00',
        ss: nowSec,
      };
    }
    const minutes = Math.floor(seconds / 60);
    const newSec = seconds - minutes * 60;
    return {
      mm: minutes < 10 ? `0${minutes}` : minutes,
      ss: newSec < 10 ? `0${newSec}` : newSec,
    };
  }, [seconds]);
};
