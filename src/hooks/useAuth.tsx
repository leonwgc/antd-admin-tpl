import { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

// access control logic goes here

export default function useAuth(role: string) {
  const history = useHistory();
  const { pathname } = useLocation();

  useEffect(() => {
    // pathname , role , menus determin
    if (role === '403' || pathname == '/biz/private') {
      history.push('/biz/403');
    }
  }, [pathname, role, history]);
}
