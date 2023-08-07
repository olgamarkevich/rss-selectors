import Level from '../src/level/Level';
import data from '../src/data';

describe('Level', () => {
  const levelData = { ...data[0], items: [data[0].items[0]] };
  const level = new Level(levelData);

  const figures = document.createElement('div');
  figures.classList.add('figures');
  document.body.append(figures);

  level.renderCodeSnippet();

  it('should render correct code snippet', () => {
    expect(figures.innerHTML).toBe(
      '<circle data-item-id="l1i1" class="animate"></circle>'
    );
  });
});
