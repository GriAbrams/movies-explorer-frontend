import './Register.css';
import Sign from '../Sign/Sign';

function Register() {
  return (
    <Sign
      title="Добро пожаловать!"
      name="register"
      buttonText="Зарегистрироваться"
    >
      <label className="sign__label">Имя
        <input className="sign__input" type="text" name="name" placeholder="Ваше имя" required/>
        <span className="sign__error" id="sign__input-error"></span>
      </label>
      <label className="sign__label">E-mail
        <input className="sign__input" type="email" name="email" placeholder="Укажите почту" required/>
        <span className="sign__error" id="sign__input-error"></span>
      </label>
      <label className="sign__label">Пароль
        <input className="sign__input" type="password" name="password" placeholder="Придумайте пароль" required/>
        <span className="sign__error" id="sign__input-error"></span>
      </label>
    </Sign>    
  )
}

export default Register;