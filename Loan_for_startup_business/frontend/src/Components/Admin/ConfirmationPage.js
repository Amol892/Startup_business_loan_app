import React from 'react';

const ConfirmationPage = ({ user, onConfirm, onCancel }) => {
    console.log(user)
  return (
    <div>
      <p>Do you really want to mark {user.first_name} {user.last_name} as a defaulter?</p>
      
      <button onClick={onConfirm}>Yes</button>
      <button onClick={onCancel}>No</button>
    </div>
  );
};

export default ConfirmationPage;
