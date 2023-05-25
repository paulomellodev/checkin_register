import { z } from "zod";
import { checkinHourReturnManySchema } from "./checkinHour.dto";
import { formatHour } from "../utils/formatHour";
import { formatDate } from "../utils/formatDate";

const checkinDateSchema = z.object({
  id: z.string().uuid(),
  date: z.date().transform((el) => formatDate(el)),
  userId: z.string().uuid(),
  checkinHour: checkinHourReturnManySchema.transform((els) => {
    return els.map((el) => {
      return formatHour(el.time);
    });
  }),
  total_hours: z
    .date()
    .or(z.null())
    .optional()
    .transform((el) => {
      if (el !== null && el !== undefined) {
        return formatHour(el);
      }
    }),
});

const checkinDateCreateSchema = checkinDateSchema.omit({
  id: true,
  date: true,
  checkinHour: true,
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
