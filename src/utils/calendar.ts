/**
 * Utilities for accurate Google Calendar, Google Meet, and iCal generation.
 * Handles India Standard Time (IST, UTC+5:30) conversions to UTC ISO format.
 */

export interface CalendarSlotData {
  startIso: string;
  endIso: string;
  startDate: Date;
  endDate: Date;
}

export function parseSlotToUtc(dateStr: string, timeStr: string): CalendarSlotData {
  const monthsMap: Record<string, number> = {
    jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
    jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
  };

  const now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth();
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
  } else {
    const lower = dateStr.toLowerCase();
    if (lower.includes('tomorrow')) {
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      year = tomorrow.getFullYear();
      month = tomorrow.getMonth();
      day = tomorrow.getDate();
    }
  }

  // Parse time: "5:00 PM IST", "11:30 AM IST", etc.
  let hour = 17; // default 5:00 PM
  let minute = 0;
  const tMatch = timeStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (tMatch) {
    hour = parseInt(tMatch[1], 10);
    minute = parseInt(tMatch[2], 10);
    const meridiem = tMatch[3].toUpperCase();
    if (meridiem === 'PM' && hour < 12) hour += 12;
    if (meridiem === 'AM' && hour === 12) hour = 0;
  }

  // IST offset is UTC+5:30 -> UTC = IST - 5h 30m = -330 minutes
  const startUtcMs = Date.UTC(year, month, day, hour, minute) - (5 * 60 + 30) * 60 * 1000;
  const endUtcMs = startUtcMs + 20 * 60 * 1000; // 20 minute executive strategy slot

  const startDate = new Date(startUtcMs);
  const endDate = new Date(endUtcMs);

  const startIso = startDate.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const endIso = endDate.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');

  return { startIso, endIso, startDate, endDate };
}

export function generateGoogleMeetLink(): { link: string; code: string } {
  const chars = 'abcdefghijklmnopqrstuvwxyz';
  const gen = (len: number) => {
    let s = '';
    for (let i = 0; i < len; i++) {
      s += chars[Math.floor(Math.random() * chars.length)];
    }
    return s;
  };
  const code = `fnd-${gen(4)}-${gen(3)}`;
  return {
    link: `https://meet.google.com/${code}`,
    code,
  };
}

export function buildGoogleCalendarUrl({
  title,
  dateStr,
  timeStr,
  details,
  location,
  attendeeEmail,
}: {
  title: string;
  dateStr: string;
  timeStr: string;
  details: string;
  location: string;
  attendeeEmail?: string;
}): string {
  const { startIso, endIso } = parseSlotToUtc(dateStr, timeStr);

  const url = new URL('https://calendar.google.com/calendar/render');
  url.searchParams.set('action', 'TEMPLATE');
  url.searchParams.set('text', title);
  url.searchParams.set('dates', `${startIso}/${endIso}`);
  url.searchParams.set('ctz', 'Asia/Kolkata');
  url.searchParams.set('details', details);
  url.searchParams.set('location', location);
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
  location,
  attendeeName,
  attendeeEmail,
}: {
  bookingId: string;
  title: string;
  dateStr: string;
  timeStr: string;
  details: string;
  location: string;
  attendeeName: string;
  attendeeEmail: string;
}): string {
  const { startIso, endIso } = parseSlotToUtc(dateStr, timeStr);
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
    `DTSTART:${startIso}`,
    `DTEND:${endIso}`,
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
