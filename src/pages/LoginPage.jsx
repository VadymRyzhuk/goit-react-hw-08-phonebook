import React from 'react';

import { useDispatch } from 'react-redux';
import { apiLoginUser } from 'components/redux/Auth/authSlice';
//import { selectAuthError } from 'components/redux/Auth/AuthSlice.selectors';
import { toast } from 'react-toastify';

const LoginPage = () => {
  const dispatch = useDispatch();
  //const error = useSelector(selectAuthError);
  // useEffect(() => {
  //   if (error) {
  //     setTimeout(() => {
  //       toast.error('Please, write a correct email or password!'); // можливо, використовуйте більш конкретний текст помилки, якщо доступно
  //     }, 500); // затримка перед виведенням toast
  //   }
  // }, [error]);
  const onSubmitRegistr = event => {
    event.preventDefault();
    const email = event.currentTarget.elements.userEmail.value;
    const password = event.currentTarget.elements.userPassword.value;
    // console.log(name);
    // console.log(email);
    // console.log(password);
    const formData = {
      email,
      password,
    };
    //console.log(formData);

    dispatch(apiLoginUser(formData))
      .unwrap()
      .then(() => toast.success('Perfect! You was logged in!'))
      .catch(() => toast.error('Please, write a correct email or password!'));
    // if (error) {
    //   toast.error('Please, write a correct email or password!'); // можливо, використовуйте більш конкретний текст помилки, якщо доступно
    // }
    //event.currentTarget.reset();
  };

  // useEffect(() => {
  //   // Вивести toast при наявності помилки
  //   if (error) {
  //     toast.error('Please, write a correct email or password!');
  //   }
  // }, [error]);

  return (
    <div style={{ marginLeft: 30 }}>
      {/* {error && toast.error('Please, write a correct email or password!')} */}
      <h1>Login page</h1>
      <form
        onSubmit={onSubmitRegistr}
        style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
      >
        <label style={{ display: 'flex', gap: 45 }}>
          Email:
          <input
            type="email"
            name="userEmail"
            placeholder="KlavdiaPetrivna@gmail.com"
            required
          />
        </label>
        <label style={{ display: 'flex', gap: 15 }}>
          Password:
          <input
            type="password"
            name="userPassword"
            placeholder="***********"
            minLength={7}
            required
          />
        </label>
        <button type="submit" style={{ width: 100 }}>
          Sign in
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
