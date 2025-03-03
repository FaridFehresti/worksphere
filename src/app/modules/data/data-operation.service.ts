import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { APIConfig } from "src/app/core/api-config";

@Injectable({
    providedIn: 'root'
  })
export class DataOperationService {
    constructor(private http: HttpClient, private apiConfig: APIConfig) {

     }
    createTaskCategory(body:any): Observable<any> {
      return this.http.post<any>(this.apiConfig.taskCategoryUrls.postTaskCategory, body);
    }
    PatchTaskCategory(body:any,id:number): Observable<any> {
        return this.http.patch<any>(this.apiConfig.taskCategoryUrls.postTaskCategory + '/' + id, body);
    }
    getTaskCategoryList(): Observable<any> {
        return this.http.get<any>(this.apiConfig.taskCategoryUrls.getTaskCategoryList);
    }
    getTaskCategoryById(id:number): Observable<any> {
        return this.http.get<any>(this.apiConfig.taskCategoryUrls.getTaskCategoryById + id);
    }
    deleteTaskCategoryById(id:number): Observable<any> {
        return this.http.delete<any>(this.apiConfig.taskCategoryUrls.deleteTaskCategoryById + id);
    }
    getTasksList(selectedCategoryId?: number): Observable<any> {
        let params = new HttpParams();
        
        if (selectedCategoryId !== undefined) {
            params = params.set('category_id', selectedCategoryId.toString());
        }
    
        return this.http.get<any>(this.apiConfig.taskUrls.getTasksList, { params });
    }
    createTask(body:any): Observable<any> {
        return this.http.post<any>(this.apiConfig.taskUrls.postTask, body);
    }
    createTag(body:any): Observable<any> {
        return this.http.post<any>(this.apiConfig.tagUrls.postTag, body);

    }
    getTagList(): Observable<any> {
        return this.http.get<any>(this.apiConfig.tagUrls.getTagList);
    }
    
    
    
}