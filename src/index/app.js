import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Material UI
import { withStyles } from '@material-ui/core/styles';

import TokenInputContainer from './tokenInput/tokenInputContainer';

const styles = theme => ({
    root: {
        display: 'flex',
        width: '50vw',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
});

class App extends React.Component{
    render(){
        const { classes, token } = this.props;
        return (
            <div className={classes.root}>
                {!token && <TokenInputContainer />}
                <h4>Repo List</h4>
            </div>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
    token: PropTypes.string,
};

const mapStateToProps = state => {
    const { token } = state.auth;
    return { token };
};

export default connect(mapStateToProps)(withStyles(styles)(App));
