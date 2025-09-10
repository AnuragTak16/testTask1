import Lead from '../model/leadModel.js';
import Employee from '../model/employeeModel.js';

export const searchLeadsAndEmployees = async (req, res) => {
  const query = req.query.q;

  if (!query)
    return res.status(400).json({ error: 'Query parameter is required' });

  try {
    const leads = await Lead.find({
      name: { $regex: query, $options: 'i' },
    }).limit(10);
    const employees = await Employee.find({
      name: { $regex: query, $options: 'i' },
    }).limit(10);

    res.json({ leads, employees });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Search failed' });
  }
};
