import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common';


//
@Schema({ versionKey: false })
export class ReservationDocument extends AbstractDocument {
  //to let mongoose know about the property we have given, we use this decorator
  @Prop()
  timestamp: Date;

  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop()
  userId: string;

  @Prop()
  invoiceId: string;

  @Prop()
  placeId: string;
}

export const ReservationSchema = SchemaFactory.createForClass(ReservationDocument);