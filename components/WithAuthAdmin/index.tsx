import { ComponentType } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Cookie from 'js-cookie';

import AuthState from '../../dtos/AuthState';
import User from '../../dtos/User';
import ApiData from '../../dtos/ApiData';

export default function withAuthAdmin<P>(Component: ComponentType<P>) {
  const Auth = (props: P) => {
    const router = useRouter();
    const loggedUser: User = useSelector((state: AuthState) => state.auth.loggedUser);
    const apiData: ApiData = Cookie.get('@api-data') ? JSON.parse(Cookie.get('@api-data')) : null;

    if(
      !loggedUser || 
      loggedUser.profile !== 'admin' ||
      !apiData ||
      !apiData['access-token'] ||
      apiData['aceess-token'] === ''
    ) {
      router.push({
        pathname: '/auth/login',
        query: {
          callback: router.pathname
        }
      })
    }

    return <Component {...props} />;
  }

  return Auth;
}
