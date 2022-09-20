import React from 'react';
interface FragmentProps {
    slideIndex: string | number;
    index: string | number;
    startOn: boolean;
    out: boolean;
    semiOut: boolean;
    appearDown: boolean;
    appearUp: boolean;
    appearRight: boolean;
    appearLeft: boolean;
    grow: boolean;
}
export default function Fragment({ children, slideIndex: sI, index: i, startOn, out, semiOut, appearDown, appearUp, appearRight, appearLeft, grow, }: React.PropsWithChildren<FragmentProps>): JSX.Element;
export {};
