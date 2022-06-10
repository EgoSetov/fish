import { Redirect } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useAuth } from '../hooks/use-auth';
import { removeUser } from '../store/slices/userSlice';

const Home = () => {
    const dispatch = useDispatch();

    const {isAuth, email} = useAuth();

    return isAuth ? (
        <div>
            <h1>Home</h1>
        </div>
    ) : (
        <Redirect to="/login" />
    )
}

export default Home