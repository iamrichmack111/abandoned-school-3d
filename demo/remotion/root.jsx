import React from 'react';
import {Composition} from 'remotion';
import {AbandonedSchoolDemo} from './showcase';

export const Root = () => (
  <Composition
    id="AbandonedSchoolDemo"
    component={AbandonedSchoolDemo}
    durationInFrames={900}
    fps={30}
    width={1920}
    height={1080}
  />
);
