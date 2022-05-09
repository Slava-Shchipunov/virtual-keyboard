import keysEn from './script/keysEn.js';
import keysRu from './script/keysRu.js';
import keysEnShift from './script/keysEnShift.js';
import keysRuShift from './script/keysRuShift.js';

import Button from './script/classButton.js';

const body = document.querySelector('body');

let isShift = false;
let isPressedShift = false;
let isCapsLock = false;
let lang = 'En';
const buttonsArray = [];
let keysArray = [];
const functionalButtonsArray = ['Backspace', 'Tab', 'CapsLock', 'Enter', 'ShiftLeft', 'ShiftRight', 'Delete', 'ControlLeft', 'MetaLeft', 'AltLeft', 'AltRight', 'ControlRight'];

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

function buttonsTextChanger() {
  buttonsArray.forEach((element, index) => {
    element.change(keysArray[index].key);
  });
}

function pageGenerator() {
  const bodyWrapper = document.createElement('div');
  body.append(bodyWrapper);
  bodyWrapper.classList.add('body__wrapper');

  const title = document.createElement('h1');
  bodyWrapper.append(title);
  title.textContent = 'RSS Virtual Keyboard';
  title.classList.add('title');

  const textarea = document.createElement('textarea');
  bodyWrapper.append(textarea);
  textarea.classList.add('textarea');
  textarea.focus();

  const info = document.createElement('div');
  bodyWrapper.append(info);
  info.classList.add('info');

  const infoOS = document.createElement('span');
  info.append(infoOS);
  infoOS.textContent = 'The keyboard was created in the Windows operating system';
  infoOS.classList.add('info');

  const infoLangChange = document.createElement('span');
  info.append(infoLangChange);
  infoLangChange.textContent = 'To switch the language combination: left ctrl + left alt';
  infoLangChange.classList.add('info');

  const pageElements = [bodyWrapper, title, textarea, infoOS, infoLangChange];

  return pageElements;
}

const [, , textarea] = pageGenerator();

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
      buttonsArray.push(newButton);

      newButton.button.setAttribute('id', i);
      newButton.button.setAttribute('data-key-name', keysArray[i].code);
      wrapper.append(newButton.button);
    }
  }
}

const newKeyboard = new Keyboard();
newKeyboard.create();
textarea.after(newKeyboard.main);

function activeBtnHighlights(attribute) {
  const element = document.querySelector(`[data-key-name=${attribute}]`);
  element.classList.toggle('active-button');
}

function enterText(attribute) {
  const textLength = textarea.value.length;

  if (!functionalButtonsArray.includes(attribute)) {
    const element = document.querySelector(`[data-key-name=${attribute}]`);
    textarea.setRangeText(element.textContent, textarea.selectionStart, textarea.selectionEnd, 'end');
  } else if (attribute === 'Enter') {
    textarea.setRangeText('\n', textarea.selectionStart, textarea.selectionEnd, 'end');
  } else if (attribute === 'Tab') {
    textarea.setRangeText('    ', textarea.selectionStart, textarea.selectionEnd, 'end');
  } else if (attribute === 'Backspace') {
    if (textarea.selectionStart === textarea.selectionEnd && textarea.selectionStart !== 0) {
      textarea.setRangeText('', textarea.selectionStart - 1, textarea.selectionEnd, 'end');
    } else {
      textarea.setRangeText('', textarea.selectionStart, textarea.selectionEnd, 'end');
    }
  } else if (attribute === 'Delete') {
    if (textarea.selectionStart === textarea.selectionEnd
      && textarea.selectionEnd !== textLength) {
      textarea.setRangeText('', textarea.selectionStart, textarea.selectionEnd + 1, 'end');
    } else {
      textarea.setRangeText('', textarea.selectionStart, textarea.selectionEnd, 'end');
    }
  }
}

function capsLock() {
  if (!isCapsLock) {
    isCapsLock = true;

    keysArray = keysArray.map((element) => {
      const newElement = element;
      if (!functionalButtonsArray.includes(element.code)) {
        newElement.key = newElement.key.toUpperCase();
      }
      return newElement;
    });

    buttonsTextChanger();
  } else {
    isCapsLock = false;

    keysArray = keysArray.map((element) => {
      const newElement = element;
      if (!functionalButtonsArray.includes(element.code)) {
        newElement.key = newElement.key.toLowerCase();
      }
      return newElement;
    });

    buttonsTextChanger();
  }
}

function shift(event) {
  if (!isShift && (event.code === 'ShiftLeft' || event.code === 'ShiftRight')) {
    if (lang === 'En') {
      keysArray = keysEnShift;
    } else {
      keysArray = keysRuShift;
    }

    if (isCapsLock) {
      capsLock();
      isCapsLock = true;
    }

    isShift = true;

    buttonsTextChanger();
  } else if (isShift && !isPressedShift) {
    if (lang === 'En') {
      keysArray = keysEn;
    } else {
      keysArray = keysRu;
    }

    const ShiftLeftBtn = buttonsArray[41].button;
    ShiftLeftBtn.classList.remove('active-button');
    const ShiftRightBtn = buttonsArray[52].button;
    ShiftRightBtn.classList.remove('active-button');

    isShift = false;

    buttonsTextChanger();
  }
}

window.addEventListener('click', () => {
  textarea.focus();
});

window.addEventListener('keydown', (event) => {
/*   const obj = {
    code: event.code,
    key: event.key,
  };
  console.log(obj); */

  event.preventDefault();

  if (event.repeat) {
    return;
  }

  if (event.isTrusted && (event.code === 'ShiftLeft' || event.code === 'ShiftRight')) {
    isPressedShift = true;
  }

  activeBtnHighlights(event.code);

  enterText(event.code);

  shift(event);

  if (event.code === 'CapsLock') {
    capsLock();
  }

  if (event.ctrlKey && event.code === 'AltLeft') {
    langChanger();
    keysArrayChanger();
    buttonsTextChanger();
  }
});

window.addEventListener('keyup', (event) => {
  if ((event.code !== 'ShiftLeft' && event.code !== 'ShiftRight' && event.code !== 'CapsLock')
  || (event.isTrusted && event.code !== 'CapsLock')) {
    setTimeout(() => {
      activeBtnHighlights(event.code);
    }, 120);
  }
  if ((event.code === 'ShiftLeft' || event.code === 'ShiftRight') && event.isTrusted) {
    if (lang === 'En') {
      keysArray = keysEn;
    } else {
      keysArray = keysRu;
    }

    buttonsTextChanger();

    isShift = false;
    isPressedShift = false;

    setTimeout(() => {
      const ShiftLeftBtn = buttonsArray[41].button;
      const ShiftRightBtn = buttonsArray[52].button;
      ShiftLeftBtn.classList.remove('active-button');
      ShiftRightBtn.classList.remove('active-button');
    }, 125);
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
