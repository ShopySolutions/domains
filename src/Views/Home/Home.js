import React, {useState} from 'react';
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {Search} from "@material-ui/icons";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Chip from "@material-ui/core/Chip";
import {useTranslation} from "react-i18next";
import _ from "lodash"

const useStyles = makeStyles((theme) => ({
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(10, 0, 6),
        backgroundImage: "linear-gradient(to right,#2e5ae8,#4242be,#442c96,#3d1770,#31034e)",
        [theme.breakpoints.down('sm')]: {
            minHeight: "250px",
        },
        [theme.breakpoints.up('md')]: {
            minHeight: "350px",
        },

    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: "30px"
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
    paperSearch: {
        display: 'flex',
        alignItems: 'center',
        borderRadius: "36px",
        boxShadow: "1px 1px 10px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
        [theme.breakpoints.down('sm')]: {
            marginTop: "10%"
        },
        [theme.breakpoints.up('md')]: {
            marginTop: "10%"
        },
    },

    inputSearch: {
        marginLeft: theme.spacing(1),
        flex: 1,
        height: '50px',
        padding: '0px 20px 0px 20px'
    },
    message: {
        alignItems: 'center',
        padding: '8px 0',
    },
    icons: {
        fontSize: 16,
        marginRight: theme.spacing(1),
    },
    rootCard: {
        display: 'flex',
        alignItems: 'center',
        fontSize: '0.875rem',
        fontWeight: '400',
        borderRadius: '4px',
        letterSpacing: '0.01071em',
        boxShadow: 'none'
    },
    divider: {
        height: 28,

        [theme.breakpoints.down('sm')]: {
            margin: 10,
        },
        [theme.breakpoints.up('md')]: {
            margin: 18,
        },

    },
    cardDivider: {
        height: '90%',
        margin: 4,
    },
    gridDesign: {
        borderRight: '1px solid',
        borderColor: theme.palette.divider
    },
    center: {
        textAlign: "center"
    },
    marginCenter: {
        marginLeft: "50%"
    },
    contentCenter: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    }

}));

const extentions = [".com", ".fr", ".be", ".org", ".net", ".io", ".info", ".top", ".me", ".co", ".eu", ".tv", ".pro", ".biz", ".club", ".tech", ".download", ".online", ".life", ".dev", ".space", ".site", ".store", ".app"];

