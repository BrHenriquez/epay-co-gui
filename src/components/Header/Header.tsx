import { useNavigate } from 'react-router-dom';
import './header.css';

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="header">
      <img src="https://epayco.com/wp-content/uploads/2023/04/Logo-negro-3.png" alt="epay-co-logo" className='header-logo' onClick={ () => navigate('/home')}/>
    </div>
  )
}

export default Header
