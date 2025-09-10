import Lead from '../model/leadModel.js';

// CREATE Lead
export const createLead = async (req, res) => {
  try {
    console.log('req.body:', req.body);
    console.log('req.file:', req.file);

    const { company, email, phone, tags, status, employee } = req.body;

    // Parse tags if sent as JSON string from frontend
    const parsedTags = tags ? JSON.parse(tags) : [];

    if (!company || !email || !phone || !employee) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if lead already exists
    const existingLead = await Lead.findOne({ email });
    if (existingLead) {
      return res.status(400).json({ error: 'Email already exists for a lead' });
    }

    const newLead = new Lead({
      company,
      email,
      phone,
      image: req.file ? req.file.filename : null, // multer handles file
      tags: parsedTags,
      status,
      employee,
    });

    await newLead.save();

    res
      .status(201)
      .json({ message: 'Lead created successfully', lead: newLead });
  } catch (error) {
    console.error('Create Lead Error:', error);
    res.status(500).json({ error: 'Server error while creating lead' });
  }
};

// GET ALL Leads
export const getLeads = async (req, res) => {
  try {
    const leads = await Lead.find();
    res.status(200).json(leads);
  } catch (error) {
    console.error('Get Leads Error:', error.message);
    res.status(500).json({ error: 'Server error while fetching leads' });
  }
};

// UPDATE Lead
export const updateLead = async (req, res) => {
  try {
    const updateData = { ...req.body };

    // Parse tags if included
    if (updateData.tags && typeof updateData.tags === 'string') {
      updateData.tags = JSON.parse(updateData.tags);
    }

    if (req.file) updateData.image = req.file.filename;

    const updatedLead = await Lead.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedLead) return res.status(404).json({ error: 'Lead not found' });

    res
      .status(200)
      .json({ message: 'Lead updated successfully', lead: updatedLead });
  } catch (error) {
    console.error('Update Lead Error:', error.message);
    res.status(500).json({ error: 'Server error while updating lead' });
  }
};

// DELETE Lead
export const deleteLead = async (req, res) => {
  try {
    const deletedLead = await Lead.findByIdAndDelete(req.params.id);
    if (!deletedLead) return res.status(404).json({ error: 'Lead not found' });

    res.status(200).json({ message: 'Lead deleted successfully' });
  } catch (error) {
    console.error('Delete Lead Error:', error.message);
    res.status(500).json({ error: 'Server error while deleting lead' });
  }
};

//count of leads
export const countLeads = async (req, res) => {
  try {
    const count = await Lead.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leads count' });
  }
};
