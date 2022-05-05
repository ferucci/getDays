'use strict';

const block = document.querySelector('.block')
let anim
const date = new Date

let week = [
  'Воскресенье',
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
]

block.style.opacity = 0

const animate = ({ timing, draw, duration }) => {

  let start = performance.now();

  requestAnimationFrame(function animate(time) {

    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    let progress = timing(timeFraction);

    draw(progress);

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }

  });
}

const addDate = () => {
  const daysBlock = document.createElement('p');
  const list = document.createElement('ul')
  const itemList = document.createElement('li');

  itemList.style.color = 'white';
  itemList.style.marginTop = '22px';

  block.append(daysBlock);
  daysBlock.append(list);
  list.append(itemList);

  week.forEach((val, index) => {
    let clon = itemList.cloneNode()
    list.append(clon)
    clon.textContent = val

    if (index === 0 || index === 6) {
      clon.style.fontStyle = 'italic'
      clon.style.color = 'yellow';
    } else if (index === date.getDay()) {
      clon.textContent = `-= ${val} =-`
      clon.style.cssText += 'color: #532121; font-weight: bold;'
    }

  })

}

const appearance = () => {
  block.style.opacity = 1
  anim = requestAnimationFrame(challenge)
  removeEventListener('click', appearance)
}

const challenge = () => {
  animate({
    duration: 1500,
    timing(timeFraction) {
      return timeFraction;
    },
    draw(progress) {
      block.style.opacity = progress * 100 + '%';
    }
  });
}

addDate()

window.addEventListener('click', appearance);


