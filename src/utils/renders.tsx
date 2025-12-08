import type { JSX } from "react";
import React from 'react';
import { Seed, SeedItem, SeedTeam, SeedTime, SingleLineSeed } from '../components/seed';
import { RoundTitle } from '../components/round';
import { IRenderSeedProps } from '../types/Seed';

/* ------------------------- default title component ------------------------ */
export const renderTitle = (title: string | JSX.Element) => <RoundTitle>{title}</RoundTitle>;

/* ------------------------- default seed component ------------------------- */
export const renderSeed = ({ seed, breakpoint, isMiddleOfTwoSided }: IRenderSeedProps) => {
  const Wrapper = isMiddleOfTwoSided ? SingleLineSeed : Seed;
  return (
    <Wrapper
      mobileBreakpoint={breakpoint}
      id={seed.id}
      teams={seed.teams}
      date={seed.date}
    >
      <SeedItem>
        <div>
          <SeedTeam>{seed.teams?.[0]?.name || '-----------'}</SeedTeam>
          <SeedTeam>{seed.teams?.[1]?.name || '-----------'}</SeedTeam>
        </div>
      </SeedItem>
      <SeedTime
        mobileBreakpoint={breakpoint}
        id={seed.id}
        teams={seed.teams}
        date={seed.date}
      >
        {seed?.date}
      </SeedTime>
    </Wrapper>
  );
};
