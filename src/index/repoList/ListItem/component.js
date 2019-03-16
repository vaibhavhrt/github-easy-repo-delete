import React from 'react';
import PropTypes from 'prop-types';

import dateFormatter from '../../../lib/dateFormatter';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    inline: {
        display: 'inline',
    },
});

const ListItemComponent = props => {
    const { classes, repo, deleteRepo } = props;
    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar alt={`${repo.owner.login}'s avatar`} src={repo.owner.avatar_url} />
            </ListItemAvatar>
            <ListItemText
                primary={repo.full_name}
                secondary={
                    <>
                        <Typography variant='subheading' component='span' color='textPrimary'>{repo.description}</Typography>
                        <Typography component='span' color='textSecondary' className={classes.inline}>
                            Language: {repo.language} {repo.license && `License: ${repo.license.name}` } Last Updated: {dateFormatter(repo.updated_at)}&nbsp;
                        </Typography>
                        <Typography component='a' color='textSecondary' className={classes.inline} href={repo.html_url} target='blank' rel='noopener noreferrer'>View on Github</Typography>
                        {!!repo.deleteError && <Typography variant='overline' color='error'>{repo.deleteError.message}</Typography>}
                    </>
                }
            />
            <ListItemSecondaryAction>
                <Button
                    variant='contained'
                    disabled={repo.isDeleting}
                    color='secondary'
                    onClick={() => deleteRepo(repo.id)}
                >
                    {repo.isDeleting ? 'Deleting...' : 'Delete'}
                </Button>
            </ListItemSecondaryAction>
        </ListItem>
    );
};

ListItemComponent.propTypes = {
    classes: PropTypes.object.isRequired,
    repo: PropTypes.object.isRequired,
    deleteRepo: PropTypes.func.isRequired,
};

export default withStyles(styles)(ListItemComponent);