function Home() {
    const classes = useStyles();
    const [results, setResults] = useState([]);
    const [domainName, setDomainName] = useState('shoes');
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [extention, setExtension] = useState('.com');
    const {t} = useTranslation();

    const openExtensionMenue = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const changeExtensionMenue = (value) => {
        setAnchorEl(null);
        setExtension(value)
    };


    const fetchData = async () => {
        setResults([])

        Promise.all([
            fetch(`http://api.toevenstay.com:3000/api/domain/get/ovh/${domainName}`),
            fetch(`http://api.toevenstay.com:3000/api/domain/get/infomaniak/${domainName}`),
            fetch(`http://api.toevenstay.com:3000/api/domain/get/godaddy/${domainName}`),
            fetch(`http://api.toevenstay.com:3000/api/domain/get/porkbun/${domainName}`),
            fetch(`http://api.toevenstay.com:3000/api/domain/get/lws/${domainName}`)
        ])
            .then(([ovh, infomaniak, godaddy, porkbun, lws]) =>
                Promise.all([ovh.json(), infomaniak.json(), godaddy.json(), porkbun.json(), lws.json()])
            )
            .then((respose) => {
                // eslint-disable-next-line array-callback-return
                respose.sort((a, b) => {
                    if ((a && a.prix && a.prix.achat && a.prix.achat > 0) && (b && b.prix && b.prix.achat && b.prix.achat && b.prix.achat > 0)) {
                        return a.prix.achat - b.prix.achat
                    }
                });
                const filtered = _.filter(respose, obj => !_.has(obj, "err"));
                setResults(filtered)
            });
    };


    const handleChange = (event) => {
        setDomainName(event.target.value);
    };


    return (
        <>
            <div className={classes.heroContent}>
                <Container maxWidth="md">
                    <Paper component="form" className={classes.paperSearch}>
                        <InputBase
                            placeholder="Enter Item name"
                            value={domainName}
                            onChange={handleChange}
                            className={classes.inputSearch}
                            autoFocus
                            name="Name"
                        />
                        <Divider className={classes.divider} orientation="vertical"/>
                        <Button size={"large"} aria-controls="simple-menu" aria-haspopup="true"
                                onClick={openExtensionMenue}>
                            {extention}
                        </Button>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={changeExtensionMenue}
                        >
                            {extentions.length > 0 ? extentions.map((value, index) =>
                                <MenuItem onClick={() => changeExtensionMenue(value)} key={index}>{value}</MenuItem>
                            ) : ""}

                        </Menu>


                        <Divider className={classes.divider} orientation="vertical"/>
                        <Tooltip title="Search">
                            <IconButton type="button" className={classes.button} onClick={() => fetchData()}>
                                <Search/>
                            </IconButton>
                        </Tooltip>
                    </Paper>
                </Container>
            </div>
            <Container className={classes.cardGrid} maxWidth="md">
                <Grid container spacing={4}>
                    {results != null && results.length > 0 ? results.map((item, index) => (
                        <Grid item key={index} xs={12} sm={12} md={12}>
                            <Card className={classes.card}>
                                {/*{"domain":"shoes.com","prix":{"renouvelement":11.988,"achat":null,"achatAvecReduction":null,"transfert":11.988,"transfertAvecReduction":8.988}}*/}
                                <CardContent className={classes.cardContent}>
                                    <Grid container>
                                        <Grid item xs={8} sm={8} md={8}>

                                            <Grid container direction={"row"} alignItems={"center"} justify={"center"}>
                                                <Typography gutterBottom variant="h3" component="h3">
                                                    {item.domain}
                                                </Typography>
                                            </Grid>
                                            <Grid container direction={"row"} alignItems={"center"} justify={"center"}>
                                                <Typography gutterBottom variant="h3" component="h3">
                                                    <Chip
                                                        label={item.prix.achat !== null ? <>{t('freeway.available')}</> : <>{t('freeway.notAvailable')}</>}
                                                        color={item.prix.achat !== null ? "primary" : "secondary"}
                                                    />
                                                </Typography>
                                            </Grid>
                                            <Grid container direction={"row"} alignItems={"center"} justify={"center"}>

                                                {item.prix.renouvelement > 0 ? (
                                                    <Grid item xs={4} sm={4} md={4}>
                                                        <Typography gutterBottom variant="h6" component="h6"
                                                                    className={classes.center}>
                                                            {t('freeway.renewPrice')}
                                                        </Typography>
                                                        <Typography gutterBottom variant="h4" component="h2"
                                                                    className={classes.center}>
                                                            {item.prix.renouvelement}
                                                        </Typography>
                                                    </Grid>
                                                ) : ""}

                                                {item.prix.transfert > 0 ? (
                                                    <Grid item xs={4} sm={4} md={4}>
                                                        <Typography gutterBottom variant="h6" component="h6"
                                                                    className={classes.center}>{t('freeway.transferPrice')}
                                                        </Typography>
                                                        <Typography gutterBottom variant="h4" component="h2"
                                                                    className={classes.center}>
                                                            {item.prix.transfert}
                                                        </Typography>
                                                    </Grid>
                                                ) : ""}

                                                {item.prix.transfertAvecReduction > 0 ? (
                                                    <Grid item xs={4} sm={4} md={4}>
                                                        <Typography gutterBottom variant="h6" component="h6"
                                                                    className={classes.center}>
                                                            {t('freeway.transferDiscountPrice')}
                                                        </Typography>
                                                        <Typography gutterBottom variant="h4" component="h2"
                                                                    className={classes.center}>
                                                            {item.prix.transfertAvecReduction}
                                                        </Typography>
                                                    </Grid>
                                                ) : ""}
                                            </Grid>

                                        </Grid>
                                        <Grid item xs={1} sm={1} md={1}>
                                            <Divider orientation="vertical" className={classes.marginCenter}/>
                                        </Grid>
                                        <Grid item xs={3} sm={3} md={3} className={classes.contentCenter}>
                                            {item.prix.achat > 0 ? (
                                                <>
                                                    {item.prix.achatAvecReduction > 0 ? (
                                                        <>
                                                            <Typography gutterBottom variant="h6"
                                                                        component="h2"
                                                                        className={classes.center}>{t('freeway.price')}</Typography>
                                                            <Typography gutterBottom variant="h3"
                                                                        component="h3"
                                                                        className={classes.center}>
                                                                <del>{item.prix.achat}</del>
                                                            </Typography>


                                                            <Typography gutterBottom variant="h6"
                                                                        component="h2"
                                                                        className={classes.center}>{t('freeway.discountPrice')}</Typography>
                                                            <Typography gutterBottom variant="h3"
                                                                        component="h3"
                                                                        className={classes.center}>{item.prix.achatAvecReduction}</Typography>
                                                        </>
                                                    ) : item.prix.achat > 0 ? (
                                                        <>
                                                            <Typography gutterBottom variant="h6"
                                                                        component="h2"
                                                                        className={classes.center}>{t('freeway.price')}</Typography>
                                                            <Typography gutterBottom variant="h3"
                                                                        component="h3"
                                                                        className={classes.center}>{item.prix.achat}</Typography>
                                                        </>
                                                    ) : ""}

                                                </>
                                            ) : (
                                                <Typography gutterBottom variant="h3" component="h3"
                                                            className={classes.center}>
                                                    <Chip
                                                        label={t('freeway.notAvailable')}
                                                        color={"secondary"}
                                                    />
                                                </Typography>
                                            )}
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    )) : ""}
                </Grid>
            </Container>
        </>
    );
}

export default (Home);
