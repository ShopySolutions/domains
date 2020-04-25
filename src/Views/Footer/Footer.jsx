import Container from "@material-ui/core/Container";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Facebook, Instagram, LinkedIn, Twitter} from "@material-ui/icons";


const useStyles = makeStyles((theme) => ({

    root: {
        paddingLeft: '0 !important',
        paddingRight: '0 !important',
        backgroundColor: theme.palette.background.paper
    },
    content: {
        paddingTop: theme.spacing(5)
    },
    input: {
        width: '100%'
    },
    button: {
        minWidth: '30px',
        padding: '4px 4px'
    },
    media: {
        height: 30,
    },
    socialIcon: {
        fontSize: '30px'
    },
    copyright: {
        textAlign: "center"
    }

}));

function Footer() {
    const classes = useStyles();


    return (
        <div className={classes.root}>
            <Container maxWidth="lg">
                <CardContent className={classes.content}>
                    <Grid container spacing={5}>
                        <Grid item={true} lg={12} md={12} sm={12} xs={12}>
                            <img src="/logov1.png" alt="Paris" className={classes.media}/>
                        </Grid>
                        <Grid item={true} lg={4} md={6} sm={12} xs={12}>
                            <Typography gutterBottom component={"h2"} variant="h5">We are a platform which caters
                                to Domains For you</Typography>
                            <Grid container justify="flex-start" alignItems={"flex-start"}>
                                <Button size='medium' color={"default"} className={classes.button}> <Facebook
                                    className={classes.socialIcon}/></Button>
                                <Button size='medium' color={"default"} className={classes.button}> <Twitter
                                    className={classes.socialIcon}/></Button>
                                <Button size='medium' color={"default"} className={classes.button}> <LinkedIn
                                    className={classes.socialIcon}/></Button>
                                <Button size='medium' color={"default"} className={classes.button}> <Instagram
                                    className={classes.socialIcon}/></Button>
                            </Grid>
                        </Grid>
                        <Grid item={true} lg={2} md={6} sm={12} xs={12}>
                            <Link
                                color="textPrimary"
                                to="#"
                                variant="h6">
                                <Typography variant="h5">Blogs</Typography>
                            </Link>
                            <Link
                                color="textPrimary"
                                to="#"
                                variant="h6">
                                <Typography
                                    variant="h5">FAQs</Typography>
                            </Link>
                            <Link
                                color="textPrimary"
                                to="#"
                                variant="h6">
                                <Typography
                                    variant="h5">About Us</Typography>
                            </Link>
                        </Grid>
                        <Grid item={true} lg={2} md={6} sm={12} xs={12}>
                            <Link
                                color="textPrimary"
                                to="#"
                                variant="h6">
                                <Typography
                                    variant="h5">Terms & Conditions</Typography>
                            </Link>
                            <Link
                                color="textPrimary"
                                to="#"
                                variant="h6">
                                <Typography
                                    variant="h5">Privacy Policy</Typography>
                            </Link>
                            <Link
                                color="textPrimary"
                                to="#"
                                variant="h6">
                                <Typography
                                    variant="h5">Contact Us</Typography>
                            </Link>

                        </Grid>
                        <Grid item={true} lg={2} md={6} sm={12} xs={12}>
                            <Link
                                color="textPrimary"
                                to="#"
                                variant="h6">
                                <Typography
                                    variant="h5">How it works?</Typography>
                            </Link>
                            <Link
                                color="textPrimary"
                                to="#"
                                variant="h6">
                                <Typography
                                    variant="h5">Referals</Typography>
                            </Link>
                        </Grid>
                        <Grid item={true} lg={2} md={6} sm={12} xs={12}>
                            <Link
                                color="textPrimary"
                                to="#"
                                variant="h6">
                                <Typography
                                    variant="h5">GOOGLE PLAY</Typography>
                            </Link>

                            <Link
                                color="textPrimary"
                                to="#"
                                variant="h6">
                                <Typography
                                    variant="h5">APP STORE</Typography>
                            </Link>
                        </Grid>
                        <Grid item={true} lg={12} md={12} sm={12} xs={12}>
                            <Typography variant="body1" className={classes.copyright}>© 2020 Domains - All rights
                                reserved.</Typography>
                        </Grid>

                    </Grid>
                </CardContent>

            </Container>
        </div>

    );
}

export default Footer;
