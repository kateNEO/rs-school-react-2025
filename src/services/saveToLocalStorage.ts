export function saveToLocalStorage(stringFromInput: string) {
  localStorage.setItem('lastRequest', stringFromInput);
}
