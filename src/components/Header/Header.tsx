import { useLocation, useNavigate } from 'react-router-dom';
import './header.css';
import { AppRegistration, Home } from '@mui/icons-material';
import { MenuItem, Typography } from '@mui/material';
import colors from '../../utils/colors';

enum ROUTES {
  HOME = '/home',
  REGISTER = '/register'
}

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isSelected = (route: string) => location.pathname === route;

  return (
    <div className="header">
      <img
        src="https://epayco.com/wp-content/uploads/2023/04/Logo-negro-3.png"
        alt="epay-co-logo"
        className="header-logo"
        onClick={() => navigate(ROUTES.HOME)}
      />
      <MenuItem onClick={() => navigate(ROUTES.HOME)} sx={{ padding: '10px', gap: 1, }}>
        <Home sx={{ color: isSelected(ROUTES.HOME) ? colors.primary : 'white', fontSize: 15 }} />
        <Typography
          variant="body1"
          sx={{
            display: 'flex',
            gap: 1,
            alignItems: 'center',
            color: isSelected(ROUTES.HOME) ? colors.primary : 'white'
          }}
        >
          Home
        </Typography>
      </MenuItem>

      <MenuItem onClick={() => navigate(ROUTES.REGISTER)} sx={{ padding: '10px', gap: 1, }}>
        <AppRegistration sx={{ color: isSelected(ROUTES.REGISTER) ? colors.primary : 'white', fontSize: 15 }}/>
        <Typography
          variant="body1"
          sx={{
            display: 'flex',
            gap: 1,
            alignItems: 'center',
            color: isSelected(ROUTES.REGISTER) ? colors.primary : 'white'
          }}
        >
          Register
        </Typography>
      </MenuItem>
    </div>
  );
};

export default Header;
