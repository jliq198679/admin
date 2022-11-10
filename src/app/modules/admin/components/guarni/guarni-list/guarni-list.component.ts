import { GuarniWithGroupGuarniInterface } from './../../../interfaces/guarni-with-group-guarni.interface';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { defaultImg } from './../../../tools';
import { GroupGuarniInterface, GuarniInterface } from './../../../interfaces';
import { GuarniEditorComponent } from '../guarni-editor';
import { ConfirmDialogService, GuarniGroupService, GuarniService, SpecialOfferService } from './../../../services';


@Component({
  selector: 'app-guarni-list', 
  templateUrl: './guarni-list.component.html',
  styleUrls: ['./guarni-list.component.scss']
})
export class GuarniListComponent implements OnInit {

  filterForm: FormGroup;
  guarniGroups: GroupGuarniInterface[] = [ { id: -1 , name_type_side_dish_es: "Todas" }];
  

  guarnis: GuarniInterface[] = [];
  displayedColumns: string[] = ['position', /*'image',*/ 'name_side_dish_es', 'type_side_dish_id', 'price_cup', /*'price_usd',*/ 'operations'];
  dataSource = new MatTableDataSource<GuarniInterface>(this.guarnis);

  /** Campos de paginado del datatable */
  pageEvent: PageEvent;
  pageIndex: number = 1;
  pageSize: number = 7;
  length: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private guarniService: GuarniService,
              public dialog: MatDialog,
              private snackBar: MatSnackBar,
              private fb: FormBuilder,
              private guarniGroupService: GuarniGroupService,
              
              //private specialOfferService: SpecialOfferService,
              private confirmDialogService: ConfirmDialogService) {

   }

   ngOnInit(): void {
     this.filterForm = this.fb.group({
      group_guarni_id: [-1],
      search: ['']
     });

     this.guarniGroupService.get().subscribe(resp=>{
      this.guarniGroups = this.guarniGroups.concat(resp.data);
     });

     this.filterForm.controls['group_guarni_id'].valueChanges.subscribe(id=>{
      this.guarniGroupService.get(id).subscribe(CatResp=>{
        this.guarniGroups = [ { id: -1 , name_type_side_dish_es: "Todas" }];
        this.guarniGroups = this.guarniGroups.concat(CatResp.data);
        
        if(id == -1) {
          this.loadDatatable(1, 7);
        }
        else {
          this.loadDatatable(1, 7, { category_id: id });
        }
      });
     });

   this.loadDatatable(1, 7);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  showModal(data?) {
    const dialogRef = this.dialog.open(GuarniEditorComponent, {
      width: '60%',
      data: data
    });

    dialogRef.afterClosed().subscribe(() => {
      // TODO: Paginar en manteniendo la pagina actual cuando se insertan o eliminan los grupos de oferta
      this.loadDatatable(1, 7);
    });
  }

  async delete(data?: GuarniInterface) {
    const msg = "¿Desea eliminar el plato seleccionado?";
    const confirm = await this.confirmDialogService.confirmDialog(msg);

    if(confirm) {
      this.guarniService.delete(data.id).subscribe(()=>{
        const msg = `Plato eliminado de forma correcta`;
        this.snackBar.open(msg, 'X');
        this.loadDatatable(1, 7);
      });
    }
  }

  loadDatatable(pageIndex: number, pageSize: number, filters?: any) {
    this.guarniService.datatable(pageIndex, pageSize, filters).subscribe(
      response=>{
        this.dataSource = new MatTableDataSource<GuarniInterface>(response.data);
        this.pageIndex = response.current_page - 1;
        this.length = response.total;
      }
    );
  }

  getServerData(event) {
    this.loadDatatable(event.previousPageIndex < event.pageIndex ? event.pageIndex + 1 : event.pageIndex - 1, this.pageSize);
  }

 /* offerImage(offer: GuarniInterface): string {
    return offer.url_imagen !== 'null' ? offer.url_imagen : defaultImg;
  }

  toggleSpecialOffer(event: MatSlideToggleChange , element: GuarniInterface) {
    if(event.checked) {
      this.specialOfferService.store(element.id).subscribe(()=>{
        const msg = `Plato añadido a la oferta especial`;
        this.snackBar.open(msg, 'X');
      });
    }
    else {
      this.specialOfferService.delete(element.id).subscribe(()=>{
        const msg = `El plato ya no forma parte de oferta especial`;
        this.snackBar.open(msg, 'X');
      });
    }
  }*/


  compareWithFunc = (a: any, b: any) => a == b;

  categoryName(guarni) {
   // console.log(guarni);
     return guarni.type_side_dish.name_type_side_dish_es;
   
  }
}
