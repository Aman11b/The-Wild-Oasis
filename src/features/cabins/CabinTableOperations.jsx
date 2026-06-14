import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: "all", lable: "All" },
          { value: "no-discount", lable: "No-Discount" },
          { value: "with-discount", lable: "With-Discount" },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
