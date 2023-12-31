import * as React from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import {
  Menu,
  MenuItem,
  Divider,
  Tooltip,
  IconButton,
  Avatar,
  ListItemIcon,
  Box,
} from '@mui/material';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import './style.scss';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../../utils/queries';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_USER } from '../../utils/actions';

export default function AccountMenu() {
  // TODO Figure out which of these Auth calls is bad
  const userId = Auth.getProfile().data._id; // Get the user id from the Auth.getProfile() function

  const [state, dispatch] = useStoreContext();

  const label = { inputProps: { 'aria-label': 'web-theme' } };

  // use the QUERY_USER GetUser query to get the user data for the logged in user
  const { data } = useQuery(QUERY_USER, {
    variables: { _id: userId },
  });

  // user the UPDATE_USER action to update the global state.user object with the user data
  React.useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_USER,
        user: data.user,
      });
    }
  }, [data, dispatch]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          textAlign: 'center',
          width: 'fit-content',
        }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}>
            <Avatar sx={{ width: 40, height: 40 }}>
              <img src={state.user.profilePicture} alt="profilePicture"></img>
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        disableScrollLock={true}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
        {/* display the user first and last name, not clickable menu item just avatar and text */}
        <div id="dropdownUsername">
          <Avatar sx={{ width: 30, height: 30 }}>
            {' '}
            <img src={state.user.profilePicture} alt="profilePicture"></img>
          </Avatar>
          <p fontSize="1rem">
            {state.user.firstName} {state.user.lastName}
          </p>
        </div>

        <Divider sx={{ my: 0.5 }} />
        <MenuItem
          component={Link}
          to={`/orderHistory/${userId}`}
          onClick={handleClose}
          disableRipple>
          <ListItemIcon>
            <ShoppingCartIcon fontSize="small" />
          </ListItemIcon>
          Order History
        </MenuItem>
        <MenuItem
          component={Link}
          to="/"
          onClick={() => Auth.logout()}
          disableRipple>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
