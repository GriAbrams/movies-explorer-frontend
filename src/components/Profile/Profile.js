import './Profile.css';
import Header from '../Header/Header';

function Profile() {
  return (
    <>
    <Header loggedIn={true} />
    <div className="profile">
      <div className="profile__container">
        <h2 className="profile__title">Привет, Виталий!</h2>
        <form className="profile__form" name="profile">
          <fieldset className="profile__fieldset">
            <label className="profile__label">Имя
              <input className="profile__input" type="text" value="Виталий" />
            </label>
            <div className="profile__line"></div>
            <label className="profile__label">Почта
              <input className="profile__input" type="text" value="pochta@yandex.ru" />
            </label>
          </fieldset>
          <fieldset className="profile__fieldset">
            <button className="profile__button">Редактировать</button>
            <button className="profile__button profile__button_exit">Выйти из аккаунта</button>
          </fieldset>
            
        </form>
      </div>
    </div>
    </>
  )
}

export default Profile;