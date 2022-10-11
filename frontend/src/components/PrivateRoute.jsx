import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

export function PrivateRouteUser() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate('/');
    }
  }, [userInfo]);

  return userInfo && <Outlet />;
}

export function PrivateRouteAdmin() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo.user.role === 'admin') {
      navigate('/');
    }
  }, [userInfo]);

  // return children;
  return userInfo.user.role === 'admin' && <Outlet />;
}

export function PrivateRouteNotLoggedIn() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [userInfo]);

  // return children;
  return !userInfo && <Outlet />;
}
