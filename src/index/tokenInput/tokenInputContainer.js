import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TokenInputComponent from './tokenInputComponent';

const TokenInputContainer = props => {
    return <TokenInputComponent />;
};

export default connect()(TokenInputContainer);
