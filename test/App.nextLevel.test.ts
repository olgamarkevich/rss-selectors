import App from '../src/app/App';
import data from '../src/data';

describe('App', () => {
  const app = new App(data);
  app.init();

  const levels = document.createElement('ul');
  levels.classList.add('level');
  document.body.append(levels);

  const level1 = document.createElement('li');
  level1.classList.add('level_item');
  levels.append(level1);

  const level2 = document.createElement('li');
  level2.classList.add('level_item');
  levels.append(level2);

  const level3 = document.createElement('li');
  level3.classList.add('level_item');
  levels.append(level3);

  app.nextLevel();

  it('should correct next level', () => {
    expect(level2.classList[1]).toBe('active');
  });
});
