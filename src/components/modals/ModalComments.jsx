import { useEffect } from "react";
import { useState } from "react";
import { Button, Modal, Form, Card, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "../../store/slices/modalsSlice";
import { asyncCreateCommentNews, asyncDeleteCommentNews, asyncGetCommentsNews } from "../../store/slices/newsSlice";

// * модальное окно для комментариев к посту
const ModalComments = () => {
  const dispatch = useDispatch();

  const { comments } = useSelector((state) => state.modals);

  // * отображение окна
  const show = comments.visible;

  // * данные, которые мы передали вместе с окрытием модального окна
  const postData = comments.data;

  const [loading, setLoading] = useState(false);

  const [commentList, setCommentList] = useState([]);

  const [state, setState] = useState({
    text: "",
  });

  const changeState = (e) => {
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onHide = () => {
    dispatch(showModal({ modal: "comments", visible: false }));
  };

  // * получение всех комментариев поста
  const getCommentsNews = async () => {
    if (postData) {
      setLoading(true);
      const resGetComments = await dispatch(asyncGetCommentsNews(postData.id));
      setLoading(false);
      if (resGetComments.error) return;

      setCommentList(resGetComments.payload);
    }
  };

  // * запрос на бэк для комментария
  const onSubmit = async (event) => {
    event.preventDefault();

    // * проверка состояний + проверка на пробелы по краям
    if (!state.text.trim()) return;

    setLoading(true);
    const resComment = await dispatch(asyncCreateCommentNews({ newsId: postData.id, data: state }));
    setLoading(false);

    if (resComment.error) return;

    setState({ text: "" });
    getCommentsNews();
  };

  // * при входе делаем запрос на получение всех комментариев поста
  useEffect(() => {
    getCommentsNews();
  }, []);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header>
        <Modal.Title>
          Комментарии {commentList.length} "{postData.title}"
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!!commentList.length && (
          <div style={{ height: "200px" }} className="d-flex flex-column gap-2 overflow-auto mb-3">
            {commentList.map((comment) => (
              <CardComment key={comment.id} comment={comment} getCommentsNews={getCommentsNews} />
            ))}
          </div>
        )}

        {loading && (
          <div className="d-flex justify-content-center mb-3">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Загрузка...</span>
            </Spinner>
          </div>
        )}

        <Form.Control
          value={state.text}
          onChange={changeState}
          name="text"
          className="mb-3"
          as="textarea"
          placeholder="Комментарий к записи"
          style={{ height: "80px" }}
          disabled={loading}
        />

        <Form onSubmit={onSubmit}>
          <div>
            <Button variant="secondary" onClick={onHide}>
              Закрыть
            </Button>{" "}
            <Button disabled={loading} type="submit" variant="primary">
              Комментировать
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

function CardComment({ comment, getCommentsNews }) {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const { isAuth, user } = useSelector((state) => state.user);

  const deleteComment = async () => {
    setLoading(true);
    const resDeleteComment = await dispatch(asyncDeleteCommentNews(comment.id));
    setLoading(false);
    if (resDeleteComment.error) return;
    getCommentsNews();
  };

  return (
    <Card>
      <Card.Header className="d-flex justify-content-between">
        <span>
          {comment.creator.surname} {comment.creator.name}
        </span>
        {isAuth && user?.type === "admin" && (
          <Button
            disabled={loading}
            style={{ lineHeight: 0.5 }}
            onClick={() => deleteComment(comment.id)}
            variant="danger"
          >
            Delete
          </Button>
        )}
      </Card.Header>
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p> {comment.text} </p>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default ModalComments;
