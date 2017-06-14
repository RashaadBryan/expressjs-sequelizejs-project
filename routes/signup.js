var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Sequelize = require('sequelize');
var bcrypt = require('bcryptjs');

router.use(bodyParser.urlencoded({
	extended: true
}));


var connection = new Sequelize('expressjs-article', 'expressjs-article-usr', 'adminadmin', {
	dialect: 'mysql'
});

var userAccounts = connection.define('user-accounts', {
	user_id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},

	user_name: {
		type: Sequelize.STRING,
		primaryKey: false,
		unique: true,
		allowNull: false,
		validate: {
			len:{
				args: [5, 15],
				msg: 'Please enter a username with at least 5 characters but no more than 15 characters'
			}
		}
	},

	email_address: {
		type: Sequelize.STRING,
		unique: true,
		primaryKey: false,
		allowNull: false
	},

	user_password: {
		type: Sequelize.TEXT,
		primaryKey: false,
		allowNull: false
	}

}, {
	timestamps: false,
	//freezeTableName: true,
	hooks: {
		afterValidate: function(user){
			user.user_password = bcrypt.hashSync(user.user_password, 8);
		}, 
		afterCreate: function(res){
			//res.render('index', {title: 'Sign up secess'});
		}
	}
});


router.get('/', function(req, res){
	res.render('signup', {title: 'Sign Up'});
});


router.post('/', function(req, res){
	var userInfo = req.body;
	connection
		.sync({
			logging: console.log
		})
		.then(function(){
			return userAccounts.create({
				user_name: userInfo.txtusername,
				email_address: userInfo.txtemail,
				user_password: userInfo.txtpassword
			});
		})
		.catch(function(error){
			console.log(error);
		});


});


module.exports = router;