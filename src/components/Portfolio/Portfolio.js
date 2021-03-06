import './Portfolio.css';

function Portfolio() {
  return (
    <section className="portfolio">
      <div className="portfolio__container">
        <h3 className="portfolio__title">Портфолио</h3>
        <ul className="portfolio__sites">
          <li className="portfolio__item">
            <p className="portfolio__site">Статичный сайт</p>
            <span className="portfolio__arrow">↗</span>
          </li>
          <li className="portfolio__item">
            <p className="portfolio__site">Адаптивный сайт</p>
            <span className="portfolio__arrow">↗</span>
          </li>
          <li className="portfolio__item">
            <p className="portfolio__site">Одностраничное приложение</p>
            <span className="portfolio__arrow">↗</span>
          </li>
        </ul>
      </div>  
    </section>
  )
}

export default Portfolio;