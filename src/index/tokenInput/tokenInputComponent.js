import React from 'react';
import PropTypes from 'prop-types';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: theme.spacing.unit,
    },
    submit: {
        margin: `0 ${theme.spacing.unit}px`,
    },
});

const TokenInputComponent = props => {
    const { classes, form, onSubmit, onChange } = props;
    return (
        <div className={classes.root}>
            <form onSubmit={onSubmit}>
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
                <Button
                    type='submit'
                    color='primary'
                    variant='contained'
                    size='large'
                    className={classes.submit}
                >
                    Save
                </Button>
            </form>
        </div>
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
