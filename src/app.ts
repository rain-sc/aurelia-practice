import { inject } from 'aurelia-framework';
import { PLATFORM } from 'aurelia-pal';
import {RouterConfiguration, Router} from 'aurelia-router';
import { PostService } from 'services/post.service';
@inject(PostService)
export class App {
    public message = 'Hello World!';
    router: Router;
    postService:PostService
    tags:string[]
    error:string
    constructor(postService:PostService){
        this.postService = postService
    }
    configureRouter(config: RouterConfiguration, router: Router): void {
        this.router = router;
        config.options.pushState = true
        config.map([
            { route: '', name: 'home', moduleId: PLATFORM.moduleName('posts/index'),title:'All Posts' },   
            { route:'post/:slug',name:'post-view',moduleId:PLATFORM.moduleName('posts/view'),title:'View Post' },
            { route: 'tag/:tag', name: 'tag-view', moduleId: PLATFORM.moduleName('posts/tag-view'),title:'View Post by Tag' }
        ]);
    }
    attached() {
        this.postService.allTags().then(data=>{
            this.tags = data['tags']
        })
            .catch(err=>{
                this.error = err['message']
            })
    }
}
