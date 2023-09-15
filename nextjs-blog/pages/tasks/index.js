import { useCallback, useRef, useState } from "react";
import styles from "../../styles/Tasks.module.css";
import classnames from "classnames";

const newId = () => crypto.randomUUID();

const initialTasks = [
    { id: "aaa", task: "Mop floor", isDone: true },
    { id: "bbb", task: "Empty bin", isDone: true },
    { id: "ccc", task: "Make soup", isDone: false },
    { id: "ddd", task: "Order book", isDone: false },
];

const TaskList = ({ tasks }) => {
    return <ul>
        {tasks.map(t => <li key={t.id} className={classnames(
            styles.taskItem,
            { [styles.taskDone]: t.isDone })}>
            {t.task}
        </li>)
        }
    </ul >
};

const Tasks = () => {
    const [tasks, setTasks] = useState(initialTasks);
    const [disableAdd, setDisableAdd] = useState(true);
    const [newItem, setNewItem] = useState("");
    const submitButtonRef = useRef(null);

    const addTask = useCallback((newItem) => { setTasks([...tasks, { id: newId(), task: newItem, isDone: false }]); }, [tasks, setTasks]);

    const handleNewItem = useCallback((newValue) => {
        setDisableAdd(!newValue.length);
        setNewItem(newValue);
    }, [setDisableAdd, setNewItem]);

    const handleEnterKeypress = useCallback((e) => {
        if (e.keyCode === 13 && submitButtonRef.current && !submitButtonRef.current.disabled) {
            submitButtonRef.current.click();
        };
    }, [submitButtonRef]);

    return <>
        <h1>Task Manager</h1>
        <h2>My Tasks</h2>
        <label>
            <input type="checkbox" id="hideComplete" name="hideComplete" value="hideComplete" />
            Hide Completed Tasks
        </label>
        <TaskList tasks={tasks} />
        <h2>Add Tasks</h2>
        <input type="text" id="newItem" onChange={(e) => handleNewItem(e.target.value, setNewItem, setDisableAdd)} onKeyUp={handleEnterKeypress} />
        <button ref={submitButtonRef} disabled={disableAdd} onClick={() => { addTask(newItem) }}>Add</button >
    </>
};

export default Tasks;