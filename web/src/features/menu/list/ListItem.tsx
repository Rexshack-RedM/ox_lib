import { Box, createStyles, Group, Progress, Stack, Text } from '@mantine/core';
import React, { forwardRef } from 'react';
import CustomCheckbox from './CustomCheckbox';
import type { MenuItem } from '../../../typings';
import { isIconUrl } from '../../../utils/isIconUrl';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import LibIcon from '../../../components/LibIcon';
import { ASSETS } from '../../../utils/getAssetPath';

interface Props {
  item: MenuItem;
  index: number;
  scrollIndex: number;
  checked: boolean;
}

const useStyles = createStyles((theme, params: { iconColor?: string }) => ({
  buttonContainer: {
    background: `url(${ASSETS.SELECTION_BOX_BG})`,
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat',
    borderRadius: 0,
    padding: '8px 12px',
    height: 60,
    scrollMargin: 8,
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    '&:focus': {
      background: `url(${ASSETS.SELECTION_BOX_BG}), url(${ASSETS.SELECTED})`,
      backgroundSize: '100% 100%, 100% 100%',
      backgroundRepeat: 'no-repeat, no-repeat',
      backgroundPosition: 'center, center',
      outline: 'none',
    },
    '&:hover': {
      background: `url(${ASSETS.SELECTION_BOX_BG}), url(${ASSETS.SELECTED})`,
      backgroundSize: '100% 100%, 100% 100%',
      backgroundRepeat: 'no-repeat, no-repeat',
      backgroundPosition: 'center, center',
    },
  },
  iconImage: {
    maxWidth: 32,
    filter: 'sepia(0.3) hue-rotate(20deg) brightness(1.1)',
  },
  buttonWrapper: {
    paddingLeft: 5,
    paddingRight: 12,
    height: '100%',
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    width: 32,
    height: 32,
  },
  icon: {
    fontSize: 24,
    color: params.iconColor || '#FFFFFF',
  },
  label: {
    color: '#FFFFFF',
    fontFamily: '"RDR Lino Regular", serif',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)',
    textTransform: 'uppercase',
    fontSize: 12,
    fontWeight: 'normal',
    verticalAlign: 'middle',
  },
  chevronIcon: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  scrollIndexValue: {
    color: '#FFFFFF',
    fontFamily: '"RDR Lino Regular", serif',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)',
    textTransform: 'uppercase',
    fontSize: 14,
    fontWeight: 'normal',
  },
  progressStack: {
    width: '100%',
    marginRight: 5,
  },
  progressLabel: {
    color: '#FFFFFF',
    fontFamily: '"RDR Lino Regular", serif',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)',
    fontSize: 14,
    fontWeight: 'normal',
    verticalAlign: 'middle',
    marginBottom: 3,
  },
  itemText: {
    color: '#FFFFFF',
    fontFamily: '"RDR Lino Regular", serif',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)',
    fontSize: 14,
    fontWeight: 'normal',
  },
}));

const ListItem = forwardRef<Array<HTMLDivElement | null>, Props>(({ item, index, scrollIndex, checked }, ref) => {
  const { classes } = useStyles({ iconColor: item.iconColor });

  return (
    <Box
      tabIndex={index}
      className={classes.buttonContainer}
      key={`item-${index}`}
      ref={(element: HTMLDivElement) => {
        if (ref)
          // @ts-ignore i cba
          return (ref.current = [...ref.current, element]);
      }}
    >
      <Group spacing={15} noWrap className={classes.buttonWrapper}>
        {item.icon && (
          <Box className={classes.iconContainer}>
            {typeof item.icon === 'string' && isIconUrl(item.icon) ? (
              <img src={item.icon} alt="Missing image" className={classes.iconImage} />
            ) : (
              <LibIcon
                icon={item.icon as IconProp}
                className={classes.icon}
                fixedWidth
                animation={item.iconAnimation}
              />
            )}
          </Box>
        )}
        {Array.isArray(item.values) ? (
          <Group position="apart" w="100%">
            <Stack spacing={0} justify="space-between">
              <Text className={classes.label}>{item.label}</Text>
              <Text className={classes.itemText}>
                {typeof item.values[scrollIndex] === 'object'
                  ? // @ts-ignore for some reason even checking the type TS still thinks it's a string
                    item.values[scrollIndex].label
                  : item.values[scrollIndex]}
              </Text>
            </Stack>
            <Group spacing={1} position="center">
              <LibIcon icon="chevron-left" className={classes.chevronIcon} />
              <Text className={classes.scrollIndexValue}>
                {scrollIndex + 1}/{item.values.length}
              </Text>
              <LibIcon icon="chevron-right" className={classes.chevronIcon} />
            </Group>
          </Group>
        ) : item.checked !== undefined ? (
          <Group position="apart" w="100%">
            <Text className={classes.itemText}>{item.label}</Text>
            <CustomCheckbox checked={checked}></CustomCheckbox>
          </Group>
        ) : item.progress !== undefined ? (
          <Stack className={classes.progressStack} spacing={0}>
            <Text className={classes.progressLabel}>{item.label}</Text>
            <Progress
              value={item.progress}
              color={item.colorScheme || 'dark.0'}
              styles={(theme) => ({ root: { backgroundColor: theme.colors.dark[3] } })}
            />
          </Stack>
        ) : (
          <Text className={classes.itemText}>{item.label}</Text>
        )}
      </Group>
    </Box>
  );
});

export default React.memo(ListItem);
