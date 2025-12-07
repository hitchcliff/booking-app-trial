import Link from "next/link";
import { useReadBookingTrendingQuery } from "../gen/graphql";
import RoutePattern from "../routes/RoutePattern";

const Trendings = () => {
  const [{ data: trends }] = useReadBookingTrendingQuery();

  return (
    <div className="flex flex-col w-full text-dark dark:text-light">
      <h2 className="font-bold">Latest Trend</h2>
      <div className=" p-5 overflow-hidden shadow-sm rounded-md dark:bg-dark bg-light">
        <ul className="flex flex-col gap-5">
          {trends?.readBookingTrending.map((trend) => (
            <li className="border border-dark dark:border-white rounded-md p-2">
              {trend.title} ({trend.likes} likes) by:{" "}
              <Link
                href={`/${RoutePattern.USER}/${trend.user?.id}`}
                className="link"
              >
                {trend.user?.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Trendings;
