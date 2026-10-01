/**
 * Ethiopian Calendar (ዓ.ም / Ge'ez Era) Conversion & Utilities
 *
 * Mathematically rigorous bi-directional conversion between Gregorian Calendar (G.C.)
 * and Ethiopian Calendar (ዓ.ም) using Julian Day Numbers (JDN).
 * Supports 13 months, leap years, localized Amharic, Afaan Oromoo, Tigrinya and English names.
 */

export interface EthiopianDate {
  year: number; // e.g. 2019 ዓ.ም
  month: number; // 1 to 13 (1 = Meskerem, 13 = Pagume)
  day: number; // 1 to 30 (or 1 to 5/6 for Pagume)
}

export interface GregorianDate {
  year: number; // e.g. 2026
  month: number; // 1 to 12
  day: number; // 1 to 31
}

export type SupportedCalendarLang = "am" | "om" | "ti" | "en";

export interface MonthInfo {
  index: number; // 1-13
  nameAm: string;
  nameOm: string;
  nameTi: string;
  nameEn: string;
  days: number;
}

export const ETHIOPIAN_MONTHS: MonthInfo[] = [
  { index: 1, nameAm: "መስከረም", nameOm: "Fulbaana", nameTi: "መስከረም", nameEn: "Meskerem", days: 30 },
  { index: 2, nameAm: "ጥቅምት", nameOm: "Onkololeessa", nameTi: "ጥቅምቲ", nameEn: "Tikimt", days: 30 },
  { index: 3, nameAm: "ኅዳር", nameOm: "Sadaasa", nameTi: "ሕዳር", nameEn: "Hidar", days: 30 },
  { index: 4, nameAm: "ታኅሣሥ", nameOm: "Muddee", nameTi: "ታሕሳስ", nameEn: "Tahsas", days: 30 },
  { index: 5, nameAm: "ጥር", nameOm: "Amajjii", nameTi: "ጥሪ", nameEn: "Tir", days: 30 },
  { index: 6, nameAm: "የካቲት", nameOm: "Guraandhala", nameTi: "የካቲት", nameEn: "Yakatit", days: 30 },
  { index: 7, nameAm: "መጋቢት", nameOm: "Bitootessa", nameTi: "መጋቢት", nameEn: "Maggabit", days: 30 },
  { index: 8, nameAm: "ሚያዝያ", nameOm: "Ebla", nameTi: "ሚያዝያ", nameEn: "Miyazya", days: 30 },
  { index: 9, nameAm: "ግንቦት", nameOm: "Caamsa", nameTi: "ግንቦት", nameEn: "Ginbot", days: 30 },
  { index: 10, nameAm: "ሰኔ", nameOm: "Waxabajjii", nameTi: "ሰነ", nameEn: "Sene", days: 30 },
  { index: 11, nameAm: "ሐምሌ", nameOm: "Adooleessa", nameTi: "ሓምለ", nameEn: "Hamle", days: 30 },
  { index: 12, nameAm: "ነሐሴ", nameOm: "Hagayya", nameTi: "ነሓሰ", nameEn: "Nehase", days: 30 },
  { index: 13, nameAm: "ጳጉሜ", nameOm: "Qaammee", nameTi: "ጳጉሜን", nameEn: "Pagume", days: 5 }, // 6 in leap
];

export const GREGORIAN_MONTHS = [
  { index: 1, nameEn: "January", nameAm: "ጃንዩወሪ", shortEn: "Jan" },
  { index: 2, nameEn: "February", nameAm: "ፌብሩወሪ", shortEn: "Feb" },
  { index: 3, nameEn: "March", nameAm: "ማርች", shortEn: "Mar" },
  { index: 4, nameEn: "April", nameAm: "ኤፕሪል", shortEn: "Apr" },
  { index: 5, nameEn: "May", nameAm: "ሜይ", shortEn: "May" },
  { index: 6, nameEn: "June", nameAm: "ጁን", shortEn: "Jun" },
  { index: 7, nameEn: "July", nameAm: "ጁላይ", shortEn: "Jul" },
  { index: 8, nameEn: "August", nameAm: "ኦገስት", shortEn: "Aug" },
  { index: 9, nameEn: "September", nameAm: "ሴፕቴምበር", shortEn: "Sep" },
  { index: 10, nameEn: "October", nameAm: "ኦክቶበር", shortEn: "Oct" },
  { index: 11, nameEn: "November", nameAm: "ኖቬምበር", shortEn: "Nov" },
  { index: 12, nameEn: "December", nameAm: "ዲሴምበር", shortEn: "Dec" },
];

