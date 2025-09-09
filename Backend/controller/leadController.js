import Lead from '../model/leadModel';

// CREATE Lead
const createLead = async (req, res) => {
  try {
    const { company, email, phone, tag, status, employee } = req.body;
    const image = req.file ? req.file.filename : null;

    const existingLead = await Lead.findOne({ email });
    if (existingLead) {
      return res.status(400).json({ error: 'Email already exists for a lead' });
    }

    const newLead = new Lead({
      company,
      email,
      phone,
      image,
      tag,
      status,
      employee,
    });
    await newLead.save();
    res
      .status(201)
      .json({ message: 'Lead created successfully', lead: newLead });
  } catch (error) {
    console.error('Create Lead Error:', error.message);
    res.status(500).json({ error: 'Server error while creating lead' });
  }
};

// GET ALL Leads
const getLeads = async (req, res) => {
  try {
    const leads = await Lead.find();
    res.status(200).json(leads);
  } catch (error) {
    console.error('Get Leads Error:', error.message);
    res.status(500).json({ error: 'Server error while fetching leads' });
  }
};

// UPDATE Lead
const updateLead = async (req, res) => {
  try {
    const updateData = { ...req.body };
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
const deleteLead = async (req, res) => {
  try {
    const deletedLead = await Lead.findByIdAndDelete(req.params.id);
    if (!deletedLead) return res.status(404).json({ error: 'Lead not found' });
    res.status(200).json({ message: 'Lead deleted successfully' });
  } catch (error) {
    console.error('Delete Lead Error:', error.message);
    res.status(500).json({ error: 'Server error while deleting lead' });
  }
};

exports = { createLead, getLeads, updateLead, deleteLead };
