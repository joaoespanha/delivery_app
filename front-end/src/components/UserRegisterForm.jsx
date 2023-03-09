import React from 'react';

function UserRegisterForm() {
  const [name, setName] = useState(2);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form>
      <label htmlFor="name">
        <input
          type="text"
          name="name"
          id="name"
          value={ name }
          data-testid="customer_checkout__input-address"
          onChange={ ({ target }) => setName(target.value) }
        />
      </label>
      <label htmlFor="email">
        <input
          type="text"
          name="email"
          id="email"
          value={ email }
          data-testid="customer_checkout__input-address"
          onChange={ ({ target }) => setEmail(target.value) }
        />
      </label>
      <label htmlFor="password">
        <input
          type="text"
          name="password"
          id="password"
          value={ password }
          data-testid="customer_checkout__input-address"
          onChange={ ({ target }) => setPassword(target.value) }
        />
      </label>
    </form>
  );
}

export default UserRegisterForm;
