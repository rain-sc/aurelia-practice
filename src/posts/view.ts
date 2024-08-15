import {inject} from 'aurelia-framework';
import { PostService } from 'services/post.service';
import { PostType } from 'types/post';

@inject(PostService)
export class View {
    postService:PostService
    post:PostType
    error:string
    constructor(postService:PostService) {
        this.postService = postService
    }

    activate(params, routeConfig, navigationInstruction) {
        this.postService.find(params.slug).then((res) => {
            if(res['error']){
                this.error = res['error']
            }else{
                this.post = res['post']
            }
        })
    }
}
