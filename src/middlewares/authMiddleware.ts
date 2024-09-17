import jwt from 'jsonwebtoken';
import { FastifyRequest, FastifyReply, HookHandlerDoneFunction } from 'fastify';
import userService from '../services/userService';

interface JwtPayload { id: string; }
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export async function isAuth(request: FastifyRequest, reply: FastifyReply) {
  try {
    // Check token in header
    const token = request.headers.authorization?.split(' ')[1];
    if (!token) return reply.status(401).send({ message: 'No token provided' });

    // Verify token
    const verify = verifyToken(token);
    if (!verify) return reply.status(401).send({ message: "Invalid token" });

    // find user
    const { id } = verify as JwtPayload;
    const user = await userService.findById(id);
    if (!user) return reply.status(401).send({ message: 'Please authenticate using a valid token' });

    // Attach authenticated user data to request body    
    request.body = request.body ? { ...request.body, authUser: verify } : { authUser: verify };
  } catch (error) {
    reply.status(401).send({ message: 'Invalid token' });
  }
};

const verifyToken = (token: string): any => {
  try {
    const data = jwt.verify(token, JWT_SECRET);
    return data;
  } catch (error) {
    return false;
  }
}