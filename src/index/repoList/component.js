import React from 'react';
import PropTypes from 'prop-types';
import { Waypoint } from 'react-waypoint';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';

import ListItemContainer from './ListItem/container';

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
            <List>
                {repos.map(repo => <ListItemContainer key={repo.id} repo={repo} />)}
                {hasMore && <div>
                    {!isLoading && <Waypoint
                        onEnter={() => loadFunc(true)}
                    />}
                    Loading...
                </div>}
            </List>
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
