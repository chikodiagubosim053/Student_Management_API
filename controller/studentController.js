const { Student } = require('../models');
const fs = require('fs')

 exports.createStudent = async (req, res) => {
    try {
        const { fullName, email, phoneNumber, department } = req.body;
        const file = req.file.path;

        const newStudent = await Student.create({
            fullName,
            email,
            phoneNumber,
            department,
            profileImage: file
        })
        res.status(201).json({
            message: 'Student Added Successfully',
            data: newStudent
        })
        
} catch (error) {
res.status(500).json({
    message: error.message
     })
}

};

exports.addGalleryImages = async (req, res) => {
    try {
        const id = req.params.id;
        const student = await Student.findByPk(id);

        if (!student) {
            return res.status(404).json({
                message: 'Student not found'
            });
        }

        const files = req.files || [];
        const oldGalleryImages = student.galleryImages || [];

        const newGalleryImages = files.map((e) => e.filename);
        const galleryImages = oldGalleryImages.concat(newGalleryImages);

        await student.update({
            galleryImages: galleryImages
        });

        res.status(200).json({
            message: 'Gallery Images Added Successfully',
            data: student
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};



exports.addStudentImages = async (req, res) => {
    try {
        const id = req.params.id;
        const student = await Student.findByPk(id);

        if (!student) {
            return res.status(404).json({
                message: 'Student not found'
            });
        }

        const files = req.files || {};
        const data = {};

        if (files.passportImage) {
            data.passportImage = files.passportImage[0].filename;
        }

        if (files.identityCardImage) {
            data.identityCardImage = files.identityCardImage[0].filename;
        }

        if (files.profileImage) {
            data.profileImage = files.profileImage[0].filename;
        }

        if (files.galleryImages) {
            data.galleryImages = files.galleryImages.map((e) => e.filename);
        }

        await student.update(data);
        res.status(200).json({
            message: 'Student Images Uploaded Successfully',
            data: student
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

exports.getAllStudent = async (req, res) => {
    try {
        const allStudent = await Student.findAll()
        res.status(200).json({
            message: `All Student retrieved successfully and the lenght is ${allStudent.lenght}`,
            data: allStudent
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
};


exports.getOneStudent = async (req, res) => {
    try {
        const id  = req.params.id;
        const oneStudent = await Student.findByPk(id)

        if (!oneStudent) {
            return res.status(404).json({
                message: 'One Student not Found'
            })
        };

        res.status(200).json({
            message: 'One Student retrieved successfully',
            data: oneStudent
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
};



exports.updateStudent = async (req, res) => {
    try {
        const id = req.params.id;

        const { fullName, email, phoneNumber, department } = req.body;

        const student = await Student.findByPk(id);

        if (!student) {
            return res.status(404).json({
                message: 'Student not found'
            });
        }

        const data = {
            fullName,
            email,
            phoneNumber,
            department
        };

        if (req.files?.profileImage) {
            data.profileImage = req.files.profileImage[0].path;
        }

        if (req.files?.galleryImages) {
            data.galleryImages = req.files.galleryImages.map(
                (file) => file.path
            );
        }

        if (req.files?.passportImage) {
            data.passportImage = req.files.passportImage[0].path;
        }

        if (req.files?.identityCardImage) {
            data.identityCardImage = req.files.identityCardImage[0].path;
        }

        await student.update(data);

        res.status(200).json({
            message: 'Student Updated Successfully',
            data: student
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};



exports.deleteStudent = async (req, res) => {
    try {
        const id = req.params.id;

        const student = await Student.findByPk(id);

        if (!student) {
            return res.status(404).json({
                message: 'Student not found'
            });
        }

        const images = [
            student.profileImage,
            student.passportImage,
            student.identityCardImage
        ].concat(student.galleryImages || []);

        images.forEach((image) => {
            if (image && fs.existsSync(image)) {
                fs.unlinkSync(image);
            }
        });

        await student.destroy();

        res.status(200).json({
            message: 'Student Deleted Successfully',
            data: student
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};