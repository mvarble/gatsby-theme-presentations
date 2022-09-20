import type { Node, PluginOptions } from 'gatsby';
export interface Options extends PluginOptions {
    sourceDir: string;
    layoutPath: string;
}
export declare function defaultOptions(options: Partial<Options>): Options;
export interface MdxNode extends Node {
    frontmatter: Frontmatter;
    body: string;
    parent: string;
}
interface Frontmatter {
    title: string;
    slug: string;
    date: unknown;
    width?: number;
    height?: number;
    description?: string;
}
export interface SlideState {
    indexh: number;
    indexf: number;
}
export declare enum DeckMode {
    Present = 0,
    Print = 1
}
export declare type DeckModeCallback = (mode: DeckMode) => DeckMode;
export interface Dimensions {
    width: number;
    height: number;
}
export interface DeckState {
    /**
     * API
     */
    ready: boolean;
    reset: () => void;
    title?: string;
    setTitle: (title: string) => void;
    slug?: string;
    setSlug: (slug: string) => void;
    date?: Date;
    setDate: (date: Date) => void;
    initializeStates: (elm: HTMLElement, fragmentsBySlide: number[]) => void;
    mode?: DeckMode;
    setMode: (modeOrCallback: DeckMode | DeckModeCallback) => void;
    slideState?: SlideState;
    setSlideState: (slideState: SlideState) => void;
    previous: () => void;
    next: () => void;
    dimensions?: Dimensions;
    setDimensions: (dimensions: Dimensions) => void;
    getParentSlide: (elm: HTMLElement) => (number | undefined);
    /**
     * Internal
     */
    _rootElm?: HTMLElement;
    _fragmentsBySlide?: number[];
}
export {};
