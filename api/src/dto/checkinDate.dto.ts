import { z } from "zod";

const checkinDateSchema = z.object({
  id: z.string().uuid(),
  date: z.date(),
  userId: z.string().uuid(),
  total_hours: z.date().optional(),
});

const checkinDateCreateSchema = checkinDateSchema.omit({
  id: true,
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
