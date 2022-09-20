import React from 'react';
interface SlideProps {
    index: number | string;
}
export default function Slide({ children, index }: React.PropsWithChildren<SlideProps>): JSX.Element;
export {};
