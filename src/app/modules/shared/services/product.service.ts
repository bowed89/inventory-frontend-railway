import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../../../config/config';
import { ProductElement } from '../../shared/interfaces/product.interface';

//const token = localStorage.getItem("token");
const token = JSON.parse(localStorage.getItem('token')!);

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  token: any;
  headers = { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json' }) }
  headerFile = { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + token }) }
  storeProduct: any;

  constructor(
    private http: HttpClient
  ) { }

  // Obtener todos los productos
  getProducts() {
    const endpoint = `${BASE_URL}/products`;
    return this.http.get<ProductElement>(endpoint, this.headers);
  }

  // Guardar producto
  saveProduct(body: FormData) {
    const endpoint = `${BASE_URL}/products`;
    return this.http.post<ProductElement>(endpoint, body, this.headerFile);
  }

  // Modificar producto
  updateProduct(body: FormData, id: any) {
    const endpoint = `${BASE_URL}/products/${id}`;
    return this.http.put<ProductElement>(endpoint, body, this.headerFile);
  }

  // Eliminar producto
  deleteProduct(id: any) {
    const endpoint = `${BASE_URL}/products/${id.id}`;
    return this.http.delete(endpoint, this.headers);
  }

  // Buscar producto por nombre
  getProductByName(name: any) {
    const endpoint = `${BASE_URL}/products/filter/${name}`;
    return this.http.get<ProductElement>(endpoint, this.headers);
  }

  // Obtener todas las categorias
  exportProducts() {
    const endpoint = `${BASE_URL}/products/export/excel`;
    return this.http.get(endpoint,
      {
        responseType: 'blob',
        headers: new HttpHeaders({ 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json' })
      });
  }

}
