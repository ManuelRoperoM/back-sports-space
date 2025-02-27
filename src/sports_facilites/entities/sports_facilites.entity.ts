import { Reservation } from 'src/reservations/entities/reservation.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sports_facilities')
export class SportsFacilities {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  location: string;

  @Column()
  sport: string;

  @Column()
  capacity: number;

  @OneToMany(() => Reservation, (reservation) => reservation.sportsFacility)
  reservations: Reservation[];
}
