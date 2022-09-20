import React from 'react';
interface DeckProps {
    location: {
        hash: string;
    };
    data: {
        presentation: {
            title: string;
            slug: string;
            date: string;
            width: number;
            height: number;
            fragmentsBySlide: number[];
        };
    };
}
export default function Deck(props: React.PropsWithChildren<DeckProps>): JSX.Element;
export {};
