import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit2, Trash2, MoreHorizontal } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '../../utils/constant';
import { toast } from 'sonner';
import { setCompanies } from '../../redux/companySlice';

const CompaniesTable = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(companies);

    // Track the company user wants to delete
    const [deleteId, setDeleteId] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);

    // Filter companies based on search text
    useEffect(() => {
        const filtered = companies.filter(company => {
            if (!searchCompanyByText) return true;
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
        });
        setFilterCompany(filtered);
    }, [companies, searchCompanyByText]);

    // Handle delete
    const handleDelete = async (id) => {
        try {
            await axios.delete(`${COMPANY_API_END_POINT}/delete/${id}`, { withCredentials: true });
            // Update redux state immediately
            const updatedCompanies = companies.filter(c => c._id !== id);
            dispatch(setCompanies(updatedCompanies));
            toast.success("Company deleted successfully!");
        } catch (error) {
            console.log(error);
            toast.error("Failed to delete company");
        } finally {
            setShowConfirm(false);
            setDeleteId(null);
        }
    };

    return (
        <div>
            <Table>
                <TableCaption>A list of your recent registered companies</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filterCompany?.map((company) => (
                        <TableRow key={company._id}>
                            <TableCell>
                                <Avatar>
                                    <AvatarImage src={company.logo} alt={company.name} />
                                </Avatar>
                            </TableCell>
                            <TableCell>{company.name}</TableCell>
                            <TableCell>{company.createdAt.split("T")[0]}</TableCell>
                            <TableCell className="text-right cursor-pointer">
                                <Popover>
                                    <PopoverTrigger>
                                        <MoreHorizontal />
                                    </PopoverTrigger>
                                    <PopoverContent className="w-36 flex flex-col gap-2">
                                        <div
                                            onClick={() => navigate(`/admin/companies/${company._id}`)}
                                            className="flex items-center gap-2 w-fit cursor-pointer"
                                        >
                                            <Edit2 className="w-4" />
                                            <span>Edit</span>
                                        </div>

                                        <div
                                            onClick={() => { setDeleteId(company._id); setShowConfirm(true); }}
                                            className="flex items-center gap-2 w-fit cursor-pointer text-red-600 mt-2"
                                        >
                                            <Trash2 className="w-4" />
                                            <span>Delete</span>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* ✅ Confirmation Modal */}
            {showConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
                        <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
                        <p>Are you sure you want to delete this company? This action cannot be undone.</p>
                        <div className="flex justify-center gap-4 mt-6">
                            <button
                                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                                onClick={() => { setShowConfirm(false); setDeleteId(null); }}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                onClick={() => handleDelete(deleteId)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CompaniesTable;
