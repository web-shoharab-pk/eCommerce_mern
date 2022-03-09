import {
    Navigate,
    Outlet
} from 'react-router-dom';

const ProtectedRoute = ({ user, redirectPath = '/login' }) => {
    if (!user?.name) {
        return <Navigate to={redirectPath} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;