import { ReactNode, createContext, useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { filterCheckins } from "../utils/filterCheckins";

interface ICreateUser {
  name: string;
}

export interface Checkin {
  id: string;
  date: string;
  checkinHour: Array<string>;
  total_hours: string;
}

interface User {
  id: string;
  name: string;
  code: string;
  checkin: Checkin[];
}

type CheckinUsersContext = {
  registerUser: (data: ICreateUser) => void;
  loginUser: (code: string) => void;
  listAllUsers: () => void;
  logoutUser: () => void;
  registerCheckin: (id: string) => void;
  loggedUser: User;
  users: User[];
  oldCheckins: Checkin[];
  actualCheckin: Checkin;
  userCode: string;
};

export const CheckinUserContext = createContext<CheckinUsersContext>(
  {} as CheckinUsersContext
);

interface CheckinUsersProviderProps {
  children?: ReactNode;
}

export const CheckinProvider = ({ children }: CheckinUsersProviderProps) => {
  const [userCode, setUserCode] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const [loggedUser, setLoggedUser] = useState<User>({} as User);
  const [actualCheckin, setActualCheckin] = useState<Checkin>({} as Checkin);
  const [oldCheckins, setOldCheckins] = useState<Checkin[]>([]);

  const history = useNavigate();

  const listAllUsers = (): void => {
    api.get("/users").then(
      (res: AxiosResponse<User[]>) => {
        setUsers(res.data);
      },
      (reason) => {
        console.log(reason);
      }
    );
  };

  const registerUser = (data: ICreateUser): void => {
    api
      .post("/users/register", data)
      .then((res: AxiosResponse<User>) => {
        setLoggedUser(res.data);
      })
      .catch((err) => console.log(err));
  };

  const loginUser = (code: string): void => {
    if (code === "" || code === undefined) {
      console.log("Code precisa ser passada");
      return;
    }
    api.get(`users/${code}`).then(
      (res: AxiosResponse<User>) => {
        localStorage.setItem("Ilumeo:code", code);
        const { todayCheckin, othersDaysCheckins } = filterCheckins(
          res.data.checkin
        );
        setOldCheckins(othersDaysCheckins);
        setActualCheckin(todayCheckin);
        setUserCode(code);
        setLoggedUser(res.data);
        history("/checkin");
      },
      (reason: unknown) => {
        console.log(reason);
        logoutUser();
      }
    );
  };

  const registerCheckin = (userId: string): void => {
    api.post(`/checkin/register/${userId}`).then(
      (res: AxiosResponse<Checkin>) => {
        setActualCheckin(res.data);
      },
      (reason) => {
        console.log(reason);
      }
    );
  };

  const logoutUser = (): void => {
    localStorage.clear();
    setUserCode("");
    setLoggedUser({} as User);
    setOldCheckins([]);
    setActualCheckin({} as Checkin);
    history("/login");
  };

  useEffect(() => {
    const code = localStorage.getItem("Ilumeo:code");

    if (code) {
      loginUser(code);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userCode]);

  useEffect(() => {
    listAllUsers();
  }, []);

  return (
    <CheckinUserContext.Provider
      value={{
        registerUser,
        loginUser,
        listAllUsers,
        logoutUser,
        registerCheckin,
        users,
        oldCheckins,
        actualCheckin,
        loggedUser,
        userCode,
      }}
    >
      {children}
    </CheckinUserContext.Provider>
  );
};
