import jwt from 'jsonwebtoken';

export const authenticationToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  //this header has 2 seperated part one is Bearer second is token so that why and [1] is define that taken only token not type
  const token = authHeader && authHeader.split(' ')[1]; // Expecting "Bearer <token>"

  if (!token)
    return res.status(401).json({ message: 'Access denied. Token missing.' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};

export const refreshAccessToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken; // stored in httpOnly cookie

  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token missing' });
  }

  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid refresh token' });

    // Generate a new access token
    const newAccessToken = jwt.sign(
      { userId: user.userId, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );

    return res.json({ accessToken: newAccessToken });
  });
};
