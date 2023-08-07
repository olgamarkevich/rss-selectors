export type LevelItemAttr = 'id' | 'class' | 'vertex';

export interface LevelItem {
  id: string;
  tagName: string;
  target?: boolean;
  attrs?: {
    [key in LevelItemAttr]?: string;
  };
  children?: LevelItem[];
}

export interface Data {
  doThis: string;
  selectorName: string;
  helpTitle: string;
  syntax: string;
  help: string;
  examples: string[];
  items: LevelItem[];
  promt: string;
  targetsCount: number;
}

const data: Data[] = [
  {
    doThis: 'Select all shapes',
    selectorName: 'The Universal Selector',
    helpTitle: 'You can select everything!',
    syntax: '*',
    help: 'You can select all elements with the universal selector!',
    examples: ['p * selects any element inside all p elements.'],
    promt: '*',
    targetsCount: 6,
    items: [
      {
        id: 'l1i1',
        tagName: 'circle',
        target: true,
      },
      {
        id: 'l1i2',
        tagName: 'square',
        target: true,
      },
      {
        id: 'l1i3',
        tagName: 'heart',
        target: true,
      },
      {
        id: 'l1i4',
        tagName: 'circle',
        target: true,
        attrs: {
          class: 'yellow',
        },
      },
      {
        id: 'l1i5',
        tagName: 'trapeze',
        target: true,
      },
      {
        id: 'l1i6',
        tagName: 'arrow',
        target: true,
      },
    ],
  },
  {
    doThis: 'Select the yellow shapes',
    selectorName: 'Class Selector',
    helpTitle: 'Select elements by their class',
    syntax: '.classname',
    help: 'The class selector selects all elements with that class attribute. Elements can only have one ID, but many classes.',
    examples: ['.neato selects all elements with class="neato"'],
    promt: '.yellow',
    targetsCount: 2,
    items: [
      {
        id: 'l2i1',
        tagName: 'circle',
        target: true,
        attrs: {
          class: 'yellow',
        },
      },
      {
        id: 'l2i2',
        tagName: 'square',
      },
      {
        id: 'l2i3',
        tagName: 'heart',
      },
      {
        id: 'l2i4',
        tagName: 'arrow',
      },

      {
        id: 'l2i5',
        tagName: 'square',
        target: true,
        attrs: {
          class: 'yellow',
        },
      },
    ],
  },
  {
    doThis: 'Select the hearts next after the squares',
    selectorName: 'Adjacent Sibling Selector',
    helpTitle: 'Select an element that directly follows another element',
    syntax: 'A + B',
    help: 'his selects all B elements that directly follow A. Elements that follow one another are called siblings. Theyre on the same level, or depth.',
    examples: [
      'p + .intro selects every element with class="intro" that directly follows a p',
    ],
    promt: 'square + heart',
    targetsCount: 2,
    items: [
      {
        id: 'l3i1',
        tagName: 'heart',
      },
      {
        id: 'l3i2',
        tagName: 'circle',
        children: [
          {
            id: 'l3i3',
            tagName: 'arrow',
            attrs: {
              class: 'small',
            },
          },
        ],
      },
      {
        id: 'l3i4',
        tagName: 'square',
      },
      {
        id: 'l3i5',
        tagName: 'heart',
        target: true,
      },
      {
        id: 'l3i6',
        tagName: 'square',
        children: [
          {
            id: 'l3i7',
            tagName: 'circle',
          },
        ],
      },
      {
        id: 'l3i8',
        tagName: 'heart',
        target: true,
        attrs: {
          class: 'yellow',
        },
      },
    ],
  },
  {
    doThis: 'Select the 2rd square',
    selectorName: 'Nth Child Pseudo-selector',
    helpTitle: 'Select an element by its order in another element',
    syntax: ':nth-child(A)',
    help: 'Selects the nth (Ex: 1st, 3rd, 12th etc.) child element in another element.',
    examples: [
      ':nth-child(10) selects every element that is the 8th child of another element.',
    ],
    promt: ':nth-child(2)',
    targetsCount: 1,
    items: [
      {
        id: 'l4i1',
        tagName: 'square',
        attrs: {
          id: 'fancy',
        },
        children: [
          {
            id: 'l4i2',
            tagName: 'arrow',
            attrs: {
              class: 'small',
            },
          },
        ],
      },
      {
        id: 'l4i3',
        tagName: 'square',
        target: true,
        children: [
          {
            id: 'l4i5',
            tagName: 'arrow',
          },
        ],
      },

      {
        id: 'l4i6',
        tagName: 'square',
        children: [
          {
            id: 'l4i7',
            tagName: 'heart',
          },
        ],
      },
      {
        id: 'l4i7',
        tagName: 'rhombus',
        attrs: {
          class: 'small',
        },
      },
    ],
  },
  {
    doThis: 'Select first heart',
    selectorName: 'First of Type Selector',
    helpTitle: 'Select the first element of a specific type',
    syntax: ':first-of-type',
    help: 'Selects the first element of that type within another element.',
    examples: ['span:first-of-type selects the first span in any element.'],
    promt: 'heart:first-of-type',
    targetsCount: 1,
    items: [
      {
        id: 'l5i1',
        tagName: 'circle',

        attrs: {
          class: 'small',
        },
      },
      {
        id: 'l5i2',
        tagName: 'heart',
        target: true,
        attrs: {
          class: 'small',
        },
      },
      {
        id: 'l5i3',
        tagName: 'rhombus',
      },
      {
        id: 'l5i4',
        tagName: 'heart',
      },
      {
        id: 'l5i5',
        tagName: 'square',
        children: [
          {
            id: 'l5i6',
            tagName: 'circle',
          },
        ],
      },
    ],
  },
  {
    doThis: 'Select the empty trapeze',
    selectorName: 'Empty Selector',
    helpTitle: 'Combine the Descendant & ID Selectors',
    syntax: ':empty',
    help: 'Selects elements that dont have any other elements inside of them.',
    examples: ['div:empty selects all empty div elements.'],
    promt: 'trapeze:empty',
    targetsCount: 2,
    items: [
      {
        id: 'l6i1',
        tagName: 'trapeze',
        target: true,
      },
      {
        id: 'l6i2',
        tagName: 'trapeze',
        children: [
          {
            id: 'l6i3',
            tagName: 'rhombus',
            attrs: {
              class: 'small',
            },
          },
        ],
      },
      {
        id: 'l6i4',
        tagName: 'square',
      },
      {
        id: 'l6i5',
        tagName: 'trapeze',
        target: true,
      },
    ],
  },
  {
    doThis: 'Select the last arrow',
    selectorName: 'Negation Pseudo-class',
    helpTitle: 'Select all elements that dont match the negation selector',
    syntax: ':not(X)',
    help: 'You can use this to select all elements that do not match selector "X"',
    examples: [':not(#fancy) selects all elements that do not have id="fancy"'],
    promt: 'arrow:not(.small)',
    targetsCount: 2,
    items: [
      {
        id: 'l7i1',
        tagName: 'square',
        attrs: {
          id: 'class',
        },
        children: [
          {
            id: 'l7i2',
            tagName: 'arrow',
            target: true,
          },
        ],
      },
      {
        id: 'l6i3',
        tagName: 'square',
        children: [
          {
            id: 'l7i4',
            tagName: 'arrow',
            attrs: {
              class: 'small',
            },
          },
        ],
      },
      {
        id: 'l7i5',
        tagName: 'circle',
        children: [
          {
            id: 'l6i6',
            tagName: 'rhombus',
          },
        ],
      },
      {
        id: 'l7i7',
        tagName: 'arrow',
        target: true,
      },
    ],
  },
  {
    doThis: 'Select the small arrow inside the circle',
    selectorName: 'Combine the Descendant & ID Selectors',
    helpTitle: '',
    syntax: '#id  A',
    help: 'You can combine any selector with the descendent selector.',
    examples: [
      '#cool span selects all span elements that are inside of elements with id="cool"',
    ],
    promt: '#circle arrow',
    targetsCount: 1,
    items: [
      {
        id: 'l8i1',
        tagName: 'square',
        children: [
          {
            id: 'l8i2',
            tagName: 'circle',
            attrs: {
              id: 'circle',
            },
            children: [
              {
                id: 'l8i2',
                tagName: 'arrow',
                target: true,
                attrs: {
                  class: 'small',
                },
              },
            ],
          },
        ],
      },
      {
        id: 'l8i5',
        tagName: 'circle',
        attrs: {
          class: 'yellow',
        },
        children: [
          {
            id: 'l8i6',
            tagName: 'rhombus',
          },
        ],
      },
      {
        id: 'l8i7',
        tagName: 'arrow',
      },
    ],
  },
  {
    doThis: 'Select a shape with 4 vertices',
    selectorName: 'Attribute Selector',
    helpTitle: 'Select all elements that have a specific attribute',
    syntax: '[attribute]',
    help: 'Attributes appear inside the opening tag of an element, like this: span attribute="value". An attribute does not always have a value, it can be blank!',
    examples: [
      '[type] selects all elements that have a type="anything". attribute',
    ],
    promt: '[vertex]',
    targetsCount: 3,
    items: [
      {
        id: 'l9i1',
        tagName: 'square',
        target: true,
        attrs: {
          vertex: '4',
        },
        children: [
          {
            id: 'l9i2',
            tagName: 'rhombus',
            target: true,
            attrs: {
              vertex: '4',
            },
          },
        ],
      },
      {
        id: 'l9i3',
        tagName: 'heart',
      },
      {
        id: 'l9i4',
        tagName: 'circle',

        attrs: {
          class: 'yellow',
        },
        children: [
          {
            id: 'l9i5',
            tagName: 'square',
            target: true,
            attrs: {
              class: 'red',
              vertex: '4',
            },
          },
        ],
      },
      {
        id: 'l9i6',
        tagName: 'arrow',
      },
      {
        id: 'l9i7',
        tagName: 'trapeze',
      },
    ],
  },
  {
    doThis: 'Select the last square and circle',
    selectorName: 'Last of Type Selector',
    helpTitle: 'Select the last element of a specific type',
    syntax: ':last-of-type',
    help: 'Selects each last element of that type within another element. Remember type refers the kind of tag, so p and span are different types.',
    examples: ['div:last-of-type selects the last div in every element.'],
    promt: '.yellow:last-of-type',
    targetsCount: 2,
    items: [
      {
        id: 'l1i2',
        tagName: 'square',
        attrs: {
          class: 'yellow',
        },
      },
      {
        id: 'l1i2',
        tagName: 'square',
        target: true,
        attrs: {
          class: 'yellow',
        },
      },
      {
        id: 'l1i6',
        tagName: 'arrow',
      },
      {
        id: 'l1i1',
        tagName: 'circle',
      },
      {
        id: 'l1i4',
        tagName: 'circle',
        target: true,
        attrs: {
          class: 'yellow',
        },
      },
    ],
  },
];

export default data;
