# @apex467/react-brackets

> Dynamic bracket component with BYE-skip connectors for single and double elimination tournaments

**Forked from [@oliverlooney/react-brackets](https://github.com/Oliver-Looney/react-brackets)**, which was originally created by [mohux](https://github.com/mohux). This fork adds enhanced BYE match handling with automatic connector line routing.

[![npm](https://img.shields.io/npm/v/%40apex467%2Freact-brackets.svg?label=npm)](https://www.npmjs.com/package/@apex467/react-brackets)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## ✨ New Features in @apex/react-brackets

### 1. BYE-Skip Connectors
- **Automatic BYE match detection and hiding** - Matches with BYE opponents are automatically hidden from view
- **Smart connector routing** - Connector lines intelligently route around hidden BYE matches to connect directly to the next round
- **Works in both formats** - Fully functional in single elimination and double elimination (upper bracket)
- **Visual consistency** - Maintains the same clean bracket appearance as standard matches

**How It Works:**
When a tournament has an odd number of participants, BYE matches are created automatically. Instead of displaying these non-competitive matches, `@apex/react-brackets` hides them and extends the connector lines from real matches upward to meet the convergence point where they would naturally connect.

**Example:**
```
Round 1              Quarter-Finals
                     ┌─ Phoenix Legends
Emerald Vipers   ────┘
vs Ruby Raptors      ┌─ Ghost Protocol
                     └─ Silver Hawks
Diamond Dragons  ────┐
vs Jade Jaguars      └─ Shadow Warriors
```

### 2. Single-Line Connectors (Losers Bracket)
- **Optimized for double elimination losers bracket** - Automatically detects consolidation rounds
- **Same-level match detection** - When both source matches are in the previous round, uses direct horizontal connectors
- **Cleaner visual flow** - Eliminates unnecessary vertical connectors in losers bracket progression
- **Smart round detection** - Round 1 of losers bracket (consolidation round) automatically uses single-line connectors

**How It Works:**
In double elimination tournaments, the losers bracket has consolidation rounds where teams from the same winners bracket round compete. Instead of using the standard Y-shaped connectors, single-line connectors provide a cleaner, more direct connection between matches at the same level.

**Example:**
```
Losers Round 1       Losers Round 2
Team A ───────────┐
Team B ───────────┤─ Winner AB
                  │
Team C ───────────┤
Team D ───────────┘
```

## Credits

- **Original Library:** [mohux/react-brackets](https://github.com/mohux/react-brackets)
- **Maintained Fork:** [@oliverlooney/react-brackets](https://github.com/Oliver-Looney/react-brackets)
- **BYE-Skip Enhancement:** Apex / [leke467](https://github.com/leke467)

## Install

via npm

```bash
npm i @apex467/react-brackets
```

via yarn

```bash
yarn add @apex467/react-brackets
```

## Usage

### Basic Example with BYE Handling

The component automatically handles BYE matches. Simply provide your match data:

```jsx
import { Bracket, Seed, SeedItem, SeedTime, ByeSkipSeed } from '@apex467/react-brackets';

const rounds = [
  {
    title: 'Round 1',
    seeds: [
      {
        id: 1,
        teams: [{ name: 'Phoenix Legends' }, { name: 'BYE' }], // BYE match - will be hidden
      },
      {
        id: 2,
        teams: [{ name: 'Emerald Vipers' }, { name: 'Ruby Raptors' }], // Real match - uses ByeSkipSeed
      },
      {
        id: 3,
        teams: [{ name: 'Ghost Protocol' }, { name: 'BYE' }], // BYE match - will be hidden
      },
    ],
  },
  {
    title: 'Quarter-Finals',
    seeds: [
      {
        id: 9,
        teams: [{ name: 'Phoenix Legends' }, { name: 'Emerald Vipers' }],
      },
    ],
  },
];

function MyBracket() {
  return (
    <Bracket
      rounds={rounds}
      roundTitleComponent={(title) => <div>{title}</div>}
      mobileBreakpoint={768}
    />
  );
}
```

### Double Elimination with Single-Line Losers Bracket

For double elimination tournaments, the losers bracket automatically uses single-line connectors:

```jsx
import { Bracket, SingleLineSeed } from '@apex467/react-brackets';

const winnersRounds = [
  {
    title: 'Winners Round 1',
    seeds: [
      { id: 1, teams: [{ name: 'Team A' }, { name: 'Team B' }] },
      { id: 2, teams: [{ name: 'Team C' }, { name: 'Team D' }] },
    ],
  },
  // ... more winners rounds
];

const losersRounds = [
  {
    title: 'Losers Round 1', // Consolidation round - automatic single-line connectors
    seeds: [
      { 
        id: 101, 
        teams: [{ name: 'Loser Match 1' }, { name: 'Loser Match 2' }],
        sourceMatchIds: [1, 2] // Both from Winners Round 1
      },
    ],
  },
  // ... more losers rounds
];

function DoubleEliminationBracket() {
  return (
    <>
      <Bracket
        rounds={winnersRounds}
        roundTitleComponent={(title) => <h3>Winners: {title}</h3>}
      />
      <Bracket
        rounds={losersRounds}
        roundTitleComponent={(title) => <h3>Losers: {title}</h3>}
        renderSeedComponent={(props) => {
          // Automatically uses SingleLineSeed for same-level matches
          return <YourCustomSeed {...props} bracketType="losers" />;
        }}
      />
    </>
  );
}
```

### Custom Seed Rendering with Connector Selection

You can manually control which connector component to use:

```jsx
import { Bracket, Seed, SingleLineSeed, ByeSkipSeed } from '@apex467/react-brackets';

const CustomSeed = ({ seed, bracketType, ...props }) => {
  // Determine connector type
  let SeedComponent = Seed;
  
  // Use SingleLineSeed for losers bracket same-level matches
  if (bracketType === 'losers' && seed.sourceMatchIds?.length === 2) {
    SeedComponent = SingleLineSeed;
  }
  // Use ByeSkipSeed for BYE-adjacent matches in winners/single elimination
  else if (seed.useSingleLine && bracketType !== 'losers') {
    SeedComponent = ByeSkipSeed;
  }
  
  return (
    <SeedComponent {...props}>
      {/* Your custom match card content */}
    </SeedComponent>
  );
};
```

const rounds: IRoundProps[] = [
  {
    title: 'Round one',
    seeds: [
      {
        id: 1,
        date: new Date().toDateString(),
        teams: [{ name: 'Team A' }, { name: 'Team B' }],
      },
      {
        id: 2,
        date: new Date().toDateString(),
        teams: [{ name: 'Team C' }, { name: 'Team D' }],
      },
    ],
  },
  {
    title: 'Round one',
    seeds: [
      {
        id: 3,
        date: new Date().toDateString(),
        teams: [{ name: 'Team A' }, { name: 'Team C' }],
      },
    ],
  },
];

const Component = () => {
  return <Bracket rounds={rounds} />;
};
```

### Custom Title

The core shape is similar to the above, since we can customize seeds and titles, you can pass any additional data to a seed or treat the title as a component.

modifying a title of the round is so simple,

```jsx
import { Bracket, IRoundProps } from 'react-brackets';
import React from 'react';

const Component = () => {
  //....
  return (
    <Bracket
      rounds={rounds}
      roundTitleComponent={(title: React.ReactNode, roundIndex: number) => {
        return <div style={{ textAlign: 'center', color: 'red' }}>{title}</div>;
      }}
    />
  );
};
```

### Custom Seed

Customizing a seed on the other hand is a little bit more complicated, yet still easy,
because we need to let the bracket tree to have a consistent design

**Any additional data you pass inside a seed object is accessible via renderSeedComponent**

```jsx
import { Bracket, IRoundProps, Seed, SeedItem, SeedTeam, IRenderSeedProps } from 'react-brackets';
import React from 'react';

const CustomSeed = ({seed, breakpoint, roundIndex, seedIndex}: IRenderSeedProps) => {
  // breakpoint passed to Bracket component
  // to check if mobile view is triggered or not

  // mobileBreakpoint is required to be passed down to a seed
  return (
    <Seed mobileBreakpoint={breakpoint} style={{ fontSize: 12 }}>
      <SeedItem>
        <div>
          <SeedTeam style={{ color: 'red' }}>{seed.teams[0]?.name || 'NO TEAM '}</SeedTeam>
          <SeedTeam>{seed.teams[1]?.name || 'NO TEAM '}</SeedTeam>
        </div>
      </SeedItem>
    </Seed>
  );
};

const Component = () => {
  //....
  return <Bracket rounds={rounds} renderSeedComponent={CustomSeed} />;
};
```

### Double Elimination

How about if I want to use this component for double elimination losing bracket? the current Seed component only works on single elimination, the answer is fairly simple as well.

```jsx
import { Bracket, IRoundProps, Seed, SingleLineSeed, SeedItem, SeedTeam, IRenderSeedProps } from 'react-brackets';
import React from 'react';

const CustomSeed = ({seed, breakpoint, roundIndex, seedIndex}: IRenderSeedProps) => {
  // ------ assuming rounds is the losers brackets rounds ------
  // losers rounds usually got some identical seeds amount like (2 - 2 - 1 - 1)

  const isLineConnector = rounds[roundIndex].seeds.length === rounds[roundIndex + 1]?.seeds.length;

  const Wrapper = isLineConnector ? SingleLineSeed : Seed;

  // mobileBreakpoint is required to be passed down to a seed
  return (
    <Wrapper mobileBreakpoint={breakpoint} style={{ fontSize: 12 }}>
      <SeedItem>
        <div>
          <SeedTeam style={{ color: 'red' }}>{seed.teams[0]?.name || 'NO TEAM '}</SeedTeam>
          <SeedTeam>{seed.teams[1]?.name || 'NO TEAM '}</SeedTeam>
        </div>
      </SeedItem>
    </Wrapper>
  );
};

const Component = () => {
  //....
  return <Bracket rounds={rounds} renderSeedComponent={CustomSeed} />;
};
```

### Two-sided Single Elimination

How to render Single Elimination as a two-sided bracket? You must set twoSided to true, and structure your custom seed render component like below, if you have a custom seed render component.

```jsx
import { Bracket, RoundProps, Seed, SeedItem, SeedTeam, RenderSeedProps } from 'react-brackets';
import React from 'react';

const CustomSeed = ({seed, breakpoint, roundIndex, seedIndex, isMiddleOfTwoSided}: RenderSeedProps) => {
  // breakpoint passed to Bracket component
  // to check if mobile view is triggered or not

  // mobileBreakpoint is required to be passed down to a seed
  const Wrapper = isMiddleOfTwoSided ? SingleLineSeed : Seed
  return (
    <Wrapper mobileBreakpoint={breakpoint} style={{ fontSize: 12 }}>
      <SeedItem>
        <div>
          <SeedTeam style={{ color: 'red' }}>{seed.teams[0]?.name || 'NO TEAM '}</SeedTeam>
          <SeedTeam>{seed.teams[1]?.name || 'NO TEAM '}</SeedTeam>
        </div>
      </SeedItem>
    </Wrapper>
  );
};

const Component = () => {
  //....
  return <Bracket rounds={rounds} renderSeedComponent={CustomSeed} twoSided={true} />;
};
```

### Loading

```jsx
import { Bracket, IRenderSeedProps, Seed, SeedItem, SeedTeam, SeedTime } from 'react-brackets';

const CustomSeed = ({ seed, breakpoint }: IRenderSeedProps) => {
  return (
    <Seed mobileBreakpoint={breakpoint} className='test'>
      <SeedItem className='skeleton-item'>
        <div>
          <SeedTeam>.</SeedTeam>
          <SeedTeam>.</SeedTeam>
        </div>
      </SeedItem>
      <SeedTime mobileBreakpoint={breakpoint} style={{ fontSize: 9 }}>
        {seed.date}
      </SeedTime>
    </Seed>
  );
};

const Component = () => {
  //....
  return <Bracket rounds={rounds} renderSeedComponent={CustomSeed} />;
};
```

## Bracket Props

| Prop                | Type                 | Description                                                                                                                                                              |
| ------------------- |----------------------| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| rounds              | IRoundProps[]        | Array of rounds, each round has {title,array of seeds}, if you're not using a custom seed render, each seed needs an array of teams, each team should have a name        |
| mobileBreakpoint    | number               | This bracket supports responsive design, on window reaching this size, it will trigger mobile swipable view, if you want to disable it, you can pass 0, (default is 992) |
| rtl                 | boolean              | Direction of the bracket as RTL (default is LTR)                                                                                                                         |
| twoSided            | boolean              | Sets Single elimination to be two sided if true. Default is False                                                                                                        |
| roundClassName      | string               | Round wrapper className                                                                                                                                                  |
| bracketClassName    | string               | The bracket className                                                                                                                                                    |
| renderSeedComponent | functional component | Custom render for every seed                                                                                                                                             |
| roundTitleComponent | functional component | Custom render for every round title                                                                                                                                      |
| swipeableProps      | SwipeableProps       | Please check this [React Swipeable Views](https://github.com/oliviertassinari/react-swipeable-views)                                                                     |

For detailed examples, you can clone this repo then:

> you can skip starting the root folder, but if you want to modify the library you have to run it.

```bash
yarn
```

then

```bash
yarn start
```

then open a new terminal

```bash
cd example
```

then

```bash
yarn
```

lastly

```bash
yarn start
```

## License

MIT © [mohammadou1](https://github.com/mohammadou1)

Originally created by [mohux](https://github.com/mohux). This fork is maintained and published as **@oliverlooney/react-brackets**.

### Migration from react-brackets

1) Uninstall: `npm rm react-brackets`
2) Install:  `npm i @oliverlooney/react-brackets`
3) Imports stay the same for this library (package name change only).



good luck
