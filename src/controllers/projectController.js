import Project from '../models/Project.js';
import { cloudinary } from '../config/cloudinary.js';

export const getProjects = async (req, res) => {
    try {
        const projects = await Project.find();

        const projectsByCategory = projects.reduce((acc, project) => {
            const category = project.category || 'newProj';
            if (!acc[category]) acc[category] = [];
            acc[category].push(project);
            return acc;
        }, {});

        res.json(projectsByCategory);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const createProject = async (req, res) => {
    try {
        const projectData = { ...req.body };

        if (req.file) {
            projectData.img = req.file.path;
        }

        const newProject = new Project(projectData);
        await newProject.save();
        res.status(201).json(newProject);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const updateProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        const updateData = { ...req.body };

        if (req.file) {
            if (project.img && project.img.includes('res.cloudinary.com')) {
                const publicId = project.img.split('/').pop().split('.')[0];
                await cloudinary.uploader.destroy(`tracky/${publicId}`);
            }
            updateData.img = req.file.path;
        }

        const updatedProject = await Project.findByIdAndUpdate(req.params.id, updateData, { new: true });
        res.json(updatedProject);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const deleteProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (project && project.img && project.img.includes('res.cloudinary.com')) {
            const publicId = project.img.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(`tracky/${publicId}`);
        }

        await Project.findByIdAndDelete(req.params.id);
        res.sendStatus(204);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

