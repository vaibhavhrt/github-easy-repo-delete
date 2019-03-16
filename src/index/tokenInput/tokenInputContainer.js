import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TokenInputComponent from './tokenInputComponent';

// Actons
import { setAuthData, onChangeAuthForm } from '../redux/actions/auth';

class TokenInputContainer extends React.Component{
    onSubmit = e => {
        e.preventDefault();
        return this.props.setAuthToken();
    }

    render(){
        const { onChange, form } = this.props;
        return <TokenInputComponent onSubmit={this.onSubmit} onChange={onChange} form={form} />;
    }
}

TokenInputContainer.propTypes = {
    setAuthToken: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    form: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    const { form } = state.auth;
    return { form };
};

const mapDispatchToProps = dispatch => ({
    setAuthToken: token => dispatch(setAuthData(token)),
    onChange: e => dispatch(onChangeAuthForm(e)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TokenInputContainer);
