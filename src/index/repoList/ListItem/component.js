import React from 'react';
import PropTypes from 'prop-types';

import dateFormatter from '../../../lib/dateFormatter';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

// Material Icons
import LinkIcon from '@material-ui/icons/Link';

const styles = theme => ({});

const ListItemComponent = props => {
    const { repo, deleteRepo } = props;
    return (
        <ListItem>
            <ListItemText
                primary={repo.full_name}
                secondary={
                    <>
                        <Typography component='span' color='textSecondary'>Last Updated: {dateFormatter(repo.updated_at)}</Typography>
                        {!!repo.deleteError && <Typography variant='overline' color='error'>{repo.deleteError.message}</Typography>}
                    </>
                }
            />
            <ListItemSecondaryAction>
                <IconButton
                    color='primary'
                    component='a'
                    href={repo.html_url}
                    target='blank'
                    rel='noopener noreferrer'
                >
                    <LinkIcon />
                </IconButton>
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
    repo: PropTypes.object.isRequired,
    deleteRepo: PropTypes.func.isRequired,
};

export default withStyles(styles)(ListItemComponent);
