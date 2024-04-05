import {makeAutoObservable} from "mobx"
export default class TaskProfile {
    constructor(){
        makeAutoObservable(this)
          console.log(this._tasks)
        this._tasks = [];
            // { id: 1, title: 'Task 1', priority: 'high', expirationDate: '2024-04-1', responsibleUser: 'User 1', status: 'to perform' },
            // { id: 2, title: 'Task 2', priority: 'medium', expirationDate: '2024-04-2', responsibleUser: 'User 2', status: 'in progress' },
            // { id: 3, title: 'Task 3', priority: 'high', expirationDate: '2024-04-10', responsibleUser: 'User 1', status: 'to perform' },
            // { id: 4, title: 'Task 4', priority: 'medium', expirationDate: '2024-04-15', responsibleUser: 'User 2', status: 'is done' },
            // { id: 5, title: 'Task 5', priority: 'high', expirationDate: '2024-04-10', responsibleUser: 'User 1', status: 'is done' },
            // { id: 6, title: 'Task 6', priority: 'medium', expirationDate: '2024-04-15', responsibleUser: 'User 2', status: 'is done' }
         
          
    }

    
    setTasks(tasks) {
        this._tasks = tasks;
    }

    get tasks() {
        return this._tasks;
    }
    
}