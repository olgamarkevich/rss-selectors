import Level from '../level/Level';
import { Data } from '../data';

class App {
  private levels;
  private currentLevelIndex;

  constructor(data: Data[]) {
    this.currentLevelIndex = 0;
    this.levels = data.map((item) => {
      const level = new Level(item);
      return level;
    });
  }

  public init() {
    this.loadLevelsState();

    const savedLevel = localStorage.getItem('currentLevelIndex');
    if (savedLevel === null) {
      this.goToLevel(1);
    } else {
      this.goToLevel(+savedLevel + 1);
    }

    this.renderLevel();
    this.addEventListeners();
  }

  private addEventListeners() {
    const helpbtn = document.querySelector('.help-btn');

    helpbtn?.addEventListener('click', () => {
      this.levels[this.currentLevelIndex].renderHelp();
      const input = document.querySelector<HTMLImageElement>('.input-css');
      input?.focus();
    });

    this.addBoardEventListener('mouseover');
    this.addBoardEventListener('mouseout');
    this.addFigureEventListener('mouseover');
    this.addFigureEventListener('mouseout');
  }

  public resetProgress() {
    localStorage.setItem('currentLevelIndex', '0');
    this.currentLevelIndex = 0;
    const levelsState = this.levels.map(() => {
      return 0;
    });
    localStorage.setItem('levelsState', JSON.stringify(levelsState));
    this.loadLevelsState();
    this.goToLevel(1);
    this.renderLevel();
  }

  private addBoardEventListener(event: string) {
    const method = event === 'mouseover' ? 'add' : 'remove';
    document.querySelector('.boardMarkup')?.addEventListener(event, (e) => {
      const target = e.target as HTMLElement;

      const parentNode = target.parentNode?.parentNode as HTMLElement;
      const parent = target.parentNode as HTMLElement;

      if (parent.classList.contains('markupNodeLine')) {
        parentNode.classList[method]('hover');
        const idNode = parentNode.getAttribute('id');
        const element = document.querySelector(
          `[data-item-id=${idNode}]`
        ) as HTMLElement;
        element?.classList[method]('hover');

        if (event == 'mouseover' && element !== null) {
          this.renderPromtBoard(element);
        } else {
          this.removePromt(element);
        }
      }
    });
  }

  private addFigureEventListener(event: string) {
    const method = event === 'mouseover' ? 'add' : 'remove';
    document.querySelector('.figures')?.addEventListener(event, (e) => {
      const target = e.target as HTMLElement;

      if (target.hasAttribute('data-item-id')) {
        target.classList[method]('hover');
        const idNode = target.getAttribute('data-item-id');
        const element = document.getElementById(`${idNode}`);
        element?.classList[method]('hover');
      }

      if (event == 'mouseover') {
        this.renderPromt(target);
      } else this.removePromt(target);
    });
  }

  private renderPromtBoard(element: HTMLElement) {
    this.renderPromt(element);
  }

  private removePromt(target: HTMLElement) {
    if (!target.classList.contains('figures')) {
      const children = target.childNodes as unknown as HTMLElement[];
      children.forEach((item) => {
        if (item.classList.contains('promt')) {
          item.remove();
        }
      });
    }
  }

  public renderPromt(target: HTMLElement) {
    if (!target.classList.contains('figures')) {
      const dupTarget = target.cloneNode(false) as HTMLElement;
      dupTarget.removeAttribute('data-item-id');
      dupTarget.classList.remove('hover');
      dupTarget.classList.remove('animate');
      if (dupTarget.classList.value == '') {
        dupTarget.removeAttribute('class');
      }
      const promt = document.createElement('div');
      promt.classList.add('promt');
      promt.innerText = dupTarget.outerHTML;

      target.append(promt);
    }
  }

  public goToLevel(numberLevel: number) {
    this.currentLevelIndex = numberLevel - 1;
    localStorage.setItem('currentLevelIndex', `${this.currentLevelIndex}`);
    this.levels[this.currentLevelIndex].renderExample();
    this.levels[this.currentLevelIndex].renderCodeSnippet();
    this.levels[this.currentLevelIndex].renderBoardMarkup();
    this.clearCssEtitor();
  }

