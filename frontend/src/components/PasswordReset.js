// frontend/src/components/PasswordReset.js
import React, { useState } from 'react';
import { resetPassword } from '../auth';

function PasswordReset() {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await resetPassword(email);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <button type="submit">Reset Password</button>
    </form>
  );
}

export default PasswordReset;
