import React from 'react';

import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();
export default function AnimatedMulti({
  onChangeFx,
  value,
  colourOptions
}) {
  return (
    <Select 
      onChange={onChangeFx}
      closeMenuOnSelect={false}
      components={animatedComponents}
      isMulti
      options={colourOptions}
      placeholder="Enter preferences"
      value={value}
    />
  );
}