import React from 'react';
import { useDispatch } from 'react-redux';
import { apiRegisterUser } from 'components/redux/Auth/authSlice';
//import { selectAuthError } from 'components/redux/Auth/AuthSlice.selectors';
import { toast } from 'react-toastify';

const RegisterPage = () => {
  const dispatch = useDispatch();
  //const error = useSelector(selectAuthError);
  const onSubmitRegistr = event => {
    event.preventDefault();
    const name = event.currentTarget.elements.userName.value;
    const email = event.currentTarget.elements.userEmail.value;
    const password = event.currentTarget.elements.userPassword.value;
    // console.log(name);
    // console.log(email);
    // console.log(password);
    const formData = {
      name,
      email,
      password,
    };
    //console.log(formData);
    dispatch(apiRegisterUser(formData))
      .unwrap()
      .then(() => toast.success('Perfect! Successfully registration!'))
      .catch(() => toast.error('Please, write a correct email or password!'));
    // event.currentTarget.reset();
  };

  // useEffect(() => {
  //   // Вивести toast при наявності помилки
  //   if (error) {
  //     toast.error('Please, write a correct email or password!');
  //   }
  // }, [error]);

  return (
    <div style={{ marginLeft: 30 }}>
      <h1>Register page</h1>
      <form
        onSubmit={onSubmitRegistr}
        style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
      >
        <label style={{ display: 'flex', gap: 40 }}>
          Name:
          <input
            type="text"
            name="userName"
            placeholder="Klavdia Petrivna"
            minLength={2}
            required
          />
        </label>
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
          Sign up
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
