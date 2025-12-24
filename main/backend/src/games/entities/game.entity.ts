import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('games')
export class Game {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  coverImage: string;

  @Column('simple-array')
  screenshots: string[];

  @Column('text')
  description: string;

  @Column('simple-array')
  platforms: string[];

  @Column('simple-array')
  genres: string[];

  @Column('decimal', { precision: 3, scale: 1 })
  rating: number;

  @Column()
  releaseDate: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
