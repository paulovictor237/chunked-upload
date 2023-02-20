import { DragEvent } from "react";

export type OnDrop = (e: DragEvent<HTMLElement>) => void;

export type Props = { callBack: (e: DragEvent<HTMLElement>) => void };
