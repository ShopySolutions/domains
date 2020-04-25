import React, {memo, useContext, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {IconButton, ListItemText, Menu, MenuItem, Tooltip} from '@material-ui/core';
import {Language} from '@material-ui/icons';
import {MainContext} from "../../Context/MainContext";

function LanguageMenu(props) {
  const { setLocale } = useContext(MainContext);
  const moreRef = useRef(null);
  
  const [openMenu, setOpenMenu] = useState(false);
  const handleMenuOpen = () => setOpenMenu( true );
  const handleMenuClose = () => setOpenMenu( false );

  const changeLanguage = value => setLocale( value );

  return (
    <>
      <Tooltip
        title="Language English/Française"
        aria-label="Language English/Française"
      >
        <IconButton
          ref={moreRef}
          size="small"
          color="secondary"
          onClick={handleMenuOpen}
          {...props}
        >
          <Language />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={moreRef.current}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        elevation={1}
        onClose={handleMenuClose}
        open={openMenu}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
      >
        <MenuItem
          id="en"
          onClick={() => {
            changeLanguage('en');
            handleMenuClose();
          }}
          button
          component="li"
        >
          <ListItemText primary="English" />
        </MenuItem>
        <MenuItem
          component="li"
          id="bn"
          onClick={() => {
            changeLanguage('fr');
            handleMenuClose();
          }}
          button
        >
          <ListItemText primary="Française" />
        </MenuItem>
      </Menu>
    </>
  );
}

LanguageMenu.propTypes = {
  className: PropTypes.string
};

export default memo(LanguageMenu);
