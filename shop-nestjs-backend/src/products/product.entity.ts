import { User } from "../auth/user.entity";
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Category } from "./category.entity";

@Entity("products")
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: false })
    price: number;

    @ManyToOne(() => Category, category => category.products, { nullable: false })
    @JoinColumn({ name: 'categoryId' })
    category: Category;

    @ManyToOne(() => User, user => user.products, { nullable: false })
    @JoinColumn({ name: 'sellerId' })
    seller: User;
    @Column({ nullable: true })
    imageUrl: string;

}