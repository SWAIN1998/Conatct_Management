import { Delete, Edit } from "@mui/icons-material";
import { Avatar, Switch, TextFieldProps, Tooltip } from "@mui/material";
import React from "react";
import MaterialTable from "@material-table/core";
import IOSSwitch from "@/components/core/IOSSwitch";
import CustomDialog from "@/components/core/CustomDialog";
import InputField from "@/components/core/InputField";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { MuiTblOptions } from "../../utils";
import { PublicLayout } from "@/layouts";
import ContactEdit from "@/components/ContactEdit";
import { addContact, editContact, removeContact } from "../Redux/action";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

const ContactSchema = [
  {
    key: 1,
    name: "firstName",
    label: "First Name",
    placeHolder: "Enter Your FirstName",
    initialValue: "",
    type: "text",
    validationSchema: Yup.string()
      .required("First Name is required.")
      .min(3, "First Name must be at least 3 characters long.")
      .matches(/^[A-Za-z\s]+$/, "First Name must be only alphabets"),
    className: "col-span-12 md:col-span-6",
  },
  {
    key: 2,
    name: "lastName",
    placeHolder: "Enter Your LastName",
    label: "Last Name",
    initialValue: "",
    type: "text",
    validationSchema: Yup.string()
      .required("Last Name is required")
      .min(3, "Last Name must be at least 3 characters long.")
      .matches(/^[A-Za-z\s]+$/, "Last Name must be only alphabets"),
    className: "col-span-12 md:col-span-6",
  },
];

const initialValues = ContactSchema?.reduce((accumulator, currentValue) => {
  accumulator[currentValue?.name] = currentValue?.initialValue;
  return accumulator;
}, {} as any);

const validationSchema = ContactSchema?.reduce((accumulator, currentValue) => {
  accumulator[currentValue?.name] = currentValue?.validationSchema;
  return accumulator;
}, {} as any);

