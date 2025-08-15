import { Button, createStyles } from '@mantine/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import LibIcon from '../../../../components/LibIcon';
import { ASSETS } from '../../../../utils/getAssetPath';

interface Props {
  icon: IconProp;
  canClose?: boolean;
  iconSize: number;
  handleClick: () => void;
}

const useStyles = createStyles((theme, params: { canClose?: boolean }) => ({
  button: {
    borderRadius: 0,
    flex: '1 15%',
    alignSelf: 'stretch',
    height: 'auto',
    minHeight: '40px',
    textAlign: 'center',
    justifyContent: 'center',
    padding: 8,
    background: `url(${ASSETS.SELECTION_BOX_BG})`,
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat',
    '&:hover': {
      background: `url(${ASSETS.SELECTION_BOX_BG}), url(${ASSETS.SELECTED})`,
      backgroundSize: '100% 100%, 100% 100%',
      backgroundRepeat: 'no-repeat, no-repeat',
      backgroundPosition: 'center, center',
    },
    '&[data-disabled]': {
      background: `url(${ASSETS.SELECTION_BOX_BG})`,
      backgroundSize: '100% 100%',
      backgroundRepeat: 'no-repeat',
      opacity: 0.3,
    },
  },
  root: {
    border: 'none',
  },
  label: {
    color: params.canClose === false ? 'rgba(212, 197, 176, 0.3)' : '#FFCA28',
    fontSize: '16px',
  },
}));

const HeaderButton: React.FC<Props> = ({ icon, canClose, iconSize, handleClick }) => {
  const { classes } = useStyles({ canClose });

  return (
    <Button
      variant="default"
      className={classes.button}
      classNames={{ label: classes.label, root: classes.root }}
      disabled={canClose === false}
      onClick={handleClick}
    >
      <LibIcon icon={icon} fontSize={iconSize} fixedWidth />
    </Button>
  );
};

export default HeaderButton;
