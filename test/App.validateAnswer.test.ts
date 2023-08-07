import App from '../src/app/App';
import data from '../src/data';

describe('App', () => {
  const app = new App(data);
  app.init();

  const figures = document.createElement('div');
  figures.classList.add('figures');
  document.body.append(figures);

  figures.innerHTML =
    '<div class="figures"><circle data-item-id="l1i1" class="animate"></circle><square data-item-id="l1i2" class="animate"></square><heart data-item-id="l1i3" class="animate"></heart><circle data-item-id="l1i4" class="yellow animate"></circle><trapeze data-item-id="l1i5" class="animate"></trapeze><arrow data-item-id="l1i6" class="animate"></arrow></div>';

  app.validateAnswer('*');

  it('should correct validate answer', () => {
    expect(figures.innerHTML).toBe(
      '<div class="figures"><circle data-item-id="l1i1" class="animate animate-win"></circle><square data-item-id="l1i2" class="animate animate-win"></square><heart data-item-id="l1i3" class="animate animate-win"></heart><circle data-item-id="l1i4" class="yellow animate animate-win"></circle><trapeze data-item-id="l1i5" class="animate animate-win"></trapeze><arrow data-item-id="l1i6" class="animate animate-win"></arrow></div>'
    );
  });
});
