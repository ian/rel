import bcrypt from "bcryptjs"
import jsonwebtoken from "jsonwebtoken"

const SALT_ROUNDS = 10
const EXPIRY_SECONDS = 60 * 60 * 24 * 30

export async function decode(token) {
  try {
    return jsonwebtoken.verify(token, process.env.SECRET)
  } catch (err) {
    return null
  }
}

export async function sign(attrs, opts = {}) {
  return jsonwebtoken.sign(attrs, process.env.SECRET, opts)
}

export async function token(user, opts = {}) {
  // const expiresAt = moment().add(EXPIRY_SECONDS, "seconds")
  return sign({
    userId: user.id,
    // expiresAt,
  })
}

export async function hash(password) {
  const salt = bcrypt.genSaltSync(SALT_ROUNDS)
  return bcrypt.hashSync(password, salt)
}

export async function hashCompare(password, hash) {
  return bcrypt.compareSync(password, hash)
}

export default {
  decode,
  hash,
  hashCompare,
  token,
  sign,
}
