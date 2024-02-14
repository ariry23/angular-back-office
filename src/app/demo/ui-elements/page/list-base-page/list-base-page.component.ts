import { Component, Inject, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-list-base-page',
  templateUrl: './list-base-page.component.html',
  styleUrls: ['./list-base-page.component.scss'] , 
  
})
export abstract class ListBasePageComponent implements OnInit {
  
editModalRef: MdbModalRef<any> | null = null;
deleteModalRef: MdbModalRef<any> | null = null;
ajoutModalRef: MdbModalRef<any> | null = null;  
  data : any[] ; 
  constructor(public apiService: ApiService , public modalService : MdbModalService ,  public toastrService : ToastrService , @Inject('apiUrl') public apiUrl: string , 
  @Inject('deleteComponent') public deleteComponent : any  , 
  @Inject('updateApiUrl') public updateComponent : any , 
  @Inject('addApiUrl') public addComponent :any 
    /*
     @Inject('deleteApiUrl') public deleteApiUrl , 
     @Inject('updateApiUrl') public updateApiUrl , 
     @Inject('addApiUrl') public addApiUrl*/){} 
  ngOnInit(): void {
    this.getData();
  }

getData():void
{
  this.apiService.getData(this.apiUrl).subscribe(data => {
    this.data = data ; 
  }, err => {
    this.toastrService.error(err) ; 
  })
}
openEditModal(data: any) {
  this.editModalRef = this.modalService.open(this.updateComponent , {data : {
     data : data
  }}) ; 
  this.editModalRef.component.editSuccess.subscribe(() => {
    this.getData(); 
  });
}

openAjoutModal() {
  this.ajoutModalRef = this.modalService.open(this.addComponent ) ; 
  this.ajoutModalRef.component.ajoutSuccess.subscribe(() => {
    this.getData(); 
  });
}

openDeleteModal(data:any) {
  this.deleteModalRef = this.modalService.open(this.deleteComponent , {
    data : data
  }) ; 
  this.deleteModalRef.component.deleteSuccess.subscribe(() => {
    this.getData(); 
  });
} 
}
