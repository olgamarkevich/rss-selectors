import App from '../src/app/App';
import data from '../src/data';

describe('App', () => {
  const app = new App(data);
  app.init();
  const circe = document.createElement('circe');
  circe.setAttribute('data-item-id', '1');
  document.body.append(circe);

  app.renderPromt(circe);

  it('should render correct promt', () => {
    expect(circe.innerHTML).toBe('<div class="promt"></div>');
  });
});
