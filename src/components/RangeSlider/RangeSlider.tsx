import React, { useEffect, useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css'; // Import default styles
import './RangeSlider.css';

export interface HintEntry {
  from: number
  to: number
  hint: string
}

const RangeSlider = (props: {
  defaultValue: number
  marks: Record<number, string>
  hints: HintEntry[]
  onChange: (newValue: number) => void
}): JSX.Element => {
  const [textHint, setTextHint] = useState<string>('');

  useEffect(() => {
    updateHint(props.defaultValue);
  }, [])

  const updateHint = (value: number): void => {
    const hint = props.hints.find((entry) => entry.from <= value && entry.to >= value)?.hint ?? '';
    setTextHint(hint)
  }

  const onValueChanged = (newValue: number | number[]): void => {
    const value = newValue as number;
    updateHint(value)
    props.onChange(value);
  }

  return (
    <div className="slider-container">
      <div className="hint-container">
        <span className="hint-text">{textHint}</span>
      </div>
      <Slider
        min={1}
        max={10}
        marks={props.marks}
        step={1}
        defaultValue={props.defaultValue}
        onChange={onValueChanged}
      />
    </div>
  );
}

export default RangeSlider;
