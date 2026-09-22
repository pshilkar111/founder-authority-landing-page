/**
 * Utilities for accurate Google Calendar and iCal generation.
 * Generates exact scheduled slots matching the user's selected time (e.g. 3:30 PM IST).
 */

export interface CalendarSlotData {
  startIso: string;
  endIso: string;
  localStartIso: string;
  localEndIso: string;
  startDate: Date;
  endDate: Date;
}

export function parseSlotDetails(dateStr: string, timeStr: string): CalendarSlotData {
  const monthsMap: Record<string, number> = {
    jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6,
    jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12,
  };

  const now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth() + 1;
  let day = now.getDate();

  // Match month, day, year if present: e.g. "Today, Sep 22, 2026" or "Wednesday, Sep 23, 2026"
  const dMatch = dateStr.match(/([A-Za-z]{3,9})\s+(\d{1,2}),?\s*(\d{4})?/);
  if (dMatch) {
    const mKey = dMatch[1].toLowerCase().slice(0, 3);
    if (monthsMap[mKey] !== undefined) {
      month = monthsMap[mKey];
      day = parseInt(dMatch[2], 10);
      if (dMatch[3]) year = parseInt(dMatch[3], 10);
    }
  } else if (dateStr.toLowerCase().includes('tomorrow')) {
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    year = tomorrow.getFullYear();
    month = tomorrow.getMonth() + 1;
    day = tomorrow.getDate();
  }

  // Parse time: "3:30 PM IST", "11:30 AM IST", etc.
  let hour = 15; // default 3:30 PM
  let minute = 30;
  const tMatch = timeStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (tMatch) {
    hour = parseInt(tMatch[1], 10);
    minute = parseInt(tMatch[2], 10);
    const meridiem = tMatch[3].toUpperCase();
    if (meridiem === 'PM' && hour < 12) hour += 12;
    if (meridiem === 'AM' && hour === 12) hour = 0;
  }

  const pad = (n: number) => n.toString().padStart(2, '0');
  const localStartIso = `${year}${pad(month)}${pad(day)}T${pad(hour)}${pad(minute)}00`;

  const endMinuteTotal = hour * 60 + minute + 20; // 20 minute strategy slot
  const endHour = Math.floor(endMinuteTotal / 60);
  const endMin = endMinuteTotal % 60;
  const localEndIso = `${year}${pad(month)}${pad(day)}T${pad(endHour)}${pad(endMin)}00`;

  const startDate = new Date(year, month - 1, day, hour, minute);
  const endDate = new Date(year, month - 1, day, endHour, endMin);

  return {
    startIso: localStartIso,
    endIso: localEndIso,
    localStartIso,
    localEndIso,
    startDate,
    endDate,
  };
}

export function buildGoogleCalendarUrl({
  title,
  dateStr,
  timeStr,
  details,
  location = 'Google Meet',
  attendeeEmail,
}: {
  title: string;
  dateStr: string;
  timeStr: string;
  details?: string;
  location?: string;
  attendeeEmail?: string;
}): string {
  const { localStartIso, localEndIso } = parseSlotDetails(dateStr, timeStr);

  const url = new URL('https://calendar.google.com/calendar/render');
  url.searchParams.set('action', 'TEMPLATE');
  url.searchParams.set('text', title);
  // Using exact local time without UTC offset so it maps to the exact booked time (e.g. 3:30 PM)
  url.searchParams.set('dates', `${localStartIso}/${localEndIso}`);
  url.searchParams.set('ctz', 'Asia/Kolkata');
  if (details) {
    url.searchParams.set('details', details);
  }
  if (location) {
    url.searchParams.set('location', location);
  }
  if (attendeeEmail && attendeeEmail.includes('@')) {
    url.searchParams.set('add', attendeeEmail);
  }
  return url.toString();
}

export function buildIcsData({
  bookingId,
  title,
  dateStr,
  timeStr,
  details,
  location = 'Google Meet',
  attendeeName,
  attendeeEmail,
}: {
  bookingId: string;
  title: string;
  dateStr: string;
  timeStr: string;
  details: string;
  location?: string;
  attendeeName: string;
  attendeeEmail: string;
}): string {
  const { localStartIso, localEndIso } = parseSlotDetails(dateStr, timeStr);
  const dtStamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const cleanDesc = details.replace(/\n/g, '\\n');

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Founder Authority//Strategy Call Booking//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:REQUEST',
    'BEGIN:VEVENT',
    `UID:${bookingId}@founderauthority.com`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART:${localStartIso}`,
    `DTEND:${localEndIso}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${cleanDesc}`,
    `LOCATION:${location}`,
    'ORGANIZER;CN="Founder Authority":mailto:strategy@founderauthority.com',
    `ATTENDEE;CUTYPE=INDIVIDUAL;ROLE=REQ-PARTICIPANT;PARTSTAT=ACCEPTED;CN="${attendeeName}":mailto:${attendeeEmail}`,
    'STATUS:CONFIRMED',
    'SEQUENCE:0',
    'BEGIN:VALARM',
    'TRIGGER:-PT15M',
    'ACTION:DISPLAY',
    'DESCRIPTION:Founder Authority Strategy Call starting in 15 minutes',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}
