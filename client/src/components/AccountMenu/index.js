import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
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

export default function AccountMenu() {
  const userId = Auth.getProfile().data._id; // Get the user id from the Auth.getProfile() function

  // use the QUERY_USER GetUser query to get the user data for the logged in user
  const { loading, data } = useQuery(QUERY_USER, {
    variables: { _id: userId },
  });

  const user = data?.user || {};

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
            <Avatar sx={{ width: 32, height: 32 }}>
              <img src={user.profilePicture} alt="profilePicture"></img>
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
          <Avatar sx={{ width: 50, height: 50 }}>
            {' '}
            <img src={user.profilePicture} alt="profilePicture"></img>
          </Avatar>
          <p fontSize="1rem">
            {user.firstName} {user.lastName}
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
