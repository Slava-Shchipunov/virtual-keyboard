import keysEn from './script/keysEn.js';
import keysRu from './script/keysRu.js';
import keysEnShift from './script/keysEnShift.js';
import keysRuShift from './script/keysRuShift.js';

import Button from './script/classButton.js';

const body = document.querySelector('body');

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

    for (let i = 0; i < keysEn.length; i += 1) {
      const newButton = new Button(keysEn[i].key);
      newButton.create();

      newButton.button.setAttribute('id', i);
      wrapper.append(newButton.button);
    }
  }
}

const newKeyboard = new Keyboard();
newKeyboard.create();
body.append(newKeyboard.main);

window.addEventListener('keydown', (event) => {
  const obj = {
    code: event.code,
    key: event.key,
  };
  console.log(obj);
});

newKeyboard.main.addEventListener('click', (event) => {
  window.dispatchEvent(new KeyboardEvent('keydown', {
    key: keysEn[event.target.id].key,
    code: keysEn[event.target.id].code,
  }));
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
