import { PLATFORM } from 'aurelia-pal';
import {RouterConfiguration, Router} from 'aurelia-router';

export class App {
    public message = 'Hello World!';
    router: Router;
    configureRouter(config: RouterConfiguration, router: Router): void {
        this.router = router;
        config.options.pushState = true
        config.map([
            { route: '', name: 'home', moduleId: PLATFORM.moduleName('posts/index'),title:'All Posts' },   
            { route:'post/:slug',name:'post-view',moduleId:PLATFORM.moduleName('posts/view'),title:'View Post' }
        ]);
    }
}
