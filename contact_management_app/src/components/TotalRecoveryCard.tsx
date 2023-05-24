import { useRouter } from "next/router";

type Props = {
  title: string;
  content?: string;
  className?: string;
  iconClassName?: string;
  titleClassName?: string;
  contain?: string;
  contentClassName?: string;
  clickableRoute?: string;
  icon?: React.ReactElement;
};

const TotalRecoveryCard = ({
  title,
  icon,
  content,
  className = "",
  iconClassName = "",
  titleClassName = "",
  contentClassName = "",

  clickableRoute = "",
}: Props) => {
  const router = useRouter();
  return (
    <div>
      <div
        onClick={() => router.push(`${clickableRoute}`)}
        className={` flex justify-between cursor-pointer flex-row shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]  items-center gap-4  p-6 transition duration-150 ease-in-out  ${className}`}
      >
        <div className={`rounded-full  ${iconClassName}`}>
          <div className="text-sm p-3 ">{icon}</div>
        </div>
        <div className="pt-3">
          <h2 className={`${contentClassName}`}>{content}</h2>
          <h1
            className={` tracking-wider md:text-xs lg:text-sm ${titleClassName}`}
          >
            {title}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default TotalRecoveryCard;
