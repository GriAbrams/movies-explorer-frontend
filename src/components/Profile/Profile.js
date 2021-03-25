import React from 'react';
import Header from '../Header/Header';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import useFormWithValidation from '../../utils/validate';

import './Profile.css';

function Profile({ loggedIn, onUpdateUser, onSignOut, errorMessage, successMessage }) {
  const currentUser = React.useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid } = useFormWithValidation({ name: currentUser.name, email: currentUser.email });
  const [isEditActive, setEditActive] = React.useState(false);

  const saveButtonToggle = () => setEditActive(true);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({ name: values.name, email: values.email });
  }

  return (
    <>
    <Header loggedIn={loggedIn} />
    <div className="profile">
      <div className="profile__container">
        <h2 className="profile__title">Привет, {currentUser.name}!</h2>
        <form className="profile__form" name="profile" onSubmit={handleSubmit} noValidate>
          <fieldset className="profile__fieldset">
            <label className="profile__label">Имя
              <input
                className="profile__input"
                type="text"
                name="name"
                value={values.name || ''}
                onChange={handleChange}
                required
                disabled={!isEditActive}
              />
            </label>
            <span className="profile__error" id="profile__input-error">{errors.name}</span>
            <div className="profile__line"></div>
            <label className="profile__label">Почта
              <input
                className="profile__input"
                type="email"
                name="email"
                value={values.email || ''}
                onChange={handleChange}
                required
                disabled={!isEditActive}
              />
            </label>
            <span className="profile__error" id="profile__input-error">{errors.email}</span>
          </fieldset>
          <fieldset className="profile__fieldset">
            {successMessage && <p className="profile__message profile__message_success">{successMessage}</p>}
            {errorMessage && <p className="profile__message profile__message_error">{errorMessage}</p>}
            {isEditActive ? (
              <button className="profile__save-button" type="submit" disabled={!isValid}>Сохранить</button>
            ) : (
              <>
                <button className="profile__button" onClick={saveButtonToggle}>Редактировать</button>
                <button className="profile__button profile__button_exit" onClick={onSignOut}>Выйти из аккаунта</button>
              </>
            )}
          </fieldset>
            
        </form>
      </div>
    </div>
    </>
  )
}

export default Profile;