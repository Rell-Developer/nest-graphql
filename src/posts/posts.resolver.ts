import { Args, Int, Mutation, Parent, Query, ResolveField } from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { Post } from './post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { Author } from 'src/authors/entities/author.entity';

@Resolver((of) => Post)
export class PostsResolver {

    constructor(private PostsService: PostsService){}

    @Query((returns) => [Post])
    posts(){
        return this.PostsService.findAll();
    }

    @Query((returns) => Post)
    getPostById(@Args("id", { type: () => Int }) id: number){
        return this.PostsService.findProductById(id);
    }

    @ResolveField(()=> Author)
    author(@Parent() post: Post): Promise<Author>{
        return this.PostsService.getAuthor(post.authorId);
    }

    @Mutation(()=> Post)
    createPost(@Args("postInput") postInput: CreatePostInput){
        return this.PostsService.createPost(postInput);
    }
}
