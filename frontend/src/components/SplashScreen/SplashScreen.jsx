import { useEffect, useState } from 'react';
import { SplashContainer, LogoContainer, Logo} from "./SplashScreen.styled";

const SplashScreen = ({ onFinish }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      onFinish(); 
    }, 3000);
  }, []);

  return (
    <SplashContainer isFinished={!isLoading}>
      <LogoContainer>
        <Logo src="/assets/img/logo.png" alt="Logo" />
      </LogoContainer>
    </SplashContainer>
  );
};

export default SplashScreen;
