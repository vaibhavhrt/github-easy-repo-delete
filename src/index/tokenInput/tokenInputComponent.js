import React from 'react';
import PropTypes from 'prop-types';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

// Icons
import HelpIcon from '@material-ui/icons/Help';

const styles = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: theme.spacing.unit,
    },
    submit: {
        margin: `0 ${theme.spacing.unit}px`,
        display: 'flex',
        alignItems: 'center',
    },
    tooltip: {
        margin: `0 ${theme.spacing.unit}px`,
    },
});

const TokenInputComponent = props => {
    const { classes, form, onSubmit, onChange } = props;
    return (
        <form onSubmit={onSubmit} className={classes.root}>
            <TextField
                required
                variant='outlined'
                id='id_token'
                name='token'
                label='API Token'
                placeholder='Enter Github API Token'
                value={form.data.token || ''}
                onChange={onChange}
            />
            <div className={classes.submit}>
                <Button
                    type='submit'
                    color='primary'
                    variant='contained'
                    size='large'
                    // className={classes.submit}
                >
                    Save
                </Button>
                <Tooltip
                    title='Get your token at https://github.com/settings/tokens witn repo and delete repo permissions.'
                    className={classes.tooltip}
                >
                    <HelpIcon color='primary' />
                </Tooltip>
            </div>
        </form>
    );
};

TokenInputComponent.propTypes = {
    classes: PropTypes.object.isRequired,
    token: PropTypes.string,
    form: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(TokenInputComponent);
