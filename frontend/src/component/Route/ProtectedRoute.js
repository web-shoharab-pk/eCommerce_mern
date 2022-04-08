import {
    Navigate,
    Outlet,
    useLocation
} from 'react-router-dom';

const ProtectedRoute = ({ user }) => {
    const location = useLocation();

    const path = location.pathname ? location.pathname : '/login';


    if (!user?.name) {
        return <Navigate replace={true} to={path} />;
    }

    return <Outlet />;
};

export default ProtectedRoute;