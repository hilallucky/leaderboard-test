import { Base } from 'src/common/entities/base.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Users extends Base {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    user_type: string;

    @Column()
    username: string;

    @Column({
        unique: true,
    })
    email: string;

    @Column({ length: 60 })
    password: string;
}
