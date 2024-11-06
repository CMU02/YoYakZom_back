import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('summary')
export class Summary {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length : 255 })
    category : string;

    @Column('text')
    summary : string;

    @Column('longtext')
    original_text : string;

    @CreateDateColumn()
    created_at : Date;

    @Column({ default : 0})
    view_count : number;
}
