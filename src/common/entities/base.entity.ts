import { Column } from 'typeorm';

export abstract class Base {
  @Column({
    name: 'created_at',
    type: 'timestamp',
    update: false,
    default: () => 'CURRENT_TIMESTAMP'
  })
  createdAt: Date;

  @Column({
    name: 'updated_at',
    type: 'timestamp',
    nullable: true,
  })
  updatedAt: Date;

  @Column({ name: 'created_by', length: 255, update: false })
  createdBy: string;

  @Column({ name: 'updated_by', length: 255, nullable: true })
  updatedBy: string;
}
