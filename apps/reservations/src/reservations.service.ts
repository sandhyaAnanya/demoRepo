import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsRepository } from './reservations.repository';
import { ClientProxy } from '@nestjs/microservices';
import { PAYMENT_SERVICE, UserDto } from '@app/common';
import { map } from 'rxjs';

@Injectable()
export class ReservationsService {

  constructor(
    private readonly reservationRepository: ReservationsRepository,
    @Inject(PAYMENT_SERVICE) private readonly paymentService: ClientProxy
  ) { }

  async create(createReservationDto: CreateReservationDto, { email, _id: userId }: UserDto,) {
    try {
      return this.paymentService
        .send('create_charge', {
          ...createReservationDto.charge,
          email,
        })
        .pipe(
          map((res) => {
            return this.reservationRepository.createDocument({
              ...createReservationDto,
              invoiceId: res.id,
              timestamp: new Date(),
              userId,
            });
          }),
        );
    }catch(err){
      throw new BadRequestException(err)
    }
    
  }

  async findAll() {
    return this.reservationRepository.findAll({});
  }

  async findOne(_id: string) {
    return this.reservationRepository.findOne({ _id });
  }

  async update(_id: string, updateReservationDto: UpdateReservationDto) {
    return this.reservationRepository.findOneAndUpdate({ _id }, { $set: updateReservationDto })
  }

  async remove(_id: string) {
    const user = await this.reservationRepository.findOne({_id})
    console.log("user----reservation service",user);
    if(user){
      await this.reservationRepository.findoneAndDelete({ _id });
      return {
          status:200,
          message:`reservation with the ${ _id} is Successfully deleted`
      }
    }
  }
}
