import React from 'react';

function User({ id, fullName, email, avatarUrl, onAdd, isAdded }) {
  return (
    <div class="users__box">
      <div class="users__left">
        <img src={avatarUrl} alt="Пользователь" />
        <div class="users__inner">
          <h4 class="users__name">{fullName}</h4>
          <p class="users__subtext">{email}</p>
        </div>
      </div>
      <div class="users__right">
        <button
          onClick={() => onAdd(id)}
          type="button"
          class={`close-btn ${isAdded ? 'pushed' : ''}`}></button>
      </div>
    </div>
  );
}

export default User;
