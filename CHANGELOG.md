# Changelog

All notable changes to @apex/react-brackets will be documented in this file.

## [1.0.0] - 2024

### Added
- **ByeSkipSeed Component**: New styled connector component that extends from match center upward to skip over hidden BYE matches
- **SingleLineSeed Enhancements**: Improved losers bracket visualization with same-level match detection
- **Automatic BYE Detection**: Matches with teams named 'BYE' are automatically detected and flagged
- **Smart Connector Routing**: Connector lines intelligently route around hidden BYE matches using custom vertical extensions
- **Losers Bracket Optimization**: Single-line connectors for consolidation rounds and same-level matches in double elimination losers bracket
- **BYE Match Hiding**: BYE matches are hidden from view using `.seed-bye-hidden` CSS class
- **Position Tracking**: Added `visiblePosition` and `originalPosition` tracking to maintain proper alignment
- **Double Elimination Support**: BYE-skip functionality applied to both single elimination and winners bracket of double elimination
- **Consolidation Round Detection**: Automatic detection of Round 1 in losers bracket for single-line connectors

### Changed
- **Package Namespace**: Renamed from `@oliverlooney/react-brackets` to `@apex467/react-brackets`
- **Connector Logic**: Extended standard Seed connector pattern with configurable vertical heights
- **Round Processing**: Enhanced Round 1 processing to mark BYE matches and assign connector types
- **Component Selection**: Added conditional logic to choose between Seed, SingleLineSeed, and ByeSkipSeed based on match type and bracket context
- **Losers Bracket Logic**: Improved same-level match detection using `sourceMatchIds` validation

### Technical Details

**ByeSkipSeed:**
- Connector dimensions: horizontal (1.5em) → vertical (4.5em) → horizontal (1.5em)
- Vertical line positioning: `calc(50% - 4.5em)` to extend upward from match center
- BYE detection pattern: `teams.some(team => team.name === 'BYE')`
- Works in both `clonedSingleRounds` and `clonedWinnersRounds`

**SingleLineSeed:**
- Applied to losers bracket matches where both source matches are in the previous round
- Round 1 of losers bracket (consolidation round) automatically uses single-line connectors
- Detection logic: `sourceMatchIds.every(sourceId => previousRound.seeds.some(s => s.matchRecordId === sourceId))`
- Provides cleaner visual flow for same-level match progressions

### Credits
- Forked from [@oliverlooney/react-brackets](https://github.com/Oliver-Looney/react-brackets) v0.4.11
- Original library by [mohux](https://github.com/mohux)
- BYE-skip enhancement by Apex / [leke467](https://github.com/leke467)

## [0.4.11] - Previous Versions

For changelog of versions prior to the @apex fork, see:
- https://github.com/Oliver-Looney/react-brackets/releases
- https://github.com/mohux/react-brackets/releases
