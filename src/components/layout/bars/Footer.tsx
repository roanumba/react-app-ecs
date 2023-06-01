//create component for Footer

import * as React from 'react';

import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { styled } from '@mui/system';
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ProfileIcon from '@mui/icons-material/Person';

const CustomBottomNavigation = styled(BottomNavigation)({
    position: 'fixed',
    bottom: 0,
    width: '100%',
  });

interface Props {
}

export const Footer = (props:Props) => {
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event:any, newValue:any) => {
      setValue(newValue);
    };
  
    return (
      <CustomBottomNavigation value={value} onChange={(handleChange)}>
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Explore" icon={<ExploreIcon />} />
        <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Profile" icon={<ProfileIcon />} />
      </CustomBottomNavigation>
    );
  }