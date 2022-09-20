import { DeckMode } from '../types';
interface ResizeStyle {
    width: string;
    height: string;
    transform: string;
    transformOrigin: string;
}
export default function useResize(width: number, height: number, viewWidth: number, viewHeight: number, mode?: DeckMode): ResizeStyle;
export {};
