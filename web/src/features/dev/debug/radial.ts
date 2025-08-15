import { debugData } from '../../../utils/debugData';
import type { RadialMenuItem } from '../../../typings';

export const debugRadial = () => {
  debugData<{ items: RadialMenuItem[]; sub?: boolean }>([
    {
      action: 'openRadialMenu',
      data: {
        items: [
          { icon: 'palette', label: 'Paint' },
          { iconWidth: 35, iconHeight: 35, icon: 'https://icon-library.com/images/white-icon-png/white-icon-png-18.jpg', label: 'External icon'},
          { icon: 'warehouse', label: 'Garage' },
          { icon: 'wrench', label: 'Repair' },
          { icon: 'gas-pump', label: 'Fuel' },
          { icon: 'car', label: 'Vehicle' },
          { icon: 'key', label: 'Keys' },
          { icon: 'lock', label: 'Lock/Unlock' },
          { icon: 'door-open', label: 'Doors' },
          { icon: 'music', label: 'Radio' },
          { icon: 'map', label: 'Navigation' },
          { icon: 'cog', label: 'Settings' },
          { icon: 'user', label: 'Driver' },
          { icon: 'users', label: 'Passengers' },
        ],
      },
    },
  ]);
};
