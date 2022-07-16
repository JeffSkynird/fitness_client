import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Slide from '@material-ui/core/Slide';

import Logo from '../assets/images/logo.png'
import Logo1 from '../assets/images/011.png'
import { Avatar, Button, makeStyles } from '@material-ui/core';
//history react router
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));




function HideOnScroll(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({ target: window ? window() : undefined });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

HideOnScroll.propTypes = {
    children: PropTypes.element.isRequired,
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default function HideAppBar(props) {
    const history = useHistory();
    const classes = useStyles();
    return (
        <React.Fragment>
        
            <HideOnScroll {...props}>
                <AppBar style={{ backgroundColor: '#981717' }}  >
                    <Toolbar>
                        <img src={Logo} alt="" srcset="" style={{ height: 40 }} />

                        <Typography variant="h6" className={classes.title}>

                        </Typography>
                        <Button color="default" style={{ color: 'white' }} onClick={()=>history.push('/open')}>Open</Button>
                        <Button color="inherit" style={{ color: 'white', marginRight: 15 }} onClick={()=>history.push('/final')}>Finales</Button>
                        <Button color="inherit" style={{ color: 'white', marginRight: 15 }} onClick={()=>history.push('/cards')}>Score Cards</Button>
                        <Avatar alt="Rodrigo" style={{background:'black' }} src={Logo1}/>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
            <Toolbar />

        </React.Fragment>
    );
}
