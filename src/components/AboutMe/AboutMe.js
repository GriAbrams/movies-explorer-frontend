import './AboutMe.css';
import SectionTitle from '../SectionTitle/SectionTitle';
import student from '../../images/student.jpg';

function AboutMe() {
  return (
    <section className="student">
      <div className="student__container">
        <SectionTitle text="Студент" />
        <div className="student__card">
          <div className="student__descr">
            <h3 className="student__name">Виталий</h3>
            <p className="student__about">Фронтенд-разработчик, 30 лет</p>
            <p className="student__info">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена 
            и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб&#8209;разработке, начал заниматься фриланс&#8209;заказами и ушёл с постоянной работы.</p>
            <ul className="student__links">
              <li className="student__item">
                <a className="student__link" href="https://www.facebook.com/profile.php?id=100011154459308" target="_blank" rel="noreferrer">Facebook</a>
              </li>
              <li className="student__item">
                <a className="student__link" href="https://github.com/GriAbrams" target="_blank" rel="noreferrer">Github</a>
              </li>
            </ul>
          </div>
          <img className="student__image" src={student} alt="Фотография студента" />
        </div>
      </div>
    </section>
  )
}

export default AboutMe;