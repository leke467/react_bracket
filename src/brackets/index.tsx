import React, { Fragment } from 'react';
import { Round, Bracket, SeedsList } from '../components/round';
// @ts-ignore
import SwipeableViews from 'react-swipeable-views-react-18-fix';
import useMedia from '../hooks/useMedia';
import { renderSeed, renderTitle } from '../utils/renders';
import { ISingleEliminationProps } from '../types/SingleElimination';
import { IRoundProps } from '../types/Rounds';
import { ISeedProps } from '../types/Seed';

const SingleElimination = ({
  rounds,
  rtl = false,
  roundClassName,
  bracketClassName,
  mobileBreakpoint = 992,
  twoSided = false,
  renderSeedComponent = renderSeed,
  roundTitleComponent = renderTitle,
}: ISingleEliminationProps) => {
  // Checking responsive size
  const isResponsive = useMedia(mobileBreakpoint);

  const getFragment = (
    seed: ISeedProps,
    roundIdx: number,
    idx: number,
    rounds: IRoundProps[],
    isMiddleOfTwoSided: any
  ) => (
    <Fragment key={seed.id}>
      {renderSeedComponent({
        seed,
        breakpoint: mobileBreakpoint,
        roundIndex: roundIdx,
        seedIndex: idx,
        rounds,
        isMiddleOfTwoSided,
      })}
    </Fragment>
  );

  const data = rounds.map((round, roundIdx) => (
    <Round
      key={round.title}
      className={roundClassName}
      mobileBreakpoint={mobileBreakpoint}
      id={round.id}
      teams={round.teams}
    >
      {round.title && roundTitleComponent(round.title, roundIdx)}
      <SeedsList>
        {round.seeds.map((seed, idx) => {
          return getFragment(seed, roundIdx, idx, rounds, false);
        })}
      </SeedsList>
    </Round>
  ));

  // Example return, adjust as needed for your logic
  return (
    <Bracket
      className={bracketClassName}
      dir={rtl ? 'rtl' : 'ltr'}
      mobileBreakpoint={mobileBreakpoint}
      id={rounds[0]?.id}
      teams={rounds[0]?.teams}
    >
      {isResponsive ? (
        <SwipeableViews style={{ minHeight: '500px' }} axis={rtl ? 'x-reverse' : 'x'}>
          {data}
        </SwipeableViews>
      ) : (
        data
      )}
    </Bracket>
  );
};

export { SingleElimination };
export default SingleElimination;
