import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BookingForm() {
  const [fields, setFields] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedField, setSelectedField] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [userId, setUserId] = useState(1); // Giả lập userId, cần xác thực thực tế

  useEffect(() => {
    axios.get('http://localhost:8080/api/fields').then(response => setFields(response.data));
    axios.get('http://localhost:8080/api/timeslots').then(response => setTimeSlots(response.data));
  }, []);

  const handleBook = async () => {
    if (!selectedField || !selectedTimeSlot) return;
    const booking = {
      user: { id: userId },
      sportsField: selectedField,
      timeSlot: selectedTimeSlot,
      totalPrice: selectedField.pricePerHour
    };
    try {
      await axios.post('http://localhost:8080/api/book', booking);
      alert('Đặt sân thành công!');
    } catch (error) {
      alert('Đặt sân thất bại!');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Đặt Sân</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Chọn Sân</label>
        <select
          className="w-full p-2 border rounded"
          onChange={(e) => setSelectedField(fields.find(f => f.id === parseInt(e.target.value)))}
        >
          <option value="">Chọn sân</option>
          {fields.map(field => (
            <option key={field.id} value={field.id}>{field.name}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Chọn Giờ</label>
        <select
          className="w-full p-2 border rounded"
          onChange={(e) => setSelectedTimeSlot(timeSlots.find(ts => ts.id === parseInt(e.target.value)))}
        >
          <option value="">Chọn giờ</option>
          {timeSlots.filter(ts => ts.available).map(ts => (
            <option key={ts.id} value={ts.id}>{ts.startTime} - {ts.endTime}</option>
          ))}
        </select>
      </div>
      <button onClick={handleBook} className="w-full bg-orange-500 text-white p-2 rounded hover:bg-orange-600">Xác Nhận Đặt</button>
    </div>
  );
}

export default BookingForm;