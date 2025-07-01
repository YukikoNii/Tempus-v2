const logout = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    expires: new Date(0),
    maxAge: 0,
  });

  console.log("logged out");
  return res.status(200).send("Logged out successfully");
};

export default logout;
