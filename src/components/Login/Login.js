import './Login.css';
import Sign from '../Sign/Sign';

function Login() {
  return (
    <Sign
      title="Рады видеть!"
      name="Login"
      buttonText="Войти"
    >
      <label className="sign__label">E-mail
        <input className="sign__input" type="email" name="email" placeholder="Укажите почту" required/>
        <span className="sign__error" id="sign__input-error"></span>
      </label>
      <label className="sign__label">Пароль
        <input className="sign__input" type="password" name="password" placeholder="Введите пароль" required/>
        <span className="sign__error" id="sign__input-error"></span>
      </label>
    </Sign>
  )
}

export default Login;