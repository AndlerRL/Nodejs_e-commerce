const root = document.getElementById('app-root');
const go = document.getElementsByClassName('mdl-layout__content')[0];
const settings = document.getElementById('settings');
const menu = document.getElementById('menu');
const fileUpload = document.querySelectorAll('input[type="file"]');

let theme = localStorage.getItem('user-theme');

theme = theme
  ? theme
  : null;

root.classList.add(theme);

window.addEventListener('load', () => {
  const { matchMedia } = this;
  if ((matchMedia('(prefers-color-scheme: dark)').matches)) {
    if (!theme) {
      root.classList.add('theme-dark')
      localStorage.setItem('user-theme', 'theme-dark')
    }
  } else {
    if (!theme) {
      root.classList.add('theme-light')
      localStorage.setItem('user-theme', 'theme-light')
    }
  }
})

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

function goDown () {
  const { innerHeight } = window;
  
  go.scroll({
    top: innerHeight,
    left: 0,
    behavior: 'smooth'
  })
};

function returnHomeHandler () {
  window.location.href = '/';
}

fileUpload.forEach.call(fileUpload, function (input) {
  const label = input.nextElementSibling;
  const labelVal = label.innerHTML;
  const multipleFiles = label.nextElementSibling;

  input.addEventListener('change', function (e) {
    let fileName = '';
    const files = [...this.files];
    console.log(files)

    multipleFiles.innerHTML = '';

    function readAndPreview (file) {
      const reader = new FileReader();
      
      reader.addEventListener('load', function(e) {
        file.name.search('.svg') !== -1
        ? multipleFiles.innerHTML += `
        <figure class="img-preview__item-container">
        <img src=${this.result} alt=${file.name} class="img-preview__item">
        <figcaption>${file.name.split('.svg')[0]}</figcaption>
        </figure>`
        : multipleFiles.innerHTML += `
        <figure class="img-preview__item-container">
        <img src=${this.result} alt=${file.name} class="img-preview__item">
        <figcaption>${file.name.split('.png')[0]}</figcaption>
        </figure>`
        
        const imageUrl = document.querySelectorAll('#imageUrl')[1];
        let imgResult = '';

        imgResult = this.result;
        
        imageUrl.setAttribute('value', imgResult)
      }, false);
      
      reader.readAsDataURL(file);
    }

    if (files && files.length > 1) {
      fileName = (this.getAttribute('data-multiple-caption') || '').replace('{count}', files.length);
      
      [].forEach.call(files, readAndPreview);
    } else if (files) {
      fileName = files[0].name.search('.svg') !== -1 
        ? files[0].name.split('.svg')[0] 
        : files[0].name.split('.png')[0];

      [].forEach.call(files, readAndPreview);
    }

    if (fileName)
      label.innerHTML = fileName;
    else
      label.innerHTML = labelVal;
  })
})