import { useState, useEffect } from "react";

export default function useSplashScreen(duration = 3000) {
  const [isSplashFinished, setIsSplashFinished] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplashFinished(true);
    }, duration);

    return () => clearTimeout(timer); 
  }, [duration]);

  return isSplashFinished;
}
