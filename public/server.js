const express = require('express');
const app = express();
var cookieParser = require('cookie-parser')
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const passport = require('passport');
const cookieSession = require('cookie-session');
const methodOverride = require('method-override');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
const account_patient = require('./app/models/AccountPatient');
const { mutileMongooseToObject } = require('./util/mongoose');
const { mongooseToObject } = require('./util/mongoose');
require('./app/passport');
const route = require('./routes');
const db = require('./config/db');
const path = require('path');
const port = process.env.PORT || 3000;
//Middleware
const SortMiddleware = require('./app/middlewares/SoftMiddleware');
const checkLogin = require('./app/middlewares/login');
const checkAccount = require('./app/middlewares/checkAccount');
//webRTC
const server = require('http').Server(app);
const io = require('socket.io')(server);
const { ExpressPeerServer } = require('peer');
const peerServer = ExpressPeerServer(server, {
    debug: true,
});
const { v4: uuidv4 } = require('uuid');

app.use('/peerjs', peerServer);
app.set('view engine', 'ejs');

app.get('/videocall', (req, res) => {
    res.redirect(`/videocall/${uuidv4()}`);
});

app.get('/videocall/:room', (req, res) => {
    res.render('room', { layout: false, roomId: req.params.room, userId: req.session.authUser.Id, userName: req.session.authUser.Name });
});
app.get('/datlichhen', (req, res) => {
    res.render('datlichhen');
});
io.on('connection', (socket) => {
    socket.on('join-room', (roomId, userId) => {
        socket.join(roomId);
        socket.to(roomId).broadcast.emit('user-connected', userId);

        socket.on('message', (message) => {
            io.to(roomId).emit('createMessage', message, userId);
        });
        socket.on('disconnect', () => {
            socket.to(roomId).broadcast.emit('user-disconnected', userId);
        });
    });
});

//auth google login
app.set('trust proxy', 1) // trust first proxy
app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2']
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(SortMiddleware);
app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/fail' }),
    //checkAccount
    function(req, res, next) {
        account_patient.findOne({ Id: req.user.id }, (err, data) => {
            if (err) {
                console.log(err)
            } else {
                var check_firstTime = false;
                if (data === null) {
                    check_firstTime = true;
                    data = new account_patient({
                        Id: req.user.id,
                        Name: req.user.displayName,
                        ImageURL: req.user.photos[0].value,
                        Sex: '',
                        Adress: '',
                        Email: req.user.emails[0].value,

                    })
                    data.save();
                }
                //req.cookieSession.         
                req.session.isAuthenticated = true;
                req.session.authUser = data;
                req.session.token = req.user.token;
                // set data cho biến Local. dùng cho hdb
                res.locals.lcIsAuthenticated = req.session.isAuthenticated;
                res.locals.lcAuthUser = req.session.authUser;
                //dang nhap thanh cong chuyen ve home
                if (check_firstTime) {
                    res.redirect(`/profile/${req.user.id}`);
                } else {
                    res.redirect('/');
                }
            }
        });
    });

//set data cho res.locals su dung cho .hdb
app.use(async function(req, res, next) {
        if (req.session.isAuthenticated === null) {
            req.session.isAuthenticated = false;
        }
        res.locals.lcIsAuthenticated = req.session.isAuthenticated;
        res.locals.lcAuthUser = req.session.authUser;
        next();
    })
    //connect to data base
db.connect();

app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));


//sử dụng middleware để sử lý form.
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());
app.use(cookieParser())

app.use(morgan('combined'));

//template engine
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        helpers: {
            sum: function(a, b) {
                return a + b;
            },
            sortable: (field, sort) => {
                const sortType = field === sort.column ? sort.type : 'default'
                const icons = {
                    default: 'oi oi-elevator',
                    asc: 'oi oi-sort-ascending',
                    desc: 'oi oi-sort-descending'
                };
                const types = {
                    default: 'desc',
                    asc: 'desc',
                    desc: 'asc'
                };
                const icon = icons[sortType];
                const type = types[sortType];
                return `<a href="?_sort&column=${field}&type=${type}">
                    <span class="${icon}"></span>
                </a>`;
            },
        },
    }),
);
app.set('view engine', 'hbs');

app.set('views', path.join(__dirname, 'resource', 'views'));

//route init khoi tao tuyen duong
route(app);

server.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});