import { AppBar, Toolbar, Typography } from '@mui/material';

export const Header=()=> {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" component="div">
          My Header
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
