import { ISeedProps } from './Seed';

export type IRoundProps = {
  id: number | string;
  teams: Array<{ name?: string; [key: string]: any }>;
  seeds: ISeedProps[];
  title: string;
  [key: string]: any;
};
