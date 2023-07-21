import { Exclude } from "class-transformer";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    age: number;

    @Column({ nullable: true })
    about_me?: string;

    @Column()
    email: string;

    @Column()
    @Exclude()
    password: string;

    @Column()
    is_admin: boolean;

    @Column({ nullable: true })
    avatar?: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn({ nullable: true })
    deleted_at?: Date;
}

export default User;