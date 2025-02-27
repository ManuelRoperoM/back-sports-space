import { SportsFacilities } from 'src/sports_facilites/entities/sports_facilites.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('reservations')
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.reservations, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(
    () => SportsFacilities,
    (sportsFacility) => sportsFacility.reservations,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'sports_facilites_id' })
  sportsFacility: SportsFacilities;

  @Column({ type: 'timestamp', name: 'reservation_date' })
  reservationDate: Date;
}
