import { useContext } from "react";
import { CheckinUserContext } from "../providers/checkin.provider";

export const useCheckinUser = () => useContext(CheckinUserContext);
