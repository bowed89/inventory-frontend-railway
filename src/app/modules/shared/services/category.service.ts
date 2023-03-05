import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoryElement } from '../../shared/interfaces/category.interface';
import { BASE_URL } from '../../../config/config';

const token = JSON.parse(localStorage.getItem('token')!);

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  headers = { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json' }) }

  constructor(
    private http: HttpClient
  ) { }

  // Obtener todas las categorias
  getCategories() {
    const endpoint = `${BASE_URL}/categories`;
    return this.http.get(endpoint, this.headers);
  }

  // Almacenar Categorias
  saveCategory(body: CategoryElement) {
    const endpoint = `${BASE_URL}/categories`;
    return this.http.post(endpoint, body, this.headers);
  }

  // Actualizar Categorias
  updateCategory(body: CategoryElement, id: any) {
    const endpoint = `${BASE_URL}/categories/${id}`;
    return this.http.put(endpoint, body, this.headers);
  }

  // Eliminar Categorias
  deleteCategory(id: any) {
    const endpoint = `${BASE_URL}/categories/${id.id}`;
    return this.http.delete(endpoint, this.headers);
  }

  // Buscar Categoria por ID
  getCategoryById(id: any) {
    const endpoint = `${BASE_URL}/categories/${id}`;
    return this.http.get(endpoint, this.headers);
  }

  // Buscar categoria por nombre
  getCategoryByName(name: string) {
    const endpoint = `${BASE_URL}/categories/filter/${name}`;
    return this.http.get<CategoryElement>(endpoint, this.headers);
  }

  // Obtener todas las categorias
  exportCategories() {
    const endpoint = `${BASE_URL}/categories/export/excel`;
    return this.http.get(endpoint,
      {
        responseType: 'blob',
        headers: new HttpHeaders({ 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json' })
      });
  }

}
