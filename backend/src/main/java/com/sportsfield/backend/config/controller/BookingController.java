package com.sportsfield.backend.config.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sportsfield.backend.entity.Booking;
import com.sportsfield.backend.entity.Rating;
import com.sportsfield.backend.entity.SportsField;
import com.sportsfield.backend.entity.TimeSlot;
import com.sportsfield.backend.repository.RatingRepository;
import com.sportsfield.backend.repository.SportsFieldRepository;
import com.sportsfield.backend.repository.TimeSlotRepository;
import com.sportsfield.backend.service.BookingService;

@RestController
@RequestMapping("/api")
public class BookingController {
    @Autowired
    private SportsFieldRepository sportsFieldRepository;
    @Autowired
    private RatingRepository ratingRepository;
    @Autowired
    private TimeSlotRepository timeSlotRepository;
    @Autowired
    private BookingService bookingService;

    @GetMapping("/fields")
    public List<SportsField> getAllFields() {
        List<SportsField> fields = sportsFieldRepository.findAll();
        for (SportsField field : fields) {
            Rating rating = ratingRepository.findBySportsFieldId(field.getId());
            if (rating != null) {
                field.setRating(rating.getRating());
                field.setReviewCount(rating.getReviewCount());
            }
        }
        return fields;
    }

    @GetMapping("/timeslots")
    public List<TimeSlot> getAllTimeSlots() {
        return timeSlotRepository.findAll();
    }

    @PostMapping("/book")
    public Booking bookField(@RequestBody Booking booking) {
        booking.setBookingTime(LocalDateTime.now());
        booking.setTotalPrice(booking.getSportsField().getPricePerHour());
        return bookingService.saveBooking(booking);
    }
}
