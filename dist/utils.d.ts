import { DeckMode, SlideState } from './types';
export declare function isNonnegativeInteger(x: number): boolean;
export declare function toHash(mode: DeckMode, slideState: SlideState): string;
export declare function navigate(hash: string): void;
