import { useState } from "react";
import { useEffect } from "react";
import { Button, Container, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { asyncDeleteAbout, asyncGetAbouts } from "../store/slices/aboutSlice";
import { showModal } from "../store/slices/modalsSlice";

const About = () => {
  const dispatch = useDispatch();

  const { abouts } = useSelector((state) => state.abouts);
  const { user } = useSelector((state) => state.user);

  const [loading, setLoading] = useState(false);

  const getAbouts = async () => {
    setLoading(true);
    await dispatch(asyncGetAbouts());
    setLoading(false);
  };

  const deleteAbout = async (id) => {
    const resDeleteAbout = await dispatch(asyncDeleteAbout(id));

    if (resDeleteAbout.error) return;

    getAbouts();
  };

  useEffect(() => {
    getAbouts();
  }, []);

  return (
    <Container className="pt-3">
      <div className="d-flex gap-3">
        <h2>О нас</h2>
        {user && user.type === "admin" && (
          <Button
            onClick={() => {
              dispatch(showModal({ modal: "createAbout", visible: true }));
            }}
            variant="success"
          >
            Создать
          </Button>
        )}
      </div>
      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Загрузка...</span>
          </Spinner>
        </div>
      ) : (
        <div className="abouts my-3">
          {abouts.map((about) => (
            <div className="shadow-none p-3 mb-2 bg-light rounded">
              <h3 className={about.classesTitle.join(" ")}>{about.title}</h3>
              <p className={about.classesDescription.join(" ")}>{about.description}</p>
              {user && user.type === "admin" && (
                <Button onClick={() => deleteAbout(about.id)} variant="danger">
                  Удалить
                </Button>
              )}
            </div>
          ))}
        </div>
      )}
    </Container>
  );
};

export default About;
