import TeamMember from '../models/Team.js';
import { cloudinary } from '../config/cloudinary.js';

export const getTeam = async (req, res) => {
    try {
        const team = await TeamMember.find();
        res.json(team);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const createTeamMember = async (req, res) => {
    try {
        const newTeamMember = new TeamMember(req.body);
        await newTeamMember.save();
        res.status(201).json(newTeamMember);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const updateTeamMember = async (req, res) => {
    try {
        const updatedTeamMember = await TeamMember.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedTeamMember);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const deleteTeamMember = async (req, res) => {
    try {
        const user = await TeamMember.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        if (user.img?.includes('res.cloudinary.com')) {
            const publicId = user.img.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(`tracky/${publicId}`);
        }

        await TeamMember.findByIdAndDelete(req.params.id);
        res.sendStatus(204);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