  public nextLevel() {
    const allItems = document.querySelectorAll('.level_item');
    allItems[this.currentLevelIndex].classList.remove('active');
    allItems[this.currentLevelIndex].classList.add('done');
    this.levels[this.currentLevelIndex].isDone = true;
    this.saveLevelsState();
    if (this.levels[this.currentLevelIndex].isHelp == true) {
      allItems[this.currentLevelIndex].classList.add('help-icon');
    }

    const allItemsFilter = this.levels.filter((item) => !item.isDone);

    if (allItemsFilter[0] !== undefined) {
      const index = this.levels.indexOf(allItemsFilter[0]);
      this.goToLevel(index + 1);
      allItems[index].classList.add('active');
    } else {
      this.modalWin();
    }
  }

  private modalWin() {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    const modalWrapper = document.createElement('div');
    modalWrapper.classList.add('modal-wrapper');
    modal.append(modalWrapper);
    const textModal = document.createElement('div');
    textModal.classList.add('text-modal');
    textModal.textContent = 'You completed all levels';
    modalWrapper.append(textModal);

    const newGame = document.createElement('button');
    newGame.classList.add('btn');
    newGame.setAttribute('id', 'new-game');
    newGame.textContent = 'new game';
    modalWrapper.append(newGame);
    document.body.style.overflow = 'hidden';
    document.body.append(modal);

    newGame.addEventListener('click', () => {
      this.resetProgress();
      document.body.style.overflow = 'auto';
      modal.style.display = 'none';
    });
  }

  private renderLevel() {
    const level = document.querySelector('.level');
    if (level !== null) {
      level.innerHTML = '';
    }

    this.levels.forEach((item, i) => {
      const li = document.createElement('LI');
      li.classList.add('level_item');
      if (i == this.currentLevelIndex) {
        li.classList.add('active');
      }
      if (item.isDone) {
        li.classList.add('done');
      }
      if (item.isHelp) {
        li.classList.add('help-icon');
      }
      li.insertAdjacentHTML('afterbegin', `${i + 1}`);
      level?.append(li);
    });
  }

  private clearCssEtitor() {
    const element = document.querySelector<HTMLInputElement>('.input-css');
    if (element !== null) {
      element.value = '';
      element?.dispatchEvent(new Event('input'));
    }
  }

  public validateAnswer(answer: string) {
    try {
      const searchTags = document.querySelectorAll(`.figures ${answer}`);

      let targetsCount = 0;
      searchTags.forEach((item) => {
        if (item.classList.contains('animate')) {
          targetsCount += 1;
        }
      });
      if (
        targetsCount == this.levels[this.currentLevelIndex].level.targetsCount
      ) {
        searchTags.forEach((item) => {
          if (item.classList.contains('animate')) {
            item.classList.add('animate-win');
          }
        });
        setTimeout(() => {
          this.nextLevel();
        }, 1000);
      } else {
        document.querySelector('.editor')?.classList.toggle('animate-arrow');
        setTimeout(() => {
          document.querySelector('.editor')?.classList.remove('animate-arrow');
        }, 500);
      }
    } catch (err) {
      document.querySelector('.editor')?.classList.toggle('animate-arrow');

      setTimeout(() => {
        document.querySelector('.editor')?.classList.remove('animate-arrow');
      }, 500);
    }
  }

  private saveLevelsState() {
    const levelsState = this.levels.map((level) => {
      if (level.isHelp) {
        return 2;
      } else if (level.isDone) {
        return 1;
      } else {
        return 0;
      }
    });

    localStorage.setItem('levelsState', JSON.stringify(levelsState));
  }

  private loadLevelsState() {
    const levelsStateJson = localStorage.getItem('levelsState');
    if (levelsStateJson !== null) {
      const levelsState = JSON.parse(levelsStateJson) as number[];
      levelsState.forEach((value, i) => {
        this.levels[i].isDone = value >= 1;
        this.levels[i].isHelp = value >= 2;
      });
    }
  }
}

export default App;
