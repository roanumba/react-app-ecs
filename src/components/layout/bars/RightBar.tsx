//create empty component for RightBar

import * as React from 'react';
import { Box, Container, Grid, Paper } from '@mui/material';
import { BaseBar } from './BaseBar';

interface Props {
    open: boolean;
}

export const RightBar = (props: Props) => {
    return (
        <>
            <BaseBar open={props.open}>Right Bar</BaseBar>
        </>
    );
};