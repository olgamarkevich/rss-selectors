import App from '../src/app/App';
import data from '../src/data';

describe('App', () => {
  const app = new App(data);

  const levels = document.createElement('ul');
  levels.classList.add('level');
  document.body.append(levels);

  app.init();

  it('should correct init', () => {
    expect(levels.children.length).toBe(10);
  });
});
