import 'regenerator-runtime';
import './scss/style.scss';

import $ from 'jquery';
window.jQuery = $;

function wait(time) {
  return new Promise(resolve => setTimeout(resolve, time));
  return;
}

$(async () => {
  const template = document.getElementById('item-template').content;
  const fragment = document.createDocumentFragment();

  await fetch('farewell-satsuki/data.json')
    .then((data) => data.json())
    .then((json) => {
      for (const record of json) {
        const clone = document.importNode(template, true);
        // テンプレート内のimg要素
        const body = clone.querySelector('.item--content--message--body');
        body.innerText = record.message.body;

        const division = clone.querySelector('.item--content--user--division');
        division.innerText = record.user.div;
        clone.querySelector('.item').classList.add(record.user.div.replace(' ', '-').toLowerCase());

        const name = clone.querySelector('.item--content--user--name');
        name.innerText = record.user.name;

        const icon = clone.querySelector('.icon');
        icon.src = record.user.iconUrl;

        fragment.appendChild(clone);
      }

      document.querySelector('.grid').appendChild(fragment);
    })

  $('#pagepiling').pagepiling({
    navigation: false,
    normalScrollElements: '.grid',
    // normalScrollElementTouchThreshold: 2,
  });
  $('.page--content--scroll-back').on('click', () => {
    $.fn.pagepiling.moveTo(1);
  })
  $('.page--content--scroll').on('click', () => {
    $.fn.pagepiling.moveTo(2);
  })

  const grid = new Muuri('.grid');
  $('.grid-control-field.filter-field').on('change', (value) => {
    grid.filter(value.target.value);
  })

  await wait(3000);
  window.dispatchEvent(new Event('resize'))

  $('.page--content.hidden').fadeIn(1000);

  await wait(3000);

  $('.loading--indicator').css('opacity', '1');

  await wait(3000);

  $('.loading--indicator').css('opacity', '0');

  await wait(3000);

  $('.page.loading').fadeOut(3000);
  $('.page.intro').fadeIn(1000);
  $('.page.intro').css('display', 'flex');

  await wait(3000);


  $('.page--content--scroll').fadeIn(500);
})
