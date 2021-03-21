import './Login.css';
import React from 'react';
import Sign from '../Sign/Sign';
import useFormWithValidation from '../../utils/validate';

function Login({ onLogin, errorMessage }) {
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

  function handleSubmit(evt) {
    evt.preventDefault();
    onLogin(values.email, values.password);
  }

  React.useEffect(() => {
    resetForm();
  }, [resetForm]);

  return (
    <Sign
      title="Рады видеть!"
      name="Login"
      buttonText="Войти"
      onSubmit={handleSubmit}
      isValid={isValid}
      errorMessage={errorMessage}
    >
      <label className="sign__label">E-mail
        <input
          className="sign__input"
          type="email"
          name="email"
          placeholder="Укажите почту"
          value={values.email || ''}
          onChange={handleChange}
          required
        />
        <span className="sign__error" id="email-error">{errors.email}</span>
      </label>
      <label className="sign__label">Пароль
        <input
          className="sign__input"
          type="password"
          name="password"
          placeholder="Введите пароль"
          value={values.password || ''}
          onChange={handleChange}
          minLength="8"
          required
        />
        <span className="sign__error" id="password-error">{errors.password}</span>
      </label>
    </Sign>
  )
}

export default Login;