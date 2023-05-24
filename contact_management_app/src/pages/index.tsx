import { Delete, Edit } from "@mui/icons-material";
import { Avatar, TextFieldProps, Tooltip } from "@mui/material";
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
  const [isActive, setIsActive] = React.useState(false);
  const [activeData, setActiveData] = React.useState<any>(null);
  const [open, setOpen] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);
  const [data, setData] = React.useState<any>([]);
  const [columns, setColumns] = React.useState<any>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSwitch, setIsSwitch] = React.useState(false);
  const [isDelete, setIsDelete] = React.useState(false);
  const [isActiveId, setIsActiveId] = React.useState<any>(null);
  const [openTenant, setOpenTenant] = React.useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = React.useState(false);

  const handleActiveData = (data: any) => {
    setActiveData(data);
    setOpen(true);
    setIsRegisterOpen(true);
    setIsEdit(data ? true : false);
  };

  const handleBlock = (data: any) => {
    setIsSwitch(true);
    setActiveData(data);
  };

  const handleDelete = (data: any) => {
    setIsDelete(true);
    setActiveData(data);
  };

  const handleOpenTenantModal = (data: any) => {
    setOpen(true);
  };

  const handleAddContact = () => {
    setIsRegisterOpen(true);
  };

  const handleCheckboxChange = (event: any) => {
    setIsActive(event.target.checked);
  };
  const handleCheckboxChangeSwitch = (event: any) => {
    setIsSwitch(event.target.checked);
  };

  return (
    <PublicLayout title="Contact Management">
      <div className=" flex flex-col p-4">
        <ContactEdit
          open={openTenant}
          onClose={() => setOpenTenant(false)}
          isActiveId={isActiveId}
          activeData={activeData}
        />
        <div className="w-full flex flex-col  justify-center items-center  ">
          <MaterialTable
            data={data}
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
                width: "20%",
                render: (rowData: any) => (
                  <IOSSwitch
                    checked={rowData?.blockStatus === "Active" ? true : false}
                    onChange={() => {
                      handleBlock(rowData);
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
                          onClick={() => handleDelete(row as any)}
                          variant="rounded"
                          className="!mr-1 !cursor-pointer !bg-theme !p-0"
                        >
                          <Delete className="!p-0" />
                        </Avatar>
                      </Tooltip>
                      <Tooltip title="Edit">
                        <Avatar
                          onClick={() => handleOpenTenantModal(row as any)}
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
              onSubmit={handleAddContact}
            >
              {(formik) => (
                <Form className="w-full grid grid-cols-12 gap-4">
                  {ContactSchema?.map((inputItem) => (
                    <Field name={inputItem?.name} key={inputItem?.key}>
                      {(props: {
                        meta: { touched: any; error: any };
                        field: JSX.IntrinsicAttributes & TextFieldProps;
                      }) => (
                        <div
                          className={`flex flex-col justify-center gap-3 ${inputItem?.className}`}
                        >
                          <div className="font-semibold">
                            {inputItem?.label}
                          </div>
                          <div className="col-span-6 w-full">
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
                    <div className="flex items-center gap-6">
                      <div className=" flex">
                        <input
                          type="checkbox"
                          id="statusCheckbox"
                          name="status"
                          checked={isActive}
                          onChange={handleCheckboxChange}
                          className="mr-2"
                        />
                        <label htmlFor="statusCheckbox">Active</label>
                      </div>
                      <div className=" flex">
                        <input
                          type="checkbox"
                          id="statusCheckbox"
                          name="status"
                          checked={isSwitch}
                          onChange={handleCheckboxChangeSwitch}
                          className="mr-2"
                        />
                        <label htmlFor="statusCheckbox">Inactive</label>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center col-span-12  justify-center flex-col gap-2 pt-4">
                    <button
                      type="submit"
                      className="btn-one"
                      disabled={formik.isSubmitting}
                    >
                      {formik.isSubmitting ? "Please wait..." : "Add Contact"}
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
