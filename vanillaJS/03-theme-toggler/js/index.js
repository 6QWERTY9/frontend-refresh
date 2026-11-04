const checkbox = document.getElementById('theme_checkbox');
const htmlElement = document.documentElement;
const savedTheme = localStorage.getItem('theme');

if (savedTheme) {
    htmlElement.setAttribute('data-theme', savedTheme);

    if (savedTheme === 'dark') {
        checkbox.checked = true;
    }
}

checkbox.addEventListener('change', (event) => {
    if (event.target.checked) {
        htmlElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }   else {
        htmlElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }

})