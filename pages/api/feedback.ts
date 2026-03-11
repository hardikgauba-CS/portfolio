import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';

// Feedback Schema
const feedbackSchema = new mongoose.Schema({
  name: String,
  design: String,
  usability: String,
  content: String,
  additionalSuggestions: String,
  date: { type: Date, default: Date.now },
});

// Feedback Model
const Feedback = mongoose.models.Feedback || mongoose.model('Feedback', feedbackSchema);

// MongoDB Connection
const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGO_URI!);
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  if (req.method === 'POST') {
    const { name, design, usability, content, additionalSuggestions } = req.body;

    // Ensure all fields are received
    if (!name || !design || !usability || !content) {
      return res.status(400).json({ message: 'All required fields must be filled' });
    }

    try {
      const feedback = new Feedback({ name, design, usability, content, additionalSuggestions });
      await feedback.save();
      return res.status(201).json({ message: 'Feedback submitted successfully.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error.' });
    }
  } else if (req.method === 'GET') {
    try {
      const feedback = await Feedback.find();
      return res.status(200).json(feedback);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Failed to fetch feedback.' });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
