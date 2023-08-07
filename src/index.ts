import './style.css';
import 'normalize.css';
import 'highlight.js/styles/github-dark.css';
import data from './data';
import App from './app/App';
import hljs from 'highlight.js';

const app = new App(data);
app.init();

const nextBtn = document.querySelector('.level');

nextBtn?.addEventListener('click', (e: Event) => {
  const nextBtnList = document.querySelectorAll('.level_item');
  nextBtnList.forEach((item) => {
    console.log(item);
    item.classList.remove('active');
  });

  const target = e.target as HTMLElement;
  if (target.tagName == 'LI') {
    target.classList.add('active');
    app.goToLevel(+target.innerHTML);
  }
});

document.querySelector('.input-css')?.addEventListener('input', (e: Event) => {
  const target = e.target as HTMLTextAreaElement;
  const css = hljs.highlight(target.value, {
    language: 'css',
  }).value;

  const code = document.querySelector('.input-css-prettier');
  if (code !== null) {
    code.innerHTML = css;
  }
});

const enter = document.querySelector('.enter');

enter?.addEventListener('click', () => {
  const answer = document.querySelector<HTMLInputElement>('.input-css')?.value;
  if (answer !== undefined) {
    app.validateAnswer(answer);
  }
});

document
  .querySelector('.input-css')
  ?.addEventListener('keyup', function (e: Event) {
    const keyboardEvent = <KeyboardEvent>e;
    if (keyboardEvent.key == 'Enter') {
      enter?.dispatchEvent(new Event('click'));
    }
  });

document.getElementById('resetProgress')?.addEventListener('click', () => {
  app.resetProgress();
});

export default app;
