"react-router-dom";

import { useState } from "react";
import { Button, Modal, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { asyncCreateAbout, asyncGetAbouts } from "../../store/slices/aboutSlice";
import { showModal } from "../../store/slices/modalsSlice";

const ModalCreateAbout = () => {
  const dispatch = useDispatch();

  const {
    createAbout: { visible: show },
  } = useSelector((state) => state.modals);

  const [classes, setClasses] = useState({
    title: {
      position: "text-left",
      color: "text-body",
    },
    description: {
      position: "text-left",
      color: "text-body",
    },
  });

  const [state, setState] = useState({
    title: "",
    description: "",
  });

  const changeState = (e) => {
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onHide = () => {
    dispatch(showModal({ modal: "createAbout", visible: false }));
  };

  const changeClasses = (nameClass, option, value) => {
    setClasses((prev) => ({
      ...prev,
      [nameClass]: {
        ...prev[nameClass],
        [option]: value,
      },
    }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!state.title) return;

    const classesTitle = [classes.title.position, classes.title.color, "h1"];
    const classesDescription = [classes.description.position, classes.description.color, "h3"];

    const resCreateAbunt = await dispatch(
      asyncCreateAbout({
        title: state.title,
        description: state.description,
        classesTitle,
        classesDescription,
      })
    );

    dispatch(showModal({ modal: "createAbout", visible: false }));

    if (resCreateAbunt.error) return;

    dispatch(asyncGetAbouts());
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header>
        <Modal.Title>Создать заголовок</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <Row className="mb-3">
            <Form.Label>Заголовок:</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="О нас"
              name="title"
              value={state.title}
              onChange={changeState}
            />
          </Row>
          <Row>
            <Form.Label>Позицианирование заголовка:</Form.Label>
            <Form.Select
              onChange={({ target: { value } }) => changeClasses("title", "position", value)}
              value={classes.title.position}
              className="mb-2"
              aria-label="Default select example"
            >
              <option value="text-left">Слева</option>
              <option value="text-center">По центру</option>
              <option value="text-right">Справа</option>
            </Form.Select>
          </Row>
          <Row>
            <Form.Label>Цвет заголовка:</Form.Label>
            <Form.Select
              onChange={({ target: { value } }) => changeClasses("title", "color", value)}
              value={classes.title.color}
              className="mb-2"
              aria-label="Default select example"
            >
              <option value="text-body">Черный</option>
              <option value="text-primary">Голубой</option>
              <option value="text-secondary">Серый</option>
              <option value="text-success">Зеленый</option>
              <option value="text-danger">Красный</option>
              <option value="text-warning">Желтый</option>
              <option value="text-info">Небесный</option>
            </Form.Select>
          </Row>
          <hr />
          <Row className="mb-3">
            <Form.Label>Описание:</Form.Label>
            <Form.Control
              type="text"
              placeholder="description"
              name="description"
              value={state.description}
              onChange={changeState}
            />
          </Row>
          <Row>
            <Form.Label>Позицианирование описания:</Form.Label>
            <Form.Select
              onChange={({ target: { value } }) => changeClasses("description", "position", value)}
              value={classes.description.position}
              className="mb-2"
              aria-label="Default select example"
            >
              <option value="text-left">Слева</option>
              <option value="text-center">По центру</option>
              <option value="text-right">Справа</option>
            </Form.Select>
          </Row>
          <Row>
            <Form.Label>Цвет описания:</Form.Label>
            <Form.Select
              onChange={({ target: { value } }) => changeClasses("description", "color", value)}
              value={classes.description.color}
              className="mb-2"
              aria-label="Default select example"
            >
              <option value="text-body">Черный</option>
              <option value="text-primary">Голубой</option>
              <option value="text-secondary">Серый</option>
              <option value="text-success">Зеленый</option>
              <option value="text-danger">Красный</option>
              <option value="text-warning">Желтый</option>
              <option value="text-info">Небесный</option>
            </Form.Select>
          </Row>
          <div>
            <Button variant="secondary" onClick={onHide}>
              Закрыть
            </Button>{" "}
            <Button type="submit" variant="primary">
              Создать
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalCreateAbout;
