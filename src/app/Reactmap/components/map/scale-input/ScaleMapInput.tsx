import { Slider } from "@mui/material";
import React from "react";

type Props = {
  scale: number | undefined;
  getScale(scale: number): unknown;
};

const ScaleMapInput = (props: Props) => {
  const handleChangeScale = (event: Event, scale: number | number[]) => {
    props.getScale(scale as number);
  };

  return (
    <Slider
      aria-label="scale-map"
      defaultValue={0}
      value={props.scale || 0}
      onChange={handleChangeScale}
      valueLabelDisplay="auto"
      getAriaValueText={(value) => String(Number(value + 1))}
      shiftStep={0.25}
      step={0.25}
      marks
      min={0}
      max={3}
    />
  );
};

export default ScaleMapInput;
