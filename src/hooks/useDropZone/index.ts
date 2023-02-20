import { useState } from "react";
import { OnDrop, Props } from "./types";

export const useDND = ({ callBack }: Props) => {
  const [activeDND, setActiveDND] = useState(false);

  const onDragOver: OnDrop = (e) => {
    e.preventDefault();
    setActiveDND(true);
  };
  const onDragLeave: OnDrop = (e) => {
    e.preventDefault();
    setActiveDND(false);
  };

  const onDrop: OnDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveDND(false);
    callBack(e);
  };

  return { activeDND, subscribeDND: { onDragOver, onDragLeave, onDrop } };
};
