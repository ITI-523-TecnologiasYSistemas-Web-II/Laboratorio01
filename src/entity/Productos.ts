import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Producto{

    @PrimaryGeneratedColumn()
    cedula: number;

    @Column({type: 'varchar', length:30,nullable: false})
    nombre: string;

    @Column({type: 'varchar', length:30,nullable: false})
    apellido1: string;

    @Column({type: 'varchar', length:30,nullable: false})
    apellido2: string;

    @Column({type: 'date',nullable: false})
    fecha_nacimiento: string;

    @Column({type: 'enum', enum: ['M','G','I'],nullable: false})
    genero: string;

    @Column({type: 'varchar', default: true})
    estado: boolean;
}
