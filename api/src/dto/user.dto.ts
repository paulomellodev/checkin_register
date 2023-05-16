import { z } from "zod";
import { checkinDateReturnManySchema } from "./checkinDate.dto";

const userSchema = z.object({
  id: z.string().uuid(),
  name: z.string().max(50),
  code: z.string().length(8),
  checkin: checkinDateReturnManySchema || [],
});

const userCreateSchema = userSchema.omit({ checkin: true, id: true });
const userReturnManySchema = userSchema.omit({ checkin: true }).array();

type userCreateType = z.infer<typeof userCreateSchema>;
type userReturnManyType = z.infer<typeof userReturnManySchema>;
type userType = z.infer<typeof userSchema>;

export {
  userSchema,
  userCreateSchema,
  userReturnManySchema,
  userCreateType,
  userReturnManyType,
  userType,
};
