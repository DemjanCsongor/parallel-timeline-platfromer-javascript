export function collision({ object1, object2 }) {
  if (!object1 || !object2) {
    console.error("One of the objects is undefined:", object1, object2);
    return false;
  }
  return (
    object1.position.y + object1.height >= object2.hitbox.position.y &&
    object1.position.y <= object2.hitbox.position.y + object2.hitbox.height &&
    object1.position.x <= object2.hitbox.position.x + object2.hitbox.width &&
    object1.position.x + object1.width >= object2.hitbox.position.x
  );
}

export function clonePosition(position) {
  return { x: position.x, y: position.y };
}

export function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}