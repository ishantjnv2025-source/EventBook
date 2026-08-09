export const getProfile = async (req, res) => {

    res.status(200).json({
        message: "Profile Fetched Successfully",
        user: req.user,
    });

};
export const updateProfile = async (req, res) => {
    try {

        const user = req.user;

        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        const updatedUser = await user.save();

        res.status(200).json({
            message: "Profile Updated Successfully",
            user: updatedUser,
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });

    }
};