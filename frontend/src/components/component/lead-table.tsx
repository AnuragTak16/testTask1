'use client';

import { useState } from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { AddLeadModal } from './add-lead';
import { EditLeadModal } from './edit-lead';
import { DeleteConfirmModal } from './delete-confirmation';

interface Lead {
  id: number;
  serNo: number;
  company: string;
  email: string;
  phone: string;
  tags: string[];
  status: string;
  employee: string;
}

const leadsData: Lead[] = [
  {
    id: 1,
    serNo: 1,
    company: 'John LCC',
    email: 'abc123@gmail.com',
    phone: '+15177320919',
    tags: ['Follow up', 'Tomorrow'],
    status: 'Contacted',
    employee: 'Facebook',
  },
  // Repeat for demonstration
  ...Array(7)
    .fill(null)
    .map((_, i) => ({
      id: i + 2,
      serNo: i + 2,
      company: 'John LCC',
      email: 'abc123@gmail.com',
      phone: '+15177320919',
      tags: ['Follow up', 'Tomorrow'],
      status: 'Contacted',
      employee: 'Facebook',
    })),
];

export function LeadsContent() {
  const [leads, setLeads] = useState<Lead[]>(leadsData);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const handleAddLead = (leadData: Omit<Lead, 'id' | 'serNo'>) => {
    const newLead: Lead = {
      ...leadData,
      id: leads.length ? Math.max(...leads.map((l) => l.id)) + 1 : 1,
      serNo: leads.length + 1, // ✅ assign correct serial number
    };
    setLeads([...leads, newLead]);
    setShowAddModal(false);
  };

  const handleEditLead = (leadData: Omit<Lead, 'id' | 'serNo'>) => {
    if (selectedLead) {
      setLeads(
        leads.map((lead) =>
          lead.id === selectedLead.id
            ? { ...leadData, id: selectedLead.id, serNo: selectedLead.serNo }
            : lead
        )
      );
      setShowEditModal(false);
      setSelectedLead(null);
    }
  };

  const handleDeleteLead = () => {
    if (selectedLead) {
      setLeads(leads.filter((lead) => lead.id !== selectedLead.id));
      setShowDeleteModal(false);
      setSelectedLead(null);
    }
  };

  const handleStatusChange = (id: number, newStatus: string) => {
    setLeads(
      leads.map((lead) =>
        lead.id === id ? { ...lead, status: newStatus } : lead
      )
    );
  };

  const openEditModal = (lead: Lead) => {
    setSelectedLead(lead);
    setShowEditModal(true);
  };

  const openDeleteModal = (lead: Lead) => {
    setSelectedLead(lead);
    setShowDeleteModal(true);
  };

  return (
    <div className='h-full flex flex-col bg-white rounded-lg border border-gray-200 shadow-sm'>
      {/* Page Header */}
      <div className='flex items-center justify-between p-6 border-b border-gray-200'>
        <h1 className='text-3xl font-bold text-gray-900'>Leads</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium'
        >
          + New Lead
        </button>
      </div>

      {/* Leads Table */}
      <div className='flex-1 p-6 overflow-auto'>
        <div className='bg-white rounded-lg border border-gray-200'>
          <table className='w-full'>
            <thead className='bg-gray-50 border-b border-gray-200'>
              <tr>
                <th className='px-4 py-3 text-left'>
                  <input type='checkbox' className='rounded border-gray-300' />
                </th>
                <th className='px-4 py-3 text-left text-sm font-medium text-gray-900'>
                  Ser no
                </th>
                <th className='px-4 py-3 text-left text-sm font-medium text-gray-900'>
                  Company
                </th>
                <th className='px-4 py-3 text-left text-sm font-medium text-gray-900'>
                  Email
                </th>
                <th className='px-4 py-3 text-left text-sm font-medium text-gray-900'>
                  Phone
                </th>
                <th className='px-4 py-3 text-left text-sm font-medium text-gray-900'>
                  Tags
                </th>
                <th className='px-4 py-3 text-left text-sm font-medium text-gray-900'>
                  Image
                </th>
                <th className='px-4 py-3 text-left text-sm font-medium text-gray-900'>
                  Status
                </th>
                <th className='px-4 py-3 text-left text-sm font-medium text-gray-900'>
                  Employee
                </th>
                <th className='px-4 py-3 text-left text-sm font-medium text-gray-900'>
                  Action
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200'>
              {leads.map((lead) => (
                <tr key={lead.id} className='hover:bg-gray-50'>
                  <td className='px-4 py-4'>
                    <input
                      type='checkbox'
                      className='rounded border-gray-300'
                    />
                  </td>
                  <td className='px-4 py-4 text-sm text-gray-900'>
                    {lead.serNo}
                  </td>
                  <td className='px-4 py-4'>
                    <span className='text-sm text-red-500 font-medium'>
                      {lead.company}
                    </span>
                  </td>
                  <td className='px-4 py-4 text-sm text-gray-900'>
                    {lead.email}
                  </td>
                  <td className='px-4 py-4 text-sm text-gray-900'>
                    {lead.phone}
                  </td>
                  <td className='px-4 py-4'>
                    <div className='flex flex-wrap gap-1'>
                      {lead.tags.map((tag, index) => (
                        <span
                          key={index}
                          className={`px-2 py-1 text-xs rounded-full border ${
                            index === 0
                              ? 'border-blue-200 text-blue-700 bg-blue-50'
                              : 'border-red-200 text-red-700 bg-red-50'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className='px-4 py-4'>
                    <div className='w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center'>
                      <span className='text-xs font-medium text-gray-600'>
                        JL
                      </span>
                    </div>
                  </td>
                  <td className='px-4 py-4'>
                    <select
                      value={lead.status} // ✅ controlled value
                      onChange={(e) =>
                        handleStatusChange(lead.id, e.target.value)
                      }
                      className='w-32 px-2 py-1 border border-red-200 text-red-700 rounded text-sm'
                    >
                      <option value='Contacted'>Contacted</option>
                      <option value='Pending'>Pending</option>
                      <option value='Qualified'>Qualified</option>
                    </select>
                  </td>
                  <td className='px-4 py-4 text-sm text-gray-900'>
                    {lead.employee}
                  </td>
                  <td className='px-4 py-4'>
                    <div className='flex items-center gap-2'>
                      <button
                        onClick={() => openEditModal(lead)}
                        className='p-1 hover:bg-gray-100 rounded'
                      >
                        <Edit className='h-4 w-4 text-gray-500' />
                      </button>
                      <button
                        onClick={() => openDeleteModal(lead)}
                        className='p-1 hover:bg-gray-100 rounded'
                      >
                        <Trash2 className='h-4 w-4 text-red-500' />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
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
          onClose={() => {
            setShowEditModal(false);
            setSelectedLead(null);
          }}
          onSubmit={handleEditLead}
        />
      )}

      {showDeleteModal && selectedLead && (
        <DeleteConfirmModal
          open={showDeleteModal}
          itemName={selectedLead.company}
          itemType='lead'
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedLead(null);
          }}
          onConfirm={handleDeleteLead}
        />
      )}
    </div>
  );
}
