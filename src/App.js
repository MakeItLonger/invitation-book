import React from 'react';
import User from './components/User';
import skeletonPNG from './assets/images/skeleton.png';
import Success from './components/Success';

function App() {
  const [users, setUsers] = React.useState([]);
  const [input, setInput] = React.useState('');
  const [list, setList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isSubmited, setIsSubmited] = React.useState(false);

  const handleChangeInput = (e) => {
    const { value } = e.target;

    setInput(value);
  };

  const clearSearchInput = () => {
    setInput('');
  };

  const addUser = (id) => {
    if (list.find((obj) => obj.id === id)) {
      setList(list.filter((obj) => obj.id !== id));
    } else {
      setList([...list, { id }]);
    }
  };

  const sendListRequest = async () => {
    try {
      await fetch('https://61890a11d0821900178d772e.mockapi.io/listInvitation', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(list),
      });
      setIsSubmited(true);
    } catch (err) {
      console.error(err);
      alert('Возникла ошибка при отправки данных!');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClickSend = () => {
    if (list.length) {
      sendListRequest();
      setIsLoading(true);
    } else {
      alert('Список пуст!');
    }
  };

  const handleClickOnOkay = () => {
    setIsSubmited(false);
  };

  React.useEffect(() => {
    fetch('https://61890a11d0821900178d772e.mockapi.io/usersInvitation')
      .then((res) => res.json())
      .then((json) => {
        setUsers(json);
        setIsLoading(false);
      });
  }, []);

  if (isSubmited) {
    return (
      <div class="container">
        <div class="box">
          <Success onClose={handleClickOnOkay} />
        </div>
      </div>
    );
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
                value={input}
                class="search__user search__input"
                type="text"
                placeholder="Найти пользователя"
              />
              {input && (
                <svg
                  onClick={clearSearchInput}
                  class="search__icon-close"
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M8.65082 7.004L13.6669 1.99955C13.8866 1.77989 14.01 1.48196 14.01 1.17131C14.01 0.860661 13.8866 0.562733 13.6669 0.343069C13.4473 0.123406 13.1493 0 12.8387 0C12.528 0 12.2301 0.123406 12.0104 0.343069L7.006 5.35919L2.00154 0.343069C1.78188 0.123406 1.48395 -2.31453e-09 1.1733 0C0.862651 2.31453e-09 0.564724 0.123406 0.34506 0.343069C0.125397 0.562733 0.00199082 0.860661 0.00199081 1.17131C0.00199081 1.48196 0.125397 1.77989 0.34506 1.99955L5.36118 7.004L0.34506 12.0085C0.235722 12.1169 0.148939 12.2459 0.0897152 12.3881C0.0304915 12.5302 0 12.6827 0 12.8367C0 12.9907 0.0304915 13.1432 0.0897152 13.2853C0.148939 13.4275 0.235722 13.5565 0.34506 13.6649C0.453505 13.7743 0.582525 13.8611 0.724679 13.9203C0.866832 13.9795 1.01931 14.01 1.1733 14.01C1.3273 14.01 1.47977 13.9795 1.62193 13.9203C1.76408 13.8611 1.8931 13.7743 2.00154 13.6649L7.006 8.64882L12.0104 13.6649C12.1189 13.7743 12.2479 13.8611 12.3901 13.9203C12.5322 13.9795 12.6847 14.01 12.8387 14.01C12.9927 14.01 13.1452 13.9795 13.2873 13.9203C13.4295 13.8611 13.5585 13.7743 13.6669 13.6649C13.7763 13.5565 13.8631 13.4275 13.9223 13.2853C13.9815 13.1432 14.012 12.9907 14.012 12.8367C14.012 12.6827 13.9815 12.5302 13.9223 12.3881C13.8631 12.2459 13.7763 12.1169 13.6669 12.0085L8.65082 7.004Z"
                    fill="#000"
                  />
                </svg>
              )}
            </label>
          </div>

          <div class="users">
            {isLoading ? (
              <img src={skeletonPNG} alt="skeleton" />
            ) : (
              users
                .filter((obj) => obj.fullName.toLowerCase().includes(input.toLowerCase()))
                .map((obj) => (
                  <User
                    key={obj.id}
                    {...obj}
                    onAdd={addUser}
                    isAdded={list.find((o) => o.id === obj.id)}
                  />
                ))
            )}
          </div>
          <div class="form__btn">
            <button class="form__btn-cancel">Отмена</button>
            <button
              disabled={isLoading}
              onClick={handleClickSend}
              class="form__btn-submit"
              type="submit">
              Отправить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
