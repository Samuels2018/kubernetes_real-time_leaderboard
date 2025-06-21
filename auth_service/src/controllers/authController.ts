import {Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import {User as UserModel } from '../models';
//import { config } from '../../../shared/config';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password, confirmPassword } = req.body;
    if (!username || !email || !password || !confirmPassword) {
      res.status(400).json({ message: 'All fields are required' });
    }

    if (password !== confirmPassword) {
      res.status(400).json({ message: 'Passwords do not match' });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'User with this email already exists' });
    }


    const user = new UserModel({username, email, password, confirmPassword});
    await user.save();

    //const token =  jwt.sign({ userId: user._id }, config.jwt.secret, { expiresIn: config.jwt.expiresIn });

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      },
      //token
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      error: err instanceof Error ? err.message : 'Unknown error'
    });
  }
}

export const loginUser = async (req: Request, res: Response) => {
  
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      res.status(400).json({ message: 'Invalid email or password' });
      return;
    }
    
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      res.status(400).json({ message: 'Invalid email or password' });
      return;
    }

    //const token = jwt.sign({ userId: user._id }, config.jwt.secret, { expiresIn: config.jwt.expiresIn });
    res.status(200).json({
      message: 'Login successful',
      //token
    });
  }catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      error: err instanceof Error ? err.message : 'Unknown error'
    });
  }
}