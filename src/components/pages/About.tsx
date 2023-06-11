import { Button } from '@mui/material';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { globalState } from '../../context/models/GlobalState';


export const About = () => {

   
    return <>
        <h1>About</h1>
        <Button onClick={() => {
            // history.push('/');
            globalState.routeTo('/home');
        }}>
            navigat to Home
        </Button>
    </>;
};
