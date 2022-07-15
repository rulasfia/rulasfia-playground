// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from "next";

let data = [{ name: "John Doe" }, { name: "Goo Siee" }];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.method);
  if (req.method === "POST") {
    data.push({ name: "Khoirul" });

    return res.status(200).json(data);
  }

  return res.status(200).json(data);
}
