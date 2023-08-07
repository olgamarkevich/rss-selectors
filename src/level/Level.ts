import { Data, LevelItem, LevelItemAttr } from '../data';

class Level {
  public isHelp = false;
  public isDone = false;

  constructor(public level: Data) {
    this.level = level;
  }

  private renderMarkupNode = (item: LevelItem, parent: Element) => {
    const node = document.createElement('div');
    node.classList.add('markupNode');

    this.renderOpeningTag(item, node);

    if (item.children?.length) {
      item.children.forEach((child) => {
        this.renderMarkupNode(child, node);
      });

      this.renderClosingTag(item, node);
    }

    node.setAttribute('id', item.id);
    parent.append(node);
  };

  private renderHighlighting(
    className: string,
    append: string,
    nodeLine: HTMLDivElement
  ) {
    const variableName = document.createElement('span');
    variableName.classList.add(className);
    variableName.append(append);
    nodeLine.append(variableName);
  }

  private renderOpeningTag(item: LevelItem, parent: Element) {
    const nodeLine = document.createElement('div');
    nodeLine.classList.add('markupNodeLine');

    this.renderHighlighting('opening-bracket', '<', nodeLine);
    this.renderHighlighting('tag-name', item.tagName, nodeLine);

    if (item.attrs) {
      for (const key in item.attrs) {
        this.renderHighlighting('attribute-name', ` ${key}`, nodeLine);
        this.renderHighlighting('attribute-equals', '=', nodeLine);
        this.renderHighlighting(
          'attribute-value',
          `"${item.attrs[key as LevelItemAttr]}"`,
          nodeLine
        );
      }
    }

    this.renderHighlighting(
      'closing-bracket',
      item.children?.length ? '>' : ' />',
      nodeLine
    );

    parent.append(nodeLine);
  }

  private renderClosingTag(item: LevelItem, parent: Element) {
    const nodeLine = document.createElement('div');
    nodeLine.classList.add('markupNodeLine');

    this.renderHighlighting('opening-bracket', '</', nodeLine);
    this.renderHighlighting('tag-name', item.tagName, nodeLine);
    this.renderHighlighting('closing-bracket', '>', nodeLine);

    parent.append(nodeLine);
  }

  public renderBoardMarkup() {
    const parent = document.querySelector('.boardMarkup');
    if (parent !== null) {
      parent.innerHTML = '';
    }

    if (parent) {
      this.level.items.forEach((item) => {
        this.renderMarkupNode(item, parent);
      });
    }
  }

  private renderSnippetNode(item: LevelItem, snippet: Element | null) {
    const node = document.createElement(item.tagName);
    node.setAttribute(`data-item-id`, item.id);
    if (item.attrs) {
      for (const key in item.attrs) {
        const attrValue = item.attrs[key as LevelItemAttr];

        if (attrValue) {
          node.setAttribute(`${key}`, attrValue);
        }
      }
    }

    if (item.target) {
      node.classList.add('animate');
    }

    snippet?.append(node);

    if (item.children?.length) {
      item.children.forEach((el) => {
        this.renderSnippetNode(el, node);
      });
    }
  }

  public renderCodeSnippet() {
    const snippet = document.querySelector('.figures');

    if (snippet !== null) {
      snippet.innerHTML = '';
    }

    this.level.items.forEach((item) => {
      this.renderSnippetNode(item, snippet);
    });
  }

  private addingElement(className: string, append: string, wrapper: Element) {
    const element = document.createElement('div');
    element.classList.add(className);
    element.insertAdjacentHTML('afterbegin', append);
    wrapper.append(element);
  }

  public renderExample() {
    const levelWrapper = document.querySelector('.inner-code');
    if (levelWrapper !== null) {
      levelWrapper.innerHTML = '';
    }

    if (levelWrapper !== null) {
      this.addingElement(
        'selector-name',
        `${this.level.selectorName}`,
        levelWrapper
      );

      this.addingElement('hepl-title', `${this.level.helpTitle}`, levelWrapper);
      this.addingElement('sintax', `${this.level.syntax}`, levelWrapper);
      this.addingElement('help', `${this.level.help}`, levelWrapper);
    }

    const examlesDiv = document.createElement('div');
    examlesDiv.classList.add('examles');

    const paragraf = document.createElement('p');
    paragraf.innerHTML = 'Example';
    examlesDiv.append(paragraf);

    this.level.examples.forEach((item) => {
      if (examlesDiv !== null) {
        examlesDiv.insertAdjacentHTML('afterbegin', item);
      }
    });
    levelWrapper?.append(examlesDiv);

    const order = document.querySelector('.order');
    if (order !== null) {
      order.innerHTML = '';
      order.insertAdjacentHTML('afterbegin', `${this.level.doThis}`);
    }
  }

  public renderHelp() {
    const promt = this.level.promt;

    const speed = 60;
    const element = document.querySelector<HTMLInputElement>('.input-css');
    if (element !== null) {
      element.value = '';
    }

    let i = 0;
    function typeWriter() {
      if (i < promt.length) {
        if (element !== null) {
          element.value += promt.charAt(i);
          element?.dispatchEvent(new Event('input'));
          i++;
          setTimeout(typeWriter, speed);
        }
      }
    }
    typeWriter();

    this.isHelp = true;
  }
}

export default Level;
