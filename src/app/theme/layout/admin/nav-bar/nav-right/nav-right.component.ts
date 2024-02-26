import { Component } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { animate, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/core/services/token.service';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss'],
  providers: [NgbDropdownConfig],
  animations: [
    trigger('slideInOutLeft', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('300ms ease-in', style({ transform: 'translateX(0%)' })),
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateX(100%)' })),
      ]),
    ]),
    trigger('slideInOutRight', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('300ms ease-in', style({ transform: 'translateX(0%)' })),
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateX(-100%)' })),
      ]),
    ]),
  ],
})
export class NavRightComponent {
  visibleUserList: boolean;
  chatMessage: boolean;
  friendId: boolean;
  router : Router;
  tokenService : TokenService;
  user  ;
  constructor(private toastrService : ToastrService , config: NgbDropdownConfig , tokenService: TokenService , router :  Router , private cookieService : CookieService) {
    config.placement = 'bottom-right';
    this.visibleUserList = false;
    this.chatMessage = false;
    this.tokenService = tokenService ;
    this.router = router ;
    let  userToken : any = jwtDecode(this.tokenService.getToken());
    this.user = userToken.user.username;
  }

  onChatToggle(friend_id) {
    this.friendId = friend_id;
    this.chatMessage = !this.chatMessage;
  }


  logout()
  {
    localStorage.clear();
    this.router.navigate(['/auth/signin']); 
  }

  redirectToAccount()
  {
    let token : any = this.tokenService.getToken();
    let decoded : any = jwtDecode(token) ; 
    let role = decoded.role.name ; 
    if(role === "customer")
    {
      this.router.navigate(['/account']); 
    }
    else if(role === "admin")
    {
      this.router.navigate(['/account-admin']); 
    }
    else{
      this.toastrService.error("Vous n'avez pas access a ce menu") ; 
    }
    
  }
}
