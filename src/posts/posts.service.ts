import { Injectable } from '@nestjs/common';
import { Post } from './post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostInput } from './dto/create-post.input';
import { Author } from 'src/authors/entities/author.entity';
import { AuthorsService } from '../authors/authors.service';

@Injectable()
export class PostsService {

    constructor(
        @InjectRepository(Post) 
        private postsRepository: Repository<Post>,
        private authorsService: AuthorsService
    ){}

    findAll(): Promise<Post[]>{
        return this.postsRepository.find();
    }

    // Buscar por id
    async findProductById(id: number): Promise<Post>{
        return this.postsRepository.findOne({
            where:{
                id
            }
        })
    }

    getAuthor(authorId: number): Promise<Author>{
        return this.authorsService.findOne(authorId)
    }

    // Crear una publicacion
    createPost(post: CreatePostInput): Promise<Post>{
        const newPost = this.postsRepository.create(post);
        return this.postsRepository.save(newPost)
    }
}
