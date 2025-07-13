export const images = [
  'bg-[url(./images/red.jpeg)]',
  'bg-[url(./images/gray.jpeg)]',
  'bg-[url(./images/blue.jpeg)]',
  'bg-[url(./images/white.jpeg)]',
  'bg-[url(./images/blue-red.jpeg)]',
  'bg-[url(./images/pink.jpeg)]',
];
export function randomImages(array: Array<string> | undefined) {
  if (array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  } else return 'bg-[url(./images/red.jpg)]';
}
