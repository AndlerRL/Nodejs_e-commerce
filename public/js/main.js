const root = document.getElementById('app-root');
const goDown = document.getElementById('go-down');

let theme = localStorage.getItem('user-theme');

theme = theme
  ? theme
  : 'theme-light';

root.classList.add(theme);

function changeThemeHandler () {
  const dark = root.classList.contains('theme-dark');
  
  if (dark) {
    root.classList.remove('theme-dark');
    root.classList.add('theme-light');
    localStorage.setItem('user-theme', 'theme-light')
  } else {
    root.classList.remove('theme-light');
    root.classList.add('theme-dark');
    localStorage.setItem('user-theme', 'theme-dark');
  }
}

goDown.addEventListener('click', () => {
  window.scroll({
    top: window.innerHeight,
    left: 0,
    behavior: 'smooth'
  })
})