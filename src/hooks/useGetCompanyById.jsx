import { setSingleCompany } from '@/redux/companySlice'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

// ✅ Custom hook to fetch a single company by its ID
const useGetCompanyById = (companyId) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchSingleCompany = async () => {
            try {
                // API call to fetch company details
                const res = await axios.get(
                    `${COMPANY_API_END_POINT}/get/${companyId}`,
                    { withCredentials: true }
                );
                
                console.log(res.data.company); // debug log

                // Dispatch data to Redux store if API succeeds
                if (res.data.success) {
                    dispatch(setSingleCompany(res.data.company));
                }
            } catch (error) {
                console.error("Error fetching company:", error);
            }
        };

        if (companyId) fetchSingleCompany(); // fetch only if companyId exists
    }, [companyId, dispatch]);
};

export default useGetCompanyById;
