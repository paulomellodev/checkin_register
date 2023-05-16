import { z } from "zod";

const checkinHourSchema = z.object({
  id: z.string().uuid(),
  time: z.date(),
  checkinId: z.string().uuid(),
});

const checkinHourCreateSchema = checkinHourSchema.omit({
  id: true,
});

const checkinHourReturnManySchema = checkinHourCreateSchema
  .omit({ checkinId: true })
  .array();

type checkinHourCreateType = z.infer<typeof checkinHourCreateSchema>;
type checkinHourReturnManyType = z.infer<typeof checkinHourReturnManySchema>;
type checkinHourType = z.infer<typeof checkinHourSchema>;

export {
  checkinHourCreateType,
  checkinHourReturnManyType,
  checkinHourType,
  checkinHourSchema,
  checkinHourCreateSchema,
  checkinHourReturnManySchema,
};
