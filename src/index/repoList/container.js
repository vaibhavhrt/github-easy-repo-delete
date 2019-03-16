import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import RepoListComponent from './component';
import { fetchRepoList } from '../redux/actions/repo';

class RepoListContainer extends React.Component{
    componentDidMount(){
        this.props.fetchRepoList();
    }

    render(){
        const { repo, fetchRepoList } = this.props;
        return <RepoListComponent repos={repo.list} isLoading={repo.isFetching} hasMore={repo.hasMore} loadFunc={fetchRepoList} />;
    }
}

RepoListContainer.propTypes = {
    repo: PropTypes.object.isRequired,
    fetchRepoList: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
    const { repo } = state;
    return { repo };
};

const mapDispatchToProps = dispatch => ({
    fetchRepoList: next => dispatch(fetchRepoList(next)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RepoListContainer);
