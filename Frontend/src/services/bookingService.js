import { BACKEND_URL } from "./constants";
import { BACKEND_PORT } from "./constants";

export const bookBooking = async (booking, user) => {
    const {droneId, source, destination, chargePerHour: charges} = booking;
    let date = new Date();
    date = date.getUTCFullYear() + '-' +
    ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
    ('00' + date.getUTCDate()).slice(-2) + ' ';
    const payload = {
        droneId, 
        source,
        destination, 
        charges,
        status: 'In-Progress',
        customerId: user.userId,
        bookingDate: date,
    }
    console.log(payload);
    const options = {
        method: 'POST',
        headers:  {'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    };
    const response = await fetch(`${BACKEND_URL}:${BACKEND_PORT}/booking/addBooking`, options);
    const status = response.status;
    const data = await response.json();
    return {status, data};
}

export const fechInProgressBookings = async (userId, persona) => {
    const options = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
    }
    const response = await fetch(`${BACKEND_URL}:${BACKEND_PORT}/booking/inProgress?userId=${userId}&persona=${persona}`, options);
    const status = response.status;
    const data  = await response.json();
    return {status, data};
}

export const fetchBookingListFromDB = async (customerId, persona) => {
    const options = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
    }

    const response = await fetch(`${BACKEND_URL}:${BACKEND_PORT}/booking/userBookings?userId=${customerId}&persona=${persona}`, options);
    const status = response.status;
    const data  = await response.json();
    console.log('Booking Service', data);
    return {status, data};
}

export const deleteBooking = async (bookingId, persona) => {
    const options = {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
    }

    const response = await fetch(`${BACKEND_URL}:${BACKEND_PORT}/booking/userBookings?bookingId=${bookingId}&persona=${persona}`, options);
    console.log(response)
    const status = response.status;
    console.log("Status", status)
    // const data  = await response.json();
    console.log('Deleting Booking Service for ', bookingId);
    return status;
}
