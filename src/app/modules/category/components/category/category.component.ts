import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CategoryService } from 'src/app/modules/shared/services/category.service';

import { CategoryElement } from '../../../shared/interfaces/category.interface';
import { NewCategoryComponent } from '../new-category/new-category.component';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { ConfirmComponent } from 'src/app/modules/shared/components/confirm/confirm.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'description', 'actions'];
  dataSource = new MatTableDataSource<CategoryElement>();
  isAdmin: Boolean = false;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(
    private _categoryService: CategoryService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getCategories();
    // this.isAdmin = this._util.isAdmin();
    this.isAdmin = true;
  }

  getCategories() {
    this._categoryService.getCategories().subscribe((data: object) => {
      this.processCategoriesResponse(data);
    }, (error) => {
      console.log("Error => ", error);

    })
  }

  processCategoriesResponse(resp: any) {
    const { metadata, categoryResponse } = resp;
    let dataCategory: CategoryElement[] = [];
    let listCategory;

    metadata[0].code === "00" && (
      listCategory = categoryResponse.category,
      listCategory.map((element: CategoryElement) => dataCategory = [...dataCategory, element]),
      this.dataSource = new MatTableDataSource<CategoryElement>(dataCategory));
    this.dataSource.paginator = this.paginator;
  }

  openCategoryDialog() {
    const dialogRef = this.dialog.open(NewCategoryComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe((result: number) => {
      result === 1 ? (this.openSnackBar('Categoría Agregada', "Exitosa"), this.getCategories())
        : result === 2 && this.openSnackBar('Se produjo un error al almacenar categoría', "Error")
    });
  }

  edit(id: number, name: string, description: string) {
    const dialogRef = this.dialog.open(NewCategoryComponent, {
      width: '450px',
      data: { id, name, description }
    });

    dialogRef.afterClosed().subscribe((result: number) => {
      result === 1 ? (this.openSnackBar('Categoría Actualizada', "Exitosa"), this.getCategories())
        : result === 2 && this.openSnackBar('Se produjo un error al actualizar categoría', "Error")
    });
  }

  delete(id: number) {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '200px',
      data: { id, module: "category" }
    });

    dialogRef.afterClosed().subscribe((result: number) => {
      result === 1 ? (this.openSnackBar('Categoría Eliminada', "Exitosa"), this.getCategories())
        : result === 2 && this.openSnackBar('Se produjo un error al eliminar la categoría', "Error")
    });
  }

  buscar(termino: string) {
    termino.length === 0 ? this.getCategories()
      : this._categoryService.getCategoryByName(termino).subscribe(data => {
        this.processCategoriesResponse(data);
      });
  }



  exportExcel() {
    this._categoryService.exportCategories().subscribe(res => {
      let file = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      let fileUrl = URL.createObjectURL(file);
      let anchor = document.createElement("a");
      anchor.download = "categories.xlsx";
      anchor.href = fileUrl;
      anchor.click();

      this.openSnackBar("Archivo exportado correctamente", "Exito");

    }, (error) => {
      console.log(error);
      this.openSnackBar("No se pudo exportar el archivo", "Error");

    });
  }

  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 2000
    });
  }

}