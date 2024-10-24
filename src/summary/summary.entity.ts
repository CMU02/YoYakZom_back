import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Summary {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length : 255 })
    category : string;

    @Column('text')
    summary : string;

    @Column('longtext')
    original : string;

    @CreateDateColumn()
    created_at : Date;
}
