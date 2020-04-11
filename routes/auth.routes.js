const {Router} = require('express')
const {check, validationResult} = require('express-validator')
const config = require('config')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/user.model')
const router = Router()


// /api/auth/register
router.post(
	'/register',
	[
		check('email', 'Incorrect email adress').isEmail(),
		check('password', 'Min password length: 6 symbols')
			.isLength({	min: 6 })
	],
	async (req, res) => {
	try {

		const errors = validationResult(req)

		if(!errors.isEmpty()) {
			return res.status(400).json({
				errors: errors.array(), 
				message: 'Incorrect data'
			})
		}

		const { email, password, firstName, lastName, date } = req.body

		const candidate = await User.findOne({email})

		if (candidate) {
			return res.status(400).json({message: 'User has been exists'})
		}

		const hashedPassword = await bcrypt.hash(password, 12)
		const user = new User({ email, password: hashedPassword, firstName, lastName, date })

		user.save()

		res.status(201).json({message: 'User added'})

	} catch(e) {
		res.status(500).json({ message: 'Server error, try again' })
	}
})

// /api/auth/login
router.post(
	'/login',
	[
		check('email', 'Input correct email').normalizeEmail().isEmail(),
		check('password', 'Input password').exists()
	], 
	async (req, res) => {
	try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Incorrect data",
      })
		}
		
		const {email, password} = req.body

		const user = await User.findOne({ email })

		if(!user) {
			return res.status(400).json({message: 'Auth error'})
		}

		const isMatch = await bcrypt.compare(password, user.password)

		if(!isMatch) {
			return res.status(400).json({message: 'Auth error'})
		}

		const token = jwt.sign(
			{userId: user.id},
			config.get('JWT_SECRET')
		)

  } catch (e) {
    res.status(500).json({ message: "Server error, try again" })
  }
})

module.exports = router