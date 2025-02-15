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
    tasks?:ITask[]
}
export interface ITask{
    title:string
}