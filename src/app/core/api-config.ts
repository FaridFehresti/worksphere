import { Injectable } from '@angular/core';
import { environment } from '../../../enviroment/enviroment';

@Injectable({ providedIn: 'root' })
export class APIConfig {
    api_core = environment.appCoreApiUrl
    authUrls = {
        login: this.api_core + '/auth/login',
        register: this.api_core + '/user',
        resetPassword: this.api_core + '/auth/reset-password',
        forgotPassword: this.api_core + '/auth/forgot-password',
        validateToken: this.api_core + '/auth/validate-token',
    }
    userUrls = {
        getUser: this.api_core + '/user',
    }
    taskCategoryUrls={
            getTaskCategoryList: this.api_core + '/task/task-category/task-categories',
            postTaskCategory: this.api_core + '/task/task-category/task-categories',//body
            getTaskCategoryById: this.api_core + '/task/task-category/task-categories/',//id
            patchTaskCategoryById: this.api_core + '/task/task-category/task-categories/',//id
            deleteTaskCategoryById: this.api_core + '/task/task-category/task-categories/',//id
    }
    tagUrls={
        getTagList: this.api_core + '/tag/tags',
        postTag: this.api_core + '/tag/tags',//body
        deleteTag: this.api_core + '/tag/tags/',//id
    }
    taskUrls={
        getTasksList: this.api_core + '/task/tasks',
        postTask: this.api_core + '/task/tasks',//body
        getTaskById: this.api_core + '/task/tasks/',//id
        patchTaskById: this.api_core + '/task/tasks/',//id
        deleteTaskById: this.api_core + '/task/tasks/',//id
    }
}