import { useEffect, useState } from 'react';

import { IStreamData } from '../../types';
import { getStreamData } from '../../utils';

export const useGetStreamData = () => {
  const [streamData, setStreamData] = useState<IStreamData>(
    (() => {
      const data = getStreamData();
      document.body.className = data.activeStep;
      return data;
    })()
  );

  useEffect(() => {
    const updateStream = () => {
      setStreamData((prev: any) => {
        const data = localStorage.getItem('streamData');
        if (data) {
          const parsed = JSON.parse(data);
          document.body.className = parsed.activeStep;
          return parsed;
        }
        document.body.className = prev.activeStep;
        return prev;
      });
    };
    window.addEventListener('storage', updateStream);
    return () => window.removeEventListener('storage', updateStream);
  }, []);

  return streamData;
};
