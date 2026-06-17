/* eslint-disable no-unused-vars */
import styled from "styled-components";
import { useRecentBooking } from "./useRecentBooking";
import Spinner from "../../ui/Spinner";
import { useRecentStays } from "./useRecentStays";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;
function DashboardLayout() {
  const { bookings, isLoading: isLoading1 } = useRecentBooking();
  const { isLoading: isLoading2, stays, confirmedStays } = useRecentStays();
  if (isLoading1 || isLoading2) return <Spinner />;
  console.log(bookings);
  return (
    <StyledDashboardLayout>
      <div>Statistics</div>
      <div>Activity</div>
      <div>Chart say duration</div>
      <div>sales cart</div>
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
