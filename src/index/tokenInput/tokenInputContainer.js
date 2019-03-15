import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TokenInputComponent from './tokenInputComponent';

// Actons
import { setAuthToken } from '../redux/actions/auth';

class TokenInputContainer extends React.Component{
    constructor(props){
        super(props);
        this.state = { token: null };
    }

    onChange = e => this.setState({ token: e.target.value });

    onSubmit = e => {
        e.preventDefault();
        return this.props.setAuthToken(this.state.token);
    }

    render(){
        return <TokenInputComponent onSubmit={this.onSubmit} onChange={this.onChange} token={this.state.token} />;
    }
}

TokenInputContainer.propTypes = {
    setAuthToken: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
    setAuthToken: token => dispatch(setAuthToken(token)),
});

export default connect(null, mapDispatchToProps)(TokenInputContainer);
