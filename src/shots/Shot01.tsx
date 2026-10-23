import React from 'react';
import {CText, PURPLE, WHITE, GREY, ORANGE, abs, SoftIn, GLOW_PURPLE_S, firstOp, exitOp, glowOffK, glowPurple} from '../ui';
import {LightSweep, StageLine, GhostText, ghostOpacity, BigNumber, HaloRing} from '../fx';
import {FONT_ORB, FONT_HEAVY} from '../common/lib';
import {clamp01, easeInOutPow, GlitchIn} from '../common';

// Shot 1: Complete 10s sequence (frames 1-415)
// Beats: 41, 76, 116, 188, 257
const Shot01: React.FC<{N: number}> = ({N}) => {
  // Camera scale for zoom effect
  const camScale = N < 257 ? 1.0 : N < 315 ? 1.0 + 0.2 * easeInOutPow(2)(clamp01((N - 257) / 58)) : N < 385 ? 1.2 + 0.05 * clamp01((N - 315) / 70) : 1.25;

  // Exit fade
  const exitAlpha = exitOp(N, 415, 8);

  // Continuous animations
  const plasmaPhase = (N * 0.035) % (Math.PI * 2); // slow rotation
  const heatPhase = Math.floor(N / 15) % 20; // new heat line every 15 frames
  const rayPulse = 0.6 + 0.4 * Math.sin(N * 0.14); // energy ray pulse

  return (
    <div style={{...abs(0, 0, 1280, 720), transform: `scale(${camScale})`, transformOrigin: '640px 360px'}}>
      <div style={{...abs(0, 0, 1280, 720), opacity: exitAlpha}}>
        
        {/* Title intro with triple light sweep (frames 1-40) */}
        {N < 80 && (
          <>
            <LightSweep N={N} rounds={[8, 14, 20]} alphas={[0.7, 0.6, 0.55]} dy={-29} />
            <StageLine N={N} f0={8} flashAt={26} cy={331} />
            <GhostText cx={640} cy={331} size={118} family={FONT_ORB} weight={700} letterSpacing={12} opacity={ghostOpacity(N, 8, 26)}>
              THE SUN
            </GhostText>
            <GlitchIn N={N} f0={26} style={{opacity: N < 41 ? 1 : Math.max(0, 1 - (N - 41) / 12)}}>
              <CText cx={640} cy={331} size={118} family={FONT_ORB} weight={700} color={WHITE} letterSpacing={12} shadow={GLOW_PURPLE_S}>
                THE SUN
              </CText>
            </GlitchIn>
          </>
        )}
        
        {/* Beat 1 (41-75): Sun sphere appears */}
        {N >= 41 && (
          <SoftIn N={N} f0={41}>
            <div style={{...abs(640 - 100, 280, 200, 200), borderRadius: '50%', border: '3px solid white', background: 'radial-gradient(circle at 40% 40%, rgba(255,255,255,0.1), transparent 60%)', boxShadow: glowPurple(glowOffK(N, 415, 6))}} />
          </SoftIn>
        )}
        
        {/* Plasma particles orbiting (continuous from beat 1) */}
        {N >= 41 && Array.from({length: 12}).map((_, i) => {
          const angle = plasmaPhase + (i * Math.PI * 2) / 12;
          const r = 110 + 8 * Math.sin(N * 0.05 + i);
          const x = 640 + r * Math.cos(angle);
          const y = 380 + r * Math.sin(angle) * 0.6; // elliptical
          const op = 0.5 + 0.3 * Math.sin(N * 0.08 + i);
          return (
            <div key={i} style={{...abs(x - 1, y - 1, 2, 2), borderRadius: '50%', background: WHITE, opacity: op * exitAlpha}} />
          );
        })}
        
        {/* Beat 2 (76-115): PLASMA label */}
        {N >= 76 && (
          <GlitchIn N={N} f0={76} style={{opacity: N < 116 ? 1 : Math.max(0, 1 - (N - 116) / 10)}}>
            <CText cx={640} cy={450} size={32} family={FONT_HEAVY} weight={900} color={PURPLE} letterSpacing={4}>
              PLASMA
            </CText>
          </GlitchIn>
        )}
        
        {/* Beat 3 (116-187): Giant size number with spotlight - HIGH MOMENT */}
        {N >= 116 && N < 257 && (
          <>
            {/* Purple spotlight behind number */}
            <div style={{...abs(540, 160, 200, 100), opacity: firstOp(N - 116, 18) * (N < 188 ? 1 : Math.max(0, 1 - (N - 188) / 15)), background: 'radial-gradient(ellipse 120% 80% at 50% 50%, rgba(102,45,248,0.25), transparent)', filter: 'blur(30px)'}} />
            
            <SoftIn N={N} f0={116}>
              <BigNumber cx={640} cy={210} value={1400000} size={72} family={FONT_ORB} color={WHITE} shadow="4px 4px 0px rgba(102,45,248,0.8), 0 0 20px rgba(255,255,255,0.4)" />
              <CText cx={760} cy={210} size={36} family={FONT_ORB} weight={700} color={GREY} letterSpacing={1}>
                km
              </CText>
            </SoftIn>
            
            {/* Scale reference: tiny Earth */}
            {N >= 130 && (
              <SoftIn N={N} f0={130}>
                <div style={{...abs(720, 190, 8, 8), borderRadius: '50%', background: 'linear-gradient(135deg, #4A90E2 0%, #2E5C8A 100%)', border: '1px solid rgba(255,255,255,0.5)'}} />
                <CText cx={740} cy={195} size={14} family={FONT_HEAVY} weight={700} color={GREY}>
                  Earth
                </CText>
              </SoftIn>
            )}
          </>
        )}
        
        {/* Beat 4 (188-256): Temperature with light ring - HIGH MOMENT */}
        {N >= 188 && N < 315 && (
          <>
            {/* Purple light ring around sun */}
            <HaloRing cx={640} cy={380} rxo={140} ryo={100} rxi={120} ryi={80} p={clamp01((N - 188) / 20)} fillOp={0.3} phase={Math.floor(N / 2) * 5} opacity={N < 257 ? 1 : Math.max(0, 1 - (N - 257) / 15)} />
            
            <SoftIn N={N} f0={188} style={{opacity: N < 257 ? 1 : Math.max(0, 1 - (N - 257) / 12)}}>
              <BigNumber cx={640} cy={520} value={15000000} size={56} family={FONT_ORB} color={ORANGE} shadow="3px 3px 0px rgba(240,95,65,0.6), 0 0 16px rgba(240,95,65,0.5)" />
              <CText cx={780} cy={520} size={32} family={FONT_ORB} weight={700} color={GREY} letterSpacing={0}>
                °C
              </CText>
            </SoftIn>
            
            {/* Heat lines radiating */}
            {Array.from({length: 6}).map((_, i) => {
              const offset = (heatPhase + i * 3) % 20;
              const r = 110 + offset * 8;
              const op = Math.max(0, 1 - offset / 20);
              return (
                <div key={i} style={{...abs(640 - r, 380 - r, r * 2, r * 2), borderRadius: '50%', border: `1px solid rgba(240,95,65,${op * 0.4})`, opacity: N < 257 ? 1 : Math.max(0, 1 - (N - 257) / 15)}} />
              );
            })}
          </>
        )}
        
        {/* Beat 5 (257-315): Earth orbiting with energy rays */}
        {N >= 257 && (
          <>
            {/* Earth */}
            <SoftIn N={N} f0={257}>
              <div style={{...abs(900, 300, 60, 60), borderRadius: '50%', background: 'linear-gradient(135deg, #4A90E2 0%, #1E3A5F 50%, #2E5C8A 100%)', border: '2px solid rgba(255,255,255,0.6)', boxShadow: '0 0 12px rgba(74,144,226,0.5)'}} />
              <CText cx={930} cy={380} size={22} family={FONT_HEAVY} weight={900} color={WHITE} letterSpacing={2}>
                LIFE
              </CText>
            </SoftIn>
            
            {/* Energy rays connecting sun to Earth */}
            {Array.from({length: 4}).map((_, i) => {
              const offset = i * 15;
              const x1 = 640 + 100;
              const y1 = 380 - 20 + offset;
              const x2 = 900;
              const y2 = 320 + offset;
              const op = rayPulse * (0.3 + 0.2 * Math.sin(N * 0.1 + i));
              return (
                <svg key={i} style={{position: 'absolute', inset: 0, pointerEvents: 'none'}}>
                  <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={ORANGE} strokeWidth={1.5} opacity={op} strokeDasharray="4 4" />
                </svg>
              );
            })}
          </>
        )}
        
        {/* HUD label */}
        <div style={{...abs(20, 20, 200, 50), opacity: firstOp(N - 1)}}>
          <div style={{padding: '8px 16px', borderRadius: 20, border: `2px solid ${WHITE}`, background: 'rgba(0,0,0,0.6)'}}>
            <CText cx={100} cy={25} size={18} family={FONT_HEAVY} weight={700} color={WHITE} letterSpacing={1}>
              Our Star
            </CText>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Shot01;
