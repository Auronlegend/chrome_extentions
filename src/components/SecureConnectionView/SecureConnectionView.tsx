// SecureConnectionView.js
import React, { useRef } from 'react';
import './SecureConnectionView.css';

const REQUIRED_CLICKS = 5;

const SecureConnectionView = (props: {
  onSecretAction: () => void
}): JSX.Element => {
  const secretCounter = useRef<number>(0)

  const registerClick = (): void => {
    secretCounter.current += 1;
    if (secretCounter.current >= REQUIRED_CLICKS) {
      props.onSecretAction();
      secretCounter.current = 0;
    }
  }

  return (
    <div className="secure-connection-container">
      <div className="icon-container">
        <img
          className="verified-icon"
          src="ic_verified.png"
          alt="Verified Icon"
          onClick={() => {
            registerClick()
          }}
        />
      </div>
      <p className="secure-text">The connection is secure</p>
    </div>
  );
};

export default SecureConnectionView;
