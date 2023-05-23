import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { showModal } from "../store/slices/modalsSlice";

// * главная страница
const Home = () => {
  const dispatch = useDispatch();

  // * отрытие модалок
  const openModal = (e, modal) => {
    e.preventDefault();
    dispatch(showModal({ modal, visible: true }));
  };

  return (
    <Container className="mt-3">
      <h2>Главная страница</h2>
      <div className="my-3">
        <h3>Добро пожаловать на рыбаловный форум</h3>
      </div>
      <h5>Разделы, которые вы можете посетить</h5>
      <ul>
        <li>
          <h6>
            <Link to="posts">Форум</Link>
          </h6>
        </li>
        <li>
          <h6>
            <Link to="about">О нас</Link>
          </h6>
        </li>
        <li>
          <h6>
            <Link to="rules">Правила</Link>
          </h6>
        </li>
      </ul>
      <div className="">
        <p>
          <span className="home-page-title">Рыбалка</span>
          <span> – это то слово, которое значит целый мир для многих людей на планете.</span>
        </p>
        <p>
          Она позволяет людям окунуться в непревзойденную атмосферу дикой природы, чистого воздуха и уединения. Рыбалка
          в полной своей мере является непревзойденным антидепрессантом и стимулятором жизненной силы для её истинных
          ценителей.
        </p>
        <p>
          На нашем форуме рыбалки вы сможете делиться любой интересной и полезной рыболовной информацией. Это может быть
          рассказ о ваших успехах и начинаниях и многое другое. Вы можете поделиться лучшим рыбными местами своего
          населенного пункта и просто пообщаться с единомышленниками по интересующим вас темам.
        </p>
        <p>
          Если на форуме нет темы, которую рыболов хотел бы обсудить – не беда. Ведь каждый зарегистрированный
          пользователь может создать и предложить для обсуждения любую интересующую тему. Для полноценного использования
          форума пожалуйста ознакомьтесь с <Link to="/rules">правилами</Link> ,{" "}
          <a href="#signup" onClick={(e) => openModal(e, "signup")}>
            зарегистируйтесь
          </a>{" "}
          или{" "}
          <a href="#signin" onClick={(e) => openModal(e, "signin")}>
            авторизуйтесь
          </a>{" "}
          , если у вас уже есть аккаунт!
        </p>
      </div>
    </Container>
  );
};

export default Home;
