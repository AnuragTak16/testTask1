'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Edit, Trash2 } from 'lucide-react';
import { AddLeadModal } from './add-lead';
import { EditLeadModal } from './edit-lead';
import { DeleteConfirmModal } from './delete-confirmation';

interface Lead {
  _id: string;
  serNo: number;
  company: string;
  email: string;
  phone: string;
  tags: string[];
  status: string;
  employee: string;
  image?: string;
}

export function LeadsContent() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  useEffect(() => {
    const fetchLeads = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('http://localhost:3000/api/allleads');
        setLeads(response.data);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          alert(
            `Failed to fetch leads: ${
              error.response?.data?.message || error.message
            }`
          );
        } else if (error instanceof Error) {
          alert(`Failed to fetch leads: ${error.message}`);
        } else {
          alert('An unknown error occurred while fetching leads.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  const handleAddLead = (leadData: Omit<Lead, '_id' | 'serNo'>) => {
    const newLead: Lead = {
      ...leadData,
      _id: (Math.random() * 1000000).toString(),
      serNo: leads.length + 1,
    };
    setLeads([...leads, newLead]);
    setShowAddModal(false);
  };

  const handleEditLead = (leadData: Omit<Lead, '_id'>) => {
    if (selectedLead) {
      setLeads(
        leads.map((l) =>
          l._id === selectedLead._id
            ? { ...leadData, _id: selectedLead._id }
            : l
        )
      );
      setShowEditModal(false);
      setSelectedLead(null);
    }
  };

  const handleDeleteLead = async () => {
    if (selectedLead) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(
          `http://localhost:3000/api/deletelead/${selectedLead._id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setLeads((prev) => prev.filter((l) => l._id !== selectedLead._id));
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          alert(error.response?.data?.message || 'Failed to delete lead');
        } else if (error instanceof Error) {
          alert(error.message || 'Failed to delete lead');
        } else {
          alert('Failed to delete lead');
        }
      } finally {
        setShowDeleteModal(false);
        setSelectedLead(null);
      }
    }
  };

  const openEditModal = (lead: Lead) => {
    setSelectedLead(lead);
    setShowEditModal(true);
  };

  const openDeleteModal = (lead: Lead) => {
    setSelectedLead(lead);
    setShowDeleteModal(true);
  };

  if (loading) return <p className='p-6 text-gray-500'>Loading leads...</p>;
  if (error) return <p className='p-6 text-red-500'>{error}</p>;

  return (
    <div className='h-full flex flex-col bg-white rounded-lg border border-gray-200 shadow-sm'>
      <div className='flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-red-50 to-red-100'>
        <h1 className='text-3xl font-bold text-gray-900'>Leads</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className='bg-red-500 hover:bg-red-600 text-white px-6 py-2.5 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200'
        >
          + Add Lead
        </button>
      </div>

      <div className='flex-1 p-6 overflow-x-auto'>
        <table className='w-full'>
          <thead className='bg-gray-50 border-b border-gray-200'>
            <tr>
              <th className='px-6 py-4 text-left'>Ser No</th>
              <th className='px-6 py-4 text-left'>Company</th>
              <th className='px-6 py-4 text-left'>Email</th>
              <th className='px-6 py-4 text-left'>Phone</th>
              <th className='px-6 py-4 text-left'>Tags</th>
              <th className='px-6 py-4 text-left'>Status</th>
              <th className='px-6 py-4 text-left'>Employee</th>
              <th className='px-6 py-4 text-left'>Image</th>
              <th className='px-6 py-4 text-left'>Action</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-100'>
            {leads.map((lead, index) => (
              <tr key={lead._id} className='hover:bg-gray-50'>
                <td className='px-6 py-4'>{index + 1}</td>
                <td className='px-6 py-4 text-red-600 font-semibold'>
                  {lead.company}
                </td>
                <td className='px-6 py-4'>{lead.email}</td>
                <td className='px-6 py-4'>{lead.phone}</td>
                <td className='px-6 py-4'>{lead.tags?.join(', ')}</td>
                <td className='px-6 py-4'>{lead.status}</td>
                <td className='px-6 py-4'>{lead.employee}</td>
                <td className='px-6 py-4'>
                  {lead.image && (
                    <img
                      src={`http://localhost:3000/uploads/${lead.image}`}
                      alt='Lead'
                      className='w-12 h-12 object-cover rounded-md'
                    />
                  )}
                </td>
                <td className='px-6 py-4 flex gap-2'>
                  <button
                    onClick={() => openEditModal(lead)}
                    className='p-2 hover:bg-blue-50 rounded-lg'
                  >
                    <Edit className='h-4 w-4 text-blue-700' />
                  </button>
                  <button
                    onClick={() => openDeleteModal(lead)}
                    className='p-2 hover:bg-red-50 rounded-lg'
                  >
                    <Trash2 className='h-4 w-4 text-red-500' />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Modals */}
      {showAddModal && (
        <AddLeadModal
          open={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddLead}
        />
      )}
      {showEditModal && selectedLead && (
        <EditLeadModal
          open={showEditModal}
          lead={selectedLead}
          onClose={() => setShowEditModal(false)}
          onSubmit={handleEditLead}
        />
      )}
      {showDeleteModal && selectedLead && (
        <DeleteConfirmModal
          open={showDeleteModal}
          itemName={selectedLead.company}
          itemType='lead'
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDeleteLead}
        />
      )}
    </div>
  );
}
