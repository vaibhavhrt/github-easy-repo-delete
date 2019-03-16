import React from 'react';
import PropTypes from 'prop-types';
import { Waypoint } from 'react-waypoint';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
    root: {
        width: '100%',
    },
});

const RepoListComponent = props => {
    const { classes, repos, hasMore, isLoading, loadFunc } = props;
    return (
        <div className={classes.root}>
            <Divider />
            List of repos
            {repos.map(repo => <li key={repo.id}>{repo.name}</li>)}
            {hasMore && <div>
                {!isLoading && <Waypoint
                    onEnter={() => loadFunc(true)}
                />}
                Loading...
            </div>}
        </div>
    );
};

RepoListComponent.propTypes = {
    classes: PropTypes.object.isRequired,
    repos: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    hasMore: PropTypes.bool.isRequired,
    loadFunc: PropTypes.func.isRequired,
};

export default withStyles(styles)(RepoListComponent);
