import { ConfirmDialogService } from './../../../services';
import { OfferGroupEditorComponent } from './../offer-group-editor/offer-group-editor.component';
import { GroupOfferInterface } from './../../../interfaces/group-offer/group-offer.interface';
import { OfferGroupService } from './../../../services/group-offer/offer-group.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-offer-group-list',
  templateUrl: './offer-group-list.component.html',
  styleUrls: ['./offer-group-list.component.scss']
})
export class OfferGroupListComponent implements OnInit, AfterViewInit {

  groupOffers: GroupOfferInterface[] = [];
  displayedColumns: string[] = ['position', 'name_group_es', 'name_group_en', 'operations'/*, 'symbol'*/];
  dataSource = new MatTableDataSource<GroupOfferInterface>(this.groupOffers);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private groupOfferService: OfferGroupService,
              public dialog: MatDialog,
              private confirmDialogService: ConfirmDialogService) {

  }

  ngOnInit(): void {
      this.loadDatatable();
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
      this.loadDatatable();
    });
  }

  async delete(data?: GroupOfferInterface) {
    const msg = "¿Desea eliminar la categoría de oferta seleccionada?"
    const confirm = await this.confirmDialogService.confirmDialog(msg);
    console.log(confirm)
  }

  loadDatatable() {
    this.groupOfferService.get().subscribe(groupOffers=>this.dataSource = new MatTableDataSource<GroupOfferInterface>(groupOffers));
  }

}
