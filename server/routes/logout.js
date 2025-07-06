const logout = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    sameSite: "None",
    secure: process.env.NODE_ENV == "production",
    expires: new Date(0),
    maxAge: 0,
    path: "/",
  });

  console.log("logged out");
  return res.status(200).send("Logged out successfully");
};

export default logout;
