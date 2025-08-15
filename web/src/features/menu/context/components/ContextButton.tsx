import { Button, createStyles, Group, HoverCard, Image, Progress, Stack, Text } from '@mantine/core';
import ReactMarkdown from 'react-markdown';
import { ContextMenuProps, Option } from '../../../../typings';
import { fetchNui } from '../../../../utils/fetchNui';
import { isIconUrl } from '../../../../utils/isIconUrl';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import MarkdownComponents from '../../../../config/MarkdownComponents';
import LibIcon from '../../../../components/LibIcon';
import { ASSETS } from '../../../../utils/getAssetPath';

const openMenu = (id: string | undefined) => {
  fetchNui<ContextMenuProps>('openContext', { id: id, back: false });
};

const clickContext = (id: string) => {
  fetchNui('clickContext', id);
};

const useStyles = createStyles((theme, params: { disabled?: boolean; readOnly?: boolean }) => ({
  inner: {
    justifyContent: 'flex-start',
  },
  label: {
    width: '100%',
    color: params.disabled ? 'rgba(255, 255, 255, 0.4)' : '#FFFFFF',
    whiteSpace: 'pre-wrap',
    fontFamily: '"RDR Lino Regular", serif',
    fontSize: '14px',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)',
  },
  button: {
    height: 'fit-content',
    width: '100%',
    padding: '12px 16px',
    background: `url(${ASSETS.SELECTION_BOX_BG})`,
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat',
    border: 'none',
    borderRadius: 0,
    '&:hover': {
      background: params.readOnly 
        ? `url(${ASSETS.SELECTION_BOX_BG})`
        : `url(${ASSETS.SELECTION_BOX_BG}), url(${ASSETS.SELECTED})`,
      backgroundSize: '100% 100%, 100% 100%',
      backgroundRepeat: 'no-repeat, no-repeat',
      backgroundPosition: 'center, center',
      cursor: params.readOnly ? 'default' : 'pointer',
      '.mantine-Button-label': {
        color: params.readOnly ? '#FFFFFF' : '#FFFFFF',
      },
    },
    '&:active': {
      transform: params.readOnly ? 'none' : 'scale(0.98)',
    },
    '&[data-disabled]': {
      background: `url(${ASSETS.SELECTION_BOX_BG})`,
      backgroundSize: '100% 100%',
      backgroundRepeat: 'no-repeat',
      opacity: 0.5,
    },
  },
  iconImage: {
    maxWidth: '25px',
    filter: 'sepia(0.3) hue-rotate(20deg) brightness(1.1)',
  },
  description: {
    color: params.disabled ? 'rgba(212, 197, 176, 0.4)' : 'rgba(212, 197, 176, 0.7)',
    fontSize: '12px',
    fontFamily: '"Montserrat", sans-serif',
    fontWeight: 600,
    fontStyle: 'normal',
  },
  dropdown: {
    background: `url(${ASSETS.WEATHERED_PAPER})`,
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat',
    padding: 15,
    color: '#D4C5B0',
    fontSize: 14,
    maxWidth: 256,
    width: 'fit-content',
    border: 'none',
    boxShadow: '4px 4px 12px rgba(0, 0, 0, 0.6)',
    fontFamily: '"RDR Lino Regular", serif',
  },
  buttonStack: {
    gap: 6,
    flex: '1',
  },
  buttonGroup: {
    gap: 8,
    flexWrap: 'nowrap',
  },
  buttonIconContainer: {
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTitleText: {
    overflowWrap: 'break-word',
    color: '#FFFFFF',
  },
  buttonArrowContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 25,
    height: 25,
    color: '#FFCA28',
    background: `url(${ASSETS.ARROW_RIGHT})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
}));

const ContextButton: React.FC<{
  option: [string, Option];
}> = ({ option }) => {
  const button = option[1];
  const buttonKey = option[0];
  const { classes } = useStyles({ disabled: button.disabled, readOnly: button.readOnly });

  return (
    <>
      <HoverCard
        position="right-start"
        disabled={button.disabled || !(button.metadata || button.image)}
        openDelay={200}
      >
        <HoverCard.Target>
          <Button
            classNames={{ inner: classes.inner, label: classes.label, root: classes.button }}
            onClick={() =>
              !button.disabled && !button.readOnly
                ? button.menu
                  ? openMenu(button.menu)
                  : clickContext(buttonKey)
                : null
            }
            variant="default"
            disabled={button.disabled}
          >
            <Group position="apart" w="100%" noWrap>
              <Stack className={classes.buttonStack}>
                {(button.title || Number.isNaN(+buttonKey)) && (
                  <Group className={classes.buttonGroup}>
                    {button?.icon && (
                      <Stack className={classes.buttonIconContainer}>
                        {typeof button.icon === 'string' && isIconUrl(button.icon) ? (
                          <img src={button.icon} className={classes.iconImage} alt="Missing img" />
                        ) : (
                          <LibIcon
                            icon={button.icon as IconProp}
                            fixedWidth
                            size="lg"
                            style={{ color: button.iconColor }}
                            animation={button.iconAnimation}
                          />
                        )}
                      </Stack>
                    )}
                    <Text className={classes.buttonTitleText}>
                      <ReactMarkdown components={MarkdownComponents}>{button.title || buttonKey}</ReactMarkdown>
                    </Text>
                  </Group>
                )}
                {button.description && (
                  <Text className={classes.description}>
                    <ReactMarkdown components={MarkdownComponents}>{button.description}</ReactMarkdown>
                  </Text>
                )}
                {button.progress !== undefined && (
                  <Progress value={button.progress} size="sm" color={button.colorScheme || 'dark.3'} />
                )}
              </Stack>
              {(button.menu || button.arrow) && button.arrow !== false && (
                <Stack className={classes.buttonArrowContainer}>
                </Stack>
              )}
            </Group>
          </Button>
        </HoverCard.Target>
        <HoverCard.Dropdown className={classes.dropdown}>
          {button.image && <Image src={button.image} />}
          {Array.isArray(button.metadata) ? (
            button.metadata.map(
              (
                metadata: string | { label: string; value?: any; progress?: number; colorScheme?: string },
                index: number
              ) => (
                <>
                  <Text key={`context-metadata-${index}`}>
                    {typeof metadata === 'string' ? `${metadata}` : `${metadata.label}: ${metadata?.value ?? ''}`}
                  </Text>

                  {typeof metadata === 'object' && metadata.progress !== undefined && (
                    <Progress
                      value={metadata.progress}
                      size="sm"
                      color={metadata.colorScheme || button.colorScheme || 'dark.3'}
                    />
                  )}
                </>
              )
            )
          ) : (
            <>
              {typeof button.metadata === 'object' &&
                Object.entries(button.metadata).map((metadata: { [key: string]: any }, index) => (
                  <Text key={`context-metadata-${index}`}>
                    {metadata[0]}: {metadata[1]}
                  </Text>
                ))}
            </>
          )}
        </HoverCard.Dropdown>
      </HoverCard>
    </>
  );
};

export default ContextButton;
