import App from '../src/app/App';
import data from '../src/data';

describe('App', () => {
  const app = new App(data);
  app.init();

  app.resetProgress();

  it('should correct reset progress', () => {
    expect(localStorage.getItem('currentLevelIndex')).toBe('0');
  });
});
