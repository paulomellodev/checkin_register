import { z } from "zod";

const checkinTimeSchema = z.object({
  id: z.string().uuid(),
  checkinDateId: z.string().uuid(),
  time: z.date(),
});

const checkinTimeCreateSchema = checkinTimeSchema.omit({
  id: true,
});

const checkinTimeReturnManySchema = checkinTimeCreateSchema
  .omit({ checkinDateId: true })
  .array();

type checkinTimeType = z.infer<typeof checkinTimeSchema>;
type checkinTimeCreateType = z.infer<typeof checkinTimeCreateSchema>;
type checkinTimeReturnManyType = z.infer<typeof checkinTimeReturnManySchema>;

export {
  checkinTimeType,
  checkinTimeCreateType,
  checkinTimeReturnManyType,
  checkinTimeSchema,
  checkinTimeCreateSchema,
  checkinTimeReturnManySchema,
};
