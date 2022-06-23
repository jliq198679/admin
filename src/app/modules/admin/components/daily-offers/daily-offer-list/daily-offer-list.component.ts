import { OfferInterface } from './../../../interfaces';
import { DailyOfferEditorComponent } from './../daily-offer-editor/daily-offer-editor.component';
import { defaultImg } from './../../../tools/default.tool';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogService, DailyOfferService, OfferService } from './../../../services';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-daily-offer-list',
  templateUrl: './daily-offer-list.component.html',
  styleUrls: ['./daily-offer-list.component.scss']
})
export class DailyOfferListComponent implements OnInit {

  offers: OfferInterface[] = [];
  displayedColumns: string[] = ['position', 'image', 'name_offer_es', 'group_offer_id', 'count_offer', 'operations'];
  dataSource = new MatTableDataSource<any/*OfferInterface*/>(this.offers);

  /** Campos de paginado del datatable */
  pageEvent: PageEvent;
  pageIndex: number = 1;
  pageSize: number = 7;
  length: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private dailyOfferService: DailyOfferService,
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

  showModal(data?: any/*OfferInterface*/) {
    const dialogRef = this.dialog.open(DailyOfferEditorComponent, {
      width: '45%',
      data: data
    });

    dialogRef.afterClosed().subscribe(() => {
      // TODO: Paginar en manteniendo la pagina actual cuando se insertan o eliminan los grupos de oferta
      this.loadDatatable(1, 7);
    });
  }

  async delete(data/*?: OfferInterface*/) {
    const msg = "¿Desea eliminar el plato seleccionado de la oferta del dia?"
    const confirm = await this.confirmDialogService.confirmDialog(msg);

    if(confirm) {
      this.dailyOfferService.delete(data.offer_daily.id).subscribe(()=>{
        const msg = `Plato eliminado de forma correcta de la oferta del dia`;
        this.snackBar.open(msg, 'X');
        this.loadDatatable(1, 7);
      })
    }
  }

  loadDatatable(pageIndex: number, pageSize: number) {
    this.dailyOfferService.datatable(pageIndex, pageSize).subscribe(
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

  offerImage(offer/*: OfferInterface*/): string {
    return offer.url_imagen !== 'null' ? offer.url_imagen : defaultImg;
  }

  toggleSpecialOffer(event: MatSlideToggleChange , element/*: OfferInterface*/) {
    if(event.checked) {
      /*
      this.specialOfferService.store(element.id).subscribe(()=>{
        const msg = `Plato añadido a la oferta especial`;
        this.snackBar.open(msg, 'X');
      })*/
    }
    else {
      /*
      this.specialOfferService.delete(element.id).subscribe(()=>{
        const msg = `El plato ya no forma parte de oferta especial`;
        this.snackBar.open(msg, 'X');
      })*/
    }
  }

}
