import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from "react-router-dom";

interface NavDropdownProps {
  label: string;
  options: { label: string; path: string }[];
}

const NavDropdown: React.FC<NavDropdownProps> = ({ label, options }) => {
  // Anchor element used to open/close menu
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  // Opens menu
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  // Closes menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Navigates to route and closes the menu
  const handleMenuItemClick = (path: string) => {
    navigate(path);
    handleClose();
  };

  return (
    <div>
      <Button
        color="inherit"
        onClick={handleClick}
      >
        {label}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {options.map(opt => (
          <MenuItem key={opt.label} onClick={() => handleMenuItemClick(opt.path)}>
            {opt.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default NavDropdown;