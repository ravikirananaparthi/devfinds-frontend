import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="">
     <Link to={'/app/login'}>Login</Link>
    </div>
  );
}
