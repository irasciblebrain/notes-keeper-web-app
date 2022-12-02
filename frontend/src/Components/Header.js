import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import cookie from 'js-cookie';

const Header = () => {
  const navigate = useNavigate();
  const [pic, setPic] = React.useState('');

  React.useEffect(() => {
    const index = Math.floor(Math.random() * 1000);
    fetch(`https://picsum.photos/id/${index}/info`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPic(data.download_url);
      });
  }, []);
  const user = useSelector((state) => state.user);

  const handleLogout = () => {
    cookie.remove('token');
    navigate('/');
    window.location.reload();
  };

  if (!user)
    return (
      <div>
        <header className='site-header'>
          <div className='site-identity'>
            <h1>My Tasks's</h1>
          </div>
          <nav className='site-navigation'>
            <ul className='nav'>
              <li>
                <a href='https://gsportfolio.netlify.app'>About</a>
              </li>
            </ul>
          </nav>
        </header>
      </div>
    );

  return (
    <div>
      <div>
        <header className='site-header'>
          <div className='site-identity'>
            <h1>
              <a onClick={() => navigate('/')}>My Tasks's</a>
            </h1>
          </div>
          <nav
            className='site-navigation'
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <ul className='nav'>
              <li>
                <a
                  style={{ color: '#eee' }}
                  href='https://gsportfolio.netlify.app'
                >
                  {user.username}
                </a>
              </li>
              {user && (
                <li>
                  <img
                    src={pic}
                    style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '100%',
                      marginTop: '-10px',
                    }}
                  />
                </li>
              )}

              <li>
                <a style={{ color: '#eee' }} onClick={handleLogout}>
                  logout
                </a>
              </li>
            </ul>
          </nav>
        </header>
      </div>
    </div>
  );
};

export default Header;