export const ETHIOPIAN_DAYS = [
  { index: 0, nameAm: "እሑድ", nameOm: "Dilbata", nameTi: "ሰንበት", nameEn: "Sun" },
  { index: 1, nameAm: "ሰኞ", nameOm: "Wiixata", nameTi: "ሰኑይ", nameEn: "Mon" },
  { index: 2, nameAm: "ማክሰኞ", nameOm: "Kibxata", nameTi: "ሰሉስ", nameEn: "Tue" },
  { index: 3, nameAm: "ረቡዕ", nameOm: "Roobii", nameTi: "ረቡዕ", nameEn: "Wed" },
  { index: 4, nameAm: "ሐሙስ", nameOm: "Kamisa", nameTi: "ሓሙስ", nameEn: "Thu" },
  { index: 5, nameAm: "ዓርብ", nameOm: "Jimaata", nameTi: "ዓርቢ", nameEn: "Fri" },
  { index: 6, nameAm: "ቅዳሜ", nameOm: "Sanbata", nameTi: "ቀዳም", nameEn: "Sat" },
];

const ETHIOPIAN_EPOCH = 1724221;

/**
 * Checks whether an Ethiopian year is a leap year (Pagume has 6 days).
 * In the Ethiopian calendar, a leap year occurs every 4 years when `year % 4 === 3`.
 */
export function isEthiopianLeapYear(year: number): boolean {
  return year % 4 === 3;
}

/**
 * Returns number of days in a given Ethiopian month (30 for months 1-12; 5 or 6 for Pagume).
 */
export function getEthiopianDaysInMonth(year: number, month: number): number {
  if (month >= 1 && month <= 12) return 30;
  if (month === 13) return isEthiopianLeapYear(year) ? 6 : 5;
  throw new Error(`Invalid Ethiopian month index: ${month}`);
}

/**
 * Convert Gregorian date to Julian Day Number (JDN)
 */
export function gregorianToJdn(year: number, month: number, day: number): number {
  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;
  return (
    day +
    Math.floor((153 * m + 2) / 5) +
    365 * y +
    Math.floor(y / 4) -
    Math.floor(y / 100) +
    Math.floor(y / 400) -
    32045
  );
}

/**
 * Convert Julian Day Number (JDN) to Gregorian date
 */
export function jdnToGregorian(jdn: number): GregorianDate {
  const l = jdn + 68569;
  const n = Math.floor((4 * l) / 146097);
  const l1 = l - Math.floor((146097 * n + 3) / 4);
  const i = Math.floor((4000 * (l1 + 1)) / 1461001);
  const l2 = l1 - Math.floor((1461 * i) / 4) + 31;
  const j = Math.floor((80 * l2) / 2447);
  const day = l2 - Math.floor((2447 * j) / 80);
  const l3 = Math.floor(j / 11);
  const month = j + 2 - 12 * l3;
  const year = 100 * (n - 49) + i + l3;
  return { year, month, day };
}

/**
 * Convert Julian Day Number (JDN) to Ethiopian date
 */
export function jdnToEthiopian(jdn: number): EthiopianDate {
  const days = jdn - ETHIOPIAN_EPOCH;
  const cycle = Math.floor(days / 1461);
  let r = days % 1461;
  if (r < 0) {
    r += 1461;
  }
  let year = cycle * 4 + 1;
  const lengths = [365, 365, 366, 365];
  for (let i = 0; i < 4; i++) {
    if (r >= lengths[i]) {
      r -= lengths[i];
      year++;
    } else {
      break;
    }
  }
  const month = Math.floor(r / 30) + 1;
  const day = (r % 30) + 1;
  return { year, month, day };
}

/**
 * Convert Ethiopian date to Julian Day Number (JDN)
 */
export function ethiopianToJdn(year: number, month: number, day: number): number {
  const y = year - 1;
  const leapYears = Math.floor((y + 1) / 4);
  const daysInPastYears = y * 365 + leapYears;
  const daysInCurrentYear = (month - 1) * 30 + (day - 1);
  return daysInPastYears + daysInCurrentYear + ETHIOPIAN_EPOCH;
}

