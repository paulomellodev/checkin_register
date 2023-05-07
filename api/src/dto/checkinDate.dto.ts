import { z } from "zod";
import { checkinTimeReturnManySchema } from "./checkinTime.dto";

const checkinDateSchema = z.object({
  id: z.string().uuid(),
  date: z.date(),
  userId: z.string().uuid(),
  total_hours: z.date().optional(),
  checkin_time: checkinTimeReturnManySchema.transform((els) => {
    return els.map((el) => {
      return el.time;
    });
  }),
});

const checkinDateCreateSchema = checkinDateSchema.omit({
  id: true,
  checkin_time: true,
  total_hours: true,
});

const checkinDateReturnManySchema = checkinDateSchema
  .omit({ userId: true })
  .array();

type checkinDateCreateType = z.infer<typeof checkinDateCreateSchema>;
type checkinDateReturnManyType = z.infer<typeof checkinDateReturnManySchema>;
type checkinDateType = z.infer<typeof checkinDateSchema>;

export {
  checkinDateCreateType,
  checkinDateReturnManyType,
  checkinDateType,
  checkinDateSchema,
  checkinDateCreateSchema,
  checkinDateReturnManySchema,
};
