import { useState } from "react";
import styles from "../../styles/Tasks.module.css";
import classnames from "classnames";

const initialTasks = [
    { task: "Mop floor", isDone: true },
    { task: "Empty bin", isDone: true },
    { task: "Make soup", isDone: false },
    { task: "Order book", isDone: false },
];

const TaskList = ({ tasks }) => {
    return <ul>
        {tasks.map(t => <li className={classnames(
            styles.taskItem,
            { [styles.taskDone]: t.isDone })}>
            {t.task}
        </li>)
        }
    </ul >
};

const addTask = (tasks, setTask, newItem) => { setTask([...tasks, { task: newItem }]); };

const handleNewItem = (newValue, setNewItem, setDisableAdd) => {
    setDisableAdd(!newValue.length);
    setNewItem(newValue);
};

const Tasks = () => {
    const [tasks, setTasks] = useState(initialTasks);
    const [disableAdd, setDisableAdd] = useState(true);
    const [newItem, setNewItem] = useState("");

    return <>
        <h1>Task Manager</h1>
        <h2>My Tasks</h2>
        <label>
            <input type="checkbox" id="hideComplete" name="hideComplete" value="hideComplete" />
            Hide Completed Tasks
        </label>
        <TaskList tasks={tasks} />
        <h2>Add Tasks</h2>
        <input type="text" id="newItem" onChange={(e) => handleNewItem(e.target.value, setNewItem, setDisableAdd)} />
        <button disabled={disableAdd} onClick={() => { addTask(tasks, setTasks, newItem) }}>Add</button >
    </>
};

export default Tasks;