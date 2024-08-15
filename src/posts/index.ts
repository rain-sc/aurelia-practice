import {inject} from 'aurelia-framework';
import { PostService } from './../services/post.service';
import { PostType } from 'types/post';

@inject(PostService)

export class Index {

    postService: PostService
    posts:PostType

    constructor(postService: PostService) {
        this.postService = postService
    }

    attached() {
        this.getAllPostPreviews()
    }

    getAllPostPreviews(){
        try {
            this.postService.allPostPreviews().then((res) => {
                this.posts = res['posts']
            })
            
            
        } catch (error) {
            console.error(error);
        
        }
    }
}
