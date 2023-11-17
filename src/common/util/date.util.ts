import { convert, LocalDate, LocalDateTime } from '@js-joda/core';

export namespace DateUtil {
  export function toJsDate(date: LocalDate | LocalDateTime) {
    return convert(date).toDate();
  }
}
