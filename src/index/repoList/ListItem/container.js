import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ListItemComponent from './component';

// Actions
import { deleteRepo } from '../../redux/actions/repo';

const ListItemContainer = props => {
    const { repo, deleteRepo } = props;
    return <ListItemComponent repo={repo} deleteRepo={deleteRepo} />;
};

ListItemContainer.propTypes = {
    repo: PropTypes.object.isRequired,
    deleteRepo: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
    deleteRepo: id => dispatch(deleteRepo(id)),
});

export default connect(null, mapDispatchToProps)(ListItemContainer);
