import { useSelector } from 'react-redux';
import {
    Navigate,
    Outlet
} from 'react-router-dom';

const ProtectedRoute = ({admin}) => {

    const { loading, isAuthenticated, user} = useSelector(state => state.user);

      
    if (loading === false && isAuthenticated === false) {
        return <Navigate replace={true} to='/login' />;
    }
    if( loading === false && admin === true && user.role !== 'admin') {
        return <Navigate replace={true} to='/login' />;
    }
  
    
    
    return <Outlet />;
};

export default ProtectedRoute;