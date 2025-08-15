import { Box, createStyles, Text } from '@mantine/core';
import React from 'react';
import { ASSETS } from '../../../utils/getAssetPath';

const useStyles = createStyles((theme) => ({
  container: {
    textAlign: 'center',
    borderRadius: 0,
    background: `url(${ASSETS.MENU_HEADER})`,
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat',
    minHeight: '70px',
    height: 'auto',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    flex: '1',
    padding: '15px 20px',
    boxSizing: 'border-box',
  },
  heading: {
    fontSize: 28,
    fontFamily: '"RDR Lino Regular", serif',
    fontWeight: 'normal',
    color: '#FFFFFF',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.9)',
    textTransform: 'uppercase',
  },
}));

const Header: React.FC<{ title: string }> = ({ title }) => {
  const { classes } = useStyles();

  return (
    <Box className={classes.container}>
      <Text className={classes.heading}>{title}</Text>
    </Box>
  );
};

export default React.memo(Header);
