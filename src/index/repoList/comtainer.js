import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import RepoListComponent from './component';
import { fetchRepoList } from '../redux/actions/auth';

class RepoListContainer extends React.Component{
    componentDidMount(){
        this.props.fetchRepoList();
    }

    render(){
        return <RepoListComponent />;
    }
}

RepoListContainer.propTypes = {
    fetchRepoList: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
    fetchRepoList: () => dispatch(fetchRepoList()),
});

export default connect(null, mapDispatchToProps)(RepoListContainer);
