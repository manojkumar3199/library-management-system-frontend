import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/shared/data-access/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private readonly ROOT_URL = "https://library-management-system-g6oa.onrender.com/api/v1";

  constructor(private http: HttpClient) { }


  //API methods
  public getCategories(): Observable<Category[]> {
    console.log("loading categories!");
    return this.http.get<Category[]>(this.ROOT_URL + "/category");
  }

  public saveNewCategory(newCategory: Category): Observable<Category> {
    console.log(newCategory);
    return this.http.post<Category>(this.ROOT_URL + "/category", newCategory);
  }

  public deleteCategory(savedCategoryId: number) {
    console.log(savedCategoryId);
    return this.http.delete(this.ROOT_URL + "/category/" + savedCategoryId);
  }

  public getCategoryById(categoryId: number): Observable<Category> {
    console.log(categoryId);
    return this.http.get<Category>(this.ROOT_URL + "/category/" + categoryId);
  }

  public updateCategory(modifiedCategory: Category): Observable<Category> {
    console.log(modifiedCategory);
    return this.http.put<Category>(this.ROOT_URL + "/category/" + modifiedCategory.id, modifiedCategory);
  }

}