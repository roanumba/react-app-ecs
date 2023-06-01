// create the main content component with sticky header and footer and scrollable content
import { Container, Grid } from '@mui/material';
import { Outlet } from 'react-router-dom';

interface Props {
}

export const MainContent = (props: Props) => {
    return (
        <>

            <Container maxWidth="lg">
                <Grid container spacing={2}>
                    <Grid item xs={12}>

                        <Outlet />

                    </Grid>
                </Grid>
            </Container>


        </>
    );
};




