import keysEn from './script/keysEn.js';
import keysRu from './script/keysRu.js';
import keysEnShift from './script/keysEnShift.js';
import keysRuShift from './script/keysRuShift.js';

import Button from './script/classButton.js';

const body = document.querySelector('body');

let isShift = false;
let isCapsLock = false;
let lang = 'En';
const arr = [];
let keysArray = [];

function keysArrayChanger() {
  if (lang === 'En') {
    keysArray = keysEn;
  } else {
    keysArray = keysRu;
  }
}

function langChanger() {
  if (lang === 'En') {
    lang = 'Ru';
  } else {
    lang = 'En';
  }
}

class Keyboard {
  constructor(name) {
    this.name = name;
    this.main = null;
  }

  create() {
    this.main = document.createElement('div');
    const wrapper = document.createElement('div');
    this.main.append(wrapper);

    this.main.classList.add('keyboard');
    wrapper.classList.add('keyboard__wrapper');

    keysArrayChanger();

    for (let i = 0; i < keysArray.length; i += 1) {
      const newButton = new Button(keysArray[i].key);
      newButton.create();
      arr.push(newButton);

      newButton.button.setAttribute('id', i);
      newButton.button.setAttribute('data-key-name', keysArray[i].code);
      wrapper.append(newButton.button);
    }
  }
}

const newKeyboard = new Keyboard();
newKeyboard.create();
body.append(newKeyboard.main);
console.log(arr);
function activeBtnHighlights(attribute) {
  const element = document.querySelector(`[data-key-name=${attribute}]`);
  element.classList.toggle('active-button');
}

window.addEventListener('keydown', (event) => {
  const obj = {
    code: event.code,
    key: event.key,
  };
  console.log(obj);

  activeBtnHighlights(event.code);

  if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
    if (lang === 'En') {
      keysArray = keysEnShift;
    } else {
      keysArray = keysRuShift;
    }

    arr.forEach((element, index) => {
      element.change(keysArray[index].key);
    });
  }

  if (event.ctrlKey && event.code === 'AltLeft') {
    langChanger();
    keysArrayChanger();
    arr.forEach((element, index) => {
      element.change(keysArray[index].key);
    });
  }
});

window.addEventListener('keyup', (event) => {
  if (event.code !== 'ShiftLeft') {
    setTimeout(() => {
      activeBtnHighlights(event.code);
    }, 120);
  }
});

newKeyboard.main.addEventListener('mousedown', (event) => {
  if (event.target.classList.contains('button')) {
    window.dispatchEvent(new KeyboardEvent('keydown', {
      key: keysEn[event.target.id].key,
      code: keysEn[event.target.id].code,
    }));
  }
});

newKeyboard.main.addEventListener('mouseup', (event) => {
  if (event.target.classList.contains('button')) {
    window.dispatchEvent(new KeyboardEvent('keyup', {
      key: keysEn[event.target.id].key,
      code: keysEn[event.target.id].code,
    }));
  }
});

/* const array = [

]

window.addEventListener('keydown', (event) => {
  const obj = {
    code: event.code,
    key: event.key
  }
  array.push(obj);
})
console.log(array); */
/* const array = [

]
const btn = document.createElement('button');
btn.textContent = 'GGGGGGGGG';
body.append(btn);

window.addEventListener('keydown', (event) => {
  const obj = {
    code: event.code,
    key: event.key
  }
  console.log(obj)
})

btn.addEventListener('click', () => {
  window.dispatchEvent(new KeyboardEvent('keydown', {
      key: keyValues[0].key,
      code: keyValues[0].code,
    })
  )
   */
/* const eve = new KeyboardEvent('keydown', {
    key: keyValues[0].key,
    code: keyValues[0].code,
  })
  window.addEventListener('eve', (event) => {
    const obj = {
      code: eve.code,
      key: eve.key
    }
    array.push(obj);
    console.log('ITS ARRAY: ' + array)
  }) */
// })

/* const event = new KeyboardEvent('keydown', {
  key: keyValues[0].key,
  code: keyValues[0].code,
}) */
