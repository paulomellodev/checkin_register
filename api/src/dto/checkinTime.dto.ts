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

export {
  checkinTimeSchema,
  checkinTimeCreateSchema,
  checkinTimeReturnManySchema,
};
