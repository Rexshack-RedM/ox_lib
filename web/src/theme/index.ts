import { MantineThemeOverride } from '@mantine/core';

export const theme: MantineThemeOverride = {
  colorScheme: 'dark',
  fontFamily: '"RDR Lino Regular", "Noto Sans JP", "Montserrat", serif', // Western font with CJK fallback
  shadows: { sm: 'none' }, // Remove modern shadows
  colors: {
    // Western color palette - sepia tones, leather, aged paper
    dark: [
      '#F5F3F0', // Aged paper light
      '#E8E0D4', // Light parchment  
      '#D4C5B0', // Weathered paper
      '#B8A082', // Aged leather light
      '#9B7A54', // Leather medium
      '#7D5A37', // Dark leather
      '#5C3E20', // Rich brown
      '#3A250D', // Deep brown
      '#1C0F03', // Very dark brown
      '#000000'  // Black
    ],
    // Gold/brass accents for highlights
    yellow: [
      '#FFF8E1',
      '#FFECB3', 
      '#FFE082',
      '#FFD54F',
      '#FFCA28', // Primary gold
      '#FFC107',
      '#FFB300',
      '#FFA000',
      '#FF8F00',
      '#FF6F00'
    ]
  },
  primaryColor: 'yellow',
  primaryShade: 4, // Use the gold shade
  components: {
    Button: {
      styles: {
        root: {
          border: 'none',
          background: 'url(./assets/selection_box_bg_1d.png)',
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
          color: '#FFFFFF', // Weathered paper text
          fontFamily: '"RDR Lino Regular", serif',
          fontSize: '14px',
          fontWeight: 400,
          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)',
          padding: '8px 16px',
          '&:hover': {
            background: `url(/src/assets/selection_box_bg_1d.png), url(/src/assets/selsected.png)`,
            backgroundSize: '100% 100%, 100% 100%',
            backgroundRepeat: 'no-repeat, no-repeat',
            backgroundPosition: 'center, center',
            color: '#FFF8E1', // Brighter on hover
          }
        },
      },
    },
    Paper: {
      styles: {
        root: {
          background: 'url(./assets/large_weathered_paper.png)',
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
          border: 'none',
          boxShadow: 'none',
          color: '#FFFFFF',
        }
      }
    },
    Modal: {
      styles: {
        modal: {
          background: 'url(./assets/large_weathered_paper.png)',
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
          border: 'none',
          boxShadow: 'none',
          color: '#FFFFFF',
        }
      }
    },
    TextInput: {
      styles: {
        input: {
          background: 'url(./assets/selection_box_bg_1d.png)',
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
          border: 'none',
          borderRadius: 0,
          color: '#FFFFFF',
          fontFamily: '"RDR Lino Regular", serif',
          padding: '12px 16px',
          '&:focus': {
            background: 'url(./assets/selection_box_bg_1d.png), url(./assets/selsected.png)',
            backgroundSize: '100% 100%, 100% 100%',
            backgroundRepeat: 'no-repeat, no-repeat',
            backgroundPosition: 'center, center',
          },
        },
        label: {
          color: '#FFFFFF',
          fontFamily: '"RDR Lino Regular", serif',
          fontSize: '14px',
          fontWeight: 'normal',
        },
        description: {
          color: 'rgba(212, 197, 176, 0.7)',
          fontFamily: '"Montserrat", sans-serif',
          fontWeight: 600,
          fontSize: '12px',
        }
      }
    },
    PasswordInput: {
      styles: {
        input: {
          background: 'url(./assets/selection_box_bg_1d.png)',
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
          border: 'none',
          borderRadius: 0,
          color: '#FFFFFF',
          fontFamily: '"RDR Lino Regular", serif',
          padding: '12px 16px',
          '&:focus': {
            background: 'url(./assets/selection_box_bg_1d.png), url(./assets/selsected.png)',
            backgroundSize: '100% 100%, 100% 100%',
            backgroundRepeat: 'no-repeat, no-repeat',
            backgroundPosition: 'center, center',
          },
        },
        label: {
          color: '#FFFFFF',
          fontFamily: '"RDR Lino Regular", serif',
          fontSize: '14px',
          fontWeight: 'normal',
        },
        description: {
          color: 'rgba(212, 197, 176, 0.7)',
          fontFamily: '"Montserrat", sans-serif',
          fontWeight: 600,
          fontSize: '12px',
        }
      }
    },
    Textarea: {
      styles: {
        input: {
          background: 'url(./assets/selection_box_bg_1d.png)',
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
          border: 'none',
          borderRadius: 0,
          color: '#FFFFFF',
          fontFamily: '"RDR Lino Regular", serif',
          padding: '12px 16px',
          minHeight: '80px',
          '&:focus': {
            background: 'url(./assets/selection_box_bg_1d.png), url(./assets/selsected.png)',
            backgroundSize: '100% 100%, 100% 100%',
            backgroundRepeat: 'no-repeat, no-repeat',
            backgroundPosition: 'center, center',
          },
        },
        label: {
          color: '#FFFFFF',
          fontFamily: '"RDR Lino Regular", serif',
          fontSize: '14px',
          fontWeight: 'normal',
        },
        description: {
          color: 'rgba(212, 197, 176, 0.7)',
          fontFamily: '"Montserrat", sans-serif',
          fontWeight: 600,
          fontSize: '12px',
        }
      }
    },
    NumberInput: {
      styles: {
        input: {
          background: 'url(./assets/selection_box_bg_1d.png)',
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
          border: 'none',
          borderRadius: 0,
          color: '#FFFFFF',
          fontFamily: '"RDR Lino Regular", serif',
          padding: '12px 16px',
          '&:focus': {
            background: 'url(./assets/selection_box_bg_1d.png), url(./assets/selsected.png)',
            backgroundSize: '100% 100%, 100% 100%',
            backgroundRepeat: 'no-repeat, no-repeat',
            backgroundPosition: 'center, center',
          },
        },
        label: {
          color: '#FFFFFF',
          fontFamily: '"RDR Lino Regular", serif',
          fontSize: '14px',
          fontWeight: 'normal',
        },
        description: {
          color: 'rgba(212, 197, 176, 0.7)',
          fontFamily: '"Montserrat", sans-serif',
          fontWeight: 600,
          fontSize: '12px',
        }
      }
    },
    Select: {
      styles: {
        input: {
          background: 'url(./assets/selection_box_bg_1d.png)',
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
          border: 'none',
          borderRadius: 0,
          color: '#FFFFFF',
          fontFamily: '"RDR Lino Regular", serif',
          padding: '12px 16px',
          '&:focus': {
            background: 'url(./assets/selection_box_bg_1d.png), url(./assets/selsected.png)',
            backgroundSize: '100% 100%, 100% 100%',
            backgroundRepeat: 'no-repeat, no-repeat',
            backgroundPosition: 'center, center',
          },
        },
        label: {
          color: '#FFFFFF',
          fontFamily: '"RDR Lino Regular", serif',
          fontSize: '14px',
          fontWeight: 'normal',
        },
        description: {
          color: 'rgba(212, 197, 176, 0.7)',
          fontFamily: '"Montserrat", sans-serif',
          fontWeight: 600,
          fontSize: '12px',
        },
        dropdown: {
          background: 'url(./assets/weathered_paper.png)',
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
          border: 'none',
          borderRadius: 0,
        },
        item: {
          color: '#FFFFFF',
          fontFamily: '"RDR Lino Regular", serif',
          '&[data-selected]': {
            background: 'url(/src/assets/selsected.png)',
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat',
            color: '#FFF8E1',
          },
          '&[data-hovered]': {
            background: 'rgba(212, 197, 176, 0.1)',
          },
        }
      }
    },
    TimeInput: {
      styles: {
        input: {
          background: 'url(./assets/selection_box_bg_1d.png)',
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
          border: 'none',
          borderRadius: 0,
          color: '#FFFFFF',
          fontFamily: '"RDR Lino Regular", serif',
          padding: '4px 12px',
          height: 'auto',
          minHeight: '36px',
          display: 'flex',
          alignItems: 'center',
          '&:focus': {
            background: 'url(./assets/selection_box_bg_1d.png), url(./assets/selsected.png)',
            backgroundSize: '100% 100%, 100% 100%',
            backgroundRepeat: 'no-repeat, no-repeat',
            backgroundPosition: 'center, center',
          },
        },
        label: {
          color: '#FFFFFF',
          fontFamily: '"RDR Lino Regular", serif',
          fontSize: '14px',
          fontWeight: 'normal',
        },
        description: {
          color: 'rgba(212, 197, 176, 0.7)',
          fontFamily: '"Montserrat", sans-serif',
          fontWeight: 600,
          fontSize: '12px',
        }
      }
    },
    DateInput: {
      styles: {
        input: {
          background: 'url(./assets/selection_box_bg_1d.png)',
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
          border: 'none',
          borderRadius: 0,
          color: '#FFFFFF',
          fontFamily: '"RDR Lino Regular", serif',
          padding: '12px 16px',
          '&:focus': {
            background: 'url(./assets/selection_box_bg_1d.png), url(./assets/selsected.png)',
            backgroundSize: '100% 100%, 100% 100%',
            backgroundRepeat: 'no-repeat, no-repeat',
            backgroundPosition: 'center, center',
          },
        },
        label: {
          color: '#FFFFFF',
          fontFamily: '"RDR Lino Regular", serif',
          fontSize: '14px',
          fontWeight: 'normal',
        },
        description: {
          color: 'rgba(212, 197, 176, 0.7)',
          fontFamily: '"Montserrat", sans-serif',
          fontWeight: 600,
          fontSize: '12px',
        }
      }
    },
    Checkbox: {
      styles: {
        input: {
          background: 'url(./assets/selection_box_bg_1d.png)',
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
          border: 'none',
          borderRadius: 0,
          width: '20px',
          height: '20px',
          '&:checked': {
            background: 'url(./assets/selection_box_bg_1d.png), url(./assets/selsected.png)',
            backgroundSize: '100% 100%, 100% 100%',
            backgroundRepeat: 'no-repeat, no-repeat',
            backgroundPosition: 'center, center',
          },
          '&:checked::before': {
            content: '""',
            position: 'absolute',
            width: '12px',
            height: '12px',
            background: '#FFFFFF',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '2px',
          }
        },
        label: {
          color: '#FFFFFF',
          fontFamily: '"RDR Lino Regular", serif',
          fontSize: '14px',
          fontWeight: 'normal',
          paddingLeft: '8px',
        },
        description: {
          color: 'rgba(212, 197, 176, 0.7)',
          fontFamily: '"Montserrat", sans-serif',
          fontWeight: 600,
          fontSize: '12px',
          paddingLeft: '28px',
        }
      }
    },
    Slider: {
      styles: {
        track: {
          background: 'url(./assets/selection_box_bg_1d.png)',
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
          height: '12px',
          borderRadius: 0,
          border: 'none',
        },
        bar: {
          background: '#FFFFFF',
          borderRadius: 0,
        },
        thumb: {
          background: 'url(./assets/weathered_paper.png)',
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
          border: '2px solid #FFFFFF',
          borderRadius: '50%',
          width: '20px',
          height: '20px',
        },
        label: {
          color: '#FFFFFF',
          fontFamily: '"RDR Lino Regular", serif',
          fontSize: '14px',
          fontWeight: 'normal',
        },
        markLabel: {
          color: 'rgba(212, 197, 176, 0.7)',
          fontFamily: '"Montserrat", sans-serif',
          fontWeight: 600,
          fontSize: '11px',
        }
      }
    },
    ColorInput: {
      styles: {
        input: {
          background: 'url(./assets/selection_box_bg_1d.png)',
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
          border: 'none',
          borderRadius: 0,
          color: '#FFFFFF',
          fontFamily: '"RDR Lino Regular", serif',
          padding: '12px 16px',
          '&:focus': {
            background: 'url(./assets/selection_box_bg_1d.png), url(./assets/selsected.png)',
            backgroundSize: '100% 100%, 100% 100%',
            backgroundRepeat: 'no-repeat, no-repeat',
            backgroundPosition: 'center, center',
          },
        },
        label: {
          color: '#FFFFFF',
          fontFamily: '"RDR Lino Regular", serif',
          fontSize: '14px',
          fontWeight: 'normal',
        },
        description: {
          color: 'rgba(212, 197, 176, 0.7)',
          fontFamily: '"Montserrat", sans-serif',
          fontWeight: 600,
          fontSize: '12px',
        }
      }
    }
  },
};
