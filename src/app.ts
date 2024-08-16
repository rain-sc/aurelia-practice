import { inject } from 'aurelia-framework';
import { PLATFORM } from 'aurelia-pal';
import {RouterConfiguration, Router} from 'aurelia-router';
import { AuthService } from 'services/auth.service';
import { PostService } from 'services/post.service';
import {EventAggregator,Subscription} from 'aurelia-event-aggregator'

@inject(PostService,AuthService,EventAggregator)
export class App {
    public message = 'Hello World!';
    router: Router;
    postService:PostService
    tags:string[]
    error:string
    authService:AuthService
    currentUser:string
    eventAggregator:EventAggregator
    subscription:Subscription
    constructor(postService:PostService,authService:AuthService,eventAggregator:EventAggregator){
        this.postService = postService
        this.authService = authService
        this.eventAggregator = eventAggregator
    }
    configureRouter(config: RouterConfiguration, router: Router): void {
        this.router = router;
        config.options.pushState = true
        config.map([
            {route:'login',name:'login',moduleId:PLATFORM.moduleName('auth/login'),title:'Login' },
            { route: '', name: 'home', moduleId: PLATFORM.moduleName('posts/index'),title:'All Posts',nav:true },   
            { route:'post/:slug',name: 'post-view',moduleId:PLATFORM.moduleName('posts/view'),title:'View Post' },
            { route: 'tag/:tag', name: 'tag-view', moduleId: PLATFORM.moduleName('posts/tag-view'),title:'View Post by Tag' }
        ]);
    }
    attached() {
        this.currentUser = this.authService.currentUser
        this.subscription = this.eventAggregator.subscribe('user',user=>{
            this.currentUser = this.authService.currentUser
        })
        this.postService.allTags().then(data=>{
            this.tags = data['tags']
        })
            .catch(err=>{
                this.error = err['message']
            })
    }
    detached() {
        this.subscription.dispose()
    }
    logout(){
        this.authService.logout().then(data=>{
            this.eventAggregator.publish('user',null)
        }).catch(err=>{
            this.error = err['message']
        })
    }
}
