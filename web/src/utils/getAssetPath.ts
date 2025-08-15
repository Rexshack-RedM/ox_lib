// Helper function to get correct asset paths for both dev and production
export const getAssetPath = (assetName: string): string => {
  // In development, Vite serves assets from /src/assets/
  // In production build, assets are processed to ./assets/
  if (import.meta.env.DEV) {
    return `/src/assets/${assetName}`;
  }
  return `./assets/${assetName}`;
};

// Pre-defined asset paths for easy use
export const ASSETS = {
  LARGE_WEATHERED_PAPER: getAssetPath('large_weathered_paper.png'),
  SELECTION_BOX_BG: getAssetPath('selection_box_bg_1d.png'),
  SELECTED: getAssetPath('selsected.png'),
  MENU_HEADER: getAssetPath('menu_header_1a.png'),
  DIVIDER_LINE: getAssetPath('divider_line.png'),
  WEATHERED_PAPER: getAssetPath('weathered_paper.png'),
  ARROW_RIGHT: getAssetPath('arrow_right.png'),
  CHECK: getAssetPath('check.png'),
  CROSS: getAssetPath('cross.png'),
  MENU_ICON_ALERT: getAssetPath('menu_icon_alert.png'),
  SELECTED_ITEM_BOX: getAssetPath('selected-item-box.png'),
  RADIAL_MENU_CENTER_BG: getAssetPath('radial_menu_center_bg.png'),
  PROGRESS: getAssetPath('progress.png'),
};