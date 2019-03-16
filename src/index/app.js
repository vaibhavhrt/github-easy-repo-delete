import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import TokenInputContainer from './tokenInput/tokenInputContainer';
import RepoListContainer from './repoList/comtainer';

const styles = theme => ({
    root: {
        display: 'flex',
        width: '50vw',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        margin: `${theme.spacing.unit * 3}px auto`,
        padding: theme.spacing.unit,
    },
});

class App extends React.Component{
    render(){
        const { classes, token } = this.props;
        return (
            <Paper className={classes.root} elevation={2}>
                <Typography variant='h3' component='h1' color='secondary'>Github Easy Repo Delete</Typography>
                {!token && <TokenInputContainer />}
                {!!token && <Typography variant='overline' align='center'>Repo Token: {token}</Typography>}
                {!!token && <RepoListContainer />}
            </Paper>
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
