import './Profile.css';
import React from 'react';
import Header from '../Header/Header';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import useFormWithValidation from '../../utils/validate';

function Profile({ onUpdateUser, onSignOut, errorMessage }) {
  const currentUser = React.useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid } = useFormWithValidation();

  console.log(values)

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({ name, email });
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]); 

  return (
    <>
    <Header loggedIn={true} />
    <div className="profile">
      <div className="profile__container">
        <h2 className="profile__title">Привет, {currentUser.name}!</h2>
        <form className="profile__form" name="profile" onSubmit={handleSubmit}>
          <fieldset className="profile__fieldset">
            <label className="profile__label">Имя
              <input
                className="profile__input"
                type="text"
                value={name || ''}
                onChange={handleChangeName}
              />
            </label>
            <div className="profile__line"></div>
            <label className="profile__label">Почта
              <input
                className="profile__input"
                type="email"
                value={email || ''}
                onChange={handleChangeEmail}
              />
            </label>
          </fieldset>
          <fieldset className="profile__fieldset">
            <p className="profile__server-error">{errorMessage}</p>
            <button className="profile__button">Редактировать</button>
            <button className="profile__button profile__button_exit" onClick={onSignOut}>Выйти из аккаунта</button>
          </fieldset>
            
        </form>
      </div>
    </div>
    </>
  )
}

export default Profile;