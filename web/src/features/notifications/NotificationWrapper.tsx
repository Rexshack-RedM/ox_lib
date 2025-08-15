import { useNuiEvent } from '../../hooks/useNuiEvent';
import { toast, Toaster } from 'react-hot-toast';
import ReactMarkdown from 'react-markdown';
import { Box, Center, createStyles, Group, keyframes, RingProgress, Stack, Text, ThemeIcon } from '@mantine/core';
import React, { useState } from 'react';
import tinycolor from 'tinycolor2';
import type { NotificationProps } from '../../typings';
import MarkdownComponents from '../../config/MarkdownComponents';
import LibIcon from '../../components/LibIcon';
// Using relative paths for RedM compatibility
const checkIcon = './assets/check.png';
const crossIcon = './assets/cross.png';
const alertIcon = './assets/menu_icon_alert.png';
const weatheredPaper = './assets/weathered_paper.png';

const useStyles = createStyles((theme) => ({
  container: {
    width: 300,
    height: 'fit-content',
    background: `url(${weatheredPaper})`,
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat',
    color: '#D4C5B0',
    padding: 16,
    borderRadius: 0,
    fontFamily: '"RDR Lino Regular", serif',
    boxShadow: 'none',
  },
  title: {
    fontWeight: 'normal',
    lineHeight: 'normal',
    fontSize: '16px',
    color: '#FFFFFF',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.9)',
  },
  description: {
    fontSize: '12px',
    color: 'rgba(212, 197, 176, 0.8)',
    fontFamily: '"Montserrat", sans-serif',
    fontWeight: 600,
    lineHeight: 'normal',
    marginTop: '4px',
  },
  descriptionOnly: {
    fontSize: '14px',
    color: '#D4C5B0',
    fontFamily: '"RDR Lino Regular", serif',
    lineHeight: 'normal',
  },
}));

const createAnimation = (from: string, to: string, visible: boolean) => keyframes({
  from: {
    opacity: visible ? 0 : 1,
    transform: `translate${from}`,
  },
  to: {
    opacity: visible ? 1 : 0,
    transform: `translate${to}`,
  },
});

const getAnimation = (visible: boolean, position: string) => {
  const animationOptions = visible ? '0.2s ease-out forwards' : '0.4s ease-in forwards'
  let animation: { from: string; to: string };

  if (visible) {
    animation = position.includes('bottom') ? { from: 'Y(30px)', to: 'Y(0px)' } : { from: 'Y(-30px)', to:'Y(0px)' };
  } else {
    if (position.includes('right')) {
      animation = { from: 'X(0px)', to: 'X(100%)' }
    } else if (position.includes('left')) {
      animation = { from: 'X(0px)', to: 'X(-100%)' };
    } else if (position === 'top-center') {
      animation = { from: 'Y(0px)', to: 'Y(-100%)' };
    } else if (position === 'bottom') {
      animation = { from: 'Y(0px)', to: 'Y(100%)' };
    } else {
      animation = { from: 'X(0px)', to: 'X(100%)' };
    }
  }

  return `${createAnimation(animation.from, animation.to, visible)} ${animationOptions}`
};

const durationCircle = keyframes({
  '0%': { strokeDasharray: `0, ${15.1 * 2 * Math.PI}` },
  '100%': { strokeDasharray: `${15.1 * 2 * Math.PI}, 0` },
});

