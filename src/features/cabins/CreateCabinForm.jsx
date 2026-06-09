/* eslint-disable*/
import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

const FormRow2
 = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateCabinForm() {
  const { register, handleSubmit, reset, getValues,formState } = useForm();
  const queryClient = useQueryClient();
  const {errors}=formState;

  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("New Cabin successfully created");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  function onSubmit(data) {
    mutate({...data,image:data.image[0]});
    console.log(data)
  }

  function onError(errors){
    // console.log(errors)
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit,onError)}>
      <FormRow label="Cabin name" error={errors?.name?.message} disabled={isCreating}>
      <Input type="text" id="name" {...register("name",{
          required:"This Field is required"
        })} />
      </FormRow>

    <FormRow label="maxCapacity" error={errors?.maxCapacity?.message} disabled={isCreating}>
      <Input type="number" id="maxCapacity" {...register("maxCapacity",{
          required:"This Field is required",
          min:{
            value:1,
            message:"Capacity should be at least 1"
          }
        })} />
      </FormRow>

      <FormRow label="regularPrice" error={errors?.regularPrice?.message} disabled={isCreating}>
        <Input type="number" id="regularPrice" {...register("regularPrice",{
          required:"This Field is required",
          min:{
            value:1,
            message:"Capacity should be at least 1"
          }
        })} 
      />
      </FormRow>
      <FormRow label="discount" error={errors?.discount?.message} disabled={isCreating}>
      <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount",{
            required:"This Field is required",
            validate:(value)=>value < Number(getValues().regularPrice) || "Discount should be less then regular Price",
           
          })}
        />
      </FormRow>

      <FormRow label="description" error={errors?.description?.message} disabled={isCreating}>
      <Textarea
          type="number"
          id="description"
          disabled={isCreating}
          defaultValue=""
          {...register("description",{
            required:"This Field is required"
          })}
        />
      </FormRow>

    

      <FormRow label="Cabin photo" >
        <FileInput id="image" accept="image/*"   {...register("image",{
            required:"This Field is required"
          })} />
      </FormRow
      >

      <FormRow >
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>Add cabin</Button>
      </FormRow
      >
    </Form>
  );
}

export default CreateCabinForm;
