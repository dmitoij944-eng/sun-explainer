import React from 'react';
import {Composition} from 'remotion';
import {W, H, FPS, TOTAL_FRAMES} from './common';
import {Video} from './Main';
import {PreviewOverlay} from './overlay/Preview';

// Single 10s composition
export const Root: React.FC = () => (
  <>
    <Composition id="Video" component={Video} durationInFrames={TOTAL_FRAMES} fps={FPS} width={W} height={H} />
    <Composition id="Overlay" component={PreviewOverlay} durationInFrames={TOTAL_FRAMES} fps={FPS} width={W} height={H} />
  </>
);
