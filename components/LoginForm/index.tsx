import React, { useState, useEffect, useRef } from 'react';
import { InputGroup, FormControl, Button, Row, Col } from 'react-bootstrap';

import AuthState from '../../dtos/AuthState';
import User from '../../dtos/User';

import { useRouter } from 'next/router';
import Link from 'next/link';

import { useDispatch, useSelector } from 'react-redux';
import { setLoggedUser } from '../../store/modules/auth/reducer';

import UsersService from '../../services/users';

import { toast } from 'react-toastify';

import BlueBackground from '../shared/BlueBackground';

interface LoginProps {
  titlePhrase: String,
  buttonPhrase: String
}

const LoginForm: React.FC<LoginProps> = ({ titlePhrase, buttonPhrase}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const passwordRef = useRef(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const loggedUser: User = useSelector((state: AuthState) => state.auth.loggedUser);

  useEffect(() => {
    if(loggedUser) {
      setEmail(loggedUser.email);
      if(passwordRef && passwordRef.current) {
        passwordRef.current.focus();
      }
    }
  }, [loggedUser])

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
  
    try {
      const response = await UsersService.signIn({ email, password });
  
      const { id, email: userEmail, name, profile } = response.data.data;
  
      const user: User = {
        id,
        name,
        email: userEmail,
        profile: profile
      };
  
      dispatch(setLoggedUser(user));
  
      toast.info('Login realizado com sucesso!');
  
      router.push(user.profile === 'admin' ? '/admin/' : '/')
    } catch (err) {
      toast.error('E-mail ou senha inválidos!');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Row>
        <Col lg={{span: 6, offset: 3}} md={{span: 8, offset: 2}}>
          <BlueBackground>
            <h4>{ titlePhrase }</h4>

            <InputGroup className="mt-3">
              <FormControl 
                placeholder="Meu e-mail" 
                value={email}
                type="email"
                onChange={
                  (event: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(event.target.value)
                }
                required
              />
            </InputGroup>

            <InputGroup className="mt-3">
              <FormControl 
                placeholder="Senha"
                value={password}
                ref={passwordRef}
                type="password"
                onChange={
                  (event: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(event.target.value)
                }
                required 
              />
            </InputGroup>

            <Button type="submit" className="btn btn-info mt-3 w-100">{ buttonPhrase }</Button>
            
            <br />

            <Link href="/auth/password_recovery">Esqueci minha senha</Link> <br />
          </BlueBackground>
        </Col>
      </Row>
    </form>
  )
}

export default LoginForm;