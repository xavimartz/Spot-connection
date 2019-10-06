module.exports = isAuth => (req, res, next) => {
  console.log('does it reallt¡y enters?')
  req.isAuthenticated() ? next() : res.status(401).json({ msg: 'Log in first' });
}