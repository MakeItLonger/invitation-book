import React from 'react';
import successSvg from '../assets/images/successfully.svg';

function Success({ onClose }) {
  return (
    <center className="success-block">
      <img src={successSvg} alt="Успешно" />
      <h3 class="success__title">Успешно отправлено!</h3>
      <p class="success__text">Все пользователи из списка были оповещены о вашем мероприятии</p>
      <button onClick={onClose} class="success__btn">
        Хорошо
      </button>
    </center>
  );
}

export default Success;
