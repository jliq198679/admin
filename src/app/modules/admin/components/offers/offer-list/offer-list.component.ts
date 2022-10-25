import { OfferWithGroupOffersInterface } from './../../../interfaces/offer/offer-with-group-offers.interface';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { defaultImg } from './../../../tools';
import { GroupOfferInterface, OfferInterface } from './../../../interfaces';
import { OfferEditorComponent } from '../offer-editor';
import { ConfirmDialogService, OfferGroupService, OfferService, SpecialOfferService } from './../../../services';

@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.scss']
})
export class OfferListComponent implements OnInit {

  filterForm: FormGroup;
  mainOfferGroups: GroupOfferInterface[] = [ { id: -1 , name_group_es: "Todas" }];
  subOfferGroups: GroupOfferInterface[] = [ { id: -1 , name_group_es: "Todas" }];

  offers: OfferInterface[] = [];
  displayedColumns: string[] = ['position', 'image', 'name_offer_es', 'group_offer_id', 'price_cup', 'price_usd', 'is_promotion', 'operations'];
  dataSource = new MatTableDataSource<OfferInterface>(this.offers);

  /** Campos de paginado del datatable */
  pageEvent: PageEvent;
  pageIndex: number = 1;
  pageSize: number = 7;
  length: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private offerService: OfferService,
              public dialog: MatDialog,
              private snackBar: MatSnackBar,
              private fb: FormBuilder,
              private offerGroupService: OfferGroupService,
              private specialOfferService: SpecialOfferService,
              private confirmDialogService: ConfirmDialogService) {

   }

   ngOnInit(): void {
     this.filterForm = this.fb.group({
      main_group_offer_id: [-1],
      sub_group_offer_id: [-1],
      search: ['']
     });

     this.offerGroupService.get().subscribe(resp=>{
      this.mainOfferGroups = this.mainOfferGroups.concat(resp.data);
     });

     this.filterForm.controls['main_group_offer_id'].valueChanges.subscribe(id=>{
      this.offerGroupService.getSubcategories(id).subscribe(subCatResp=>{
        this.subOfferGroups = [ { id: -1 , name_group_es: "Todas" }];
        this.subOfferGroups = this.subOfferGroups.concat(subCatResp.data);
        this.filterForm.controls['sub_group_offer_id'].setValue(-1);

        if(id == -1) {
          this.loadDatatable(1, 7);
        }
        else {
          this.loadDatatable(1, 7, { category_id: id });
        }
      });
     });

    this.filterForm.controls['sub_group_offer_id'].valueChanges.subscribe(id=>{
      const mainId = this.filterForm.controls['main_group_offer_id'].value;

      if(id == -1 && mainId != -1) {
        this.loadDatatable(1, 7, { category_id: mainId});
      }

      if(id == -1 && mainId != -1) {
        this.loadDatatable(1, 7, { category_id: mainId});
      }

      if(id != -1 && mainId != -1) {
        this.loadDatatable(1, 7, { subCategory_id: id });
      }
    });

    this.loadDatatable(1, 7);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  showModal(data?: OfferInterface) {
    const dialogRef = this.dialog.open(OfferEditorComponent, {
      width: '60%',
      data: data
    });

    dialogRef.afterClosed().subscribe(() => {
      // TODO: Paginar en manteniendo la pagina actual cuando se insertan o eliminan los grupos de oferta
      this.loadDatatable(1, 7);
    });
  }

  async delete(data?: OfferInterface) {
    const msg = "¿Desea eliminar el plato seleccionado?";
    const confirm = await this.confirmDialogService.confirmDialog(msg);

    if(confirm) {
      this.offerService.delete(data.id).subscribe(()=>{
        const msg = `Plato eliminado de forma correcta`;
        this.snackBar.open(msg, 'X');
        this.loadDatatable(1, 7);
      });
    }
  }

  loadDatatable(pageIndex: number, pageSize: number, filters?: any) {
    this.offerService.datatable(pageIndex, pageSize, filters).subscribe(
      response=>{
        this.dataSource = new MatTableDataSource<OfferInterface>(response.data);
        this.pageIndex = response.current_page - 1;
        this.length = response.total;
      }
    );
  }

  getServerData(event) {
    this.loadDatatable(event.previousPageIndex < event.pageIndex ? event.pageIndex + 1 : event.pageIndex - 1, this.pageSize);
  }

  offerImage(offer: OfferInterface): string {
    return offer.url_imagen !== 'null' ? offer.url_imagen : defaultImg;
  }

  prueva(){
    const msg = `Esto es una prueba`;
        this.snackBar.open(msg, 'X');
  } 

  toggleSpecialOffer(event: MatSlideToggleChange , element: OfferInterface) {
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
  }

  compareWithFunc = (a: any, b: any) => a == b;

  categoryName(offer: OfferWithGroupOffersInterface) {
    return offer.group_offer.category_id ? offer.group_offer.category.name_group_es + '/' + offer.group_offer.name_group_es : offer.group_offer.name_group_es;
  }

}