const Home = () => {
  const [activeData, setActiveData] = React.useState<any>(null);
  const [open, setOpen] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);
  const [isSwitch, setIsSwitch] = React.useState(false);
  const [isDelete, setIsDelete] = React.useState(false);
  const [isActiveId, setIsActiveId] = React.useState<any>(null);
  const [openTenant, setOpenTenant] = React.useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = React.useState(false);
  const [form, setForm] = React.useState<any>({});
  console.log("form", form);
  const router = useRouter();
  const AllContacts = useSelector((store: any) => store.contacts);
  const dispatch = useDispatch();

  const handleActiveData = (data: any) => {
    setActiveData(data);
    setOpen(true);
    setIsRegisterOpen(true);
    setIsEdit(data ? true : false);
  };

  const handleBlock = (data: any) => {
    setIsSwitch(true);
    setActiveData(data);
    setIsActiveId(data.id);
  };

  const handleEdit = (data: any) => {
    setIsActiveId(data.id);
    setOpenTenant(true);
  };
  const handleCheckboxChangeSwitch = () => {
    setIsSwitch(!isSwitch);
  };

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  function handleSave() {
    dispatch(
      addContact({
        ...form,
        status: isSwitch ? "Active" : "Inactive",
      })
    );
  }

  useEffect(() => {}, [dispatch, AllContacts.length]);
  return (
    <PublicLayout title="Contact Management">
      <div className="w-full flex flex-col p-4">
        <ContactEdit
          open={openTenant}
          onClose={() => setOpenTenant(false)}
          isActiveId={isActiveId}
          activeData={activeData}
        />
        <div className="w-full flex flex-col  justify-center items-center  ">
          <MaterialTable
            data={AllContacts.map((el: any) => {
              return {
                ...el,
                sl: AllContacts.indexOf(el) + 1,
              };
            })}
            title={
              <div className="flex gap-3 justify-center items-center">
                <div className="text-lg font-bold text-themeDarkGray">
                  Contact Management
                </div>
                <div>
                  <button
                    onClick={() => handleActiveData(null)}
                    className="btn-two"
                  >
                    Add
                  </button>
                </div>
              </div>
            }
            columns={[
              {
                title: "#",
                field: "sl",
                editable: "never",
                width: "10%",
              },
              {
                title: "First Name",
                tooltip: "First Name",
                field: "firstName",
                width: "20%",
              },
              {
                title: "Last Name",
                tooltip: "Last Name",
                field: "lastName",
                width: "20%",
              },
              {
                title: "Status",
                tooltip: "Status",
                field: "status",
                width: "30%",
                render: (rowData: any) => (
                  <IOSSwitch
                    checked={rowData?.status === "Active"}
                    onChange={() => {
                      const data = {
                        ...rowData,
                        status:
                          rowData?.status === "Active" ? "Inactive" : "Active",
                      };
                      dispatch(editContact(data));
                    }}
                  />
                ),
              },
              {
                title: "Actions",
                headerStyle: {
                  textAlign: "center",
                },
                export: false,
                field: "pick",
                render: (row) => (
                  <>
                    <div className="flex flex-row items-center gap-1 ">
                      <Tooltip title="Delete">
                        <Avatar
                          onClick={() => dispatch(removeContact(row?.id))}
                          variant="rounded"
                          className="!mr-1 !cursor-pointer !bg-theme !p-0"
                        >
                          <Delete className="!p-0" />
                        </Avatar>
                      </Tooltip>
                      <Tooltip title="Edit">
                        <Avatar
                          onClick={() => handleEdit(row as any)}
                          variant="rounded"
                          className="!mr-1 !cursor-pointer !bg-themeGray !p-0"
                        >
                          <Edit className="!p-0" />
                        </Avatar>
                      </Tooltip>
                    </div>
                  </>
                ),
              },
            ]}
            options={{ ...MuiTblOptions(), selection: false }}
          />
        </div>
        <CustomDialog
          open={isRegisterOpen}
          onClose={() => setIsRegisterOpen(false)}
        >
          <div className="flex flex-col  justify-center items-center w-full p-4">
            <Formik
              initialValues={initialValues}
              validationSchema={Yup.object(validationSchema)}
              onSubmit={handleSave}
            >
              {(formik) => (
                <Form className="w-full grid grid-cols-12 gap-4">
                  {ContactSchema?.map((inputItem) => (
                    <Field name={inputItem?.name} key={inputItem.key}>
                      {(props: {
                        meta: { touched: any; error: any };
                        field: JSX.IntrinsicAttributes & TextFieldProps;
                      }) => (
                        <div
                          className={`flex w-full justify-center gap-4 ${inputItem.className}`}
                        >
                          <div className="flex flex-col w-full justify-center gap-2">
                            <div className="font-semibold text-lg">
                              {inputItem.label}
                            </div>
                            <InputField
                              title={inputItem?.label}
                              key={inputItem?.key}
                              name={inputItem?.name}
                              type={inputItem?.type}
                              placeholder={inputItem.placeHolder}
                              value={formik?.values[inputItem?.name]}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              fullWidth
                              error={Boolean(
                                formik?.touched[inputItem?.name] &&
                                  formik?.errors[inputItem?.name]
                              )}
                              helperText={
                                formik?.touched[inputItem?.name] &&
                                (formik?.errors[inputItem?.name] as any)
                              }
                            />
                          </div>
                        </div>
                      )}
                    </Field>
                  ))}
                  <div className="w-full flex items-center gap-4">
                    <div className="font-semibold">Status</div>
                    <Switch
                      checked={isSwitch}
                      onChange={handleCheckboxChangeSwitch}
                      color="primary"
                      name="checkedB"
                      inputProps={{ "aria-label": "primary checkbox" }}
                    />
                  </div>

                  <div className="flex items-center col-span-12  justify-center flex-col gap-2 pt-4">
                    <button
                      type="submit"
                      className="btn-one"
                      disabled={formik.isSubmitting}
                    >
                      Add Contact
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </CustomDialog>
      </div>
    </PublicLayout>
  );
};

export default Home;
