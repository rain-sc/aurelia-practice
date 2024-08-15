import {inject} from 'aurelia-framework';
import { PostService } from 'services/post.service';
import { PostType } from 'types/post';

@inject(PostService)

export class TagView {
    postService:PostService
    posts:PostType
    error:string

    constructor(postService:PostService) {
        this.postService = postService

    }
    activate(params) {
        console.log('params',params);
        this.postService.postsByTag(params.tag).then((res) => {
            if(res['error']){
                this.error = res['error']
            }else{
                this.posts = res['posts']
            }
        })
    }
}
