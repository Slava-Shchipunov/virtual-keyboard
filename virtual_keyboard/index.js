import keysEn from './script/keysEn.js';
import keysRu from './script/keysRu.js';
import keysEnShift from './script/keysEnShift.js';
import keysRuShift from './script/keysRuShift.js';

import Button from './script/classButton.js';

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

    for (let i = 0; i < 5; i++) {
      const keyboardRaw = document.createElement('div');
      wrapper.append(keyboardRaw);

      keyboardRaw.classList.add('keyboard__raw');

      for (let j = 0; j < keyValues[i].length; j++) {
        const newButton = new Button(keyValues[i][j].value);
        newButton.create();
        body.append(newButton.button);
      }
    }
  }
}

const body = document.querySelector('body');
/* const newKeyboard = new Keyboard();
newKeyboard.create();
body.append(newKeyboard.button); */

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
const array = [

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
})

/* const event = new KeyboardEvent('keydown', {
  key: keyValues[0].key,
  code: keyValues[0].code,
}) */