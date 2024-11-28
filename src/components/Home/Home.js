import React from 'react';

export default function Home() {
 
  const user=JSON.parse(localStorage.getItem('userData'));
  console.log(user);
  

  return (
    <div>
      <h2>Hi {user.firstName}, {user.lastName} Welcome </h2>
    </div>
  );
}
