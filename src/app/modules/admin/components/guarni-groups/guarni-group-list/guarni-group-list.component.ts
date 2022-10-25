import { ConfirmDialogService } from './../../../services';
import { GuarniGroupEditorComponent } from './../guarni-group-editor/guarni-group-editor.component';
//import { GroupOfferInterface } from './../../../interfaces/group-offer/group-offer.interface';
import { GuarniGroupService } from './../../../services/group-guarni/guarni-group.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface GroupGuarniInterface {
  id: number;
  name_side_dish_es?: string;
  name_side_dish_en?: string;
  
}


@Component({
  selector: 'app-guarni-group-list',
  templateUrl: './guarni-group-list.component.html',
  styleUrls: ['./guarni-group-list.component.scss']
})
export class GuarniGroupListComponent implements OnInit, AfterViewInit {

  parentCategory: GroupGuarniInterface = null;
  groupOffers: GroupGuarniInterface[] = [];
  displayedColumns: string[] = ['position', 'name_group_es', 'name_group_en', 'operations'/*, 'symbol'*/];
  dataSource = new MatTableDataSource<GroupGuarniInterface>(this.groupOffers);

  /** Campos de paginado del datatable */
  pageEvent: PageEvent;
  pageIndex: number = 1;
  pageSize: number = 7;
  length: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private groupGuarniService: GuarniGroupService,
              public dialog: MatDialog,
              private snackBar: MatSnackBar,
              private confirmDialogService: ConfirmDialogService) {

  }

  ngOnInit(): void {
      this.loadDatatable(1, 7);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  showModal(data?: GroupGuarniInterface) {
    const dialogRef = this.dialog.open(GuarniGroupEditorComponent, {
      width: '30%',
      data: {
        parent: this.parentCategory,
        category: data
      }    
    });

    dialogRef.afterClosed().subscribe(() => {
      // TODO: Paginar en manteniendo la pagina actual cuando se insertan o eliminan los grupos de oferta
      this.loadDatatable(1, 7, this.parentCategory?.id);
    });
  }

  async delete(data?: GroupGuarniInterface) {
    const msg = `¿Desea eliminar la ${this.categoryText} de guarnicion seleccionada?`;
    const confirm = await this.confirmDialogService.confirmDialog(msg);

    if(confirm) {
      this.groupGuarniService.delete(data.id).subscribe(()=>{
        const msg = `${this.parentCategory ? 'Subcategoría' : 'Categoría'} de guarnicion eliminada de forma correcta`;
        this.snackBar.open(msg, 'X');
        this.loadDatatable(1, 7, this.parentCategory?.id);
      })
    }
  }

  loadDatatable(pageIndex: number, pageSize: number, category_id?: number) {
    this.groupGuarniService.datatable(pageIndex, pageSize, category_id).subscribe(
      response=>{
      //  console.log(response.data);
        this.dataSource = new MatTableDataSource<GroupGuarniInterface>(response.data);
       // console.log(this.dataSource);
        this.pageIndex = response.current_page - 1;
        this.length = response.total;
      }
    );
  }

  getServerData(event) {
    this.loadDatatable(event.previousPageIndex < event.pageIndex ? event.pageIndex + 1 : event.pageIndex - 1, this.pageSize, this.parentCategory?.id);
  }

  subCategory(element) {
    this.parentCategory = element;
    this.loadDatatable(1, 7, element.id)
  }

  backToCategories() {
    this.parentCategory = null;
    this.loadDatatable(1, 7)
  }

  get subcategoryText() {
    return this.parentCategory ? ' - Subcategorias de ' + this.parentCategory.name_side_dish_es: ''
  }

  get categoryText() {
    return this.parentCategory ? 'subcategoría' : 'categoría';
  }
}
