const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Get user details
exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) return res.status(404).json({ message: "User not found" });
        
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

// Update user details
exports.updateUser = async (req, res) => {
    const { name, email, currentPassword, newPassword } = req.body;
    
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        // Update name if provided
        if (name) user.name = name;

        // Update email if provided
        if (email) {
            const emailExists = await User.findOne({ email });
            if (emailExists && emailExists._id.toString() !== req.user.id) {
                return res.status(400).json({ message: "Email already in use" });
            }
            user.email = email;
        }

        // Update password if current and new passwords are provided
        if (currentPassword && newPassword) {
            const isMatch = await bcrypt.compare(currentPassword, user.password);
            if (!isMatch) return res.status(400).json({ message: "Current password is incorrect" });
            
            user.password = await bcrypt.hash(newPassword, 10);
        } else if (currentPassword || newPassword) {
            return res.status(400).json({ message: "Both current and new passwords are required to update password" });
        }

        await user.save();
        
        // Return updated user without password
        const updatedUser = await User.findById(req.user.id).select('-password');
        res.json({ 
            message: "User updated successfully", 
            user: updatedUser 
        });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

// Delete user account
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        await user.deleteOne();
        res.json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};