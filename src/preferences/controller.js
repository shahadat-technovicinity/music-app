import { Preference } from './model.js'; // Assuming Preference model exists

export const PreferencesController = {
    getAllPreferences: async (req, res) => {
        try {
            const preferences = await Preference.find();
            res.status(200).json({
                success: true,
                message: "Preferences retrieved successfully.",
                data: preferences,
            });
        } catch (error) {
            console.error('Error retrieving preferences:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    },

    getPreferenceById: async (req, res) => {
        try {
            const { id } = req.params;
            const preference = await Preference.findById(id);

            if (!preference) {
                return res.status(404).json({
                    success: false,
                    message: 'Preference not found',
                });
            }

            res.status(200).json({
                success: true,
                message: "Preference retrieved successfully.",
                data: preference,
            });
        } catch (error) {
            console.error('Error retrieving preference:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    },

    createPreference: async (req, res) => {
        try {
            const { name, value } = req.body;

            const newPreference = new Preference({
                name,
                value,
            });

            await newPreference.save();

            res.status(201).json({
                success: true,
                message: "Preference created successfully.",
                data: newPreference,
            });
        } catch (error) {
            console.error('Error creating preference:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    },

    updatePreference: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, value } = req.body;

            const updatedPreference = await Preference.findByIdAndUpdate(
                id,
                { name, value },
                { new: true }
            );

            if (!updatedPreference) {
                return res.status(404).json({
                    success: false,
                    message: 'Preference not found',
                });
            }

            res.status(200).json({
                success: true,
                message: "Preference updated successfully.",
                data: updatedPreference,
            });
        } catch (error) {
            console.error('Error updating preference:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    },

    deletePreference: async (req, res) => {
        try {
            const { id } = req.params;

            const deletedPreference = await Preference.findByIdAndDelete(id);

            if (!deletedPreference) {
                return res.status(404).json({
                    success: false,
                    message: 'Preference not found',
                });
            }

            res.status(200).json({
                success: true,
                message: "Preference deleted successfully.",
            });
        } catch (error) {
            console.error('Error deleting preference:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    },
};