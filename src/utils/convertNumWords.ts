export default function convertNumWords(number: number, titles: string[]) {
  const cases = [2, 0, 1, 1, 1, 2];
  const value = Math.abs(number);
  return titles[
    value % 100 > 4 && value % 100 < 20
      ? 2
      : cases[value % 10 < 5 ? value % 10 : 5]
  ];
}
