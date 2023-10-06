import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { ProductImage } from "./";
import { User } from "../../auth/entities/user.entity";

@Entity({name: 'products'})
export class Product {

    @ApiProperty({example: '8f09ed42-ca91-4d8d-b56e-1ad0e4ac458a', description: 'Product ID', uniqueItems: true})
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({example: 'T-Shirt Teslo', description: 'Product Title', uniqueItems: false})
    @Column('text', {
        unique: true,
    })
    title: string;

    @ApiProperty({example: 19.99, description: 'Product Price', uniqueItems: false})
    @Column('float', {
        default: 0
    })
    price: number;

    @ApiProperty({example: 'Inspired by the Model Y order confirmation graphic, the limited edition Haha Yes Tee is designed for comfort and style.', description: 'Product Description', uniqueItems: false})
    @Column({
        type: 'text',
        nullable: true
    })
    description: string;

    @ApiProperty({example: 't-shirt_teslo', description: 'Product Slug - for SEO', uniqueItems: true})
    @Column('text', {
        unique: true
    })
    slug: string;

    @ApiProperty({example: '5', description: 'Product Stock', uniqueItems: false})
    @Column('int', {
        default: 0 
    })
    stock: number;

    @ApiProperty({example: ['M', 'L', 'XL'], description: 'Product Sizes', uniqueItems: false})
    @Column('text', {
        array: true
    })
    sizes: string[]

    @ApiProperty({example: 'Male', description: 'Product Gender', uniqueItems: false})
    @Column('text')
    gender: string;

    @ApiProperty()
    @Column('text', {
        array: true,
        default: []
    })
    tags: string[]

    //images
    @ApiProperty()
    @OneToMany(
        () => ProductImage,
        productImage => productImage.product,
        {cascade: true, eager: true}
    )
    images?: ProductImage[];


    //user
    @ManyToOne(
        () => User,
        ( user ) => user.product,
        {eager: true}
    )
    user: User

    @BeforeInsert()
    checkSlugInsert(){
        if(!this.slug){
            this.slug = this.title
        }

        this.slug = this.slug
            .toLowerCase()
            .replaceAll(" ", "_")
            .replaceAll("'", "")
    }

    @BeforeUpdate()
    checkSlugUpdate(){
        this.slug = this.slug
            .toLowerCase()
            .replaceAll(" ", "_")
            .replaceAll("'", "")
    }

}
