import React from 'react';
import { useHistory } from 'react-router-dom';

import './PageNotFound.css';

function PageNotFound() {
  const history = useHistory();

  return (
    <div className="error">
      <div className="error__container">
        <h2 className="error__status">404</h2>
        <p className="error__message">Страница не найдена</p>
        <button className="error__button" onClick={() => history.goBack()}>Назад</button>
      </div>
    </div>
  )
}

export default PageNotFound;