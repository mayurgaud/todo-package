import React from 'react';
import {List} from 'immutable';
import PropTypes from 'prop-types';
import TaskItem from '../task-item/task-item';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';

function TaskList({removeTask, tasks, updateTask, updateTaskOrdering}) {
  const taskItems = tasks.map((task, index) => {
    return (
      <TaskItem
        key={index}
        taskKey={index}
        task={task}
        removeTask={removeTask}
        updateTask={updateTask}
      />
    );
  });

  const onSortEnd = ({oldIndex, newIndex}) => {
    if (!tasks.get(oldIndex) && !tasks.get(newIndex)) {
      return;
    }

    updateTaskOrdering({
      sourceTask: tasks.get(oldIndex).toJS(), targetTask: tasks.get(newIndex).toJS(),
      sourceIndex: oldIndex, targetIndex: newIndex
    });
  };

  return (
    <div className="task-list">
      <SortableList distance={1} lockAxis={'y'} taskItems={taskItems} onSortEnd={onSortEnd}/>
    </div>
  );
}


const SortableItem = SortableElement(({value}) =>
  <li className="listWrapperSortable">{value}</li>
);

const SortableList = SortableContainer(({taskItems}) => {
  return (
    <ul>
      {taskItems.map((task, index) => (
        <SortableItem key={`item-${index}`} index={index} value={task}/>
      ))}
    </ul>
  );
});


TaskList.propTypes = {
  removeTask: PropTypes.func.isRequired,
  tasks: PropTypes.instanceOf(List).isRequired,
  updateTask: PropTypes.func.isRequired,
  updateTaskOrdering: PropTypes.func.isRequired
};

export default TaskList;
