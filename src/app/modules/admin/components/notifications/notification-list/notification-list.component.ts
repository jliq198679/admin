import { AdminNotificationService } from './../../../services/notification/notification.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminNotificationInterface } from './../../../interfaces';
import { AdminNotificationEditorComponent } from '../notification-editor';
import { ConfirmDialogService, OfferService } from './../../../services';

@Component({
  selector: 'admin-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss']
})
export class AdminNotificationListComponent implements OnInit {

  notifications: AdminNotificationInterface[] = [];
  displayedColumns: string[] = ['position', 'title', 'operations'];
  dataSource = new MatTableDataSource<AdminNotificationInterface>(this.notifications);

  /** Campos de paginado del datatable */
  pageEvent: PageEvent;
  pageIndex: number = 1;
  pageSize: number = 7;
  length: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private offerService: OfferService,
              public dialog: MatDialog,
              private snackBar: MatSnackBar,
              private notificationService: AdminNotificationService,
              private confirmDialogService: ConfirmDialogService) {

   }

   ngOnInit(): void {
    this.loadDatatable(1, 7);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  showModal(data?: AdminNotificationInterface) {
    const dialogRef = this.dialog.open(AdminNotificationEditorComponent, {
      width: '60%',
      data: data
    });

    dialogRef.afterClosed().subscribe(() => {
      // TODO: Paginar en manteniendo la pagina actual cuando se insertan o eliminan los grupos de oferta
      this.loadDatatable(1, 7);
    });
  }

  async delete(data?: AdminNotificationInterface) {
    const msg = "¿Desea eliminar la notificación seleccionada?";
    const confirm = await this.confirmDialogService.confirmDialog(msg);

    if(confirm) {
      this.offerService.delete(data.id).subscribe(()=>{
        const msg = `Notificación eliminada de forma correcta`;
        this.snackBar.open(msg, 'X');
        this.loadDatatable(1, 7);
      });
    }
  }

  loadDatatable(pageIndex: number, pageSize: number) {
    this.notificationService.datatable(pageIndex, pageSize).subscribe(
      response=>{
        this.dataSource = new MatTableDataSource<AdminNotificationInterface>(response.data);
        this.pageIndex = response.current_page - 1;
        this.length = response.total;
      }
    );
  }

  getServerData(event) {
    this.loadDatatable(event.previousPageIndex < event.pageIndex ? event.pageIndex + 1 : event.pageIndex - 1, this.pageSize);
  }

  sendNotification(notification: AdminNotificationInterface) {
    this.notificationService.send(notification).subscribe(()=>{
      this.snackBar.open("Notificación enviada", "X")
    })
  }

}
