//create empty component for LeftBar

import * as React from 'react';
import { Box, Container, Grid, Paper } from '@mui/material';
import { BaseBar } from './BaseBar';

import { useEffect } from 'react';
import { testModel } from '../../../context/models/TestML';
import { subscribe } from 'valtio';

interface Props {

open: boolean;
}
// const ctx=testModel
export const LeftBar = (props: Props) => {
    // const {testModel}=useTestModel();
    const [count,setCount]=React.useState(0);

    useEffect(() => {
          const un=testModel.subscribe((st:any)=>{
                  setCount(st.cnt);
            }
            );
            
            return ()=>{
                un();
            }
            
    }, []);
    return (
        <>
            <BaseBar open={props.open}>Left Bar {count}</BaseBar>
        </>
    );
};