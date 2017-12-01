import React, {Component} from 'react';
import {List} from 'immutable';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';

import {getTaskFilter, getVisibleTasks, tasksActions} from 'src/todoList/tasks/index';
import TaskForm from '../../components/task-form/index';
import TaskList from '../../components/task-list/index';


export class TasksPage extends Component {
  static propTypes = {
    createTask: PropTypes.func.isRequired,
    filterTasks: PropTypes.func.isRequired,
    loadTasks: PropTypes.func.isRequired,
    removeTask: PropTypes.func.isRequired,
    tasks: PropTypes.instanceOf(List).isRequired,
    undeleteTask: PropTypes.func.isRequired,
    unloadTasks: PropTypes.func.isRequired,
    updateTask: PropTypes.func.isRequired,
    updateTaskOrdering: PropTypes.func.isRequired
  };

  componentWillMount() {
    this.props.loadTasks();
  }

  componentWillUnmount() {
    this.props.unloadTasks();
  }

  render() {
    return (
      <div className="g-row">
        <div className="g-col">
          <TaskForm handleSubmit={this.props.createTask}/>
        </div>

        <div className="g-col">
          <TaskList
            removeTask={this.props.removeTask}
            tasks={this.props.tasks}
            updateTask={this.props.updateTask}
            updateTaskOrdering={this.props.updateTaskOrdering}
          />
        </div>

      </div>
    );
  }
}


//=====================================
//  CONNECT
//-------------------------------------

const mapStateToProps = createSelector(
  getTaskFilter,
  getVisibleTasks,
  (filterType, tasks) => ({
    filterType,
    tasks
  })
);

const mapDispatchToProps = Object.assign(
  {},
  tasksActions,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TasksPage);
