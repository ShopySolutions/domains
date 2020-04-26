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
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

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
    cardDetailsDivider: {
        marginTop: '20px'
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
    },
    quote: {
        textAlign: "center",
        marginTop: "20px",
        color: theme.palette.background.default
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    searchButton: {
        marginRight: "12px"
    }

}));

const extentions = [".com", ".fr", ".be", ".org", ".net", ".io", ".info", ".top", ".me", ".co", ".eu", ".tv", ".pro", ".biz", ".club", ".tech", ".download", ".online", ".life", ".dev", ".space", ".site", ".store", ".app"];

function Home() {
    const classes = useStyles();
    const [results, setResults] = useState([]);
    const [domainName, setDomainName] = useState('');
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [extention, setExtension] = useState('.com');
    const [disableDropdown, setDisableDropdown] = useState(false);
    const {t} = useTranslation();
    const [open, setOpen] = React.useState(false);

    const openExtensionMenue = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const changeExtensionMenue = (value) => {
        setAnchorEl(null);
        if (_.isString(value)) {
            setExtension(value)
        }
    };


    const fetchData = async () => {
        setResults([])
        setOpen(true);

        let domainNameSearch;
        if (disableDropdown) {
            domainNameSearch = domainName
        } else {
            domainNameSearch = domainName + extention
        }


        Promise.all([
            fetch(`http://api.toevenstay.com:3000/api/domain/get/ovh/${domainNameSearch}`),
            fetch(`http://api.toevenstay.com:3000/api/domain/get/infomaniak/${domainNameSearch}`),
            fetch(`http://api.toevenstay.com:3000/api/domain/get/godaddy/${domainNameSearch}`),
            fetch(`http://api.toevenstay.com:3000/api/domain/get/porkbun/${domainNameSearch}`),
            fetch(`http://api.toevenstay.com:3000/api/domain/get/lws/${domainNameSearch}`)
        ])
            .then(([ovh, infomaniak, godaddy, porkbun, lws]) =>
                Promise.all([ovh.json(), infomaniak.json(), godaddy.json(), porkbun.json(), lws.json()])
            )
            .then((respose) => {
                const sorting = _.sortBy(respose, [function (o) {
                    if (o.prix.achatAvecReduction && o.prix.achatAvecReduction !== null) {
                        return o.prix['achatAvecReduction'];
                    } else {
                        return o.prix['achat'];
                    }
                }]);
                const filtered = _.filter(sorting, obj => !_.has(obj, "err"));
                setResults(filtered)
                setOpen(false);
            });
    };


    const handleChange = (event) => {
        setDomainName(event.target.value);
        const domainName = event.target.value;
        // eslint-disable-next-line no-useless-escape
        let regularExp = new RegExp(/^((?:(?:(?:\w[\.\-\+]?)*)\w)+)((?:(?:(?:\w[\.\-\+]?){0,62})\w)+)\.(\w{2,6})$/);
        const check = domainName.match(regularExp);
        if (check !== null) {
            setDisableDropdown(true)
        } else {
            setDisableDropdown(false)
        }
    };


    return (
        <>
            <div className={classes.heroContent}>
                <Container maxWidth="md">
                    <Paper component="form" className={classes.paperSearch}>
                        <InputBase
                            placeholder="Enter domain name . . ."
                            value={domainName}
                            onChange={handleChange}
                            className={classes.inputSearch}
                            autoFocus
                            name="Name"
                        />
                        <Divider className={classes.divider} orientation="vertical"/>
                        <Button size={"large"} aria-controls="simple-menu" aria-haspopup="true"
                                disabled={disableDropdown}
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
                                <MenuItem value={value} onClick={() => changeExtensionMenue(value)}
                                          key={index}>{value}</MenuItem>
                            ) : ""}

                        </Menu>


                        <Divider className={classes.divider} orientation="vertical"/>
                        <Tooltip title="Search">
                            <IconButton type="button" className={classes.searchButton}
                                        onClick={() => fetchData()}>
                                <Search/>
                            </IconButton>
                        </Tooltip>
                    </Paper>
                    <Typography variant={"h1"} component={"h1"}
                                className={classes.quote}>{t("freeway.domainSearch")}</Typography>

                </Container>
            </div>
            <Container className={classes.cardGrid} maxWidth="md">
                <Grid container spacing={4}>
                    {results != null && results.length > 0 ? results.map((item, index) => (
                        <Grid item key={index} xs={12} sm={12} md={12}>

                            <Card className={classes.card}>
                                <CardContent className={classes.cardContent}>
                                    <Grid container>
                                        <Grid item xs={8} sm={8} md={8}>

                                            <Grid container direction={"row"} alignItems={"center"}
                                                  justify={"center"}>
                                                <Typography gutterBottom variant="h3" component="h3">
                                                    {item.domain}
                                                </Typography>
                                            </Grid>
                                            <Grid container direction={"row"} alignItems={"center"}
                                                  justify={"center"}>
                                                <Typography gutterBottom variant="h5" component="h5">
                                                    <Chip
                                                        label={item.fournisseur}
                                                        color="primary"
                                                    />
                                                </Typography>
                                            </Grid>
                                            <Grid container direction={"row"} alignItems={"center"}
                                                  justify={"center"}>

                                                {item.prix.renouvelement > 0 ? (
                                                    <Grid item xs={4} sm={4} md={4}>
                                                        <Typography gutterBottom variant="h6" component="h6"
                                                                    className={classes.center}>
                                                            {t('freeway.renewPrice')}
                                                        </Typography>
                                                        <Typography gutterBottom variant="h4" component="h2"
                                                                    className={classes.center}>
                                                            {Number(item.prix.renouvelement).toFixed(2)}&nbsp;€
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
                                                            {Number(item.prix.transfert).toFixed(2)}&nbsp;€
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
                                                            {Number(item.prix.transfertAvecReduction).toFixed(2)}&nbsp;€
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
                                                                <del>{Number(item.prix.achat).toFixed(2)}&nbsp;€</del>
                                                            </Typography>


                                                            <Typography gutterBottom variant="h6"
                                                                        component="h2"
                                                                        className={classes.center}>{t('freeway.discountPrice')}</Typography>
                                                            <Typography gutterBottom variant="h3"
                                                                        component="h3"
                                                                        className={classes.center}>{Number(item.prix.achatAvecReduction).toFixed(2)}&nbsp;€</Typography>
                                                        </>
                                                    ) : item.prix.achat > 0 ? (
                                                        <>
                                                            <Typography gutterBottom variant="h6"
                                                                        component="h2"
                                                                        className={classes.center}>{t('freeway.price')}</Typography>
                                                            <Typography gutterBottom variant="h3"
                                                                        component="h3"
                                                                        className={classes.center}>{Number(item.prix.achat).toFixed(2)}&nbsp;€</Typography>
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


            <Container maxWidth={"md"}>

                <Grid container spacing={4}>
                    <Grid item xs={12} sm={12} md={6} lg={4}>
                        <Card>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    alt="Contemplative Reptile"
                                    height="140"
                                    image="/logov1.png"
                                    title="Contemplative Reptile"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        DEMO
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Lizards are a widespread group of squamate reptiles, with over 6,000 species,
                                        ranging
                                        across all continents except Antarctica
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4}>
                        <Card>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    alt="Contemplative Reptile"
                                    height="140"
                                    image="/logov1.png"
                                    title="Contemplative Reptile"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        DEMO
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Lizards are a widespread group of squamate reptiles, with over 6,000 species,
                                        ranging
                                        across all continents except Antarctica
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4}>
                        <Card>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    alt="Contemplative Reptile"
                                    height="140"
                                    image="/logov1.png"
                                    title="Contemplative Reptile"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        DEMO
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Lizards are a widespread group of squamate reptiles, with over 6,000 species,
                                        ranging
                                        across all continents except Antarctica
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                </Grid>
            </Container>


            <Backdrop className={classes.backdrop} open={open}>
                <CircularProgress color="inherit"/>&nbsp;&nbsp;&nbsp;Searching your expected domain with best price . .
            </Backdrop>

        </>
    );
}

export default (Home);
