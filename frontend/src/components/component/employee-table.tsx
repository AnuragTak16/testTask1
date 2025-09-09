'use client';

import { useState } from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { AddEmployeeModal } from './add-employee';
import { EditEmployeeModal } from './edit-employee';
import { DeleteConfirmModal } from './delete-confirmation';

interface Employee {
  id: number;
  serNo: number;
  company: string;
  email: string;
  phone: string;
  position: string;
  numberOfLeads: number;
  status: string;
}

const employeeData: Employee[] = [
  {
    id: 1,
    serNo: 1,
    company: 'John LCC',
    email: 'abc123@gmail.com',
    phone: '+15177320919',
    position: '0',
    numberOfLeads: 50,
    status: 'Active',
  },
  // Repeat for demonstration
  ...Array(8)
    .fill(null)
    .map((_, i) => ({
      id: i + 2,
      serNo: 1,
      company: 'John LCC',
      email: 'abc123@gmail.com',
      phone: '+15177320919',
      position: '0',
      numberOfLeads: 50,
      status: 'Active',
    })),
];

export function EmployeeContent() {
  const [employees, setEmployees] = useState<Employee[]>(employeeData);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );

  const handleAddEmployee = (employeeData: Omit<Employee, 'id'>) => {
    const newEmployee = {
      ...employeeData,
      id: Math.max(...employees.map((e) => e.id)) + 1,
    };
    setEmployees([...employees, newEmployee]);
    setShowAddModal(false);
  };

  const handleEditEmployee = (employeeData: Omit<Employee, 'id'>) => {
    if (selectedEmployee) {
      setEmployees(
        employees.map((emp) =>
          emp.id === selectedEmployee.id
            ? { ...employeeData, id: selectedEmployee.id }
            : emp
        )
      );
      setShowEditModal(false);
      setSelectedEmployee(null);
    }
  };

  const handleDeleteEmployee = () => {
    if (selectedEmployee) {
      setEmployees(employees.filter((emp) => emp.id !== selectedEmployee.id));
      setShowDeleteModal(false);
      setSelectedEmployee(null);
    }
  };

  const openEditModal = (employee: Employee) => {
    setSelectedEmployee(employee);
    setShowEditModal(true);
  };

  const openDeleteModal = (employee: Employee) => {
    setSelectedEmployee(employee);
    setShowDeleteModal(true);
  };

  return (
    <div className='h-full flex flex-col bg-white rounded-lg border border-gray-200 shadow-sm'>
      {/* Page Header */}
      <div className='flex items-center justify-between p-6 border-b border-gray-200'>
        <h1 className='text-3xl font-bold text-gray-900'>Employee list</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className='bg-red-500 hover:bg-red-600 text-white px-6 py-2.5 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200'
        >
          + Add employee
        </button>
      </div>

      <div className='flex-1 p-6'>
        <div className='bg-white rounded-xl border border-gray-200 shadow-lg h-full'>
          <table className='w-full h-full'>
            <thead className='bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200'>
              <tr>
                <th className='px-6 py-4 text-left'>
                  <input
                    type='checkbox'
                    className='rounded border-gray-300 text-red-500 focus:ring-red-500'
                  />
                </th>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider'>
                  Ser no
                </th>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider'>
                  Company
                </th>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider'>
                  Email
                </th>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider'>
                  Phone
                </th>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider'>
                  Position
                </th>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider'>
                  Number of leads
                </th>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider'>
                  Status
                </th>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider'>
                  Action
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-100'>
              {employees.map((employee) => (
                <tr
                  key={employee.id}
                  className='hover:bg-gray-50 transition-colors duration-150'
                >
                  <td className='px-6 py-4'>
                    <input
                      type='checkbox'
                      className='rounded border-gray-300 text-red-500 focus:ring-red-500'
                    />
                  </td>
                  <td className='px-6 py-4 text-sm font-medium text-gray-900'>
                    {employee.serNo}
                  </td>
                  <td className='px-6 py-4'>
                    <span className='text-sm text-red-600 font-semibold'>
                      {employee.company}
                    </span>
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-700'>
                    {employee.email}
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-700'>
                    {employee.phone}
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-700'>
                    {employee.position}
                  </td>
                  <td className='px-6 py-4 text-sm font-medium text-gray-900'>
                    {employee.numberOfLeads}
                  </td>
                  <td className='px-6 py-4'>
                    <select
                      defaultValue={employee.status.toLowerCase()}
                      className='px-3 py-1.5 border-2 border-red-400 text-red-700 rounded-lg text-sm bg-white focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-200'
                    >
                      <option value='active'>Active</option>
                      <option value='inactive'>Inactive</option>
                      <option value='pending'>Pending</option>
                    </select>
                  </td>
                  <td className='px-6 py-4'>
                    <div className='flex items-center gap-3'>
                      <button
                        onClick={() => openEditModal(employee)}
                        className='p-2 hover:bg-blue-50 rounded-lg transition-colors duration-200 group'
                      >
                        <Edit className='h-4 w-4 text-gray-500 group-hover:text-blue-600' />
                      </button>
                      <button
                        onClick={() => openDeleteModal(employee)}
                        className='p-2 hover:bg-red-50 rounded-lg transition-colors duration-200 group'
                      >
                        <Trash2 className='h-4 w-4 text-gray-500 group-hover:text-red-600' />
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
        <AddEmployeeModal
          open={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddEmployee}
        />
      )}

      {showEditModal && selectedEmployee && (
        <EditEmployeeModal
          open={showEditModal}
          employee={selectedEmployee}
          onClose={() => {
            setShowEditModal(false);
            setSelectedEmployee(null);
          }}
          onSubmit={handleEditEmployee}
        />
      )}

      {showDeleteModal && selectedEmployee && (
        <DeleteConfirmModal
          open={showDeleteModal}
          itemName={selectedEmployee.company}
          itemType='employee'
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedEmployee(null);
          }}
          onConfirm={handleDeleteEmployee}
        />
      )}
    </div>
  );
}
