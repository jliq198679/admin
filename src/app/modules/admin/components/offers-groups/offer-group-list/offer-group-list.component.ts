import { ConfirmDialogService } from './../../../services';
import { OfferGroupEditorComponent } from './../offer-group-editor/offer-group-editor.component';
import { GroupOfferInterface } from './../../../interfaces/group-offer/group-offer.interface';
import { GroupGuarniInterface } from './../../../interfaces/group-guarni.interface';
import { OfferGroupService } from './../../../services/group-offer/offer-group.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GuarniGroupService } from './../../../services/group-guarni/guarni-group.service';

@Component({
  selector: 'app-offer-group-list',
  templateUrl: './offer-group-list.component.html',
  styleUrls: ['./offer-group-list.component.scss']
})
export class OfferGroupListComponent implements OnInit, AfterViewInit {
  
  parentCategory: GroupOfferInterface = null;
  groupOffers: GroupOfferInterface[] = [];
  displayedColumns: string[] = ['position', 'name_group_es', 'name_group_en', 'operations'/*, 'symbol'*/];
  dataSource = new MatTableDataSource<GroupOfferInterface>(this.groupOffers);

  llamadatipoguarni: boolean = false;
  elementypeoffer: number = null;
  nombredecategoria: string = null;
  arrdetoglle: number[] = [];

  /** Campos de paginado del datatable */
  pageEvent: PageEvent;
  pageIndex: number = 1;
  pageSize: number = 7;
  length: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private groupOfferService: OfferGroupService,
              private storeoffersidedishservice: OfferGroupService,
              private groupGuarniService: GuarniGroupService,                 
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

  showModal(data?: GroupOfferInterface) {
    const dialogRef = this.dialog.open(OfferGroupEditorComponent, {
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

  async delete(data?: GroupOfferInterface) {
    const msg = `¿Desea eliminar la ${this.categoryText} de oferta seleccionada?`;
    const confirm = await this.confirmDialogService.confirmDialog(msg);

    if(confirm) {
      this.groupOfferService.delete(data.id).subscribe(()=>{
        const msg = `${this.parentCategory ? 'Subcategoría' : 'Categoría'} de oferta eliminada de forma correcta`;
        this.snackBar.open(msg, 'X');
        this.loadDatatable(1, 7, this.parentCategory?.id);
      })
    }
  }

  loadDatatable(pageIndex: number, pageSize: number, category_id?: number) {
     this.groupOfferService.datatable(pageIndex, pageSize, category_id).subscribe(
      response=>{
        this.dataSource = new MatTableDataSource<GroupOfferInterface>(response.data);
        this.pageIndex = response.current_page - 1;
        this.length = response.total;
      }
    );
  }
  
  pusharrdetoglle(event, elementypeguarni){
    if(event.checked){
      this.arrdetoglle.push(elementypeguarni.id);
      const msg = `Tipo de guarnición seleccionada para ser añadida a la categoría de oferta`;
      this.snackBar.open(msg, 'X');}
    else{
      this.arrdetoglle=this.arrdetoglle.filter(n => n !== elementypeguarni.id);
      const msg = `Tipo de guarnición seleccionada para ser eliminada de la categoría de oferta`;
      this.snackBar.open(msg, 'X');}
    console.log(this.arrdetoglle)
  }

  loadDatatableGroupGuarni(pageIndex: number, pageSize: number, id: number){
    this.groupGuarniService.get().subscribe(
      response=>{
        console.log(response.data);
        this.dataSource = new MatTableDataSource<GroupGuarniInterface>(response.data);
        this.pageIndex = response.current_page - 1;
        this.length = response.total;
      }
    );
  }
  
   toggleAgregarGuarni(){
    
      this.storeoffersidedishservice.storeoffersidedish(this.elementypeoffer, this.arrdetoglle).subscribe(()=>{
        const msg = `Operación realizada con exito`;
        this.snackBar.open(msg, 'X');
        })
    }
    
  addguarni(element){
    this.llamadatipoguarni = true;
    this.elementypeoffer = element.id;
    this.nombredecategoria = element.name_group_es;
    this.loadDatatableGroupGuarni(1, 7, element.id)
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
    this.llamadatipoguarni = false;
    this.loadDatatable(1, 7)
  }

  get subcategoryText() {
    return this.parentCategory ? ' - Subcategorias de ' + this.parentCategory.name_group_es : ''
  }

  get categoryText() {
    return this.parentCategory ? 'subcategoría' : 'categoría';
  }
}
