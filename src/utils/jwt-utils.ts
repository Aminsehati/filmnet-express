import jsonwebtoken, { Secret } from 'jsonwebtoken'
class JWTUtils {
    generateToken(payload = {}, expired = "20d") {
        const secret = process.env.JWT_SECRET || "secret";
        return jsonwebtoken.sign(payload, secret, {
            expiresIn: '2 days'
        });
    }
    async verifyToken(token: string) {
        const secret = process.env.JWT_SECRET || "secret";
        return await jsonwebtoken.verify(token, secret)
    }
}
export default new JWTUtils()