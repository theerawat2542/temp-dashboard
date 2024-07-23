import React from "react";

type Props = {
  searchParams: {
    plant: string;
  };
};

async function getBacklineData(plant: string) {}

const BacklinePage = async ({ searchParams }: Props) => {
  const { plant } = searchParams;
  const data = await getBacklineData(plant);
  return <div>BacklinePage</div>;
};

export default BacklinePage;
