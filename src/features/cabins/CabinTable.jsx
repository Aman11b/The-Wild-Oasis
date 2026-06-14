/* eslint-disable no-unused-vars */
import styled from "styled-components";

import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";

import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

// const TableHeader = styled.header`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;

//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   padding: 1.6rem 2.4rem;
// `;

function CabinTable() {
  const { isLoading, cabins, error } = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  // 1. filter
  const filterValue = searchParams.get("discount") || "all";
  console.log(filterValue);

  let filteredCabin;
  if (filterValue === "all") filteredCabin = cabins;

  if (filterValue === "no-discount")
    filteredCabin = cabins.filter((cabin) => cabin.discount === 0);

  if (filterValue === "with-discount")
    filteredCabin = cabins.filter((cabin) => cabin.discount > 0);

  // 2. Sort

  const sortBy = searchParams.get("sortBy") || "name-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filteredCabin.sort((a, b) => {
    const valueA = a[field];
    const valueB = b[field];
    if (typeof valueA === "string")
      return valueA.localeCompare(valueB) * modifier;
    return (valueA - valueB) * modifier;
  });

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}
export default CabinTable;
