import { Button } from '@mui/material';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export const About = () => {
    const navigate = useNavigate();

    useEffect(() => {
        //  console.log('About',testModel);
 }, []);
   
    return <>
        <h1>About</h1>
        <Button onClick={() => {
            // history.push('/');
            navigate('/home');
        }}>
            navigat to Home
        </Button>
    </>;
};
