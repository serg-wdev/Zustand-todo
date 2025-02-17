import {create} from 'zustand'
import { generateId } from '../helpers';


interface Task {
    id: string;
    title: string;
    createdAt: number;
}

interface Done {
    id: string;
    title: string;
}

interface ToDoStore {
    tasks: Task[];
    doneTasks: Done[];
    doneCount: number;
    createTask: (title: string) => unknown;
    updateTask: (id: string, title: string) => void;
    removeTask: (id: string) => void;
    addToCart: (id: string) => void;
}

export const useToDoStore = create<ToDoStore>((set, get) => ({
    tasks: [],
    doneTasks: [],
    doneCount: 0,
    createTask: (title: string) => {
        const { tasks } = get();
        const newTask = {
            id: generateId(),
            title,
            createdAt: Date.now()
        }
        set({
            tasks: [newTask].concat(tasks),
        })
    },

    updateTask: (id: string, title: string) => {
        const { tasks } = get();
        set({
            tasks: tasks.map((task) => ({
                ...task,
                title: task.id === id ? title : task.title
            }))
        })
    },

    removeTask: (id: string) => {
        const { tasks } = get();
        set({
            tasks: tasks.filter((task) => task.id !== id )
        })
    },

    addToCart: (id: string) => {
        const { doneTasks, tasks, doneCount } = get();
        const taskToMove = tasks.find((task) => task.id === id);
        if (taskToMove) {
            set({
                tasks: tasks.filter((task) => task.id !== id),
                doneTasks: [
                    ...doneTasks,
                    { id: taskToMove.id, title: taskToMove.title}
                ],
                doneCount: doneCount + 1
            });
    }
}
}))