import { Router } from 'aurelia-router';
import { inject } from 'aurelia-framework';
import { AuthService } from 'services/auth.service';
import {EventAggregator} from 'aurelia-event-aggregator'

@inject(AuthService,Router,EventAggregator)
export class Login {
    authService: AuthService
    name:string
    error:string
    router:Router
    eventAggregator:EventAggregator
    constructor(authService: AuthService,router:Router,eventAggregator:EventAggregator) {
        this.authService = authService;
        this.router = router
        this.eventAggregator = eventAggregator
    }
    activate() {
        this.error = null
    }
    login(){
        this.error = null

        this.authService.login(this.name).then(data => {
            this.eventAggregator.publish('user',data['user'])
            this.router.navigateToRoute('home')
        }).catch(error => {
            this.error = error.message
        })
    }
}
