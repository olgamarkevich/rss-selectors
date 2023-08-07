import Level from '../src/level/Level';
import data from '../src/data';

describe('Level', () => {
  const levelData = { ...data[0], items: [data[0].items[0]] };
  const level = new Level(levelData);

  const input = document.createElement('input');
  input.classList.add('input-css');
  document.body.append(input);

  level.renderHelp();

  it('should render correct tooltip', () => {
    expect(input.value).toBe('*');
  });
});
