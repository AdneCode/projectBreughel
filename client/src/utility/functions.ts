import axios from 'axios';
import { apiUrl } from '../config/constants';
import { Painting, Paintings, Filter } from '../../../types/types';
import { ServerData } from './dataTypes';

export const filterPaintings = (
    paintingsArray: Paintings,
    filterArray: Filter[],
) => {
    if (filterArray.length === 0) return paintingsArray;
    const remainingArray = paintingsArray.filter((painting: Painting) => {
        const stringArray = filterArray.map((filter: Filter) => {
            return filter.name;
        });
        if (!painting.filters) return;
        const paintingFilters = painting.filters.map((i: Filter) => {
            return i.name;
        });
        const filterCheckArray = stringArray.map((i: string) => {
            if (paintingFilters.includes(i)) return true;
            return false;
        });
        if (filterCheckArray.includes(false)) return false;
        return true;
    });
    return remainingArray;
};

export const getFilters = async () => {
    try {
        const { data } = await axios.get<ServerData>(
            `${apiUrl}/paintings/getFilters`,
        );
        if (!data) return;
        return data;
    } catch (error) {}
};

export const getAllPaintings = async (token: string) => {
    try {
        const { data } = await axios.get<ServerData>(
            `${apiUrl}/admin/getAllPaintings`,
            { headers: { Authorization: `Bearer ${token}` } },
        );
        if (!data) return;
        return data;
    } catch (error) {}
};

export const addPainting = async (token: string, painting: Painting) => {
    try {
        const { data, status } = await axios.post<ServerData>(
            `${apiUrl}/admin/postPainting`,
            {
                data: { painting },
            },
            { headers: { Authorization: `Bearer ${token}` } },
        );
    } catch (error) {
        console.log(error);
    }
};

export const addFilter = async (token: string, filter: string) => {
    try {
        const { data, status } = await axios.post<ServerData>(
            `${apiUrl}/admin/postFilter`,
            {
                data: { filter },
            },
            { headers: { Authorization: `Bearer ${token}` } },
        );
    } catch (error) {
        console.log(error);
    }
};

export const editFilter = async (token: string, filter: Filter) => {
    try {
        const { data, status } = await axios.patch<ServerData>(
            `${apiUrl}/admin/editFilter`,
            {
                data: { newFilterName: filter.name, filterId: filter.id },
            },
            { headers: { Authorization: `Bearer ${token}` } },
        );
        console.log(data);
    } catch (error) {}
};

export const changeApproved = async (id: number, token: string | null) => {
    try {
        if (!token) return
        await axios.post<ServerData>(`${apiUrl}/admin/changeApprovedStatus`, {
            data: { paintingId: id },            
        },
        { headers: { Authorization: `Bearer ${token}` } },);
    } catch (error) {}
};

export const deleteFilter = async (filter: Filter, token: string) => {
    try {
        await axios.delete<ServerData>(`${apiUrl}/admin/deletePainting`, {
            data: { filterId: filter.id },
            headers: { Authorization: `Bearer ${token}` },
        });
    } catch (error) {}
};
