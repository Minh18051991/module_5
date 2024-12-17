import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import  'bootstrap-icons/font/bootstrap-icons.css';
import * as toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import {v1 as uuidv1} from 'uuid';

import {fromJS, List, Map} from 'immutable'
import {DragDropContext, Droppable} from 'react-beautiful-dnd';

import './style.scss';
import Column from './components/Column/';
import AddNewModal from './components/addNewModal/';
import Task from './components/task/';

/** @type {import('toastr')} */
const toast = toastr;

class App extends Component {

    state = {
        displayModal: false,
        editingColumnIndex: '',
        taskContent: '',
        editedTaskId: null,
        columns: List([
            Map({id: 'td', title: 'TO DO', tasks: List([])}),
            Map({id: 'ip', title: 'IN PROGRESS', tasks: List([])}),
            Map({id: 'de', title: 'DONE', tasks: List([])})
        ])
    }

    componentDidMount() {
        const columns = localStorage.getItem('columns');
        if (columns) {
            const parsedColumns = JSON.parse(columns);
            const immutableColumns = fromJS(parsedColumns);
            this.setState({columns: immutableColumns});
        }
    }

    handleToggleModal = (choosenColumn = '') => () => {
        this.setState(prevState => ({
            displayModal: !prevState.displayModal,
            editingColumnIndex: choosenColumn
        }));
    }

    handleChangeTaskContent = (e) => this.setState({taskContent: e.target.value})

    handleChangeeditingColumnIndex = (editingColumnIndex) => () => this.setState({editingColumnIndex: editingColumnIndex})

    handleAddNewTask = () => {
        const {taskContent, editingColumnIndex, columns} = this.state;
        if (taskContent.trim() === '') {
            toast.warning('Please enter your task', 'Notice', {timeOut: 2000});
        } else {
            const newTask = Map({
                id: uuidv1(),
                content: taskContent,
                time: new Date().toLocaleString()
            });
            const columnIndex = columns.findIndex(column => column.get('id') === editingColumnIndex);
            const updatedColumn = columns.updateIn([columnIndex, 'tasks'], tasks => tasks.push(newTask));
            this.setState({
                displayModal: false,
                editingColumnIndex: '',
                taskContent: '',
                columns: updatedColumn
            }, () => {
                localStorage.setItem('columns', JSON.stringify(updatedColumn.toJS()));
            });
        }
    }

    handleDeleteTask = (columnIndex, taskIndex) => () => {
        const result = window.confirm('Are you sure to delete this task?');
        if (result) {
            const {columns} = this.state;
            const updatedColumn = columns.updateIn(
                [columnIndex, 'tasks'],
                tasks => tasks.remove(taskIndex)
            );
            this.setState({
                columns: updatedColumn
            }, () => {
                localStorage.setItem('columns', JSON.stringify(updatedColumn.toJS()));
            });
        }
    }

    handleChooseEditTask = (columnIndex, taskIndex, taskId) => () => {
        this.setState({
            editedTaskId: taskId,
            taskContent: this.state.columns.getIn([columnIndex, 'tasks', taskIndex, 'content'])
        });
    }

    handleEdit = () => {
        const {columns, editedTaskId, taskContent} = this.state;
        const columnIndex = columns.findIndex(column =>
            column.get('tasks').some(task => task.get('id') === editedTaskId)
        );
        const taskIndex = columns.getIn([columnIndex, 'tasks']).findIndex(task => task.get('id') === editedTaskId);

        const updatedColumn = columns.setIn([columnIndex, 'tasks', taskIndex, 'content'], taskContent);
        this.setState({
            columns: updatedColumn,
            editedTaskId: null,
            taskContent: ''
        }, () => {
            localStorage.setItem('columns', JSON.stringify(updatedColumn.toJS()));
        });
    }

    handleCancelEdit = () => {
        this.setState({
            editedTaskId: null,
            taskContent: ''
        });
    }

    handleSaveDrag = (result) => {
        console.log('Drag ended: ', result);
        const {source, destination, reason} = result;
        if (reason === 'DROP' && destination) {
            const {columns} = this.state;
            const sourceColumnIndex = columns.findIndex(column => column.get('id') === source.droppableId);
            const task = columns.getIn([sourceColumnIndex, 'tasks', source.index]);
            let updatedColumn = columns.updateIn(
                [sourceColumnIndex, 'tasks'],
                tasks => tasks.remove(source.index)
            );
            const destinationColumnIndex = columns.findIndex(column => column.get('id') === destination.droppableId);
            updatedColumn = updatedColumn.updateIn(
                [destinationColumnIndex, 'tasks'],
                tasks => tasks.insert(destination.index, task)
            );
            this.setState({
                columns: updatedColumn
            }, () => {
                localStorage.setItem('columns', JSON.stringify(updatedColumn.toJS()));
            });
        }
    }

    render() {
        const {columns, displayModal, editingColumnIndex, taskContent, editedTaskId} = this.state;

        return (
            <div className="App">
                <h1 className="App__title">TO DO LIST</h1>
                <DragDropContext onDragEnd={this.handleSaveDrag}>
                    <div className="App__content">
                        {columns.map((column, columnIndex) => (
                            <Droppable droppableId={column.get('id')} key={column.get('id')}>
                                {(provided) => (
                                    <div ref={provided.innerRef} {...provided.droppableProps}>
                                        <Column
                                            column={column}
                                            handleAddNewTask={this.handleToggleModal}
                                        >
                                            {column.get('tasks').map((task, taskIndex) => (
                                                <Task
                                                    key={task.get('id')}
                                                    index={taskIndex}
                                                    isEditing={task.get('id') === editedTaskId}
                                                    handleChangeTaskContent={this.handleChangeTaskContent}
                                                    task={task}
                                                    handleEdit={this.handleEdit}
                                                    handleCancelEdit={this.handleCancelEdit}
                                                    handleChooseEditTask={this.handleChooseEditTask(columnIndex, taskIndex, task.get('id'))}
                                                    handleDeleteTask={this.handleDeleteTask(columnIndex, taskIndex)}
                                                />
                                            ))}
                                            {provided.placeholder}
                                        </Column>
                                    </div>
                                )}
                            </Droppable>
                        ))}
                    </div>
                </DragDropContext>
                {displayModal && (
                    <AddNewModal
                        editingColumnIndex={editingColumnIndex}
                        taskContent={taskContent}
                        handleChangeTaskContent={this.handleChangeTaskContent}
                        handleChangeeditingColumnIndex={this.handleChangeeditingColumnIndex}
                        handleAddNewTask={this.handleAddNewTask}
                        handleToggleModal={this.handleToggleModal()}
                        selectedColumn={editingColumnIndex}
                        handleChangeSelectedColumn={this.handleChangeeditingColumnIndex}
                    />
                )}
            </div>
        );
    }
}

export default App;