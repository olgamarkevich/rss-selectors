import App from '../src/app/App';
import data from '../src/data';

describe('App', () => {
  const app = new App(data);
  app.init();

  app.goToLevel(9);

  it('should correct goToLevel', () => {
    expect(localStorage.getItem('currentLevelIndex')).toBe('8');
  });
});
