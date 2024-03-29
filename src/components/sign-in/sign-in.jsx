import React, {useRef} from 'react';
import {useDispatch} from 'react-redux';
import Header from '../header/header';
import {useHistory} from 'react-router-dom';
import {login} from "../../store/actions/api-actions";
import {PathName} from '../../utils/const';

const SignIn = () => {
  const loginRef = useRef();
  const passwordRef = useRef();

  const history = useHistory();
  const dispatch = useDispatch();

  const handleFormSubmit = () => {
    dispatch(login({
      email: loginRef.current.value,
      password: passwordRef.current.value,
    }));

    history.push(PathName.MAIN);
  };

  return (
    <div className="page page--gray page--login">
      <Header/>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="" method="POST" onSubmit={handleFormSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input ref={loginRef} className="login__input form__input" type="email" name="email" placeholder="Email" required/>
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input ref={passwordRef} className="login__input form__input" type="password" name="password" placeholder="Password" required/>
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default SignIn;
