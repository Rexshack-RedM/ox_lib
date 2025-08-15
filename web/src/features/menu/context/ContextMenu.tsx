import { useNuiEvent } from '../../../hooks/useNuiEvent';
import { Box, createStyles, Flex, Stack, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { ContextMenuProps } from '../../../typings';
import ContextButton from './components/ContextButton';
import { fetchNui } from '../../../utils/fetchNui';
import ReactMarkdown from 'react-markdown';
import HeaderButton from './components/HeaderButton';
import ScaleFade from '../../../transitions/ScaleFade';
import MarkdownComponents from '../../../config/MarkdownComponents';
import LibIcon from '../../../components/LibIcon';
import { ASSETS } from '../../../utils/getAssetPath';

const openMenu = (id: string | undefined) => {
  fetchNui<ContextMenuProps>('openContext', { id: id, back: true });
};

const useStyles = createStyles((theme) => ({
  container: {
    position: 'absolute',
    top: '15%',
    right: '25%',
    minWidth: 350,
    maxWidth: 500,
    width: 'fit-content',
    height: 'auto',
    background: `url(${ASSETS.LARGE_WEATHERED_PAPER})`,
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat',
    padding: '20px',
    boxSizing: 'border-box',
  },
  header: {
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    marginBottom: 15,
    gap: 6,
  },
  titleContainer: {
    background: `url(${ASSETS.MENU_HEADER})`,
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat',
    flex: '1',
    minHeight: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: '50px', // Space for back button
    paddingRight: '50px', // Space for close button
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: '8px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: `url(${ASSETS.SELECTION_BOX_BG})`,
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat',
    border: 'none',
    borderRadius: 0,
    minHeight: '35px',
    minWidth: '35px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#FFCA28',
    fontSize: '16px',
    cursor: 'pointer',
    '&:hover': {
      background: `url(${ASSETS.SELECTION_BOX_BG}), url(${ASSETS.SELECTED})`,
      backgroundSize: '100% 100%, 100% 100%',
      backgroundRepeat: 'no-repeat, no-repeat',
      backgroundPosition: 'center, center',
    },
  },
  titleText: {
    color: '#FFFFFF',
    fontFamily: '"RDR Lino Regular", serif',
    fontWeight: 'normal',
    fontSize: '35px',
    paddingTop: '10px',
    paddingBottom: '10px',
    textAlign: 'center',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.9)',
    flex: 1,
    whiteSpace: 'nowrap',
    overflow: 'visible',
  },
  headerCloseButton: {
    position: 'absolute',
    right: '8px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: `url(${ASSETS.SELECTION_BOX_BG})`,
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat',
    border: 'none',
    borderRadius: 0,
    minHeight: '35px',
    minWidth: '35px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#FFFFFF',
    fontSize: '20px',
    cursor: 'pointer',
    '&:hover': {
      background: `url(${ASSETS.SELECTION_BOX_BG}), url(${ASSETS.SELECTED})`,
      backgroundSize: '100% 100%, 100% 100%',
      backgroundRepeat: 'no-repeat, no-repeat',
      backgroundPosition: 'center, center',
    },
    '&:disabled': {
      opacity: 0.3,
      cursor: 'not-allowed',
    },
  },
  buttonsContainer: {
    height: 480,
    overflowY: 'scroll',
    paddingRight: '8px',
    '&::-webkit-scrollbar': {
      width: '6px',
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      background: 'rgba(212, 197, 176, 0.3)',
      borderRadius: '3px',
    },
  },
  buttonsFlexWrapper: {
    gap: 5,
  },
  divider: {
    background: `url(${ASSETS.DIVIDER_LINE})`,
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat',
    height: '2px',
    width: '100%',
    margin: '8px 0',
  },
}));

const ContextMenu: React.FC = () => {
  const { classes } = useStyles();
  const [visible, setVisible] = useState(false);
  const [contextMenu, setContextMenu] = useState<ContextMenuProps>({
    title: '',
    options: { '': { description: '', metadata: [] } },
  });

  const closeContext = () => {
    if (contextMenu.canClose === false) return;
    setVisible(false);
    fetchNui('closeContext');
  };

  // Hides the context menu on ESC
  useEffect(() => {
    if (!visible) return;

    const keyHandler = (e: KeyboardEvent) => {
      if (['Escape'].includes(e.code)) closeContext();
    };

    window.addEventListener('keydown', keyHandler);

    return () => window.removeEventListener('keydown', keyHandler);
  }, [visible]);

  useNuiEvent('hideContext', () => setVisible(false));

  useNuiEvent<ContextMenuProps>('showContext', async (data) => {
    if (visible) {
      // Just update the data without hiding the background
      setContextMenu(data);
    } else {
      setContextMenu(data);
      setVisible(true);
    }
  });

  return (
    <>
      {visible && (
        <Box className={classes.container}>
          <Flex className={classes.header}>
            <Box className={classes.titleContainer}>
              {contextMenu.menu && (
                <button
                  className={classes.backButton}
                  onClick={() => openMenu(contextMenu.menu)}
                >
                  <LibIcon icon="chevron-left" fontSize={16} />
                </button>
              )}
              <Text className={classes.titleText}>
                <ReactMarkdown components={MarkdownComponents}>{contextMenu.title}</ReactMarkdown>
              </Text>
              <button
                className={classes.headerCloseButton}
                disabled={contextMenu.canClose === false}
                onClick={closeContext}
              >
                <LibIcon icon="xmark" fontSize={20} />
              </button>
            </Box>
          </Flex>
          <ScaleFade visible={true}>
            <Box className={classes.buttonsContainer}>
              <Stack className={classes.buttonsFlexWrapper}>
                {Object.entries(contextMenu.options).map((option, index) => {
                  const currentOption = option[1];
                  const nextOption = Object.entries(contextMenu.options)[index + 1]?.[1];
                  const showDivider = nextOption && 
                    (currentOption.menu !== nextOption.menu || 
                     !!currentOption.menu !== !!nextOption.menu);
                  
                  return (
                    <>
                      <ContextButton option={option} key={`context-item-${index}`} />
                      {showDivider && <div className={classes.divider} />}
                    </>
                  );
                })}
              </Stack>
            </Box>
          </ScaleFade>
        </Box>
      )}
    </>
  );
};

export default ContextMenu;
