const express = require('express');
const router = express.Router();
const protect = require('../middlewares/auth');
const {
  createPublicEnquiry,
  getPublicEnquiries,
  getPrivateEnquiries,
  claimLead,
} = require('../controllers/enquiryController');

// Public route
router.post('/public', createPublicEnquiry);

// Protected routes
router.get('/public', protect, getPublicEnquiries);
router.get('/private', protect, getPrivateEnquiries);
router.patch('/:id/claim', protect, claimLead);

module.exports = router;
