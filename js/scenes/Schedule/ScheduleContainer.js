import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { _fetchSessions } from '../../redux/modules/sessions';
import Schedule from './Schedule';

import { ActivityIndicator, ListView } from 'react-native';

class ScheduleContainer extends Component{
  static propTypes = {

  }
  static route = {
    navigationBar: {
      title: 'Schedule',
    }
  }
  componentDidMount(){
    this.props.fetchSessions();
  }
  render(){
    if (this.props.isLoading) {
      return (
        <ActivityIndicator animating={true} size="small" color="black" />
      );
    } else {
    return (
      <Schedule
        dataSource={this.props.dataSource}
       />
    );
    }
  }
}

const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2,
  sectionHeaderHasChanged: (s1, s2) => s1 !== s2
});

function mapDispatchToProps(dispatch){
  return {
    fetchSessions(){
      dispatch(_fetchSessions())
    }
  }
}

function mapStateToProps(state){
  return {
    dataSource: ds.cloneWithRowsAndSections(
      state.session.sessionData.dataBlob,
      state.session.sessionData.sectionIds,
      state.session.sessionData.rowIds
    ),
    isLoading: state.session.isLoading
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ScheduleContainer);
