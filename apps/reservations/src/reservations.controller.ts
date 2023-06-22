import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Inject } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { CurrentUser, JwtAuthGaurd, UserDto } from '@app/common';

@Controller('reservations')
export class ReservationsController {
  
  constructor(
    private readonly reservationsService: ReservationsService,
    ) {}

  @Post()
  @UseGuards(JwtAuthGaurd)
  create(
    @Body() createReservationDto: CreateReservationDto,
    @CurrentUser() user:UserDto
    ) {
    
      return  this.reservationsService.create(createReservationDto,user);
  }

  @UseGuards(JwtAuthGaurd)
  @Get()
  findAll() {
    return this.reservationsService.findAll();
  }

  @UseGuards(JwtAuthGaurd)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservationsService.findOne(id);
  }

  @UseGuards(JwtAuthGaurd)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReservationDto: UpdateReservationDto) {
    return this.reservationsService.update(id, updateReservationDto);
  }

  @UseGuards(JwtAuthGaurd)
  @Delete(':id')
  remove(@Param('id') id: string) {
    const data = this.reservationsService.remove(id);
    return data
  }
}
