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

export const updateTasks = async () => {
    const {data} = await $authHost.put('/tasks/taskId')
    return data
    
}

export const changeTasks = async () => {
    const {data} = await $authHost.patch('/tasks/taskId')
    return data
    
}

export const userTasks = async () => {
    const {data} = await $authHost.get('/tasks/group-by-responsible-person')
    return data
    
}

export const groupTasks = async () => {
    const {data} = await $authHost.get('/tasks/group-by-date')
    return data
    
}

export const byTasksId = async () => {
    const {data} = await $authHost.get('/tasks/:taskId')
    return data
    
}

