import { useState, useEffect } from 'react';
import axios from 'axios';
import { Edit, Trash2, Plus } from 'lucide-react';
import { AddEmployeeModal } from './add-employee';
import { EditEmployeeModal } from './edit-employee';
import { DeleteConfirmModal } from '../delete-confirmation';

interface Employee {
  _id: string;
  company: string;
  email: string;
  phone: string;
  position: string;
  numberOfLeads: number;
  status: string;
}

export function EmployeeContent() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          'http://localhost:3000/api/allemployees',
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setEmployees(response.data);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          setError(error.response?.data?.message || error.message);
        } else if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred while fetching employees.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleAddEmployee = (employeeData: Omit<Employee, '_id'>) => {
    const newEmployee = {
      ...employeeData,
      _id: crypto.randomUUID(),
    };
    setEmployees([...employees, newEmployee]);
    setShowAddModal(false);
  };

  const handleEditEmployee = (employeeData: Omit<Employee, '_id'>) => {
    if (selectedEmployee) {
      setEmployees(
        employees.map((emp) =>
          emp._id === selectedEmployee._id
            ? { ...employeeData, _id: selectedEmployee._id }
            : emp
        )
      );
      setShowEditModal(false);
      setSelectedEmployee(null);
    }
  };

  const handleDeleteEmployee = async () => {
    if (selectedEmployee) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(
          `http://localhost:3000/api/deleteemployee/${selectedEmployee._id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setEmployees((prev) =>
          prev.filter((emp) => emp._id !== selectedEmployee._id)
        );
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          alert(error.response?.data?.error || error.message);
        } else if (error instanceof Error) {
          alert(error.message);
        } else {
          alert('An unknown error occurred while deleting employee.');
        }
      } finally {
        setShowDeleteModal(false);
        setSelectedEmployee(null);
      }
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

  if (loading) return <p className='p-6 text-gray-500'>Loading employees...</p>;
  if (error) return <p className='p-6 text-red-500'>{error}</p>;

  return (
    <div className='h-full flex flex-col bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden'>
      <div className='flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-red-50 to-red-100'>
        <h1 className='text-3xl font-bold text-gray-900'>Employee List</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className='flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-2.5 rounded-lg font-medium shadow-md hover:shadow-xl transition-all duration-200'
        >
          <Plus className='w-4 h-4' />
          Add Employee
        </button>
      </div>

      <div className='flex-1 p-6 overflow-x-auto'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='px-6 py-3 text-left'>
                <input
                  type='checkbox'
                  className='rounded border-gray-300 text-red-500 focus:ring-red-500'
                />
              </th>
              <th className='px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider'>
                Ser No
              </th>
              <th className='px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider'>
                Company
              </th>
              <th className='px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider'>
                Email
              </th>
              <th className='px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider'>
                Phone
              </th>
              <th className='px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider'>
                Position
              </th>
              <th className='px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider'>
                Leads
              </th>
              <th className='px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider'>
                Status
              </th>
              <th className='px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider'>
                Action
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-100'>
            {employees.map((employee, index) => (
              <tr
                key={employee._id}
                className={`${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                } hover:bg-red-50 transition-colors duration-200`}
              >
                <td className='px-6 py-4'>
                  <input
                    type='checkbox'
                    className='rounded border-gray-300 text-red-500 focus:ring-red-500'
                  />
                </td>
                <td className='px-6 py-4 text-sm font-medium text-gray-900'>
                  {index + 1} {/* Dynamic serial number */}
                </td>
                <td className='px-6 py-4'>
                  <span className='text-sm font-semibold text-red-600'>
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
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      employee.status.toLowerCase() === 'active'
                        ? 'bg-green-100 text-green-700'
                        : employee.status.toLowerCase() === 'inactive'
                        ? 'bg-gray-200 text-gray-800'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {employee.status}
                  </span>
                </td>
                <td className='px-6 py-4'>
                  <div className='flex items-center gap-3'>
                    <button
                      onClick={() => openEditModal(employee)}
                      className='p-2 hover:bg-blue-50 rounded-lg transition-colors duration-200 group'
                    >
                      <Edit className='h-5 w-5 text-blue-500 group-hover:text-blue-600' />
                    </button>
                    <button
                      onClick={() => openDeleteModal(employee)}
                      className='p-2 hover:bg-red-50 rounded-lg transition-colors duration-200 group'
                    >
                      <Trash2 className='h-5 w-5 text-red-500 group-hover:text-red-600' />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
          employee={{
            ...selectedEmployee,
            serNo:
              employees.findIndex((emp) => emp._id === selectedEmployee._id) +
              1,
          }}
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
