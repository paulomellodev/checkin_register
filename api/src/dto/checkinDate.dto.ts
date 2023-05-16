import { z } from "zod";
import { checkinHourReturnManySchema } from "./checkinHour.dto";

const checkinDateSchema = z.object({
  id: z.string().uuid(),
  date: z.date().transform((el) =>
    Intl.DateTimeFormat("pt-BR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(el)
  ),
  userId: z.string().uuid(),
  checkinHour: checkinHourReturnManySchema.transform((els) => {
    return els.map((el) => {
      return Intl.DateTimeFormat("pt-BR", {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: false,
        hourCycle: "h24",
      }).format(el.time);
    });
  }),
  total_hours: z
    .date()
    .or(z.null())
    .optional()
    .transform((el) => {
      if (el !== null && el !== undefined) {
        return Intl.DateTimeFormat("pt-BR", {
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hour12: false,
          hourCycle: "h24",
        }).format(el);
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
