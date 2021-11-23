import React from 'react';

const arr = [
  {
    avatarUrl: 'https://source.unsplash.com/50x50/?people&1',
    fullName: 'Вася Пупкин',
    email: 'vasia@gmail.com'
  },
  {
    avatarUrl: 'https://source.unsplash.com/50x50/?people&2',
    fullName: 'Александр Сарафинчан',
    email: 'alex@gmail.com'
  },
  {
    avatarUrl: 'https://source.unsplash.com/50x50/?people&3',
    fullName: 'Тест Тесов',
    email: 'test@gmail.com'
  },
];

function App() {
  const [input, setInput] = React.useState('');
  const [users, setUsers] = React.useState(arr);

  const handleChangeInput = (e) => {
    const { value } = e.target;

    setInput(value);
  }

  return (
    <div class="container">
      <div class="box">
        <h3 class="title">Рассылка приглашений</h3>
        <form action="#">
          <div class="search">
            <label class="search__label">
              <input
                onChange={handleChangeInput}
                class="search__user search__input"
                type="text"
                placeholder="Найти пользователя"
              />
              <img class="search__icon-close" src="./assets/images/close-btn.svg" alt="Закрыть" />
            </label>
          </div>

          <div class="users">
            {
              users
              .filter(obj => obj.fullName.toLowerCase().includes(input.toLowerCase()))
              .map((obj) => (
                <div class="users__box">
                  <div class="users__left">
                    <img src={obj.avatarUrl} alt="Пользователь" />
                    <div class="users__inner">
                      <h4 class="users__name">{obj.fullName}</h4>
                      <p class="users__subtext">{obj.email}</p>
                    </div>
                  </div>
                  <div class="users__right">
                    <button type="button" class="close-btn"></button>
                  </div>
                </div>
              ))
            }
          </div>
          <div class="form__btn">
            <button class="form__btn-cancel">Отмена</button>
            <button class="form__btn-submit" type="submit">Отправить</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
