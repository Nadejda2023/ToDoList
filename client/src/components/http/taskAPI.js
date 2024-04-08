import { $authHost } from "./index";

export const createTasks = async (tasks) => {
    const {data} = await $authHost.post('/tasks', tasks)
    return data
    
}

export const fetchTasks = async () => {
    const {data} = await $authHost.get('/tasks')
    console.log('data from fetch:',data)
    return data
    
}

export const updateTasks = async (formData) => {
    const {data} = await $authHost.put('/tasks/taskId')
    return data
    
}

export const changeTasks = async (status) => {
    const {data} = await $authHost.patch('/tasks/taskId')
    return data
    
}

export const fetchTasksByResponsiblePerson = async (userId) => {
    const { data } = await $authHost.get(`/tasks/group-by-responsible-person/${Number(userId)}`);
    return data;
}

export const fetchTasksByDate = async () => {
    const { data } = await $authHost.get('/tasks/group-by-date');
    return data;
}

export const byTasksId = async () => {
    const {data} = await $authHost.get('/tasks/:taskId')
    return data
    
}

