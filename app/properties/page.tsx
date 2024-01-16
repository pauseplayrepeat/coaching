
import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";

import getCurrentUser from "@/actions/getCurrentUser";
import getListings from "@/actions/getListings";

import PropertiesClient from "./PropertiesClient";
import { useUser } from "@clerk/nextjs";

const PropertiesPage = async () => {

  const { user } = useUser();

  if (!user) {
    return <EmptyState
      title="Unauthorized"
      subtitle="Please login"
    />
  }

  // const listings = await getListings({ u });

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No properties found"
          subtitle="Looks like you have no properties."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <PropertiesClient
        listings={listings}
        // currentUser={currentUser}
      />
    </ClientOnly>
  );
}
 
export default PropertiesPage;