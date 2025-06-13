import React from 'react';
import { MdAddHomeWork } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";



const ContactUs = () => {
  return (
    <div className="bg-gray-50">
      <div
        className="relative h-64 flex items-center justify-center text-white"
        style={{
          backgroundImage: 'url(https://i.pinimg.com/originals/2a/13/45/2a1345830a2d7db29cf316a5966c6172.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <h1 className="relative text-4xl font-bold z-10">Liên hệ với chúng tôi</h1>
      </div>

      <div className="container mx-auto px-6 pt-16 ">
        <div className="flex flex-wrap mb-12">
          {/* Form */}
          <div className="w-full md:w-2/3 p-4">
            <h2 className="text-2xl font-semibold text-green-700 mb-4 text-center">Chúng tôi mong muốn lắng nghe ý kiến của quý khách</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              alert('Message sent successfully!');
            }}>
              <input
                type="text"
                placeholder="Họ và tên"
                className="p-3 mb-4 w-full border border-gray-300 rounded"
                required
              />
              <input
                type="email"
                placeholder="Email"
                className="p-3 mb-4 w-full border border-gray-300 rounded"
                required
              />
              <input
                type="text"
                placeholder="Số điện thoại"
                className="p-3 mb-4 w-full border border-gray-300 rounded"
                required
              />
              <textarea
                placeholder="Nội dung liên hệ"
                className="p-3 mb-4 w-full border border-gray-300 rounded"
                rows="4"
                required
              ></textarea>
                <button
                type="submit"
                className="bg-orange-500 text-white font-bold py-2 px-4 rounded hover:bg-orange-600 block mx-auto"
                >
                Gửi tin nhắn
                </button>
            </form>
          </div>

          <div className="w-full md:w-1/3 p-4 flex justify-center items-center">
            <div className="text-center md:text-left max-w-md">
              <h2 className="text-2xl font-semibold text-green-700 mb-4">Chi tiết liên lạc</h2>
              
              <p className="mb-2 flex items-center gap-2">
                <MdAddHomeWork className="text-xl text-gray-700" />
                VietNam
              </p>
              <p className="mb-2 flex items-center gap-2">
                <FaPhone className="text-xl text-gray-700" />
                0998765432
              </p>
              <p className="mb-2 flex items-center gap-2">
                <IoIosMail className="text-xl text-gray-700" />
                admin@gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>
              {/* Google Map */}
        <div className="map-container w-screen pt-0 pb-10">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3725.74853797683!2d105.7486864!3d20.962611199999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1749843858930!5m2!1svi!2s"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
    </div>
  );
};

export default ContactUs;


