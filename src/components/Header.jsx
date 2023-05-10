import React from "react";
import { Button, Image } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { showModal } from "../store/slices/modalsSlice";
import { signout } from "../store/slices/userSlice";
import logo from "../assets/images/logo.png";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuth, user } = useSelector((state) => state.user);

  const onSignup = () => {
    dispatch(showModal({ modal: "signin", visible: true }));
  };

  const onSignout = () => {
    dispatch(signout({ modal: "signin", visible: true }));
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
          <div
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
            className="shadow-none bg-light px-2 rounded"
          >
            <Image src={logo} width={35} height={35} />
          </div>
        </Navbar.Brand>
        <Nav className="me-auto d-flex align-items-end">
          <Nav.Link>
            <Link to="posts">Статьи</Link>
          </Nav.Link>
          <Nav.Link>
            <Link to="about">О нас</Link>
          </Nav.Link>
        </Nav>
        {isAuth ? (
          <Navbar.Collapse className="justify-content-end gap-3">
            <Navbar.Text>
              Авторизован, как:{" "}
              <Link to="profile">
                {user.surname} {user.name}
              </Link>
            </Navbar.Text>
            <Button onClick={onSignout} variant="danger">
              Выйти
            </Button>
          </Navbar.Collapse>
        ) : (
          <Button onClick={onSignup} variant="primary">
            Войти
          </Button>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;
