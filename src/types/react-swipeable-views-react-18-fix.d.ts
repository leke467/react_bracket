// Minimal type definition for SwipeableViewsProps
export interface SwipeableViewsProps {
	axis?: string;
	style?: React.CSSProperties;
	index?: number;
	onChangeIndex?: (index: number, indexLatest: number) => void;
	children?: React.ReactNode;
	// Add more props as needed for your usage
	[key: string]: any;
}

declare module 'react-swipeable-views-react-18-fix' {
	import * as React from 'react';
	export default class SwipeableViews extends React.Component<SwipeableViewsProps> {}
	export { SwipeableViewsProps };
}
