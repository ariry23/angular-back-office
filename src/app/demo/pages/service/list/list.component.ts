import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { RouteService } from 'src/app/core/services/route.service';

import { SharedModule } from 'src/app/theme/shared/shared.module';
import {ReservationComponent} from '../reservation/reservation.component';
import { ApiService } from 'src/app/core/services/api.service';
import { SERVICE_MANAGEMENT_LIST } from 'src/app/constants/api.constant';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'service-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  standalone : true , 
  imports: [CommonModule, SharedModule  , NgOptimizedImage],
})
export default class ListComponent implements OnInit {    
  data : any[] ;    
  reservationModalRef: MdbModalRef<any> | null = null;  
  constructor(private toastrService : ToastrService , private apiService : ApiService , private router : Router , public modalService : MdbModalService){}
  ngOnInit(): void {                                                    
    console.log("last successfull route : ");                           
    //console.log(this.routerService.getLastSuccessfulRoute());         
    this.getData();                                                     
  }
  isMouseOver: boolean = false;
  
  getData(): void{  
      this.apiService.getData(SERVICE_MANAGEMENT_LIST).subscribe(datas => {
        this.data = datas.data ;      
        console.log(this.data) ;      
      }, err => {
        this.toastrService.error(err) ;       
      })

  }

  onMouseOver(): void {
    this.isMouseOver = true;
  
  }

  onMouseLeave(): void {
    this.isMouseOver = false;
  }

  getDetail(id)
  {
    console.log("get details") ; 
      this.router.navigate(['/service/detail', id]);
  }
  openReservationModal(service : any )
  {
    this.reservationModalRef = this.modalService.open(ReservationComponent , {
        data:{
          service : service
        }
    }) ; 
    this.reservationModalRef.component.ajoutSuccess.subscribe(() => {
      this.router.navigate(["/rendez-vous/historique"]) ; 
    });
  }

}
