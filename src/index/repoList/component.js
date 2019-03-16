import React from 'react';
import PropTypes from 'prop-types';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
    root: {
        width: '100%',
    },
});

const RepoListComponent = props => {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <Divider />
            List of repos
        </div>
    );
};

RepoListComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RepoListComponent);
