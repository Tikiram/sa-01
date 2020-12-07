


module.exports = function checkUser(user, dbUser) {
    return user.password === dbUser.PASSWORD && user.email === dbUser.email;
};