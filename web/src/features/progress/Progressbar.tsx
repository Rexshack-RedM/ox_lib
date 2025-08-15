import React from 'react';
import { Box, createStyles, Text } from '@mantine/core';
import { useNuiEvent } from '../../hooks/useNuiEvent';
import { fetchNui } from '../../utils/fetchNui';
import ScaleFade from '../../transitions/ScaleFade';
import type { ProgressbarProps } from '../../typings';
import { ASSETS } from '../../utils/getAssetPath';

const useStyles = createStyles((theme) => ({
  container: {
    width: 350,
    height: 70,
    background: `url(${ASSETS.WEATHERED_PAPER})`,
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat',
    borderRadius: 0,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '10px 15px',
    boxSizing: 'border-box',
  },
  wrapper: {
    width: '100%',
    height: '20%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 0,
    position: 'absolute',
  },
  progressTrack: {
    width: '100%',
    height: '16px',
    background: `url(${ASSETS.PROGRESS})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    borderRadius: '8px',
    overflow: 'visible',
    position: 'relative',
    boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.5)',
    padding: '0 2px',
    boxSizing: 'border-box',
  },
  progressMarkers: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: '2px',
      bottom: '2px',
      left: '25%',
      width: '1px',
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      zIndex: 5,
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      top: '2px',
      bottom: '2px',
      left: '50%',
      width: '1px',
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      zIndex: 5,
    },
  },
  progressMarker75: {
    position: 'absolute',
    top: '2px',
    bottom: '2px',
    left: '75%',
    width: '1px',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    zIndex: 5,
    pointerEvents: 'none',
  },
  bar: {
    height: '100%',
    top: '0',
    left: '0',
    backgroundColor: 'rgba(255, 40, 40, 0.8)',
    borderRadius: '4px',
    transition: 'width 0.1s ease',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
    position: 'absolute',
    zIndex: 2,
    mixBlendMode: 'multiply',
  },
  titleWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '24px',
    marginBottom: '6px',
  },
  label: {
    maxWidth: 310,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: '"RDR Lino Regular", serif',
    fontWeight: 'bold',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.9)',
    textAlign: 'center',
    letterSpacing: '0.5px',
  },
}));

const Progressbar: React.FC = () => {
  const { classes } = useStyles();
  const [visible, setVisible] = React.useState(false);
  const [label, setLabel] = React.useState('');
  const [duration, setDuration] = React.useState(0);
  const [progress, setProgress] = React.useState(0);

  useNuiEvent('progressCancel', () => setVisible(false));

  // Get the appropriate progress texture based on current progress
  const getProgressTexture = (currentProgress: number) => {
    const imageProgress = Math.floor(currentProgress / 10) * 10;
    return `/src/assets/progress_${imageProgress}.png`;
  };

  useNuiEvent<ProgressbarProps>('progress', (data) => {
    setVisible(true);
    setLabel(data.label);
    setDuration(data.duration);
    setProgress(0);
    
    // Update progress every 100ms for smooth texture transitions
    const updateInterval = data.duration / 100;
    let currentProgress = 0;
    
    const progressTimer = setInterval(() => {
      currentProgress += 1;
      setProgress(currentProgress);
      
      if (currentProgress >= 100) {
        clearInterval(progressTimer);
      }
    }, updateInterval);
  });

  return (
    <>
      <Box className={classes.wrapper}>
        <ScaleFade visible={visible} onExitComplete={() => fetchNui('progressComplete')}>
          <Box className={classes.container}>
            <Box className={classes.titleWrapper}>
              <Text className={classes.label}>{label}</Text>
            </Box>
            <Box className={classes.progressTrack}>
              <Box
                className={classes.bar}
                onAnimationEnd={() => setVisible(false)}
                sx={{
                  animation: 'progress-bar linear',
                  animationDuration: `${duration}ms`,
                }}
              />
              <Box className={classes.progressMarkers} />
              <Box className={classes.progressMarker75} />
            </Box>
          </Box>
        </ScaleFade>
      </Box>
    </>
  );
};

export default Progressbar;
