import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import ModalLogin from "./components/modals/ModalLogin";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { asyncConnect } from "./store/slices/userSlice";
import { Spinner } from "react-bootstrap";
import ModalCreatePost from "./components/modals/ModalCreateNews";
import ModalSignup from "./components/modals/ModalSignup";
import ModalComments from "./components/modals/ModalComments";
import ModalCreateAbout from "./components/modals/ModalCreateAbout";

function App() {
  const dispatch = useDispatch();

  const [loadin, setLoding] = useState(false);

  const modals = useSelector((state) => state.modals);

  // * получение данных пользователя по токену
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      (async () => {
        setLoding(true);
        await dispatch(asyncConnect());
        setLoding(false);
      })();
    }
  }, []);

  return (
    <div className="app">
      <Header />
      <Outlet />
      {/* модальные окна */}
      <div className="modals">
        {modals.signin.visible && <ModalLogin />}
        {modals.signup.visible && <ModalSignup />}
        {modals.createPost.visible && <ModalCreatePost />}
        {modals.editPost.visible && <ModalCreatePost mode="edit" />}
        {modals.comments.visible && <ModalComments />}
        {modals.createAbout.visible && <ModalCreateAbout />}
      </div>
      {/* загрузка при получении данных пользователя */}
      {loadin && (
        <div className="loadin">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Загрузка...</span>
          </Spinner>
        </div>
      )}
      {/* компонент для уведомлений (те которые справа снизу) */}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
