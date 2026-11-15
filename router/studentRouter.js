const router = require('express').Router();
const { createStudent, addGalleryImages, addStudentImages, getAllStudent, getOneStudent, updateStudent, deleteStudent } = require('../controller/studentController');
const uploads = require('../middlewares/multer');

const {
    studentValidation,
    validateStudent,
    updateStudentValidation
} = require('../middlewares/studentValidation');

router.post('/newStudent', uploads.single('profileImage'), studentValidation, validateStudent, createStudent);

router.post('/student/:id', uploads.array('galleryImages', 5), addGalleryImages);

router.post('/student/:id', uploads.fields([
 { name: 'passportImage', maxCount: 1 },
 { name: 'identityCardImage', maxCount: 1 },
 { name: 'profileImage', maxCount: 1 },
 { name: 'galleryImages', maxCount: 5 }
]), addStudentImages);

router.get('/allStudent',  getAllStudent);

router.get('/oneStudent/:id',  getOneStudent);

router.put('/student/:id', uploads.fields([
  { name: 'passportImage', maxCount: 1 },
  { name: 'identityCardImage', maxCount: 1 },
  { name: 'profileImage', maxCount: 1 },
  { name: 'galleryImages', maxCount: 5 }
]), updateStudentValidation, validateStudent, updateStudent);

router.delete('/student/:id',  deleteStudent);

module.exports = router;