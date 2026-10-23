import React from 'react';
import {useCurrentFrame} from 'remotion';
import type {ShotDef, BgSpec, FootageSpec} from '../../common';
import Shot01 from '../Shot01';

export const SHOTS_G1: ShotDef[] = [
  {id: 'S01', from: 1, to: 415, Comp: () => <Shot01 N={useCurrentFrame() + 1} />},
];

export const BG_G1: BgSpec[] = [
  {from: 1, to: 415, fog: true},
];

export const FOOTAGE_G1: FootageSpec[] = [];
