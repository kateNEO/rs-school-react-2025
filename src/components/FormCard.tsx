import type { FormData } from '../store/formStore.ts';

function FormCard({ data }: { data: FormData }) {
  return (
    <>
      <div
        className="flex flex-col justify-around relative border-1 h-fit max-w-[260px] min-h-80
      pt-10 pb-5 px-1 items-center border border-gray-200 rounded-md text-inherit text-shadow:inherit"
      >
        <p className="text-xs md:text-sm">
          <img
            src={data.picture}
            alt="Preview"
            className="w-50 h-50 rounded-full shadow"
          />
        </p>
        <p className="text-xs md:text-sm">
          <span className="font-medium">Name: </span>
          {data.name}
        </p>
        <div
          className="bg-gray-100/50 w-7/8 text-sm mb-3 text-gray-600 rounded-md py-6 px-1
         hover:bg-blue-50 duration-500"
        >
          <p className="text-xs md:text-sm">
            <span className="font-medium">Age: </span>
            {data.age}
          </p>
          <p className="text-xs md:text-sm">
            <span className="font-medium">Gender: </span>
            {data.gender}
          </p>
          <p className="text-xs md:text-sm">
            <span className="font-medium">Email: </span>
            {data.email}
          </p>
          <p className="text-xs md:text-sm">
            <span className="font-medium">Password: </span>
            {data.password.password}
          </p>
          <p className="text-xs md:text-sm">
            <span className="font-medium">Country: </span>
            {data.country}
          </p>
        </div>
      </div>
    </>
  );
}

export default FormCard;
