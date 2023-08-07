import Level from '../src/level/Level';
import data from '../src/data';

describe('Level', () => {
  const levelData = { ...data[0], items: [data[0].items[0]] };
  const level = new Level(levelData);

  const wrapper = document.createElement('div');
  wrapper.classList.add('inner-code');
  document.body.append(wrapper);

  level.renderExample();

  it('should render correct example', () => {
    expect(wrapper.innerHTML).toBe(
      '<div class="selector-name">The Universal Selector</div><div class="hepl-title">You can select everything!</div><div class="sintax">*</div><div class="help">You can select all elements with the universal selector!</div><div class="examles">p * selects any element inside all p elements.<p>Example</p></div>'
    );
  });
});
