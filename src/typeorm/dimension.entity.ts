import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Dimension {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    
  })
  pid: number;

  @Column({
    default: 2,
  })
  event_by: number;

  @Column({
    default: false,
  })
  is_deleted: boolean;

  @CreateDateColumn()
  created_at: Date; 

  @UpdateDateColumn()
  updated_at: Date; 

  @Column({
    
  })
  dimension_name: string;

  @Column('json',{
  })
  dimension_data;

  

}