/* eslint-disable react/prop-types */

import { HiOutlineBriefcase, HiOutlineChartBar } from "react-icons/hi";
import Stat from "./Stat";
import { HiOutlineBanknotes, HiOutlineCalendarDays } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";

// eslint-disable-next-line no-unused-vars
function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
  // 1. number of bookings
  const numBookings = bookings?.length;

  // 2. TOTAL SALES
  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

  //   3. checkings
  const checkins = confirmedStays.length;

  //   4. occupany rate num checked in nights/all available nights(number of days*number of cabin)
  const occupancy =
    confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays * cabinCount);

  return (
    <>
      <Stat
        title="bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupancy * 100) + "%"}
      />
    </>
  );
}

export default Stats;
