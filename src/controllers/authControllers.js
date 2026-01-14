import User from "../../models/User.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        //check if user already exists
        const isExist = await User.findOne({ email });
        if (isExist) {
            return res.status(400).json({ message: "User already Exist" });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // creating a new user
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({ message: "Registration Successful" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Registration Failed" });
    }
}

const login = async (req, res) => {
    try {
        // get the email and password
        const { email, password } = req.body;
        // check whether this email exist
        const user = await User.findOne({ email });
        if (!user) {
           return res.status(201).json({ message: "Invalid Credentials" })
        }

        // compare passwords
        const correctPassword = await bcrypt.compare(password, user.password);

        if (!correctPassword) {
            return res.status(201).json({ message: "Invalid Credentials" })

        }

        // move towards logging in

        // create a token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({ token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Login Failed" })
    }
}

export { register, login };