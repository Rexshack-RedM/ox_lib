import { Checkbox, createStyles } from '@mantine/core';
import { ASSETS } from '../../../utils/getAssetPath';

const useStyles = createStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    background: `url(${ASSETS.SELECTION_BOX_BG})`,
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat',
    border: 'none',
    borderRadius: 0,
    width: '20px',
    height: '20px',
    '&:checked': {
      background: `url(${ASSETS.SELECTION_BOX_BG}), url(${ASSETS.SELECTED})`,
      backgroundSize: '100% 100%, 100% 100%',
      backgroundRepeat: 'no-repeat, no-repeat',
      backgroundPosition: 'center, center',
    },
    '&:focus': {
      boxShadow: 'none',
    },
  },
  inner: {
    '> svg': {
      width: '12px',
      height: '12px',
    },
    '> svg > path': {
      fill: '#FFFFFF',
    },
  },
}));

const CustomCheckbox: React.FC<{ checked: boolean }> = ({ checked }) => {
  const { classes } = useStyles();
  return (
    <Checkbox
      checked={checked}
      size="md"
      classNames={{ root: classes.root, input: classes.input, inner: classes.inner }}
    />
  );
};

export default CustomCheckbox;
