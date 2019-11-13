const root = document.getElementById('app-root');
const goDown = document.getElementById('go-down');
const settings = document.getElementById('settings');
const menu = document.getElementById('menu');

let theme = localStorage.getItem('user-theme');
let product_id = null;

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

if (goDown) {
  goDown.addEventListener('click', () => {
    window.scroll({
      top: window.innerHeight,
      left: 0,
      behavior: 'smooth'
    })
  });
}

settings.addEventListener('click', function () {
  const opt = document.getElementsByClassName('settings-container')[0];

  if (opt.classList.contains('Show-Settings')) {
    opt.classList.toggle('Hide-Settings');
    this.classList.toggle('Half-Spin-Return');
  } else {
    opt.classList.toggle('Show-Settings');
    this.classList.toggle('Half-Spin');
  }
});

function productDetailsHandler(e) {
  localStorage.setItem('product_id', e.id);
  product_id = e.id;

  window.location.pathname = '/product-detail';
}

function toggleMenuHandler () {
  const opt = document.getElementsByClassName('sidedrawer-container')[0];
  const backdrop = document.getElementsByClassName('backdrop')[0];

  if (opt.classList.contains('Show-Menu')) {
    opt.classList.toggle('Hide-Menu');
    backdrop.classList.toggle('Show-Backdrop');
  } else {
    opt.classList.toggle('Show-Menu');
    backdrop.classList.toggle('Show-Backdrop');
  }
}

function returnHomeHandler () {
  window.location.href = '/';
}