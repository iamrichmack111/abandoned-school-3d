import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Img,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
} from 'remotion';

const slides = [
  {src: 'screenshots/01-start-screen.png', title: 'THE ABANDONED SCHOOL', subtitle: '3D Learning Horror'},
  {src: 'screenshots/02-grade-history.png', title: 'TRACK YOUR PROGRESS', subtitle: 'Grades and learning history'},
  {src: 'screenshots/03-gameplay.png', title: 'LEARN TO ESCAPE', subtitle: 'Explore • Solve • Survive'},
];

const Slide = ({slide}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 18, 270, 299], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const scale = interpolate(frame, [0, 300], [1.02, 1.09], {extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill style={{backgroundColor:'#050607', opacity, overflow:'hidden', fontFamily:'Arial, Helvetica, sans-serif'}}>
      <Img
        src={staticFile(slide.src)}
        style={{
          width:'100%',
          height:'100%',
          objectFit:'cover',
          transform:`scale(${scale})`,
          filter:'brightness(0.62) contrast(1.12)',
        }}
      />
      <AbsoluteFill style={{background:'linear-gradient(180deg, rgba(0,0,0,.18), rgba(0,0,0,.12) 45%, rgba(0,0,0,.88))'}} />
      <div style={{position:'absolute', left:110, right:110, bottom:105, color:'white', textShadow:'0 4px 18px rgba(0,0,0,.95)'}}>
        <div style={{fontSize:74, fontWeight:900, letterSpacing:3}}>{slide.title}</div>
        <div style={{marginTop:16, fontSize:36, fontWeight:500, opacity:0.92}}>{slide.subtitle}</div>
      </div>
    </AbsoluteFill>
  );
};

export const AbandonedSchoolDemo = () => (
  <AbsoluteFill style={{backgroundColor:'#000'}}>
    {slides.map((slide, index) => (
      <Sequence key={slide.src} from={index * 300} durationInFrames={300}>
        <Slide slide={slide} />
      </Sequence>
    ))}
    <Audio src={staticFile('audio/narration.wav')} volume={1} />
  </AbsoluteFill>
);
