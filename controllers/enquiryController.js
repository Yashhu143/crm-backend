const { Enquiry } = require('../models');

// Public submission (no auth)
exports.createPublicEnquiry = async (req, res) => {
  try {
    const { name, email, courseInterest } = req.body;
    if (!name || !email)
      return res.status(400).json({ message: 'Name and Email are required' });

    const enquiry = await Enquiry.create({ name, email, courseInterest });
    res.status(201).json({ message: 'Enquiry submitted successfully', enquiry });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Fetch unclaimed enquiries (auth)
exports.getPublicEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.findAll({ where: { claimed: false } });
    res.json(enquiries);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Fetch claimed (private) enquiries (auth)
exports.getPrivateEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.findAll({ where: { counselorId: req.user } });
    res.json(enquiries);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Claim a lead
exports.claimLead = async (req, res) => {
  try {
    const enquiry = await Enquiry.findByPk(req.params.id);
    if (!enquiry) return res.status(404).json({ message: 'Enquiry not found' });

    if (enquiry.claimed)
      return res.status(409).json({ message: 'This lead has already been claimed' });

    enquiry.claimed = true;
    enquiry.counselorId = req.user;
    await enquiry.save();

    res.json({ message: 'Lead claimed successfully', enquiry });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