/**
 * Convert a Gregorian Date or ISO string to EthiopianDate
 */
export function gregorianToEthiopian(
  input: Date | string | GregorianDate
): EthiopianDate {
  let y: number;
  let m: number;
  let d: number;

  if (typeof input === "string") {
    // If YYYY-MM-DD string, parse directly to avoid UTC day-shift
    const parts = input.split("-");
    if (parts.length >= 3) {
      y = parseInt(parts[0], 10);
      m = parseInt(parts[1], 10);
      d = parseInt(parts[2], 10);
    } else {
      const parsed = new Date(input);
      y = parsed.getFullYear();
      m = parsed.getMonth() + 1;
      d = parsed.getDate();
    }
  } else if (input instanceof Date) {
    y = input.getFullYear();
    m = input.getMonth() + 1;
    d = input.getDate();
  } else {
    y = input.year;
    m = input.month;
    d = input.day;
  }

  const jdn = gregorianToJdn(y, m, d);
  return jdnToEthiopian(jdn);
}

/**
 * Convert an EthiopianDate to GregorianDate
 */
export function ethiopianToGregorian(eth: EthiopianDate): GregorianDate {
  const jdn = ethiopianToJdn(eth.year, eth.month, eth.day);
  return jdnToGregorian(jdn);
}

/**
 * Convert an EthiopianDate to a JavaScript Date object
 */
export function ethiopianToDate(eth: EthiopianDate): Date {
  const g = ethiopianToGregorian(eth);
  return new Date(g.year, g.month - 1, g.day);
}

/**
 * Get localized Ethiopian month name
 */
export function getEthiopianMonthName(
  month: number,
  lang: SupportedCalendarLang = "am"
): string {
  const info = ETHIOPIAN_MONTHS[month - 1];
  if (!info) return "";
  switch (lang) {
    case "om":
      return info.nameOm;
    case "ti":
      return info.nameTi;
    case "en":
      return info.nameEn;
    case "am":
    default:
      return info.nameAm;
  }
}

/**
 * Format Ethiopian Date to standard string
 * e.g. "መስከረም 20, 2019 ዓ.ም"
 */
export function formatEthiopianDate(
  eth: EthiopianDate,
  format: "short" | "medium" | "long" = "long",
  lang: SupportedCalendarLang = "am"
): string {
  const monthName = getEthiopianMonthName(eth.month, lang);
  const eraSuffix = lang === "en" ? "E.C." : "ዓ.ም";

  if (format === "short") {
    return `${String(eth.day).padStart(2, "0")}/${String(eth.month).padStart(2, "0")}/${eth.year}`;
  }

  if (format === "medium") {
    return `${monthName} ${eth.day}, ${eth.year}`;
  }

  return `${monthName} ${eth.day}, ${eth.year} ${eraSuffix}`;
}

/**
 * Formats a given date into dual Gregorian and Ethiopian representations
 */
export function formatDualDate(
  input: Date | string | GregorianDate,
  lang: SupportedCalendarLang = "am"
): {
  ethiopian: string;
  gregorian: string;
  dualString: string;
  rawEthiopian: EthiopianDate;
  rawGregorian: GregorianDate;
} {
  let gDate: GregorianDate;
  if (typeof input === "string") {
    const parts = input.split("-");
    if (parts.length >= 3) {
      gDate = {
        year: parseInt(parts[0], 10),
        month: parseInt(parts[1], 10),
        day: parseInt(parts[2], 10),
      };
    } else {
      const d = new Date(input);
      gDate = { year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() };
    }
  } else if (input instanceof Date) {
    gDate = { year: input.getFullYear(), month: input.getMonth() + 1, day: input.getDate() };
  } else {
    gDate = input;
  }

  const eth = gregorianToEthiopian(gDate);
  const gMonth = GREGORIAN_MONTHS[gDate.month - 1]?.shortEn || "";

  const ethString = formatEthiopianDate(eth, "long", lang);
  const gregString = `${gDate.day} ${gMonth} ${gDate.year} G.C.`;

  return {
    ethiopian: ethString,
    gregorian: gregString,
    dualString: `${ethString} (${gregString})`,
    rawEthiopian: eth,
    rawGregorian: gDate,
  };
}
