module.exports = (req, res, next) => {
    if(!req.user){ //if no one logged in
        req.flash('error', 'You must be logged in to view that page.')
        res.redirect('/auth/login')
    } else {
        next()
    }
}