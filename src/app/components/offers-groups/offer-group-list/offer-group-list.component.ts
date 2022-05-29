import { ConfirmDialogService } from './../../../services';
import { OfferGroupEditorComponent } from './../offer-group-editor/offer-group-editor.component';
import { GroupOfferInterface } from './../../../interfaces/group-offer/group-offer.interface';
import { OfferGroupService } from './../../../services/group-offer/offer-group.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-offer-group-list',
  templateUrl: './offer-group-list.component.html',
  styleUrls: ['./offer-group-list.component.scss']
})
export class OfferGroupListComponent implements OnInit, AfterViewInit {

  groupOffers: GroupOfferInterface[] = [];
  displayedColumns: string[] = ['position', 'name_group_es', 'name_group_en', 'operations'/*, 'symbol'*/];
  dataSource = new MatTableDataSource<GroupOfferInterface>(this.groupOffers);

  /** Campos de paginado del datatable */
  pageEvent: PageEvent;
  pageIndex: number = 1;
  pageSize: number = 7;
  length: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private groupOfferService: OfferGroupService,
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
      data: data
    });

    dialogRef.afterClosed().subscribe(() => {
      this.loadDatatable(1, 7);
    });
  }

  async delete(data?: GroupOfferInterface) {
    const msg = "¿Desea eliminar la categoría de oferta seleccionada?"
    const confirm = await this.confirmDialogService.confirmDialog(msg);

    if(confirm) {
      this.groupOfferService.delete(data.id).subscribe(()=>{
        const msg = `Categoría de oferta eliminada de forma correcta`;
        this.snackBar.open(msg, 'X');
        this.loadDatatable(1, 7);
      })
    }
  }

  loadDatatable(pageIndex: number, pageSize: number) {
    this.groupOfferService.datatable(pageIndex, pageSize).subscribe(
      response=>{
        this.dataSource = new MatTableDataSource<GroupOfferInterface>(response.data);
        this.pageIndex = response.current_page - 1;
        this.length = response.total;
      }
    );
  }

  getServerData(event) {
    this.loadDatatable(event.previousPageIndex < event.pageIndex ? event.pageIndex + 1 : event.pageIndex - 1, this.pageSize);
  }

}
