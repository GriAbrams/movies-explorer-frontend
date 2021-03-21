import './Register.css';
import React from 'react';
import Sign from '../Sign/Sign';
import useFormWithValidation from '../../utils/validate';

function Register({ onRegister, errorMessage }) {
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister(values.name, values.email, values.password);
  }

  React.useEffect(() => {
    resetForm();
  }, [resetForm]);

  return (
    <Sign
      title="Добро пожаловать!"
      name="register"
      buttonText="Зарегистрироваться"
      onSubmit={handleSubmit}
      isValid={isValid}
      errorMessage={errorMessage}
    >
      <label className="sign__label">Имя
        <input
          className="sign__input"
          type="text"
          name="name"
          placeholder="Ваше имя"
          value={values.name || ''}
          onChange={handleChange}
          required
        />
        <span className="sign__error" id="sign__input-error">{errors.name}</span>
      </label>
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
        <span className="sign__error" id="sign__input-error">{errors.email}</span>
      </label>
      <label className="sign__label">Пароль
        <input
          className="sign__input"
          type="password"
          name="password"
          placeholder="Придумайте пароль"
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

export default Register;