import React from 'react';
import { useDispatch } from 'react-redux';
import { apiRegisterUser } from 'components/redux/Auth/authSlice';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const onSubmitRegistr = event => {
    event.preventDefault();
    const name = event.currentTarget.elements.userName.value;
    const email = event.currentTarget.elements.userEmail.value;
    const password = event.currentTarget.elements.userPassword.value;
    // console.log(name);
    // console.log(email);
    // console.log(password);
    const formData = {
      name: name,
      email: email,
      password: password,
    };
    dispatch(apiRegisterUser(formData));
    event.currentTarget.reset();
  };
  return (
    <div style={{ marginLeft: 30 }}>
      <h1>RegisterPage</h1>
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
