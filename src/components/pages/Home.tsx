import { Button } from '@mui/material';
import { useContext, useEffect } from 'react';
import {
    useNavigate,
    Link,
    Outlet
} from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalContext';
import { useTestModel } from '../../context/TestModel';
import { log } from 'console';



export const Home = () => {
    const navigate=useNavigate();
    const {testModel}=useTestModel();

    useEffect(() => {
           testModel.test=`test ${testModel.cnt++}`;
            // console.log('Home',testModel);
    }, []);
    

    return <>
        <h1>Home</h1>
        <Button variant='outlined' onClick={() => {
            setTimeout(() => {
                //  history.push('/about');
                navigate('/about');
            }, 10);
        }}>
            navigat to About
        </Button>
        <hr />
        <Button variant='outlined' onClick={() => {
            // history.push('/one');
            navigate('/home/one');
        }}>
            navigat to Home 1
        </Button>
        <Link to="/home/two">Home 2</Link>
        <Outlet />
    </>;
};
