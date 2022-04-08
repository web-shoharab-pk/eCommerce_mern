import { useLayoutEffect, useState } from 'react';
import {
    Navigate,
    Outlet,
    useLocation
} from 'react-router-dom';

const ProtectedRoute = ({ user }) => {
    const location = useLocation();
    const [isLogin, setIsLogin] = useState(false);
    const path = location.pathname ? location.pathname : '/login';

    useLayoutEffect(() => {
        setIsLogin(!user?.name)
    }, [user?.name])
    
    if (isLogin) {
        return <Navigate replace={true} to={path} />;
    }

    return <Outlet />;
};

export default ProtectedRoute;