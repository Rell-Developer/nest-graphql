import { Field, InputType } from "@nestjs/graphql"
import { IsInt, IsNotEmpty, MaxLength, MinLength } from "class-validator";

@InputType()
export class CreatePostInput{
    @MinLength(4, { message: "El titulo es demasiado corto" })
    @MaxLength(100, { message: "El titulo es demasiado largo" })
    @IsNotEmpty({ message: "El titulo es requerido" })
    @Field()
    title: string

    @IsNotEmpty()
    @Field({ nullable: true })
    content?: string

    @IsNotEmpty({ message: "El autor es requerido"})
    @IsInt()
    @Field()
    authorId: number
}