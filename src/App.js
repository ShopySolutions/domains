import React, {useContext} from 'react';
import './App.css';
import CssBaseline from "@material-ui/core/CssBaseline";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Home from "./Views/Home/Home";
import {createMuiTheme} from "@material-ui/core";
import {ThemeProvider} from "@material-ui/styles";
import MenuAppBar from "./Components/Layout/MenueAppBar";
import {MainContext} from "./Context/MainContext";
import './i18n/i18n';
import typography from "./typography";
import Footer from "./Views/Footer/Footer";


const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    footer: {
    /*    paddingLeft: theme.spacing(6),
        paddingRight: theme.spacing(6),*/
        paddingTop: theme.spacing(6),
    },
    icons: {
        fontSize: 20,
        marginRight: theme.spacing(1),
    },
}));


function App() {
    const {loading} = useContext(MainContext);
    const classes = useStyles();
    const theme = localStorage.getItem('theme');
    function getThemeType() {
        return createMuiTheme({
            palette: {
                type: theme
            },
            typography
        });
    }
    return (
        <ThemeProvider theme={getThemeType()}>
            <CssBaseline/>
            <MenuAppBar/>
            <main>
                <Home/>
            </main>
            <footer className={classes.footer}>
                <Footer/>
            </footer>
        </ThemeProvider>
    );
}

export default App;
