import React, {useContext, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {MainContext} from "../../Context/MainContext";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import clsx from "clsx";
import {WbSunnyOutlined} from "@material-ui/icons";
import LanguageMenu from "../LanguageMenu/LanguageMenu";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
    root: {
        boxShadow: 'none'
    },
    flexGrow: {
        flexGrow: 1
    },
    signOutButton: {
        marginLeft: theme.spacing(1)
    },
    logo: {
        maxHeight: "50px"
    }

}));

export default function MenuAppBar() {
    const classes = useStyles();
    const {setTheme} = useContext(MainContext);
    const [switchData, setSwitchData] = useState();
    const handleTheme = () => {
        setTheme(localStorage.getItem('theme') === 'dark' ? 'light' : 'dark')
        setSwitchData(localStorage.getItem('theme') === 'dark')
    };
    return (

        <AppBar
            className={clsx(classes.root)}
        >
            <Container className={classes.cardGrid} maxWidth="lg">
                <Toolbar>
                    <img
                        className={classes.logo}
                        alt="Logo"
                        src="/logov1.png"
                    />

                    <div className={classes.flexGrow}/>
                    <Button color="inherit">Home</Button>
                    <Button color="inherit">Service</Button>
                    <Button color="inherit">About</Button>
                    <Button color="inherit">Contact</Button>
                    <Tooltip title="Light">
                        <IconButton size="small" className={clsx(classes.themeIcon, classes.signOutButton)}
                                    onClick={handleTheme}>
                            <WbSunnyOutlined/>
                        </IconButton>
                    </Tooltip>
                    <LanguageMenu/>
                </Toolbar>
            </Container>
        </AppBar>

    );
}