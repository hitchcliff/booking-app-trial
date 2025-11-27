import User from "../entities/User";

interface hasPostProps {
  id: string;
}

export default async function getUser({
  id,
}: hasPostProps): Promise<User | null> {
  const user = await User.findOne({
    where: {
      id,
    },
  });

  return user;
}
