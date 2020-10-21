import React, { useState } from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SettingsIcon from '@material-ui/icons/Settings';
import Header from '../header/header';
import Recent from './recents';
import Favorite from './favorite';
import Snackbar from '@material-ui/core/Snackbar';
import RestoreIcon from '@material-ui/icons/Restore';
import MainSettings from './main-settings';
import './settings.scss';

const Settings = () => {
  const [snack, showSnack] = useState(true);
  const [value, setValue] = useState(2);

  setTimeout(() => showSnack(false), 3000);
  return (
    <div>
    <Snackbar
       anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
       open={snack}
       onClose={() => showSnack(false)}
       message="Review your Settings to your taste"
       key={'bottom'} />

      <Header title="Settings"/>
      { value === 0 && <Recent />}
      { value === 1 && <Favorite /> }
      { value === 2 && <MainSettings/> }

    <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        className="bottomNav">
        <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
        <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Settings" icon={<SettingsIcon />} />
      </BottomNavigation>
    </div>
  )
}

export default Settings;
