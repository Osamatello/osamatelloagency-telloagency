// Shared by every pointer type. Once a gesture becomes a drag, returning to
// the starting point must never turn its eventual click back into a tap.
export function createLensGesture(threshold = 8) {
  let pointer: number | null = null;
  let startX = 0;
  let startY = 0;
  let blocked = false;
  return {
    start(id: number, x: number, y: number) {
      pointer = id;
      startX = x;
      startY = y;
      blocked = false;
    },
    move(id: number, x: number, y: number) {
      if (pointer === id && Math.hypot(x - startX, y - startY) > threshold) blocked = true;
    },
    end(id: number, x: number, y: number) {
      this.move(id, x, y);
      if (pointer === id) pointer = null;
    },
    cancel() { pointer = null; blocked = true; },
    leave() { if (pointer !== null) this.cancel(); },
    allowsClick(detail: number) { return detail === 0 || !blocked; },
  };
}
