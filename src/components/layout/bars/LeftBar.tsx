//create empty component for LeftBar

import * as React from 'react';
import { Box, Container, Grid, Paper } from '@mui/material';
import { BaseBar } from './BaseBar';
import { useTestModel } from '../../../context/TestModel';
import { useEffect } from 'react';

interface Props {

open: boolean;
}

export const LeftBar = (props: Props) => {
    const {testModel}=useTestModel();
    const [count,setCount]=React.useState(0);

    useEffect(() => {
          testModel.subscribe((st:any)=>{
            console.log('LeftBar',st);
                setCount(st.cnt);
            }
            );
    }, []);
    return (
        <>
            <BaseBar open={props.open}>Left Bar {count}</BaseBar>
        </>
    );
};