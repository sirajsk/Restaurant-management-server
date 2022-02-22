const collection = require('../config/collection')
const db = require('../config/connection')
const jwt = require('jsonwebtoken')

module.exports = {
    login: async (req, res) => {
        const { email, password } = req.body
        try {
            let admin = await db.get().collection(collection.ADMIN_COLLECTON).findOne({ email: email })
            if (!admin) return res.status(400).json({ error: "invalid " })
            if (password === admin.password) {
                let token = jwt.sign({ email: admin.email, id: admin._id }, 'secret', { expiresIn: "1h" })
                res.status(200).json({ admin, token })
            } else {
                return res.status(400).json({ error: "invalid Admin" })
            }
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
}