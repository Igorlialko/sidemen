import React from 'react';

import { useNavigate } from 'react-router-dom';

import s from './admin.module.scss';

export const Header = () => {
  const navigate = useNavigate();

  return (
    <header className='_container'>
      <nav className={s.header}>
        <a
          className='button'
          href='/'
          onClick={(e) => {
            e.preventDefault();
            navigate('/');
          }}
        >
          Back
        </a>
        <p className={s.admin}>Admin</p>
        <a className='button' href='/stream' target='_blank'>
          Open game in new tab
        </a>
      </nav>
    </header>
  );
};
