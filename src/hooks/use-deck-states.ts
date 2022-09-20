import React from 'react';
import shallow from 'zustand/shallow';

import useDeck from './use-deck';

export default function useDeckStates(
  ref: React.RefObject<HTMLElement>,
  fragmentsBySlide: number[]
) {
  // step 0: interface with the deck state
  const [initializeStates, ready] = useDeck(deck => [deck.initializeStates, deck.ready], shallow);

  // step 1: populate these objects on changes
  React.useEffect(() => {
    if (!ref.current) return;
    initializeStates(ref.current, fragmentsBySlide);
  }, [ref.current, fragmentsBySlide, initializeStates, ready]);
}
