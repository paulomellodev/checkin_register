export const randomCode = () => {
  const source = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  let code: string = "";

  let previousPosition: number = source.length;

  for (let i = 0; i < 8; ) {
    let randomPosition = Math.floor(Math.random() * source.length);
    if (randomPosition !== previousPosition) {
      code += source[randomPosition];
      i++;
      previousPosition = randomPosition;
    }
  }
  return code;
};
