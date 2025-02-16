export interface IUserData{
    id:number,
    email:string,
    first_name:string,
    last_name:string,
    user_name:string
}
export interface ITaskCategory{
    id:number,
    title:string,
    tasks?:ITaskData[]
}
export interface ITaskFormData{
    title:string,
    description?: null,
    hardness?: number,
    priority?: number,
    deadline?: string,
    isComplete: false,
    createdBy: number,
    userId: number,
    taskCategoryId: number,
    parentId?: number,
    tags?:Array<ITagData>, 
}
export interface ITaskData{
    id:number,
    title:string,
    description: null,
    hardness?: number,
    priority?: number,
    deadline?: string,
    isComplete: false,
    createdBy: number,
    userId: number,
    taskCategoryId: number,
    parentId?: number,
    tags?:Array<ITagData>, 
    taskCategory: ITaskCategory,
    subtasks: ITaskData[]
}
interface ITagData{
    title:string,
    id:number
}