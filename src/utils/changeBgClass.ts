export default function changeBgClass(newClassName?: string) {
  const oldTheme = document.body.classList
    .toString()
    .split(' ')
    .filter((className) => className.startsWith('bg-theme'));
  if (oldTheme) {
    document.body.classList.remove(...oldTheme);
  }
  if (newClassName) {
    document.body.classList.add(newClassName);
  }
}
