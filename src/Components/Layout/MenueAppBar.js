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
import {useTranslation} from "react-i18next";

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
    },
    menueItem: {
        borderRadius: "20px",
        marginRight: "1%"
    }

}));

export default function MenuAppBar() {
    const classes = useStyles();
    const {setTheme} = useContext(MainContext);
    const [switchData, setSwitchData] = useState();
    const {t}=useTranslation()
    const handleTheme = () => {
        setTheme(localStorage.getItem('theme') === 'dark' ? 'light' : 'dark')
        setSwitchData(localStorage.getItem('theme'))
    };
    return (

        <AppBar
            className={clsx(classes.root)}
            color={"default"}
        >
            <Container className={classes.cardGrid} maxWidth="lg">
                <Toolbar>
                    <img
                        className={classes.logo}
                        alt="Logo"
                        src="/logov1.png"
                    />

                    <div className={classes.flexGrow}/>
                    <Button color="secondary" variant={"contained"} className={classes.menueItem}>{t("freeway.home")}</Button>
                    <Button color="secondary" variant={"contained"} className={classes.menueItem}>{t("freeway.service")}</Button>
                    <Button color="secondary" variant={"contained"} className={classes.menueItem}>{t("freeway.about")}</Button>
                    <Button color="secondary" variant={"contained"} className={classes.menueItem}>{t("freeway.contact")}</Button>
                    <Tooltip title="Light">
                        <IconButton size="small" color={"secondary"} className={classes.signOutButton}
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