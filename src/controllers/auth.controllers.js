import { generateTokens } from "../data/token.js";
import { verifyRefreshToken } from "../midleware/authentication.js";

export const login = async (req, res) => {
    console.log(req.body)
    const { email, password } = req.body;
    if (email && password === "123456") {
        const user = {email: email, id: "123"}
        const tokens = await generateTokens(user);
        res.json(tokens);
    } else {
        res.sendStatus(401);
    }
}

export const refresh = async (req, res) => {
    const {refreshToken} = req.body;
    if (!refreshToken) return res.sendStatus(401);

    try {
        const user = verifyRefreshToken(refreshToken);
        if (!user) return res.sendStatus(403);

        // 🆕 Nuevo access token (misma lógica que tu función original)
        const newAccessToken = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1h" }
        );

        res.json({ accessToken: newAccessToken });
    } catch {
        res.sendStatus(403);
    }
}