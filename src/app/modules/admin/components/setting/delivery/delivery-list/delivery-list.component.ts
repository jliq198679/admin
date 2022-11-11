import { AdminSettingDeliveryPlaceService, AdminSettingMunicipalityService, ConfirmDialogService } from '../../../../services';
import { AdminSettingDeliveryPlaceEditorComponent } from '../delivery-editor/delivery-editor.component';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminSettingDeliveryPlaceInterface, AdminSettingMunicipalityInterface } from '../../../../interfaces';

@Component({
  selector: 'admin-setting-delivery-list',
  templateUrl: './delivery-list.component.html',
  styleUrls: ['./delivery-list.component.scss']
})

export class AdminDeliveryListComponent implements OnInit, AfterViewInit {

  municipalities: AdminSettingMunicipalityInterface[] = [];
  municipalitySelected: number = null;
  deliveryPlaces: AdminSettingDeliveryPlaceInterface[] = [];

  displayedColumns: string[] = ['position', 'name', 'price', 'operations'];
  dataSource = new MatTableDataSource<AdminSettingDeliveryPlaceInterface>(this.deliveryPlaces);

  /** Campos de paginado del datatable */
  pageEvent: PageEvent;
  pageIndex: number = 1;
  pageSize: number = 7;
  length: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialog: MatDialog,
              private snackBar: MatSnackBar,
              private municipalityService: AdminSettingMunicipalityService,
              private deliveryPlaceService: AdminSettingDeliveryPlaceService,
              private confirmDialogService: ConfirmDialogService) {
  }

  ngOnInit(): void {
      this.loadMinicipalities();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onMunicipalityChange(municipality_id: number) {
    this.municipalitySelected = municipality_id;
    this.loadDatatable(1, 7, this.municipalitySelected);
  }

  /**
   * Carga la lista de municipios desde el serivor para mostrarlos en el list de la izquierda
   * y la lista de municipios en el datatable
   */
  loadMinicipalities() {
    this.municipalityService.get().subscribe(resp=>{
     if(resp && resp.data) {
      this.municipalities = resp.data;

      if(resp.data.length > 0) {
        // Por defecto se selecciona el primer item
        this.municipalitySelected = this.municipalities[0].id;
        // Carga la lista de lugares para el priemr municipio de la lista
        this.loadDatatable(1, 7, this.municipalitySelected);
      }
     }
    })
  }

  /**
   *
   * @param pageIndex Carga Datatable la lista de lugares de entrega
   * @param pageSize
   * @param municipality_id
   */
  loadDatatable(pageIndex: number, pageSize: number, municipality_id?: number) {
    this.deliveryPlaceService.datatable(pageIndex, pageSize, municipality_id).subscribe(
     response=>{
       this.dataSource = new MatTableDataSource<AdminSettingDeliveryPlaceInterface>(response.data);
       this.pageIndex = response.current_page - 1;
       this.length = response.total;
     }
   );
 }


  showModal(data?: AdminSettingDeliveryPlaceInterface) {
    const dialogRef = this.dialog.open(AdminSettingDeliveryPlaceEditorComponent, {
      width: '30%',
      data: {
        municipality: this.municipalities.find(m=>m.id === this.municipalitySelected),
        deliveryPlace: data
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      // TODO: Paginar en manteniendo la pagina actual cuando se insertan o eliminan losmunicipios
      this.loadDatatable(1, 7, this.municipalitySelected);
    });
  }

  async delete(data?: AdminSettingDeliveryPlaceInterface) {
    const msg = `¿Desea eliminar el lugar de entrega seleccionado?`;
    const confirm = await this.confirmDialogService.confirmDialog(msg);

    if(confirm) {
      this.deliveryPlaceService.delete(data.id).subscribe(()=>{
        const msg = `Lugar de entrega eliminado de forma correcta`;
        this.snackBar.open(msg, 'X');
        this.loadDatatable(1, 7, this.municipalitySelected);
      })
    }
  }

  getServerData(event) {
    const page = event.previousPageIndex < event.pageIndex ? event.pageIndex + 1 : event.pageIndex - 1;
    this.loadDatatable(page, this.pageSize, this.municipalitySelected);
  }
}
