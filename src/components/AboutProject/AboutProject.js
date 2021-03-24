import SectionTitle from '../SectionTitle/SectionTitle';

import './AboutProject.css';

function AboutProject() {
  return (
    <section className="project" id="project">
      <div className="project__container">
        <SectionTitle text="О проекте" />
        <ul className="project__descr">
          <li className="project__item">
            <h3 className="project__title">Дипломный проект включал 5 этапов</h3>
            <p className="project__subtitle">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
          </li>
          <li className="project__item">
            <h3 className="project__title">На выполнение диплома ушло 5 недель</h3>
            <p className="project__subtitle">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
          </li>
        </ul>
        <ul className="project__weeks">
          <li className="project__back">
            <p className="project__week project__week_back">1 неделя</p>
            <p className="project__tech">Back-end</p>
          </li>
          <li className="project__front">
            <p className="project__week project__week_front">4 недели</p>
            <p className="project__tech">Front-end</p>
          </li>
        </ul>
      </div>
    </section>
  )
}

export default AboutProject;