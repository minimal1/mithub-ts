/** @format */
import { Request, Response } from "express";
import axios from "axios";

type UserData = {
  access_token: string;
  user_name: string;
  avatar_url: string;
  email: string;
};

export const postAccessToken = async (req: Request, res: Response) => {
  const {
    body: { code },
  } = req;

  try {
    const resFromGH = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        code,
        client_id: process.env.GH_ID, // 내 APP의 정보
        client_secret: process.env.GH_SECRET, // 내 APP의 정보
      },
      {
        headers: {
          accept: "application/json",
        },
      }
    );
    const token: string = resFromGH.data.access_token;
    const { data } = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `token ${token}`,
      },
    });

    const userData: UserData = {
      access_token: token,
      user_name: data.login,
      avatar_url: data.avatar_url,
      email: data.email,
    };
    return res.json(userData);
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};
