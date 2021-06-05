import { useEffect, useState } from 'react';

// 获取验证码倒计时
// const { countdown, started, start, stop } = useCountdown();

{
  /* <a className="code" ref={ref} onClick={started ? null : showSuperCode}>
{started ? countdown + '秒' : '获取验证码'}
</a> */
}

const useCountdown = ({ defaultCountdown = 60, defaultStarted = false }) => {
  const [countdown, setCountdown] = useState(defaultCountdown);
  const [started, setStarted] = useState(defaultStarted);

  useEffect(() => {
    if (countdown > 0 && started) {
      setTimeout(() => {
        setCountdown((cd) => --cd);
      }, 1000);
    } else {
      setStarted(false);
      setCountdown(defaultCountdown);
    }
  }, [countdown, started, defaultCountdown]);

  return { countdown, started, start: () => setStarted(true), stop: () => setStarted(false) };
};

export default useCountdown;
