import React from 'react';
import {withTranslation} from 'react-i18next';
import i18next from 'i18next';

export const MainContext = React.createContext(null);

class MainProvider extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            account: {},
            currentLocale: undefined,
        };
    }

    componentDidMount = async () => {

    };
    componentWillMount() {
        if(localStorage.getItem('theme')===null || localStorage.getItem('theme')===undefined ){
            localStorage.setItem('theme', 'light');
        }
    }
    setLocale = async (locale) => {
        await i18next.changeLanguage(locale);
        localStorage.setItem('local', locale);
    };
    setTheme = (param) => {
        this.setState({
            ...this.state
        });
        localStorage.setItem('theme', param);
    };

    render() {
        return (
            <MainContext.Provider
                value={{
                    loading: this.state.loading,
                    account: this.state.account,
                    currentLocaled: this.state.currentLocale,
                    setLocale: this.setLocale,
                    setTheme: this.setTheme,
                }}
            >
                {this.props.children}
            </MainContext.Provider>
        );
    }
}
export default withTranslation()(MainProvider);
