import { Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Container className="mt-3">
      <h2>Главная страница</h2>
      <div className="my-3">
        <h3>Добро пожаловать на рабаловный форум</h3>
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
    </Container>
  );
};

export default Home;
