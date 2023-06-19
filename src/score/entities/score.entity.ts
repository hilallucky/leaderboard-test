import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("scores")
export class Score {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    player_id: number;

    @Column()
    score: number;

    // @ManyToOne(type => Users, user => user.scores)
    // @JoinColumn({ name:'player_id', referencedColumnName: 'id' })
    // user: Users;
}
