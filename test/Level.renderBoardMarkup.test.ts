import Level from '../src/level/Level';
import data from '../src/data';

describe('Level', () => {
  const parent = document.createElement('div');
  parent.classList.add('boardMarkup');
  document.body.append(parent);

  const levelData = { ...data[0], items: [data[0].items[0]] };
  const level = new Level(levelData);

  level.renderBoardMarkup();

  it('should render correct board markup', () => {
    expect(parent.innerHTML).toBe(
      '<div class="markupNode" id="l1i1"><div class="markupNodeLine"><span class="opening-bracket">&lt;</span><span class="tag-name">circle</span><span class="closing-bracket"> /&gt;</span></div></div>'
    );
  });
});
