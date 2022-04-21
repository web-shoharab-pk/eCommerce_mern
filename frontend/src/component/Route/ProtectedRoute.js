import { useSelector } from 'react-redux';
import {
    Navigate,
    Outlet
} from 'react-router-dom';

const ProtectedRoute = () => {

    const { loading, isAuthenticated } = useSelector(state => state.user);

    if (!loading && isAuthenticated === false) {
        return <Navigate replace={true} to='/login' />;
    }

    return <Outlet />;
};

export default ProtectedRoute;