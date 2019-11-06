const root = document.getElementById('app-root');

function changeThemeHandler () {
  const dark = root.classList.contains('theme-dark');
  const light = root.classList.contains('theme-light');
  
  if (dark) {
    root.classList.remove('theme-dark');
    root.classList.add('theme-light');
  } else {
    root.classList.remove('theme-light');
    root.classList.add('theme-dark');
  }
}