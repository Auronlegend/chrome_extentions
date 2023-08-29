import React, { type ReactElement } from 'react';
import './ButtonList.css'; // Create this CSS file for styling

const ButtonList = (props: {
  buttons: string[]
  selectedButton?: string
  onButtonSelected: (text: string) => void
}): ReactElement => {
  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, _button: string): void => {
    props.onButtonSelected((e.target as any).innerHTML);
  };

  return (
    <div className="button-list">
        {props.buttons.map((button) => (
        <button
            key={button}
            className={`button ${props.selectedButton?.toLowerCase() === button.toLowerCase() ? 'highlighted' : ''}`}
            onClick={(e) => { handleButtonClick(e, button); }}>
            {button.toUpperCase()}
        </button>
        ))}
    </div>
  );
};

export default ButtonList;
