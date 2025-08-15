import React from 'react';
import {Box, createStyles, keyframes, RingProgress, Stack, Text, useMantineTheme} from '@mantine/core';
import {useNuiEvent} from '../../hooks/useNuiEvent';
import {fetchNui} from '../../utils/fetchNui';
import ScaleFade from '../../transitions/ScaleFade';
import type {CircleProgressbarProps} from '../../typings';
import { ASSETS } from '../../utils/getAssetPath';

const useStyles = createStyles((theme, params: { position: 'middle' | 'bottom'; duration: number }) => ({
  container: {
    width: '100%',
    height: params.position === 'middle' ? '100%' : '20%',
    bottom: 0,
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progress: {
    background: `url(${ASSETS.WEATHERED_PAPER})`,
    backgroundSize: '110px 110px',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    borderRadius: '50%',
    width: '110px',
    height: '110px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5))',
    position: 'relative',
  },
  progressRing: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%) rotate(-90deg)',
    width: '90px',
    height: '90px',
  },
  value: {
    textAlign: 'center',
    fontFamily: '"RDR Lino Regular", serif',
    fontWeight: 'bold',
    fontSize: '18px',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.9)',
    color: '#FFFFFF',
  },
  label: {
    textAlign: 'center',
    fontFamily: '"RDR Lino Regular", serif',
    fontWeight: 'bold',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.9)',
    color: '#FFFFFF',
    height: 30,
    marginTop: '12px',
    padding: '4px 12px',
    background: `url(${ASSETS.WEATHERED_PAPER})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    borderRadius: '6px',
    letterSpacing: '0.5px',
    fontSize: '16px',
  },
  wrapper: {
    marginTop: params.position === 'middle' ? 25 : undefined,
  },
}));

const CircleProgressbar: React.FC = () => {
  const [visible, setVisible] = React.useState(false);
  const [progressDuration, setProgressDuration] = React.useState(0);
  const [position, setPosition] = React.useState<'middle' | 'bottom'>('middle');
  const [value, setValue] = React.useState(0);
  const [label, setLabel] = React.useState('');
  const theme = useMantineTheme();
  const { classes } = useStyles({ position, duration: progressDuration });

  useNuiEvent('progressCancel', () => {
    setValue(99);
    setVisible(false);
  });

  useNuiEvent<CircleProgressbarProps>('circleProgress', (data) => {
    if (visible) return;
    setVisible(true);
    setValue(0);
    setLabel(data.label || '');
    setProgressDuration(data.duration);
    setPosition(data.position || 'middle');
    const onePercent = data.duration * 0.01;
    const updateProgress = setInterval(() => {
      setValue((previousValue) => {
        const newValue = previousValue + 1;
        if (newValue >= 100) {
          clearInterval(updateProgress);
          setTimeout(() => setVisible(false), 100); // Hide after reaching 100%
        }
        return newValue;
      });
    }, onePercent);
  });

  return (
    <>
      <Stack spacing={0} className={classes.container}>
        <ScaleFade visible={visible} onExitComplete={() => fetchNui('progressComplete')}>
          <Stack spacing={0} align="center" className={classes.wrapper}>
            <Box className={classes.progress}>
              <svg className={classes.progressRing} viewBox="0 0 90 90">
                {/* Progress fill */}
                <circle
                  cx="45"
                  cy="45"
                  r="36"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="12"
                  strokeLinecap="butt"
                  strokeDasharray={`${2 * Math.PI * 36}`}
                  strokeDashoffset={`${2 * Math.PI * 36 * (1 - value / 100)}`}
                  style={{
                    transition: 'stroke-dashoffset 0.1s ease-in-out',
                  }}
                />
                {/* Stroke markers every 20% - only show if progress has reached that point */}
                {[0, 20, 40, 60, 80].map((percent) => {
                  if (value >= percent) { // Show all strokes up to current progress
                    const angle = (percent / 100) * 360; // SVG is already rotated -90deg, so start from 0
                    const x1 = 45 + (36 - 10) * Math.cos((angle * Math.PI) / 180);
                    const y1 = 45 + (36 - 10) * Math.sin((angle * Math.PI) / 180);
                    const x2 = 45 + (36 + 10) * Math.cos((angle * Math.PI) / 180);
                    const y2 = 45 + (36 + 10) * Math.sin((angle * Math.PI) / 180);
                    
                    return (
                      <line
                        key={percent}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke="rgba(0, 0, 0, 0.9)"
                        strokeWidth="8"
                      />
                    );
                  }
                  return null;
                })}
              </svg>
              <Text className={classes.value} style={{ position: 'relative', zIndex: 10 }}>{value}%</Text>
            </Box>
            {label && <Text className={classes.label}>{label}</Text>}
          </Stack>
        </ScaleFade>
      </Stack>
    </>
  );
};

export default CircleProgressbar;
