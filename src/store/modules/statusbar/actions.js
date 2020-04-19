export function statusbarUpdateColor(color) {
  return {
    type: '@statusbar/UPDATE_COLOR',
    payload: color,
  };
}
