/* eslint-disable*/
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";


import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";

import { useForm } from "react-hook-form";
import { createCabin } from "../../services/apiCabins";


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
