import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { FastifyReply, FastifyRequest } from "fastify";
import userService from '../services/userService';
import { apiLog } from "../utilities/logger";
import { TUser } from "../models/userModel";

const JWT_SECRET = process.env.JWT_SECRET || 'secret';
export async function register(request: FastifyRequest, reply: FastifyReply) {
  apiLog.info(`Register: ${JSON.stringify(request.body)}`);
  try {
    // get the field from request
    const { name, email, password } = request.body as TUser;

    // create secure password    
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(password, salt);

    // create username
    const username = await require('crypto').randomBytes(10).toString('hex');

    // check if email is existing
    const existing = await userService.findOne({ "email": email.toLowerCase() });
    if (existing) return reply.send({ status: "failed", error: "email is already used" });

    // create user
    const userField: TUser = { name, email: email.toLowerCase(), username, password: secPass };
    const user = await userService.create(userField);

    reply.status(201).send({ message: 'User registered successfully', data: { user } });
  } catch (error) {
    apiLog.error('register: ' + error);
    reply.status(500).send({ message: 'Internal Server Error' });
  }
}

export async function login(request: FastifyRequest, reply: FastifyReply) {
  apiLog.info(`Login: ${JSON.stringify(request.body)}`);
  try {
    // get the field form request
    const { email, password } = request.body as TUser;

    // find the user by email
    const user = await userService.findOne({ email: email.toLowerCase() }, { password: 1 });
    if (!user) return reply.send({ status: "failed", error: "invalid credentials" });

    // compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return reply.send({ status: "failed", error: "invalid credentials" });

    // generate token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });
    reply.send({ message: "Login successful", data: { token } });
  } catch (error) {
    apiLog.error('login: ' + error);
    reply.status(500).send({ message: 'Internal Server Error' });
  }
}