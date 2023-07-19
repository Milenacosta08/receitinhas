import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import Ingredient from "./ingredient";
import Category from "@modules/categories/infra/typeorm/entities/category";
import User from "@modules/users/infra/typeorm/entities/user";

@Entity('recipes')
class Recipe {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @OneToMany(() => Ingredient, ingredient => ingredient.recipe, { cascade: true })
    ingredients: Ingredient[];

    @Column()
    time: string;

    @Column()
    steps: string;

    @Column({ nullable: true })
    rating?: number;

    @Column()
    category_id: string;

    @ManyToOne(() => Category)
    @JoinColumn({ name: 'category_id' })
    category: Category

    @Column()
    user_id: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at?: Date;
}

export default Recipe;