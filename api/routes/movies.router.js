const express = require('express')
const router = express.Router()
const multer = require('multer')

const upload = multer({ dest: 'uploads/' })

const { getMovies, getMovie } = require('../controllers/getMovies')
const addMovie = require('../controllers/addMovie')
const editMovie = require('../controllers/editMovie')
const deleteMovie = require('../controllers/deleteMovie')
const uploadCSV = require('../controllers/uploadFile')

router.get('/', getMovies)
router.get('/:id', getMovie)
router.post('/', addMovie)
router.put('/:id', editMovie)
router.delete('/:id', deleteMovie)
router.post('/upload', upload.single('file'), uploadCSV)

module.exports = router