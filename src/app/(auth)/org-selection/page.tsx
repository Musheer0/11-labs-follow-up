import { OrganizationList } from "@clerk/nextjs";

const page = () => {
  return (
    <OrganizationList
      hidePersonal
      afterCreateOrganizationUrl={"/"}
      afterSelectOrganizationUrl={"/"}
      afterSelectPersonalUrl={"/"}
    />
  );
};

export default page;
