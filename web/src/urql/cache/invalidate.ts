import { Cache } from "@urql/exchange-graphcache";

export default class Invalidate {
  readAllMyAppointments(cache: Cache) {
    const allFields = cache.inspectFields("Query");
    const fieldInfos = allFields.filter(
      (info) => info.fieldName === "readAllMyAppointments"
    );

    fieldInfos.forEach((fi) => {
      cache.invalidate("Query", "readAllMyAppointments");
    });
  }

  readAllBookings(cache: Cache) {
    const allFields = cache.inspectFields("Query");
    const fieldInfos = allFields.filter(
      (info) => info.fieldName === "readAllBookings"
    );

    fieldInfos.forEach((fi) => {
      cache.invalidate("Query", "readAllBookings");
    });
  }
}