const Notifications: React.FC = () => {
  const { classes } = useStyles();
  const [toastKey, setToastKey] = useState(0);

  useNuiEvent<NotificationProps>('notify', (data) => {
    if (!data.title && !data.description) return;

    const toastId = data.id?.toString();
    const duration = data.duration || 3000;

    let iconColor: string;
    let position = data.position || 'top-right';

    data.showDuration = data.showDuration !== undefined ? data.showDuration : true;

    if (toastId) setToastKey(prevKey => prevKey + 1);

    // Backwards compat with old notifications
    switch (position) {
      case 'top':
        position = 'top-center';
        break;
      case 'bottom':
        position = 'bottom-center';
        break;
    }

    // Set default images for notification types, but allow custom icons to override
    let useCustomImage = false;
    let customImageSrc = '';
    
    if (!data.icon) {
      switch (data.type) {
        case 'error':
          customImageSrc = crossIcon;
          useCustomImage = true;
          data.icon = 'circle-xmark'; // Fallback
          break;
        case 'success':
          customImageSrc = checkIcon;
          useCustomImage = true;
          data.icon = 'circle-check'; // Fallback
          break;
        case 'warning':
          customImageSrc = alertIcon;
          useCustomImage = true;
          data.icon = 'circle-exclamation'; // Fallback
          break;
        default:
          customImageSrc = alertIcon;
          useCustomImage = true;
          data.icon = 'circle-info'; // Fallback
          break;
      }
    }

    if (!data.iconColor) {
      // Default to white for all notification types
      iconColor = '#FFFFFF';
    } else {
      iconColor = tinycolor(data.iconColor).toRgbString();
    }
    
    toast.custom(
      (t) => (
        <Box
          sx={{
            animation: getAnimation(t.visible, position),
            ...data.style,
          }}
          className={`${classes.container}`}
        >
          <Group noWrap spacing={12}>
            {data.icon && (
              <>
                {data.showDuration ? (
                  <RingProgress
                    key={toastKey}
                    size={38}
                    thickness={2}
                    sections={[{ value: 100, color: iconColor }]}
                    style={{ alignSelf: !data.alignIcon || data.alignIcon === 'center' ? 'center' : 'start' }}
                    styles={{
                      root: {
                        '> svg > circle:nth-of-type(2)': {
                          animation: `${durationCircle} linear forwards reverse`,
                          animationDuration: `${duration}ms`,
                        },
                        margin: -3,
                      },
                    }}
                    label={
                      <Center>
                        {useCustomImage ? (
                          <img
                            src={customImageSrc}
                            alt="notification icon"
                            style={{
                              width: '18px',
                              height: '18px',
                              filter: 'brightness(0) invert(1)', // Make images white
                            }}
                          />
                        ) : (
                          <ThemeIcon
                            color={iconColor}
                            radius="xl"
                            size={32}
                            variant={tinycolor(iconColor).getAlpha() < 0 ? undefined : 'light'}
                          >
                            <LibIcon icon={data.icon} fixedWidth color={iconColor} animation={data.iconAnimation} />
                          </ThemeIcon>
                        )}
                      </Center>
                    }
                  />
                ) : (
                  useCustomImage ? (
                    <img
                      src={customImageSrc}
                      alt="notification icon"
                      style={{
                        width: '18px',
                        height: '18px',
                        filter: 'brightness(0) invert(1)', // Make images white
                        alignSelf: !data.alignIcon || data.alignIcon === 'center' ? 'center' : 'start',
                      }}
                    />
                  ) : (
                    <ThemeIcon
                      color={iconColor}
                      radius="xl"
                      size={32}
                      variant={tinycolor(iconColor).getAlpha() < 0 ? undefined : 'light'}
                      style={{ alignSelf: !data.alignIcon || data.alignIcon === 'center' ? 'center' : 'start' }}
                    >
                      <LibIcon icon={data.icon} fixedWidth color={iconColor} animation={data.iconAnimation} />
                    </ThemeIcon>
                  )
                )}
              </>
            )}
            <Stack spacing={0}>
              {data.title && <Text className={classes.title}>{data.title}</Text>}
              {data.description && (
                <ReactMarkdown
                  components={MarkdownComponents}
                  className={`${!data.title ? classes.descriptionOnly : classes.description} description`}
                >
                  {data.description}
                </ReactMarkdown>
              )}
            </Stack>
          </Group>
        </Box>
      ),
      {
        id: toastId,
        duration: duration,
        position: position,
      }
    );
  });

  return <Toaster />;
};

export default Notifications;
