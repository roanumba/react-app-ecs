import { Button } from '@mui/material';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalContext';
import { useTestModel } from '../../context/TestModel';


export const About = () => {
    const navigate = useNavigate();
    const {testModel}=useTestModel();

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
