import { Button, createStyles, Group, Modal, Stack, useMantineTheme } from '@mantine/core';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useNuiEvent } from '../../hooks/useNuiEvent';
import { fetchNui } from '../../utils/fetchNui';
import { useLocales } from '../../providers/LocaleProvider';
import remarkGfm from 'remark-gfm';
import type { AlertProps } from '../../typings';
import MarkdownComponents from '../../config/MarkdownComponents';
import { ASSETS } from '../../utils/getAssetPath';

const useStyles = createStyles((theme) => ({
  contentStack: {
    color: '#FFFFFF',
    fontFamily: '"RDR Lino Regular", serif',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)',
  },
  modal: {
    background: `url(${ASSETS.LARGE_WEATHERED_PAPER})`,
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat',
    border: 'none',
    borderRadius: 0,
    boxShadow: 'none',
  },
  header: {
    color: '#FFFFFF',
    fontFamily: '"RDR Lino Regular", serif',
    fontWeight: 'normal',
    fontSize: '22px',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.9)',
    textAlign: 'center',
    padding: '20px 0 0 0',
    margin: '0',
  },
  divider: {
    background: `url(${import.meta.env.DEV ? '/src/assets/divider_line_alert.png' : './assets/divider_line_alert.png'})`,
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    height: '8px',
    width: '85%',
    margin: '15px auto 20px auto',
  },
  button: {
    background: `url(${ASSETS.SELECTION_BOX_BG})`,
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat',
    border: 'none',
    borderRadius: 0,
    color: '#FFFFFF',
    fontFamily: '"RDR Lino Regular", serif',
    fontSize: '14px',
    fontWeight: 'normal',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)',
    padding: '15px 25px',
    minHeight: '45px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      background: `url(${ASSETS.SELECTION_BOX_BG}), url(${ASSETS.SELECTED})`,
      backgroundSize: '100% 100%, 100% 100%',
      backgroundRepeat: 'no-repeat, no-repeat',
      backgroundPosition: 'center, center',
      transform: 'none',
    },
    '&:active': {
      transform: 'scale(0.98)',
    },
  },
  cancelButton: {
    background: `url(${ASSETS.SELECTION_BOX_BG})`,
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat',
    border: 'none',
    borderRadius: 0,
    color: 'rgba(255, 255, 255, 0.8)',
    fontFamily: '"RDR Lino Regular", serif',
    fontSize: '14px',
    fontWeight: 'normal',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)',
    padding: '15px 25px',
    minHeight: '45px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      background: `url(${ASSETS.SELECTION_BOX_BG}), url(${ASSETS.SELECTED})`,
      backgroundSize: '100% 100%, 100% 100%',
      backgroundRepeat: 'no-repeat, no-repeat',
      backgroundPosition: 'center, center',
      color: '#FFFFFF',
      transform: 'none',
    },
    '&:active': {
      transform: 'scale(0.98)',
    },
  },
}));

const AlertDialog: React.FC = () => {
  const { locale } = useLocales();
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [dialogData, setDialogData] = useState<AlertProps>({
    header: '',
    content: '',
  });

  const closeAlert = (button: string) => {
    setOpened(false);
    fetchNui('closeAlert', button);
  };

  useNuiEvent('sendAlert', (data: AlertProps) => {
    setDialogData(data);
    setOpened(true);
  });

  useNuiEvent('closeAlertDialog', () => {
    setOpened(false);
  });

  return (
    <>
      <Modal
        opened={opened}
        centered={dialogData.centered}
        size={dialogData.size || 'md'}
        overflow={dialogData.overflow ? 'inside' : 'outside'}
        closeOnClickOutside={false}
        onClose={() => {
          setOpened(false);
          closeAlert('cancel');
        }}
        withCloseButton={false}
        overlayOpacity={0.7}
        exitTransitionDuration={150}
        transition="fade"
        title={null}
        classNames={{ modal: classes.modal }}
      >
        <Stack className={classes.contentStack}>
          <div className={classes.header}>
            <ReactMarkdown components={MarkdownComponents}>{dialogData.header}</ReactMarkdown>
          </div>
          <div className={classes.divider}></div>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              ...MarkdownComponents,
              img: ({ ...props }) => <img style={{ maxWidth: '100%', maxHeight: '100%' }} {...props} />,
            }}
          >
            {dialogData.content}
          </ReactMarkdown>
          <Group position="right" spacing={10}>
            {dialogData.cancel && (
              <Button 
                uppercase 
                variant="default"
                className={classes.cancelButton}
                onClick={() => closeAlert('cancel')} 
                mr={3}
              >
                {dialogData.labels?.cancel || locale.ui.cancel}
              </Button>
            )}
            <Button
              uppercase
              variant="default"
              className={classes.button}
              onClick={() => closeAlert('confirm')}
            >
              {dialogData.labels?.confirm || locale.ui.confirm}
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
};

export default AlertDialog;
