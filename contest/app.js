const properCode = `#include <iostream>

using namespace std;

int main () {
  int a, b;

  cin >> a;

  cin >> b;

  cout << (a + b);
}
`

document.getElementById('submit').onclick = () => {
  const results = document.getElementsByClassName('table__hook')[0]

  const code = document.querySelector('#code')

  if (code.textContent === properCode) {
    const err = document.getElementById('error')

    if (err) err.remove()

    results.innerHTML = `<table class="table table_role_submits i-bem table_js_inited">
    <thead class="table__head">
    <tr class="table__row"><th class="table__header">Время посылки</th><th class="table__header">ID</th>
    <th class="table__header">Задача</th><th class="table__header">Компилятор</th><th class="table__header">Вердикт</th>
    <th class="table__header">Тип посылки</th><th class="table__header">Время</th><th class="table__header">Память</th>
    <th class="table__header">Тест</th><th class="table__header">Баллы</th><th class="table__header"></th></tr></thead>
    <tbody class="table__body"><tr class="table__row"><td class="table__cell"><div class="table__data table__data_type_time">
    <time class="time-local i-bem time-local_js_inited>30&nbsp;июл 2020, 21:59:44</time></div></td><td class="table__cell">33709902</td><td class="table__cell"><div class="table__data popupable i-bem popupable_js_inited" data-bem="{&quot;popupable&quot;:{&quot;hover&quot;:true,&quot;popupParams&quot;:{&quot;directions&quot;:&quot;top&quot;}}}" title="">A</div></td><td class="table__cell">GNU c++17 7.3</td><td class="table__cell">
    <div class="table__data table__data_mood_pos">
    <button class="link" onclick="openPage()" type="button">Runtime error</button>
    </div></td><td class="table__cell">RE</td><td class="table__cell"><div class="table__data table__data_type_time">36ms</div></td><td class="table__cell"><div class="table__data table__data_type_time">380.00Kb</div></td><td class="table__cell">-</td><td class="table__cell">13</td><td class="table__cell"><div class="table__data"><a class="link" href="/contest/19241/run-report/33709902/">отчёт</a></div></td></tr></tbody></table> `
  } else {
    const err = document.createElement('span')
    const cont = document.getElementsByClassName('page__main')[0]

    err.id = 'error'

    err.textContent = `подумой`

    cont.appendChild(err)

    window.scrollTo({ top: cont.clientHeight })
  }
}

const openPage = () => {
  const results = document.getElementsByClassName('page__main')[0]

  results.innerHTML = `
   <div class="content content_theme_contest island">
   <div class="contest-head"><div class="contest-head__item contest-head__item_role_title">
   </div>
   <div class="contest-head__item contest-head__item_role_status"><div class="status">
   <div class="status__props">
   <div class="status__prop">
   <div class="status__name inline-block">
   <img class="image image_type_clock" src="//yastatic.net/lego/_/La6qi18Z8LwgnZdsAr1qy1GwCwo.gif" alt="">
   </div><div class="status__value inline-block">
   <time class="time-local i-bem time-local_js_inited">1&nbsp;авг 2020, 11:33:01</time></div></div>
 
   <time class="time-local i-bem time-local_js_inited">29&nbsp;июл 2020, 18:52:01</time></div></div></div></div></div>


stderr: <code>думой сам</code>
</pre></div></div><div class="table__hook"><table class="table table_role_tests-list"><thead class="table__head"><tr><th class="table__header"></th><th class="table__header">№</th><th class="table__header">Вердикт</th><th class="table__header">Ресурсы</th><th class="table__header">Баллы</th></tr></thead><tbody><tr class="table__row"><td class="table__cell table__cell_theme_narrow"><img class="image image_type_success" src="//yastatic.net/lego/_/La6qi18Z8LwgnZdsAr1qy1GwCwo.gif" alt=""></td><td class="table__cell">1</td><td class="table__cell">Runtime error</td><td class="table__cell">3ms / 380.00Kb</td><td class="table__cell">-</td></tr><tr class="table__row"><td class="table__cell table__cell_theme_narrow"><img class="image image_type_success" src="//yastatic.net/lego/_/La6qi18Z8LwgnZdsAr1qy1GwCwo.gif" alt=""></td><td class="table__cell">2</td><td class="table__cell">Runtime error</td><td class="table__cell">3ms / 380.00Kb</td><td class="table__cell">-</td></tr><tr class="table__row"><td class="table__cell table__cell_theme_narrow"><img class="image image_type_success" src="//yastatic.net/lego/_/La6qi18Z8LwgnZdsAr1qy1GwCwo.gif" alt=""></td><td class="table__cell">3</td><td class="table__cell">Runtime error</td><td class="table__cell">3ms / 380.00Kb</td><td class="table__cell">-</td></tr><tr class="table__row"><td class="table__cell table__cell_theme_narrow"><img class="image image_type_success" src="//yastatic.net/lego/_/La6qi18Z8LwgnZdsAr1qy1GwCwo.gif" alt=""></td><td class="table__cell">4</td><td class="table__cell">Runtime error</td><td class="table__cell">3ms / 380.00Kb</td><td class="table__cell">-</td></tr><tr class="table__row"><td class="table__cell table__cell_theme_narrow"><img class="image image_type_success" src="//yastatic.net/lego/_/La6qi18Z8LwgnZdsAr1qy1GwCwo.gif" alt=""></td><td class="table__cell">5</td><td class="table__cell">Runtime error</td><td class="table__cell">3ms / 380.00Kb</td><td class="table__cell">-</td></tr><tr class="table__row"><td class="table__cell table__cell_theme_narrow"><img class="image image_type_success" src="//yastatic.net/lego/_/La6qi18Z8LwgnZdsAr1qy1GwCwo.gif" alt=""></td><td class="table__cell">6</td><td class="table__cell">Runtime error</td><td class="table__cell">3ms / 260.00Kb</td><td class="table__cell">-</td></tr><tr class="table__row"><td class="table__cell table__cell_theme_narrow"><img class="image image_type_success" src="//yastatic.net/lego/_/La6qi18Z8LwgnZdsAr1qy1GwCwo.gif" alt=""></td><td class="table__cell">7</td><td class="table__cell">Runtime error</td><td class="table__cell">4ms / 380.00Kb</td><td class="table__cell">-</td></tr><tr class="table__row"><td class="table__cell table__cell_theme_narrow"><img class="image image_type_success" src="//yastatic.net/lego/_/La6qi18Z8LwgnZdsAr1qy1GwCwo.gif" alt=""></td><td class="table__cell">8</td><td class="table__cell">Runtime error</td><td class="table__cell">4ms / 380.00Kb</td><td class="table__cell">-</td></tr><tr class="table__row"><td class="table__cell table__cell_theme_narrow"><img class="image image_type_success" src="//yastatic.net/lego/_/La6qi18Z8LwgnZdsAr1qy1GwCwo.gif" alt=""></td><td class="table__cell">9</td><td class="table__cell">Runtime error</td><td class="table__cell">27ms / 240.00Kb</td><td class="table__cell">-</td></tr><tr class="table__row"><td class="table__cell table__cell_theme_narrow"><img class="image image_type_success" src="//yastatic.net/lego/_/La6qi18Z8LwgnZdsAr1qy1GwCwo.gif" alt=""></td><td class="table__cell">10</td><td class="table__cell">Runtime error</td><td class="table__cell">36ms / 260.00Kb</td><td class="table__cell">-</td></tr></tbody></table></div></div>

<button onclick="next()" id="join">Принять участие</button>
`

  window.scrollTo({ top: 0 })
}

const next = () => {
  visit('calculator')
}
